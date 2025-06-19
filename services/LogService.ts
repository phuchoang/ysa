import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const LOG_KEY = 'bootgenie_logs';
const MAX_LOGS = 1000;

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  level: 'info' | 'warning' | 'error' | 'success' | 'command';
  source?: string;
}

export class LogService {
  static async addLog(
    message: string, 
    level: LogEntry['level'] = 'info', 
    source?: string
  ): Promise<void> {
    try {
      const timestamp = new Date().toISOString();
      const logEntry: LogEntry = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp,
        message,
        level,
        source,
      };
      
      const existingLogs = await this.getLogs();
      const updatedLogs = [...existingLogs, logEntry];
      
      // Keep only the most recent logs
      if (updatedLogs.length > MAX_LOGS) {
        updatedLogs.splice(0, updatedLogs.length - MAX_LOGS);
      }
      
      await AsyncStorage.setItem(LOG_KEY, JSON.stringify(updatedLogs));
    } catch (error) {
      console.error('Failed to add log:', error);
    }
  }

  static async getLogs(): Promise<LogEntry[]> {
    try {
      const logs = await AsyncStorage.getItem(LOG_KEY);
      if (logs) {
        const parsed = JSON.parse(logs);
        // Handle backward compatibility with old string logs
        if (parsed.length > 0 && typeof parsed[0] === 'string') {
          return parsed.map((log: string, index: number) => ({
            id: index.toString(),
            timestamp: new Date().toISOString(),
            message: log,
            level: 'info' as const,
          }));
        }
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Failed to get logs:', error);
      return [];
    }
  }

  static async clearLogs(): Promise<void> {
    try {
      await AsyncStorage.removeItem(LOG_KEY);
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  }

  static async exportLogs(format: 'txt' | 'json' = 'txt'): Promise<string> {
    const logs = await this.getLogs();
    
    if (format === 'json') {
      return JSON.stringify(logs, null, 2);
    }
    
    return logs.map(log => 
      `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.source ? `[${log.source}] ` : ''}${log.message}`
    ).join('\n');
  }

  static async shareLogsFile(format: 'txt' | 'json' = 'txt'): Promise<void> {
    try {
      const content = await this.exportLogs(format);
      const fileName = `bootgenie_logs_${new Date().toISOString().split('T')[0]}.${format}`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;
      
      await FileSystem.writeAsStringAsync(filePath, content, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath, {
          mimeType: format === 'json' ? 'application/json' : 'text/plain',
          dialogTitle: 'Export BootGenie Logs',
        });
      }
    } catch (error) {
      console.error('Failed to share logs:', error);
      throw error;
    }
  }

  static async getLogStats(): Promise<{
    total: number;
    errors: number;
    success: number;
    commands: number;
    warnings: number;
  }> {
    const logs = await this.getLogs();
    return {
      total: logs.length,
      errors: logs.filter(log => log.level === 'error').length,
      success: logs.filter(log => log.level === 'success').length,
      commands: logs.filter(log => log.level === 'command').length,
      warnings: logs.filter(log => log.level === 'warning').length,
    };
  }

  static async getLogsByLevel(level: LogEntry['level']): Promise<LogEntry[]> {
    const logs = await this.getLogs();
    return logs.filter(log => log.level === level);
  }

  static async getRecentLogs(count: number = 10): Promise<LogEntry[]> {
    const logs = await this.getLogs();
    return logs.slice(-count);
  }
}