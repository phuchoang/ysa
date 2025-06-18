import AsyncStorage from '@react-native-async-storage/async-storage';

const LOG_KEY = 'bootgenie_logs';
const MAX_LOGS = 1000;

export class LogService {
  static async addLog(message: string): Promise<void> {
    try {
      const timestamp = new Date().toISOString();
      const logEntry = `[${timestamp}] ${message}`;
      
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

  static async getLogs(): Promise<string[]> {
    try {
      const logs = await AsyncStorage.getItem(LOG_KEY);
      return logs ? JSON.parse(logs) : [];
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

  static async exportLogs(): Promise<string> {
    const logs = await this.getLogs();
    return logs.join('\n');
  }

  static async getLogStats(): Promise<{
    total: number;
    errors: number;
    success: number;
    commands: number;
  }> {
    const logs = await this.getLogs();
    return {
      total: logs.length,
      errors: logs.filter(log => log.includes('error') || log.includes('failed')).length,
      success: logs.filter(log => log.includes('success') || log.includes('completed')).length,
      commands: logs.filter(log => log.includes('command') || log.includes('executing')).length,
    };
  }
}