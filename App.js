import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Platform, View } from "react-native";
import React from "react";
import * as FacebookAds from "expo-ads-facebook";

export default function App() {
  let [isLoaded, setIsLoaded] = React.useState(false);
  const bannerId = getPlacementId(true);
  const interstitialId = getPlacementId(false);

  FacebookAds.AdSettings.requestPermissionsAsync().then((permissions) => {
    let canTrack = permissions.status === "granted";
    FacebookAds.AdSettings.setAdvertiserTrackingEnabled(canTrack);
    setIsLoaded(true);
  });

  function getPlacementId(bannerAd) {
    let placementId;
    if (bannerAd) {
      placementId =
        Platform.OS === "ios" ||
        Platform.OS === "android" ||
        Platform.OS === "web"
          ? "979736269624954_979737056291542"
          : "3220611154889014_3220612551555541";
    } else {
      placementId =
        Platform.OS === "ios" ||
        Platform.OS === "android" ||
        Platform.OS === "web"
          ? "979736269624954_979737219624859"
          : "3220611154889014_3220612551555541";
    }

    if (__DEV__) {
      return `VID_HD_9_16_39S_LINK#${placementId}`;
    }

    return placementId;
  }

  function showInterstitial() {
    FacebookAds.InterstitialAdManager.showAd(interstitialId)
      .then((didClick) => console.log(didClick))
      .catch((error) => console.log(error));
  }

  function getBannerAd() {
    if (isLoaded) {
      return (
        <FacebookAds.BannerAd
          placementId={bannerId}
          type="large"
          onPress={() => console.log("click")}
          onError={(error) => console.log(error.nativeEvent)}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button title="Show Interstitial" onPress={showInterstitial} />
      </View>
      <View style={styles.adView}>{getBannerAd()}</View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  adView: {
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
});
