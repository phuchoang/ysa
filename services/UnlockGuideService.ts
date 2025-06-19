interface UnlockStep {
  id: number;
  title: string;
  description: string;
  command?: string;
  isCommand?: boolean;
  warning?: string;
  externalLink?: string;
}

export class UnlockGuideService {
  static getUnlockSteps(brand: string, model?: string): UnlockStep[] {
    switch (brand.toLowerCase()) {
      case 'xiaomi':
        return this.getXiaomiSteps(model);
      case 'huawei':
        return this.getHuaweiSteps();
      case 'oppo':
        return this.getOppoSteps();
      case 'vivo':
        return this.getVivoSteps();
      case 'oneplus':
        return this.getOnePlusSteps();
      case 'samsung':
        return this.getSamsungSteps();
      default:
        return this.getGenericSteps();
    }
  }

  private static getXiaomiSteps(model?: string): UnlockStep[] {
    // Check if this is Redmi Turbo 4 Pro for specific instructions
    if (model && model.toLowerCase().includes('turbo 4 pro')) {
      return this.getRedmiTurbo4ProSteps();
    }
    
    // Default Xiaomi unlock steps
    return [
      {
        id: 1,
        title: 'Create Mi Account',
        description: 'Create a Mi account and sign in on your device. Go to Settings > Mi Account and log in with your credentials.',
      },
      {
        id: 2,
        title: 'Enable Developer Options',
        description: 'Navigate to Settings > About phone and tap "MIUI version" 7 times to unlock Developer Options.',
      },
      {
        id: 3,
        title: 'Enable USB Debugging & OEM Unlock',
        description: 'Go to Settings > Additional settings > Developer options. Enable both "USB debugging" and "OEM unlocking".',
      },
      {
        id: 4,
        title: 'Add Device to Mi Account',
        description: 'In Developer options, find "Mi Unlock status" and add this device to your Mi account for unlock permission.',
        warning: 'You may need to wait 7-30 days before unlocking is allowed by Xiaomi.',
      },
      {
        id: 5,
        title: 'Download Mi Unlock Tool',
        description: 'Download the official Mi Unlock Tool from Xiaomi\'s website and install it on your computer.',
        externalLink: 'https://en.miui.com/unlock/',
      },
      {
        id: 6,
        title: 'Boot to Fastboot Mode',
        description: 'Power off your device completely, then hold Volume Down + Power button simultaneously to enter Fastboot mode.',
        command: 'adb reboot bootloader',
        isCommand: true,
      },
      {
        id: 7,
        title: 'Unlock Bootloader',
        description: 'Connect your device to computer and use the Mi Unlock Tool to unlock the bootloader.',
        warning: 'This will completely wipe all data on your device! Make sure you have backups.',
      },
    ];
  }

