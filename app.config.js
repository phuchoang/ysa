export default {
  expo: {
    name: "BootGenie",
    slug: "bootgenie-unlock-guide",
    version: "1.0.1",
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
      bundleIdentifier: "com.bootgenie.unlockguide",
      buildNumber: "1.0.1",
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
      package: "com.bootgenie.unlockguide",
      versionCode: 2,
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
      "expo-router",
      "expo-web-browser"
    ],
    scheme: "bootgenie",
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "74d63637-4a4a-4919-bcce-da4276983940"
      }
    }
  }
};
