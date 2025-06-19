export interface TroubleshootingIssue {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  solutions: string[];
  severity: 'low' | 'medium' | 'high';
  deviceSpecific?: string[];
}

export class TroubleshootingService {
  static getCommonIssues(deviceModel?: string): TroubleshootingIssue[] {
    const commonIssues = this.getGeneralIssues();
    
    if (deviceModel?.toLowerCase().includes('turbo 4 pro')) {
      return [...commonIssues, ...this.getRedmiTurbo4ProIssues()];
    }
    
    return commonIssues;
  }

  private static getGeneralIssues(): TroubleshootingIssue[] {
    return [
      {
        id: 'device_not_detected',
        title: 'Device Not Detected',
        description: 'ADB/Fastboot cannot detect the connected device.',
        symptoms: [
          'Device not showing in "adb devices" or "fastboot devices"',
          'USB connection not recognized',
          'Computer shows unknown device',
        ],
        solutions: [
          'Install proper USB drivers for your device',
          'Try different USB cable or port',
          'Enable USB Debugging in Developer Options',
          'Revoke USB debugging authorizations and reconnect',
          'Try different computer or USB port',
        ],
        severity: 'high',
      },
      {
        id: 'waiting_period_not_complete',
        title: 'Waiting Period Not Complete',
        description: 'Xiaomi enforces a waiting period before allowing bootloader unlock.',
        symptoms: [
          'Mi Unlock Tool shows "This device is locked"',
          'Error message about waiting period',
          'Cannot proceed in Mi Unlock Tool',
        ],
        solutions: [
          'Wait for the full mandatory period (7-30 days)',
          'Check Mi Unlock status in Developer Options',
          'Ensure the same Mi Account is used consistently',
          'Do not factory reset during waiting period',
        ],
        severity: 'medium',
      },
      {
        id: 'account_mismatch',
        title: 'Mi Account Mismatch',
        description: 'The Mi Account on device differs from the one in Mi Unlock Tool.',
        symptoms: [
          'Authentication failed in Mi Unlock Tool',
          'Account verification errors',
          'Tool cannot verify device ownership',
        ],
        solutions: [
          'Ensure same Mi Account is logged in on device and computer',
          'Log out and log back in on both device and tool',
          'Verify account in Developer Options > Mi Unlock status',
          'Clear Mi Unlock Tool data and re-login',
        ],
        severity: 'high',
      },
      {
        id: 'fastboot_mode_issues',
        title: 'Cannot Enter Fastboot Mode',
        description: 'Device fails to enter or stay in fastboot mode.',
        symptoms: [
          'Device boots normally instead of fastboot',
          'Fastboot mode exits immediately',
          'Black screen when trying to enter fastboot',
        ],
        solutions: [
          'Hold Volume Down + Power for 10+ seconds',
          'Try Volume Up + Power combination for some devices',
          'Use "adb reboot bootloader" command',
          'Disconnect and reconnect USB cable',
          'Try without battery if removable',
        ],
        severity: 'high',
      },
    ];
  }

  private static getRedmiTurbo4ProIssues(): TroubleshootingIssue[] {
    return [
      {
        id: 'hyperos_restrictions',
        title: 'HyperOS Bootloader Restrictions',
        description: 'HyperOS may have additional security measures preventing unlock.',
        symptoms: [
          'Mi Unlock Tool fails with HyperOS devices',
          'Unlock process stuck or fails silently',
          'Error messages about unsupported system',
        ],
        solutions: [
          'Ensure Mi Unlock Tool version 6.5.406 or newer',
          'Check if your HyperOS version supports unlocking',
          'Try downgrading to MIUI if possible (advanced users)',
          'Wait for updated Mi Unlock Tool version',
          'Check community forums for HyperOS-specific tools',
        ],
        severity: 'high',
        deviceSpecific: ['Redmi Turbo 4 Pro'],
      },
      {
        id: 'regional_variant_issues',
        title: 'Regional Variant Restrictions',
        description: 'Some regional variants of Turbo 4 Pro may have unlock restrictions.',
        symptoms: [
          'Unlock fails despite completing all steps',
          'Mi Account not accepted for unlock',
          'Region-specific error messages',
        ],
        solutions: [
          'Check if your region supports bootloader unlocking',
          'Verify device model number and variant',
          'Try using VPN to China region when using Mi Unlock Tool',
          'Contact Xiaomi support for region-specific guidance',
          'Consider flashing Global ROM if on Chinese variant',
        ],
        severity: 'medium',
        deviceSpecific: ['Redmi Turbo 4 Pro'],
      },
      {
        id: 'turbo4pro_driver_issues',
        title: 'Turbo 4 Pro USB Driver Issues',
        description: 'Windows may not recognize Turbo 4 Pro in fastboot mode properly.',
        symptoms: [
          'Device Manager shows unknown device',
          'Fastboot commands fail with device errors',
          'Mi Unlock Tool cannot detect device',
        ],
        solutions: [
          'Install latest Xiaomi USB drivers',
          'Use Device Manager to manually install drivers',
          'Try Google USB drivers or universal ADB drivers',
          'Use Linux or macOS if Windows drivers fail',
          'Install Mi Flash tool for additional drivers',
        ],
        severity: 'medium',
        deviceSpecific: ['Redmi Turbo 4 Pro'],
      },
      {
        id: 'turbo4pro_bootloader_policy',
        title: 'Turbo 4 Pro Specific Bootloader Policy',
        description: 'Newer policy changes affecting Turbo 4 Pro bootloader unlock.',
        symptoms: [
          'Unlock suddenly stopped working',
          'Policy violation errors',
          'Account restrictions on new devices',
        ],
        solutions: [
          'Check latest Xiaomi bootloader unlock policy',
          'Verify device purchase date and warranty status',
          'Try different Mi Account with older registration',
          'Wait for policy updates from Xiaomi',
          'Consider community unlock methods (advanced)',
        ],
        severity: 'high',
        deviceSpecific: ['Redmi Turbo 4 Pro'],
      },
    ];
  }

  static getDiagnosticSteps(deviceModel?: string): string[] {
    const baseSteps = [
      'Check if device is detected: adb devices',
      'Verify USB debugging is enabled',
      'Test fastboot mode: adb reboot bootloader',
      'Check fastboot detection: fastboot devices',
      'Verify bootloader status: fastboot getvar unlocked',
      'Check Mi Account in Developer Options',
      'Verify Mi Unlock Tool version',
    ];

    if (deviceModel?.toLowerCase().includes('turbo 4 pro')) {
      return [
        ...baseSteps,
        'Check HyperOS version and compatibility',
        'Verify regional variant and restrictions',
        'Test with latest Xiaomi USB drivers',
        'Check waiting period status in Mi Unlock Tool',
      ];
    }

    return baseSteps;
  }

  static getEmergencyContacts(): { name: string; url: string; description: string }[] {
    return [
      {
        name: 'XDA Developers Xiaomi Forum',
        url: 'https://xdaforums.com/c/xiaomi.66/',
        description: 'Community support for Xiaomi devices',
      },
      {
        name: 'MIUI Official Forum',
        url: 'https://c.mi.com/',
        description: 'Official Xiaomi community support',
      },
      {
        name: 'Xiaomi Support',
        url: 'https://www.mi.com/global/support/',
        description: 'Official Xiaomi customer support',
      },
      {
        name: 'r/Xiaomi Reddit',
        url: 'https://reddit.com/r/Xiaomi',
        description: 'Reddit community for Xiaomi users',
      },
    ];
  }
}
