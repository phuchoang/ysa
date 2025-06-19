# BootGenie

BootGenie is a cross-platform mobile app built with React Native to guide users in unlocking the bootloader of Chinese smartphones (e.g., Xiaomi, Huawei, Oppo, Vivo). It provides device detection, step-by-step instructions, and safe execution of ADB/Fastboot commands.

## 🌐 Live Demo

**Try BootGenie now in your browser:** [https://bootgenie--f0ilwe8gho.expo.app](https://bootgenie--f0ilwe8gho.expo.app)

- ✅ **Instant access** - No installation required
- ✅ **Full functionality** - Device detection, guides, and troubleshooting
- ✅ **Cross-platform** - Works on desktop, tablet, and mobile browsers
- ✅ **Always up-to-date** - Latest features and fixes

## 🎯 Can BootGenie unlock Redmi Turbo 4 Pro?

**Yes! BootGenie has optimized support for the Redmi Turbo 4 Pro** with:

- ✅ **Device-specific unlock instructions** tailored for Turbo 4 Pro
- ✅ **HyperOS compatibility** checks and guidance
- ✅ **Mi Account integration** with waiting period notifications
- ✅ **Latest Mi Unlock Tool** compatibility verification
- ✅ **Step-by-step guidance** through the entire process

**Important Notes for Redmi Turbo 4 Pro:**
- May require 7-30 day waiting period after binding to Mi Account
- HyperOS may have additional security measures
- Always use the latest Mi Unlock Tool version
- Process will completely wipe your device data

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

- **Device Detection**: Detects connected Android devices via ADB/Fastboot, including **Redmi Turbo 4 Pro**.
- **Step-by-Step Guidance**: Instructions for USB debugging, OEM unlock, and device-specific unlock processes.
- **Redmi Turbo 4 Pro Optimized**: Special unlock sequence with HyperOS compatibility checks.
- **ADB/Fastboot Integration**: Executes commands like `fastboot oem unlock` safely.
- **Multi-Language Support**: English and Chinese (Simplified).
- **Safe-Mode Checks**: Warns users of risks (data wipe, warranty void) before critical actions.
- **Log Export**: Saves device info and command logs as .txt or .json.
- **Mi Account Integration**: Handles Xiaomi's unlock permission system and waiting periods.

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

MIT License - see LICENSE file for details.

---

## 🚀 Quick Start

**Want to get started immediately?**

1. **Web App**: [https://bootgenie--f0ilwe8gho.expo.app](https://bootgenie--f0ilwe8gho.expo.app) - No installation needed!
2. **Mobile**: Download from app stores (coming soon)
3. **Development**: Clone this repo and follow the installation instructions above

**Questions or Issues?** Open an issue on GitHub or check our troubleshooting guide in the app.

MIT License. See LICENSE for details.

## Notes for AI-Assisted Development

- **Parsing Instructions**: This README uses Markdown with structured headings and tables for machine readability.
- **Dependency Integration**: Use package.json for dependency versions; install via `npm install`.
- **Error Handling**: Implement try-catch blocks for USB/ADB errors; log to AsyncStorage.
- **Extensibility**: Add new device unlock guides by updating `src/services/UnlockGuideService.ts`.