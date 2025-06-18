import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  Smartphone, 
  Usb, 
  Settings, 
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Wifi,
  Shield
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { DeviceService } from '@/services/DeviceService';
import { LogService } from '@/services/LogService';

interface DetectedDevice {
  id: string;
  model: string;
  brand: string;
  manufacturer: string;
  bootloaderStatus?: 'locked' | 'unlocked' | 'unknown';
}

export default function DetectScreen() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [device, setDevice] = useState<DetectedDevice | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const setupSteps = [
    {
      icon: <Usb size={24} color="#3b82f6" />,
      title: 'Connect Device',
      description: 'Connect your Android device via USB cable',
      completed: false,
    },
    {
      icon: <Settings size={24} color="#3b82f6" />,
      title: 'Enable USB Debugging',
      description: 'Go to Settings > Developer Options > USB Debugging',
      completed: false,
    },
    {
      icon: <Shield size={24} color="#3b82f6" />,
      title: 'Enable OEM Unlock',
      description: 'Go to Settings > Developer Options > OEM Unlocking',
      completed: false,
    },
  ];

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const detectDevice = async () => {
    setIsDetecting(true);
    setDevice(null);
    triggerHaptic();
    
    try {
      LogService.addLog('Starting device detection...');
      const detectedDevice = await DeviceService.detectDevice();
      
      if (detectedDevice) {
        setDevice(detectedDevice);
        LogService.addLog(`Device detected: ${detectedDevice.brand} ${detectedDevice.model}`);
        triggerHaptic();
      } else {
        LogService.addLog('No device detected');
      }
    } catch (error) {
      LogService.addLog(`Detection error: ${error}`);
      Alert.alert('Detection Error', 'Failed to detect device. Please check USB connection and try again.');
    } finally {
      setIsDetecting(false);
    }
  };

  const showWarningAndContinue = () => {
    Alert.alert(
      'Warning: Bootloader Unlock',
      'Unlocking your bootloader will:\n\n• Void your warranty\n• Wipe all data on your device\n• Potentially brick your device\n\nProceed only if you understand the risks.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'I Understand',
          style: 'destructive',
          onPress: () => {
            router.push({
              pathname: '/guide',
              params: { 
                deviceBrand: device?.brand,
                deviceModel: device?.model,
                deviceId: device?.id
              }
            });
          },
        },
      ]
    );
  };

  useEffect(() => {
    // Auto-detect on mount
    detectDevice();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#3b82f6', '#1d4ed8']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Device Detection</Text>
          <Text style={styles.headerSubtitle}>
            Let's detect your Android device and prepare for bootloader unlocking
          </Text>
        </LinearGradient>

        {/* Setup Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Setup Instructions</Text>
          {setupSteps.map((step, index) => (
            <View key={index} style={styles.instructionCard}>
              <View style={styles.instructionIcon}>
                {step.icon}
              </View>
              <View style={styles.instructionContent}>
                <Text style={styles.instructionTitle}>{step.title}</Text>
                <Text style={styles.instructionDescription}>{step.description}</Text>
              </View>
              <View style={styles.instructionStatus}>
                {step.completed ? (
                  <CheckCircle size={20} color="#10b981" />
                ) : (
                  <View style={styles.pendingDot} />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Detection Section */}
        <View style={styles.detectionSection}>
          <Text style={styles.sectionTitle}>Device Detection</Text>
          
          {isDetecting ? (
            <View style={styles.detectingCard}>
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text style={styles.detectingText}>Scanning for devices...</Text>
              <Text style={styles.detectingSubtext}>
                Make sure your device is connected and USB debugging is enabled
              </Text>
            </View>
          ) : device ? (
            <View style={styles.deviceFoundCard}>
              <View style={styles.deviceFoundHeader}>
                <CheckCircle size={32} color="#10b981" />
                <Text style={styles.deviceFoundTitle}>Device Found!</Text>
              </View>
              
              <View style={styles.deviceInfo}>
                <View style={styles.deviceInfoRow}>
                  <Text style={styles.deviceInfoLabel}>Brand:</Text>
                  <Text style={styles.deviceInfoValue}>{device.brand}</Text>
                </View>
                <View style={styles.deviceInfoRow}>
                  <Text style={styles.deviceInfoLabel}>Model:</Text>
                  <Text style={styles.deviceInfoValue}>{device.model}</Text>
                </View>
                <View style={styles.deviceInfoRow}>
                  <Text style={styles.deviceInfoLabel}>Status:</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>
                      {device.bootloaderStatus === 'unlocked' ? 'Unlocked' : 'Locked'}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.continueButton}
                onPress={showWarningAndContinue}
              >
                <Text style={styles.continueButtonText}>Continue to Guide</Text>
                <ArrowRight size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.noDeviceCard}>
              <AlertCircle size={48} color="#ef4444" />
              <Text style={styles.noDeviceTitle}>No Device Detected</Text>
              <Text style={styles.noDeviceText}>
                Please ensure your device is connected via USB and USB debugging is enabled
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.retryButton}
            onPress={detectDevice}
            disabled={isDetecting}
          >
            <RefreshCw size={20} color="#3b82f6" />
            <Text style={styles.retryButtonText}>
              {isDetecting ? 'Detecting...' : 'Retry Detection'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Troubleshooting Tips</Text>
          
          <View style={styles.tipCard}>
            <Wifi size={20} color="#f59e0b" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Device Not Detected?</Text>
              <Text style={styles.tipText}>
                • Try a different USB cable\n• Enable Developer Options\n• Install device drivers (Windows)
              </Text>
            </View>
          </View>

          <View style={styles.tipCard}>
            <Settings size={20} color="#8b5cf6" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Enable Developer Options</Text>
              <Text style={styles.tipText}>
                Go to Settings > About Phone and tap "Build Number" 7 times
              </Text>
            </View>
          </View>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#dbeafe',
    lineHeight: 24,
  },
  instructionsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  instructionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  instructionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  instructionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  instructionStatus: {
    marginLeft: 12,
  },
  pendingDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e2e8f0',
  },
  detectionSection: {
    padding: 20,
  },
  detectingCard: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  detectingText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  detectingSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  deviceFoundCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  deviceFoundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  deviceFoundTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk-SemiBold',
    color: '#10b981',
    marginLeft: 12,
  },
  deviceInfo: {
    marginBottom: 24,
  },
  deviceInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  deviceInfoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  deviceInfoValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  statusBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#92400e',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  noDeviceCard: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  noDeviceTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
    marginTop: 16,
    marginBottom: 8,
  },
  noDeviceText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#3b82f6',
  },
  tipsSection: {
    padding: 20,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 18,
  },
});