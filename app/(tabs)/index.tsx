import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  Smartphone, 
  Shield, 
  AlertTriangle, 
  BookOpen,
  Zap,
  Users,
  ChevronRight
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const features = [
    {
      icon: <Smartphone size={24} color="#3b82f6" />,
      title: 'Device Detection',
      description: 'Automatically detect your Android device and brand',
      action: () => router.push('/detect'),
    },
    {
      icon: <BookOpen size={24} color="#10b981" />,
      title: 'Step-by-Step Guide',
      description: 'Follow detailed instructions for your specific device',
      action: () => router.push('/guide'),
    },
    {
      icon: <Shield size={24} color="#f59e0b" />,
      title: 'Safety First',
      description: 'Comprehensive warnings and safety checks',
      action: () => router.push('/settings'),
    },
  ];

  const stats = [
    { label: 'Supported Brands', value: '10+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Users Helped', value: '50K+' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#0f172a', '#1e293b', '#334155']}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' }}
              style={styles.heroImage}
            />
            <Text style={styles.heroTitle}>BootGenie</Text>
            <Text style={styles.heroSubtitle}>
              Your trusted companion for safely unlocking Android bootloaders
            </Text>
            
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/detect')}
            >
              <Zap size={20} color="#ffffff" />
              <Text style={styles.primaryButtonText}>Start Unlocking</Text>
              <ChevronRight size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featureCard}
              onPress={feature.action}
            >
              <View style={styles.featureIcon}>
                {feature.icon}
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <ChevronRight size={20} color="#94a3b8" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Warning Section */}
        <View style={styles.warningSection}>
          <View style={styles.warningHeader}>
            <AlertTriangle size={24} color="#f59e0b" />
            <Text style={styles.warningTitle}>Important Notice</Text>
          </View>
          <Text style={styles.warningText}>
            Unlocking your bootloader will void your warranty and may permanently damage your device. 
            Always backup your data and proceed with caution.
          </Text>
        </View>

        {/* Community Section */}
        <View style={styles.communitySection}>
          <View style={styles.communityHeader}>
            <Users size={24} color="#8b5cf6" />
            <Text style={styles.communityTitle}>Join the Community</Text>
          </View>
          <Text style={styles.communityText}>
            Connect with thousands of Android enthusiasts and get help from experienced developers.
          </Text>
          <TouchableOpacity style={styles.communityButton}>
            <Text style={styles.communityButtonText}>Visit XDA Forums</Text>
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
  heroSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  heroTitle: {
    fontSize: 36,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
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
    textAlign: 'center',
  },
  featuresSection: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  warningSection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fef3c7',
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
  },
  communitySection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#faf5ff',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  communityTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6b21a8',
    marginLeft: 8,
  },
  communityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b21a8',
    lineHeight: 20,
    marginBottom: 16,
  },
  communityButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  communityButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});