  private static getRedmiTurbo4ProSteps(): UnlockStep[] {
    return [
      {
        id: 1,
        title: 'Create Mi Account',
        description: 'Create a Mi account and sign in on your Redmi Turbo 4 Pro. Go to Settings > Mi Account and log in with your credentials.',
      },
      {
        id: 2,
        title: 'Enable Developer Options',
        description: 'Navigate to Settings > About phone and tap "MIUI version" 7 times to unlock Developer Options.',
      },
      {
        id: 3,
        title: 'Enable USB Debugging & OEM Unlock',
        description: 'Go to Settings > Additional settings > Developer options. Enable both "USB debugging" and "OEM unlocking".',
      },
      {
        id: 4,
        title: 'Add Device to Mi Account (Turbo 4 Pro)',
        description: 'In Developer options, find "Mi Unlock status" and add this device to your Mi account. For Turbo 4 Pro, you may need to verify your identity.',
        warning: 'Redmi Turbo 4 Pro may require 7-30 days waiting period before unlocking is allowed by Xiaomi.',
      },
      {
        id: 5,
        title: 'Check HyperOS Version',
        description: 'Redmi Turbo 4 Pro runs HyperOS. Go to Settings > About phone and check your HyperOS version. Some versions may have additional restrictions.',
        warning: 'HyperOS 1.0.x may have stricter bootloader policies than MIUI. Ensure your version supports unlocking.',
      },
      {
        id: 6,
        title: 'Verify Device Support',
        description: 'Check if your specific Redmi Turbo 4 Pro variant (Global/CN/IN) supports bootloader unlocking. Some regional variants may be restricted.',
        warning: 'Chinese variants may have different unlock policies than Global variants.',
      },
      {
        id: 7,
        title: 'Download Mi Unlock Tool (Latest Version)',
        description: 'Download the latest Mi Unlock Tool from Xiaomi\'s website. Ensure you have version 6.5.406 or newer for HyperOS compatibility.',
        externalLink: 'https://en.miui.com/unlock/',
      },
      {
        id: 8,
        title: 'Check Waiting Period Status',
        description: 'In Mi Unlock Tool, check if your device has completed the mandatory waiting period. Turbo 4 Pro may require up to 30 days.',
        warning: 'Cannot proceed until waiting period is complete. This is enforced by Xiaomi servers.',
      },
      {
        id: 9,
        title: 'Boot to Fastboot Mode',
        description: 'Power off your Redmi Turbo 4 Pro completely, then hold Volume Down + Power button simultaneously to enter Fastboot mode.',
        command: 'adb reboot bootloader',
        isCommand: true,
      },
      {
        id: 10,
        title: 'Verify Device in Fastboot',
        description: 'Ensure your device is properly detected in fastboot mode before proceeding.',
        command: 'fastboot devices',
        isCommand: true,
      },
      {
        id: 11,
        title: 'Check Bootloader Status',
        description: 'Verify current bootloader status before attempting unlock.',
        command: 'fastboot getvar unlocked',
        isCommand: true,
      },
      {
        id: 12,
        title: 'Unlock Bootloader with Mi Unlock Tool',
        description: 'Connect your Redmi Turbo 4 Pro to computer and use the Mi Unlock Tool to unlock the bootloader. The tool will verify your Mi Account and device eligibility.',
        warning: 'This will completely wipe all data on your device! Make sure you have backups. The process may take several minutes.',
      },
      {
        id: 13,
        title: 'Troubleshoot Common Issues',
        description: 'If unlock fails, check: 1) Mi Account is logged in on device, 2) Waiting period completed, 3) USB drivers installed, 4) Device in fastboot mode.',
        warning: 'Common error: "This device is locked" means waiting period not complete or account mismatch.',
      },
      {
        id: 14,
        title: 'Verify Unlock Success',
        description: 'After unlocking, verify the bootloader status to ensure the process was successful.',
        command: 'fastboot getvar unlocked',
        isCommand: true,
      },
    ];
  }

  private static getHuaweiSteps(): UnlockStep[] {
    return [
      {
        id: 1,
        title: 'Check Device Compatibility',
        description: 'Important: Huawei stopped providing official unlock codes in May 2018. This process may not work on newer devices.',
        warning: 'Huawei discontinued official bootloader unlocking. Community methods may be risky.',
      },
      {
        id: 2,
        title: 'Enable Developer Options',
        description: 'Go to Settings > About phone and tap "Build number" 7 times to enable Developer Options.',
      },
      {
        id: 3,
        title: 'Enable USB Debugging & OEM Unlock',
        description: 'Navigate to Settings > System > Developer options. Enable "USB debugging" and "OEM unlocking".',
      },
      {
        id: 4,
        title: 'Get Device Information',
        description: 'Collect your device\'s serial number, IMEI, and product ID for unlock code generation.',
        command: 'fastboot getvar serialno',
        isCommand: true,
      },
      {
        id: 5,
        title: 'Community Unlock Methods',
        description: 'Check XDA Developers forum for community-developed unlock methods specific to your Huawei model.',
        warning: 'Use community methods at your own risk. Success is not guaranteed.',
        externalLink: 'https://xdaforums.com/c/huawei.66/',
      },
    ];
  }

  private static getOppoSteps(): UnlockStep[] {
    return [
      {
        id: 1,
        title: 'Enable Developer Options',
        description: 'Go to Settings > About phone and tap "Version" or "Build number" 7 times to unlock Developer Options.',
      },
      {
        id: 2,
        title: 'Enable USB Debugging & OEM Unlock',
        description: 'Navigate to Settings > Additional settings > Developer options. Enable "USB debugging" and "OEM unlocking".',
      },
      {
        id: 3,
        title: 'Apply for Deep Testing',
        description: 'Apply for Oppo\'s Deep Testing program through their official website to get bootloader unlock permission.',
        warning: 'Official unlock may not be available for all Oppo models.',
        externalLink: 'https://www.oppo.com/en/community/',
      },
      {
        id: 4,
        title: 'Boot to Fastboot Mode',
        description: 'Power off your device, then hold Volume Down + Power button to enter Fastboot mode.',
        command: 'adb reboot bootloader',
        isCommand: true,
      },
      {
        id: 5,
        title: 'Attempt Standard Unlock',
        description: 'Try the standard fastboot unlock command. This may require official permission from Oppo.',
        command: 'fastboot oem unlock',
        isCommand: true,
        warning: 'This command may not work without official Deep Testing approval.',
      },
    ];
  }

