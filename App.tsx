import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n/config';
import HomeScreen from './src/screens/HomeScreen';
import DeviceDetectionScreen from './src/screens/DeviceDetectionScreen';
import UnlockGuideScreen from './src/screens/UnlockGuideScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LogsScreen from './src/screens/LogsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#2563eb',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'BootGenie' }}
            />
            <Stack.Screen 
              name="DeviceDetection" 
              component={DeviceDetectionScreen}
              options={{ title: 'Device Detection' }}
            />
            <Stack.Screen 
              name="UnlockGuide" 
              component={UnlockGuideScreen}
              options={{ title: 'Unlock Guide' }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ title: 'Settings' }}
            />
            <Stack.Screen 
              name="Logs" 
              component={LogsScreen}
              options={{ title: 'Logs' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}