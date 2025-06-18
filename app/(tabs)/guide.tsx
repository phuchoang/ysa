import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { 
  ChevronLeft,
  ChevronRight,
  Play,
  AlertTriangle,
  CheckCircle,
  Terminal,
  Copy,
  ExternalLink
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { UnlockGuideService } from '@/services/UnlockGuideService';
import { LogService } from '@/services/LogService';

interface UnlockStep {
  id: number;
  title: string;
  description: string;
  command?: string;
  isCommand?: boolean;
  warning?: string;
  externalLink?: string;
}

export default function GuideScreen() {
  const params = useLocalSearchParams();
  const { deviceBrand = 'generic', deviceModel = 'Unknown' } = params;
  
  const [steps, setSteps] = useState<UnlockStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    triggerHaptic();
    Alert.alert('Copied', 'Command copied to clipboard');
  };

  useEffect(() => {
    const unlockSteps = UnlockGuideService.getUnlockSteps(deviceBrand.toString().toLowerCase());
    setSteps(unlockSteps);
    LogService.addLog(`Started unlock guide for ${deviceBrand} ${deviceModel}`);
  }, [deviceBrand, deviceModel]);

  const executeCommand = async (command: string) => {
    try {
      LogService.addLog(`Executing command: ${command}`);
      // Simulate command execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      LogService.addLog(`Command executed successfully: ${command}`);
      triggerHaptic();
      Alert.alert('Success', 'Command executed successfully');
    } catch (error) {
      LogService.addLog(`Command failed: ${error}`);
      Alert.alert('Error', 'Command execution failed');
    }
  };

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    triggerHaptic();
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      Alert.alert(
        'Congratulations! 🎉',
        'Bootloader unlock process completed. Your device should now have an unlocked bootloader.',
        [
          {
            text: 'Finish',
            onPress: () => {
              // Could navigate back to home or show completion screen
            },
          },
        ]
      );
    }
  };

  const handleCommandExecution = (command: string) => {
    Alert.alert(
      'Execute Command',
      `Are you sure you want to execute:\n\n${command}\n\nThis action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Execute',
          style: 'destructive',
          onPress: () => executeCommand(command),
        },
      ]
    );
  };

  if (steps.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noGuideContainer}>
          <AlertTriangle size={64} color="#f59e0b" />
          <Text style={styles.noGuideTitle}>Guide Not Available</Text>
          <Text style={styles.noGuideText}>
            No unlock guide is currently available for {deviceBrand} devices. 
            Please check community forums for device-specific instructions.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#10b981', '#059669']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Unlock Guide</Text>
          <Text style={styles.headerSubtitle}>
            {deviceBrand} {deviceModel}
          </Text>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              Step {currentStep + 1} of {steps.length}
            </Text>
          </View>
        </LinearGradient>

        {/* Step Content */}
        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{currentStep + 1}</Text>
            </View>
            <Text style={styles.stepTitle}>{step.title}</Text>
          </View>

          <Text style={styles.stepDescription}>{step.description}</Text>

          {/* Warning */}
          {step.warning && (
            <View style={styles.warningContainer}>
              <AlertTriangle size={20} color="#f59e0b" />
              <Text style={styles.warningText}>{step.warning}</Text>
            </View>
          )}

          {/* Command */}
          {step.command && (
            <View style={styles.commandContainer}>
              <View style={styles.commandHeader}>
                <Terminal size={16} color="#64748b" />
                <Text style={styles.commandLabel}>Command:</Text>
              </View>
              
              <View style={styles.commandBox}>
                <Text style={styles.commandText}>{step.command}</Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(step.command!)}
                >
                  <Copy size={16} color="#64748b" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.executeButton}
                onPress={() => handleCommandExecution(step.command!)}
              >
                <Play size={16} color="#ffffff" />
                <Text style={styles.executeButtonText}>Execute Command</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* External Link */}
          {step.externalLink && (
            <TouchableOpacity style={styles.linkButton}>
              <ExternalLink size={16} color="#3b82f6" />
              <Text style={styles.linkButtonText}>Open External Resource</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={[styles.navButton, styles.prevButton]}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <ChevronLeft size={20} color="#64748b" />
              <Text style={styles.prevButtonText}>Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={handleStepComplete}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'Complete' : 'Next Step'}
            </Text>
            {currentStep === steps.length - 1 ? (
              <CheckCircle size={20} color="#ffffff" />
            ) : (
              <ChevronRight size={20} color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>

        {/* Completed Steps Indicator */}
        <View style={styles.stepsIndicator}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                {
                  backgroundColor: completedSteps.includes(index) 
                    ? '#10b981' 
                    : index === currentStep 
                    ? '#3b82f6' 
                    : '#e2e8f0'
                }
              ]}
            />
          ))}
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
    marginBottom: 20,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    textAlign: 'center',
  },
  stepContainer: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  stepTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk-SemiBold',
    color: '#1e293b',
    flex: 1,
  },
  stepDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#475569',
    lineHeight: 24,
    marginBottom: 20,
  },
  warningContainer: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: 20,
  },
  warningText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#92400e',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  commandContainer: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  commandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  commandLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#64748b',
    marginLeft: 8,
  },
  commandBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  commandText: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#10b981',
    flex: 1,
  },
  copyButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    marginLeft: 12,
  },
  executeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  executeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    marginTop: 12,
  },
  linkButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3b82f6',
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  prevButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  nextButton: {
    backgroundColor: '#3b82f6',
  },
  prevButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#64748b',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  stepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  noGuideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noGuideTitle: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 12,
  },
  noGuideText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
});