  private static getVivoSteps(): UnlockStep[] {
    return [
      {
        id: 1,
        title: 'Enable Developer Options',
        description: 'Go to Settings > About phone and tap "Software version" 7 times to unlock Developer Options.',
      },
      {
        id: 2,
        title: 'Enable USB Debugging & OEM Unlock',
        description: 'Navigate to Settings > Additional settings > Developer options. Enable "USB debugging" and "OEM unlocking".',
      },
      {
        id: 3,
        title: 'Check Official Support',
        description: 'Vivo doesn\'t officially support bootloader unlocking for most devices. Check if your model has any official method.',
        warning: 'Most Vivo devices do not have official unlock methods.',
      },
      {
        id: 4,
        title: 'Community Methods',
        description: 'Search XDA Developers forum for device-specific unlock methods developed by the community.',
        warning: 'Community methods are device-specific and may be risky.',
        externalLink: 'https://xdaforums.com/c/vivo.12365/',
      },
    ];
  }

  private static getOnePlusSteps(): UnlockStep[] {
    return [
      {
        id: 1,
        title: 'Enable Developer Options',
        description: 'Go to Settings > About phone and tap "Build number" 7 times to enable Developer Options.',
      },
      {
        id: 2,
        title: 'Enable USB Debugging & OEM Unlock',
        description: 'Navigate to Settings > System > Developer options. Enable "USB debugging" and "OEM unlocking".',
      },
      {
        id: 3,
        title: 'Boot to Fastboot Mode',
        description: 'Power off your device, then hold Volume Up + Power button to enter Fastboot mode.',
        command: 'adb reboot bootloader',
        isCommand: true,
      },
      {
        id: 4,
        title: 'Unlock Bootloader',
        description: 'OnePlus devices typically support standard fastboot unlock commands.',
        command: 'fastboot oem unlock',
        isCommand: true,
        warning: 'This will wipe all data on your device.',
      },
      {
        id: 5,
        title: 'Confirm Unlock',
        description: 'Follow the on-screen prompts on your device to confirm the bootloader unlock.',
        warning: 'Make sure you understand the risks before confirming.',
      },
    ];
  }

  private static getSamsungSteps(): UnlockStep[] {
    return [
      {
        id: 1,
        title: 'Check Knox Status',
        description: 'Samsung devices use Knox security. Unlocking will permanently trip Knox and void warranty.',
        warning: 'Unlocking Samsung bootloader will permanently trip Knox warranty bit.',
      },
      {
        id: 2,
        title: 'Enable Developer Options',
        description: 'Go to Settings > About phone and tap "Build number" 7 times.',
      },
      {
        id: 3,
        title: 'Enable OEM Unlock',
        description: 'In Developer options, enable "OEM unlocking". You may need to wait 7 days.',
        warning: 'Samsung enforces a 7-day waiting period for new devices.',
      },
      {
        id: 4,
        title: 'Boot to Download Mode',
        description: 'Power off device, then hold Volume Down + Power + Home (or Bixby) button.',
      },
      {
        id: 5,
        title: 'Use Odin or Heimdall',
        description: 'Samsung devices require special tools like Odin (Windows) or Heimdall (cross-platform) for bootloader operations.',
        externalLink: 'https://xdaforums.com/c/samsung.66/',
      },
    ];
  }

  private static getGenericSteps(): UnlockStep[] {
    return [
      {
        id: 1,
        title: 'Enable Developer Options',
        description: 'Go to Settings > About phone and tap "Build number" 7 times to unlock Developer Options.',
      },
      {
        id: 2,
        title: 'Enable USB Debugging & OEM Unlock',
        description: 'Navigate to Settings > Developer options. Enable both "USB debugging" and "OEM unlocking".',
      },
      {
        id: 3,
        title: 'Install ADB and Fastboot',
        description: 'Download and install Android Platform Tools on your computer for ADB and Fastboot commands.',
        externalLink: 'https://developer.android.com/tools/releases/platform-tools',
      },
      {
        id: 4,
        title: 'Boot to Fastboot Mode',
        description: 'Power off your device, then hold Volume Down + Power button to enter Fastboot mode.',
        command: 'adb reboot bootloader',
        isCommand: true,
      },
      {
        id: 5,
        title: 'Attempt Standard Unlock',
        description: 'Try the standard fastboot unlock command. Success depends on manufacturer support.',
        command: 'fastboot oem unlock',
        isCommand: true,
        warning: 'This may not work for all devices. Check manufacturer-specific methods.',
      },
      {
        id: 6,
        title: 'Alternative Commands',
        description: 'If the standard command fails, try alternative unlock commands.',
        command: 'fastboot flashing unlock',
        isCommand: true,
      },
    ];
  }
}