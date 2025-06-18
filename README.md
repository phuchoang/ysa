# BootGenie

BootGenie is a cross-platform mobile app built with React Native to guide users in unlocking the bootloader of Chinese smartphones (e.g., Xiaomi, Huawei, Oppo, Vivo). It provides device detection, step-by-step instructions, and safe execution of ADB/Fastboot commands.

## Table of Contents

- [Purpose](#purpose)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Open-Source Dependencies](#open-source-dependencies)
- [External Resources](#external-resources)
- [Development](#development)
- [Legal Warning](#legal-warning)
- [License](#license)

## Purpose

BootGenie simplifies the bootloader unlocking process for Android devices, particularly Chinese brands, by automating device detection and providing clear, device-specific guidance. It integrates with ADB/Fastboot tools and supports multi-language interfaces (English, Chinese).

## Features

- **Device Detection**: Detects connected Android devices via ADB/Fastboot.
- **Step-by-Step Guidance**: Instructions for USB debugging, OEM unlock, and device-specific unlock processes.
- **ADB/Fastboot Integration**: Executes commands like `fastboot oem unlock` safely.
- **Multi-Language Support**: English and Chinese (Simplified).
- **Safe-Mode Checks**: Warns users of risks (data wipe, warranty void) before critical actions.
- **Log Export**: Saves device info and command logs as .txt or .json.
- **Optional**: Desktop support via Electron, automatic bootloader state detection, and fetching latest unlock methods via GitHub API.

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- Android SDK with ADB/Fastboot tools
- USB drivers for your device (Windows only)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/username/BootGenie.git
   cd BootGenie
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up ADB/Fastboot tools:
   - **Windows**: Use `tools/win/adb.exe` and `tools/win/fastboot.exe`.
   - **macOS**: Use `tools/mac/adb` and `tools/mac/fastboot`.
   - **Linux**: Use `tools/linux/adb` and `tools/linux/fastboot`.
   - Alternatively, install platform-tools: https://developer.android.com/tools/releases/platform-tools

4. Run the app:
   ```bash
   npm run dev
   ```

## Usage

1. Connect your Android device via USB.
2. Enable USB Debugging and OEM Unlock in Android Developer Options.
3. Open BootGenie and follow the on-screen wizard.
4. Confirm all warnings before executing unlock commands.
5. Export logs via the app's export feature for troubleshooting.

## Open-Source Dependencies

| Dependency | Purpose | License | Repository |
|------------|---------|---------|------------|
| react-native-fs | File system access | MIT | https://github.com/itinance/react-native-fs |
| i18next | Multi-language support | MIT | https://github.com/i18next/i18next |
| react-navigation | Navigation | MIT | https://github.com/react-navigation/react-navigation |

## External Resources

### Device-Specific Unlock Guides

- **Xiaomi**:
  - Official Unlock Portal: https://en.miui.com/unlock/
  - Community Tool: https://github.com/MlgmXyysd/xiaomi-hyperos-bootloader-unlock

- **Huawei**:
  - XDA Developers Guide: https://xdaforums.com/c/huawei.66/
  - Note: Huawei discontinued official unlocking; use community methods cautiously.

- **Oppo/Vivo**:
  - XDA Developers Forum: https://xdaforums.com/c/oppo.10883/, https://xdaforums.com/c/vivo.12365/
  - Follow manufacturer portals for official methods.

- **General Resources**:
  - XDA Developers Android Development: https://xdaforums.com/c/android-development.564/
  - Android Platform Tools: https://developer.android.com/tools/releases/platform-tools

### Community Forums

- XDA Developers: https://xdaforums.com
- MIUI Forum: https://c.mi.com

## Development

### Project Structure

```
BootGenie/
├── src/                # React Native source code
├── assets/             # App assets (icons, images)
├── .expo/              # Expo configuration
├── README.md           # Documentation
└── package.json        # Dependencies
```

### Build

```bash
npm run build-android
```

### Test

```bash
npm test
```

## Legal Warning

Unlocking your device's bootloader may:

- Void your warranty.
- Wipe all data on the device.
- Potentially brick your device.

Use BootGenie at your own risk. Follow manufacturer guidelines and back up data before proceeding. BootGenie does not distribute proprietary tools or unlock codes.

## License

MIT License. See LICENSE for details.

## Notes for AI-Assisted Development

- **Parsing Instructions**: This README uses Markdown with structured headings and tables for machine readability.
- **Dependency Integration**: Use package.json for dependency versions; install via `npm install`.
- **Error Handling**: Implement try-catch blocks for USB/ADB errors; log to AsyncStorage.
- **Extensibility**: Add new device unlock guides by updating `src/services/UnlockGuideService.ts`.