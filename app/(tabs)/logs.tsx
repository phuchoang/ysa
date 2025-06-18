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
  FileText, 
  Download, 
  Trash2, 
  Clock,
  Terminal,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { LogService } from '@/services/LogService';

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'command';
}

export default function LogsScreen() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const logEntries = await LogService.getLogs();
      // Transform log entries to include type and id
      const transformedLogs = logEntries.map((log, index) => ({
        id: index.toString(),
        timestamp: log.split(']')[0].replace('[', ''),
        message: log.split('] ')[1] || log,
        type: getLogType(log),
      }));
      setLogs(transformedLogs);
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLogType = (log: string): 'info' | 'success' | 'error' | 'command' => {
    if (log.includes('error') || log.includes('failed')) return 'error';
    if (log.includes('success') || log.includes('completed')) return 'success';
    if (log.includes('command') || log.includes('executing')) return 'command';
    return 'info';
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle size={16} color="#ef4444" />;
      case 'success':
        return <CheckCircle size={16} color="#10b981" />;
      case 'command':
        return <Terminal size={16} color="#8b5cf6" />;
      default:
        return <Info size={16} color="#3b82f6" />;
    }
  };

  const exportLogs = async () => {
    try {
      triggerHaptic();
      const logContent = logs.map(log => 
        `[${log.timestamp}] ${log.message}`
      ).join('\n');
      
      // For web, we can create a download link
      if (Platform.OS === 'web') {
        const blob = new Blob([logContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bootgenie-logs-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        Alert.alert('Success', 'Logs exported successfully');
      } else {
        // For mobile, we would use react-native-share or similar
        Alert.alert('Export', 'Log export functionality would be implemented with react-native-share on mobile platforms');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export logs');
    }
  };

  const clearLogs = () => {
    Alert.alert(
      'Clear All Logs',
      'Are you sure you want to clear all logs? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            triggerHaptic();
            await LogService.clearLogs();
            setLogs([]);
            Alert.alert('Success', 'All logs have been cleared');
          },
        },
      ]
    );
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return timestamp;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8b5cf6', '#7c3aed']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Activity Logs</Text>
        <Text style={styles.headerSubtitle}>
          Track all device detection and unlock activities
        </Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={exportLogs}
            disabled={logs.length === 0}
          >
            <Download size={16} color="#ffffff" />
            <Text style={styles.headerButtonText}>Export</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.headerButton, styles.dangerButton]}
            onPress={clearLogs}
            disabled={logs.length === 0}
          >
            <Trash2 size={16} color="#ffffff" />
            <Text style={styles.headerButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{logs.length}</Text>
          <Text style={styles.statLabel}>Total Entries</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {logs.filter(log => log.type === 'error').length}
          </Text>
          <Text style={styles.statLabel}>Errors</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {logs.filter(log => log.type === 'success').length}
          </Text>
          <Text style={styles.statLabel}>Success</Text>
        </View>
      </View>

      {/* Logs List */}
      <ScrollView style={styles.logsContainer} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.emptyState}>
            <FileText size={48} color="#94a3b8" />
            <Text style={styles.emptyStateText}>Loading logs...</Text>
          </View>
        ) : logs.length === 0 ? (
          <View style={styles.emptyState}>
            <FileText size={48} color="#94a3b8" />
            <Text style={styles.emptyStateTitle}>No Logs Available</Text>
            <Text style={styles.emptyStateText}>
              Start using the app to see activity logs here
            </Text>
          </View>
        ) : (
          logs.map((log) => (
            <View key={log.id} style={styles.logEntry}>
              <View style={styles.logHeader}>
                <View style={styles.logIcon}>
                  {getLogIcon(log.type)}
                </View>
                <View style={styles.logTimestamp}>
                  <Clock size={12} color="#94a3b8" />
                  <Text style={styles.timestampText}>
                    {formatTimestamp(log.timestamp)}
                  </Text>
                </View>
              </View>
              <Text style={styles.logMessage}>{log.message}</Text>
            </View>
          ))
        )}
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
    color: '#e9d5ff',
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  dangerButton: {
    backgroundColor: 'rgba(239,68,68,0.3)',
  },
  headerButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  logsContainer: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk-SemiBold',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  logEntry: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  logIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logTimestamp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestampText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
  logMessage: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#374151',
    lineHeight: 20,
  },
});