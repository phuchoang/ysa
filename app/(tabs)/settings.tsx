import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings as SettingsIcon,
  Globe,
  ExternalLink,
  Info,
  Shield,
  Users,
  BookOpen,
  Github,
  MessageCircle,
  ChevronRight
} from 'lucide-react-native';

export default function SettingsScreen() {
  const handleLanguageChange = () => {
    Alert.alert(
      'Language Settings',
      'Select your preferred language',
      [
        { text: 'English', onPress: () => {} },
        { text: '中文 (Chinese)', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openExternalLink = async (url: string, title: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open ${title}`);
      }
    } catch (error) {
      Alert.alert('Error', `Failed to open ${title}`);
    }
  };

  const showAbout = () => {
    Alert.alert(
      'About BootGenie',
      'BootGenie v1.0.0\n\nA comprehensive guide for safely unlocking Android bootloaders.\n\nDeveloped with ❤️ for the Android community.\n\nOpen source project available on GitHub.',
      [{ text: 'OK' }]
    );
  };

  const settingSections = [
    {
      title: 'General',
      items: [
        {
          icon: <Globe size={20} color="#3b82f6" />,
          title: 'Language',
          subtitle: 'English',
          onPress: handleLanguageChange,
        },
      ],
    },
    {
      title: 'Resources',
      items: [
        {
          icon: <Users size={20} color="#10b981" />,
          title: 'XDA Developers',
          subtitle: 'Community forum and guides',
          onPress: () => openExternalLink('https://xdaforums.com', 'XDA Developers'),
        },
        {
          icon: <BookOpen size={20} color="#f59e0b" />,
          title: 'Xiaomi Unlock',
          subtitle: 'Official unlock portal',
          onPress: () => openExternalLink('https://en.miui.com/unlock/', 'Xiaomi Unlock'),
        },
        {
          icon: <Github size={20} color="#6b7280" />,
          title: 'Platform Tools',
          subtitle: 'Download ADB/Fastboot',
          onPress: () => openExternalLink('https://developer.android.com/tools/releases/platform-tools', 'Platform Tools'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: <MessageCircle size={20} color="#8b5cf6" />,
          title: 'Community Support',
          subtitle: 'Get help from the community',
          onPress: () => openExternalLink('https://xdaforums.com', 'Community Support'),
        },
        {
          icon: <Github size={20} color="#1f2937" />,
          title: 'Source Code',
          subtitle: 'View on GitHub',
          onPress: () => openExternalLink('https://github.com', 'GitHub Repository'),
        },
      ],
    },
    {
      title: 'App',
      items: [
        {
          icon: <Info size={20} color="#3b82f6" />,
          title: 'About',
          subtitle: 'Version 1.0.0',
          onPress: showAbout,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#64748b', '#475569']}
          style={styles.header}
        >
          <SettingsIcon size={32} color="#ffffff" />
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>
            Customize your BootGenie experience
          </Text>
        </LinearGradient>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1 && styles.lastItem,
                  ]}
                  onPress={item.onPress}
                >
                  <View style={styles.settingIcon}>
                    {item.icon}
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  <ChevronRight size={16} color="#94a3b8" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Warning Section */}
        <View style={styles.warningSection}>
          <View style={styles.warningHeader}>
            <Shield size={24} color="#f59e0b" />
            <Text style={styles.warningTitle}>Important Notice</Text>
          </View>
          <Text style={styles.warningText}>
            BootGenie is provided as-is for educational purposes. Unlocking your bootloader may:
          </Text>
          <View style={styles.warningList}>
            <Text style={styles.warningListItem}>• Void your device warranty</Text>
            <Text style={styles.warningListItem}>• Wipe all data on your device</Text>
            <Text style={styles.warningListItem}>• Potentially brick your device</Text>
            <Text style={styles.warningListItem}>• Compromise device security</Text>
          </View>
          <Text style={styles.warningFooter}>
            Always backup your data and proceed with caution. Use at your own risk.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ for the Android community
          </Text>
          <Text style={styles.footerVersion}>BootGenie v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#cbd5e1',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  warningSection: {
    margin: 20,
    backgroundColor: '#fef3c7',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  warningTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400e',
    marginLeft: 8,
  },
  warningText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400e',
    lineHeight: 20,
    marginBottom: 12,
  },
  warningList: {
    marginBottom: 12,
  },
  warningListItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400e',
    lineHeight: 20,
    marginBottom: 4,
  },
  warningFooter: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#92400e',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
  },
});