export default {
  expo: {
    name: "BootGenie",
    slug: "bootgenie",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.bootgenie.app",
      buildNumber: "1.0.0",
      infoPlist: {
        NSUserTrackingUsageDescription: "This app does not track users.",
        NSCameraUsageDescription: "Camera access is not used by this app.",
        NSMicrophoneUsageDescription: "Microphone access is not used by this app.",
        NSLocationWhenInUseUsageDescription: "Location access is not used by this app."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.bootgenie.app",
      versionCode: 1,
      permissions: [
        "android.permission.INTERNET",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.READ_EXTERNAL_STORAGE"
      ]
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
      output: "static",
      name: "BootGenie - Bootloader Unlock Guide",
      shortName: "BootGenie",
      description: "Safe and comprehensive guide for unlocking Chinese smartphone bootloaders",
      themeColor: "#3b82f6",
      backgroundColor: "#ffffff",
      display: "standalone",
      orientation: "portrait"
    },
    plugins: [
      "expo-router"
    ],
    scheme: "bootgenie",
    extra: {
      router: {
        origin: false
      }
    },
    owner: "bootgenie"
  }
};
