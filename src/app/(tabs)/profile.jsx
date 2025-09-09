import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { 
  Settings,
  User,
  Target,
  Heart,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit3,
  Bell,
  Moon,
  Smartphone,
  Database,
  Brain
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function Profile() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    memberSince: "Jan 2024",
    currentWeight: "75 kg",
    targetWeight: "70 kg",
    fitnessLevel: "Intermediate",
    weeklyGoal: "4 workouts",
  };

  const aiPreferences = {
    workoutStyle: "Strength & Conditioning",
    difficultyLevel: "Intermediate",
    sessionLength: "45 minutes",
    equipmentAccess: "Full gym",
    injuries: "Lower back sensitivity",
    nutritionGoal: "Muscle gain",
  };

  const settingsSections = [
    {
      title: "Profile",
      items: [
        { icon: Edit3, title: "Edit Profile", subtitle: "Update your personal information" },
        { icon: Target, title: "Fitness Goals", subtitle: "Set your targets and preferences" },
        { icon: Brain, title: "AI Preferences", subtitle: "Customize your AI recommendations" },
      ]
    },
    {
      title: "App Settings",
      items: [
        { icon: Bell, title: "Notifications", subtitle: "Manage your alerts and reminders" },
        { icon: Moon, title: "Dark Mode", subtitle: "Automatic", hasToggle: true },
        { icon: Smartphone, title: "App Preferences", subtitle: "Customize your experience" },
      ]
    },
    {
      title: "Data & Privacy",
      items: [
        { icon: Database, title: "Data Export", subtitle: "Download your fitness data" },
        { icon: Shield, title: "Privacy Settings", subtitle: "Control your data sharing" },
        { icon: Heart, title: "Health Data", subtitle: "Manage health app connections" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, title: "Help & Support", subtitle: "FAQs and contact support" },
        { icon: Settings, title: "About", subtitle: "App version and information" },
      ]
    }
  ];

  const ProfileCard = ({ title, value, subtitle }) => (
    <View
      style={{
        backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "PlusJakartaSans_400Regular",
          fontSize: 12,
          color: isDark ? "#999999" : "#666666",
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: "PlusJakartaSans_600SemiBold",
          fontSize: 18,
          color: isDark ? "#FFFFFF" : "#000000",
          marginBottom: 2,
        }}
      >
        {value}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontFamily: "PlusJakartaSans_400Regular",
            fontSize: 11,
            color: isDark ? "#999999" : "#666666",
            textAlign: "center",
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );

  const SettingsItem = ({ item, isLast = false }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: isDark ? "#2A2A2A" : "#F0F0F0",
      }}
      activeOpacity={0.8}
    >
      <View
        style={{
          backgroundColor: isDark ? "#2A2A2A" : "#F8F8F8",
          borderRadius: 10,
          padding: 8,
          marginRight: 16,
        }}
      >
        <item.icon size={20} color={isDark ? "#FFFFFF" : "#000000"} strokeWidth={2} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "PlusJakartaSans_500Medium",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 2,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: "PlusJakartaSans_400Regular",
            fontSize: 14,
            color: isDark ? "#999999" : "#666666",
          }}
        >
          {item.subtitle}
        </Text>
      </View>
      <ChevronRight size={20} color={isDark ? "#999999" : "#666666"} strokeWidth={2} />
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000000" : "#FFFEF7",
        paddingTop: insets.top,
      }}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 28,
              color: isDark ? "#FFFFFF" : "#000000",
            }}
          >
            Profile
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 20,
              padding: 12,
            }}
            activeOpacity={0.8}
          >
            <Settings size={24} color={isDark ? "#FFFFFF" : "#000000"} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 20,
              padding: 24,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#FFD700",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <User size={36} color="#000000" strokeWidth={2} />
            </View>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 24,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 4,
              }}
            >
              {userProfile.name}
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 16,
                color: isDark ? "#999999" : "#666666",
                marginBottom: 8,
              }}
            >
              {userProfile.email}
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 14,
                color: isDark ? "#999999" : "#666666",
              }}
            >
              Member since {userProfile.memberSince}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 18,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
            }}
          >
            Your Goals
          </Text>

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
            <ProfileCard 
              title="Current Weight" 
              value={userProfile.currentWeight}
            />
            <ProfileCard 
              title="Target Weight" 
              value={userProfile.targetWeight}
            />
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <ProfileCard 
              title="Fitness Level" 
              value={userProfile.fitnessLevel}
            />
            <ProfileCard 
              title="Weekly Goal" 
              value={userProfile.weeklyGoal}
            />
          </View>
        </View>

        {/* AI Preferences */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              borderWidth: 2,
              borderColor: "#FFD700",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <View
                style={{
                  backgroundColor: "#FFD700",
                  borderRadius: 10,
                  padding: 8,
                  marginRight: 12,
                }}
              >
                <Brain size={20} color="#000000" strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 18,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                AI Preferences
              </Text>
            </View>

            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 14,
                    color: isDark ? "#999999" : "#666666",
                  }}
                >
                  Workout Style
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 14,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {aiPreferences.workoutStyle}
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 14,
                    color: isDark ? "#999999" : "#666666",
                  }}
                >
                  Session Length
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 14,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {aiPreferences.sessionLength}
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 14,
                    color: isDark ? "#999999" : "#666666",
                  }}
                >
                  Considerations
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 14,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {aiPreferences.injuries}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#FFD700",
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
                alignItems: "center",
                marginTop: 16,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 14,
                  color: "#000000",
                }}
              >
                Customize AI
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 18,
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginBottom: 16,
                }}
              >
                {section.title}
              </Text>
              <View
                style={{
                  backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                  borderRadius: 16,
                  paddingHorizontal: 20,
                }}
              >
                {section.items.map((item, itemIndex) => (
                  <SettingsItem
                    key={itemIndex}
                    item={item}
                    isLast={itemIndex === section.items.length - 1}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#EF4444",
            }}
            activeOpacity={0.8}
          >
            <LogOut size={20} color="#EF4444" strokeWidth={2} />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: "#EF4444",
                marginLeft: 12,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}