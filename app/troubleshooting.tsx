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
import { 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wrench,
  ExternalLink,
  Smartphone,
  Zap,
  Info,
  ChevronRight
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { TroubleshootingService, TroubleshootingIssue } from '@/services/TroubleshootingService';
import { LogService } from '@/services/LogService';

export default function TroubleshootingScreen() {
  const params = useLocalSearchParams();
  const deviceModel = params.deviceModel as string;
  const [issues, setIssues] = useState<TroubleshootingIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<TroubleshootingIssue | null>(null);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  useEffect(() => {
    loadTroubleshootingData();
  }, [deviceModel]);

  const loadTroubleshootingData = async () => {
    try {
      const troubleshootingIssues = TroubleshootingService.getCommonIssues(deviceModel);
      setIssues(troubleshootingIssues);
      
      await LogService.addLog('Loaded troubleshooting guide for ' + (deviceModel || 'generic device'), 'info', 'Troubleshooting');
    } catch (error) {
      console.error('Failed to load troubleshooting data:', error);
    }
  };

  const runDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    triggerHaptic();
    
    try {
      await LogService.addLog('Starting diagnostic checks...', 'info', 'Diagnostics');
      
      const diagnosticSteps = TroubleshootingService.getDiagnosticSteps(deviceModel);
      
      for (const step of diagnosticSteps) {
        await LogService.addLog(`Diagnostic: ${step}`, 'command', 'Diagnostics');
        // Simulate diagnostic delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      await LogService.addLog('Diagnostic checks completed. Check logs for results.', 'success', 'Diagnostics');
      
      Alert.alert(
        'Diagnostics Complete',
        'Diagnostic checks have been completed. Check the logs screen for detailed results.',
        [
          { text: 'View Logs', onPress: () => router.push('/logs') },
          { text: 'OK' }
        ]
      );
    } catch (error) {
      await LogService.addLog(`Diagnostic error: ${error}`, 'error', 'Diagnostics');
    } finally {
      setIsRunningDiagnostics(false);
    }
  };

  const openEmergencyContacts = () => {
    const contacts = TroubleshootingService.getEmergencyContacts();
    
    const contactList = contacts.map(contact => 
      `• ${contact.name}: ${contact.description}`
    ).join('\\n');

    Alert.alert(
      'Emergency Contacts',
      `If you need additional help:\\n\\n${contactList}\\n\\nThese communities can provide specialized support for your device.`,
      [{ text: 'OK' }]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle size={20} color="#ef4444" />;
      case 'medium': return <AlertTriangle size={20} color="#f59e0b" />;
      case 'low': return <Info size={20} color="#10b981" />;
      default: return <Info size={20} color="#6b7280" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#ef4444', '#dc2626']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Wrench size={32} color="#ffffff" />
            <Text style={styles.headerTitle}>Troubleshooting</Text>
            <Text style={styles.headerSubtitle}>
              {deviceModel ? `For ${deviceModel}` : 'General Issues'}
            </Text>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.actionButton, isRunningDiagnostics && styles.actionButtonDisabled]}
            onPress={runDiagnostics}
            disabled={isRunningDiagnostics}
          >
            <Zap size={20} color={isRunningDiagnostics ? "#9ca3af" : "#ffffff"} />
            <Text style={[styles.actionButtonText, isRunningDiagnostics && styles.actionButtonTextDisabled]}>
              {isRunningDiagnostics ? 'Running...' : 'Run Diagnostics'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={openEmergencyContacts}
          >
            <ExternalLink size={20} color="#3b82f6" />
            <Text style={styles.secondaryButtonText}>Get Help</Text>
          </TouchableOpacity>
        </View>

        {/* Common Issues */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Issues</Text>
          
          {issues.map((issue) => (
            <TouchableOpacity
              key={issue.id}
              style={styles.issueCard}
              onPress={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)}
            >
              <View style={styles.issueHeader}>
                <View style={styles.issueInfo}>
                  {getSeverityIcon(issue.severity)}
                  <View style={styles.issueTitleContainer}>
                    <Text style={styles.issueTitle}>{issue.title}</Text>
                    <Text style={styles.issueDescription}>{issue.description}</Text>
                  </View>
                </View>
                <ChevronRight 
                  size={20} 
                  color="#9ca3af" 
                  style={{ transform: [{ rotate: selectedIssue?.id === issue.id ? '90deg' : '0deg' }] }}
                />
              </View>

              {selectedIssue?.id === issue.id && (
                <View style={styles.issueDetails}>
                  {/* Symptoms */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>Symptoms:</Text>
                    {issue.symptoms.map((symptom, index) => (
                      <Text key={index} style={styles.detailItem}>• {symptom}</Text>
                    ))}
                  </View>

                  {/* Solutions */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>Solutions:</Text>
                    {issue.solutions.map((solution, index) => (
                      <Text key={index} style={styles.detailItem}>• {solution}</Text>
                    ))}
                  </View>

                  {/* Device Specific */}
                  {issue.deviceSpecific && (
                    <View style={styles.detailSection}>
                      <Text style={styles.detailTitle}>Specific to:</Text>
                      <Text style={styles.deviceSpecific}>
                        {issue.deviceSpecific.join(', ')}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Device Specific Notice */}
        {deviceModel?.toLowerCase().includes('turbo 4 pro') && (
          <View style={styles.noticeSection}>
            <View style={styles.noticeHeader}>
              <Smartphone size={24} color="#8b5cf6" />
              <Text style={styles.noticeTitle}>Redmi Turbo 4 Pro Notice</Text>
            </View>
            <Text style={styles.noticeText}>
              The Redmi Turbo 4 Pro runs HyperOS, which may have additional bootloader unlock restrictions compared to MIUI devices. 
              Make sure you're using the latest Mi Unlock Tool and have completed the mandatory waiting period.
            </Text>
          </View>
        )}

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back to Guide</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.logsButton}
            onPress={() => router.push('/logs')}
          >
            <Text style={styles.logsButtonText}>View Logs</Text>
          </TouchableOpacity>
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
    padding: 24,
    paddingTop: 40,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fecaca',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonTextDisabled: {
    color: '#9ca3af',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  issueCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  issueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  issueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  issueTitleContainer: {
    flex: 1,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  issueDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  issueDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  detailSection: {
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  detailItem: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  deviceSpecific: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  noticeSection: {
    margin: 20,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  noticeText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  logsButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logsButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
