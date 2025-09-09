import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { 
  Calendar,
  TrendingUp,
  Target,
  Award,
  Flame,
  Activity,
  Clock,
  Zap,
  ChevronDown
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function Progress() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState("Week");

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const periods = ["Week", "Month", "Year"];

  const progressStats = {
    streak: 15,
    totalWorkouts: 128,
    totalTime: "94h 30m",
    caloriesBurned: 24680,
    personalRecords: 12,
    weeklyGoal: 75, // percentage
    consistency: 89, // percentage
  };

  const achievements = [
    {
      id: 1,
      title: "15 Day Streak",
      description: "Workout consistency champion",
      icon: Flame,
      color: "#FF6B35",
      date: "Today",
      isNew: true,
    },
    {
      id: 2,
      title: "100 Workouts",
      description: "Century milestone reached",
      icon: Target,
      color: "#FFD700",
      date: "3 days ago",
      isNew: false,
    },
    {
      id: 3,
      title: "Personal Best",
      description: "New bench press record",
      icon: Award,
      color: "#10B981",
      date: "1 week ago",
      isNew: false,
    },
  ];

  const weeklyData = [
    { day: "Mon", workouts: 1, completed: true },
    { day: "Tue", workouts: 1, completed: true },
    { day: "Wed", workouts: 0, completed: false },
    { day: "Thu", workouts: 1, completed: true },
    { day: "Fri", workouts: 1, completed: true },
    { day: "Sat", workouts: 0, completed: false },
    { day: "Sun", workouts: 1, completed: true },
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, color = "#FFD700" }) => (
    <View
      style={{
        backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: color,
          borderRadius: 12,
          padding: 12,
          marginBottom: 12,
        }}
      >
        <Icon size={24} color="#000000" strokeWidth={2} />
      </View>
      <Text
        style={{
          fontFamily: "PlusJakartaSans_600SemiBold",
          fontSize: 24,
          color: isDark ? "#FFFFFF" : "#000000",
          marginBottom: 4,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "PlusJakartaSans_500Medium",
          fontSize: 14,
          color: isDark ? "#FFFFFF" : "#000000",
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontFamily: "PlusJakartaSans_400Regular",
            fontSize: 12,
            color: isDark ? "#999999" : "#666666",
            textAlign: "center",
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );

  const AchievementCard = ({ achievement }) => (
    <View
      style={{
        backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: achievement.isNew ? 2 : 0,
        borderColor: achievement.isNew ? "#FFD700" : "transparent",
      }}
    >
      <View
        style={{
          backgroundColor: achievement.color,
          borderRadius: 12,
          padding: 12,
          marginRight: 16,
        }}
      >
        <achievement.icon size={20} color="#000000" strokeWidth={2} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#000000",
              marginRight: 8,
            }}
          >
            {achievement.title}
          </Text>
          {achievement.isNew && (
            <View
              style={{
                backgroundColor: "#FFD700",
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 10,
                  color: "#000000",
                }}
              >
                NEW
              </Text>
            </View>
          )}
        </View>
        <Text
          style={{
            fontFamily: "PlusJakartaSans_400Regular",
            fontSize: 14,
            color: isDark ? "#CCCCCC" : "#666666",
            marginBottom: 4,
          }}
        >
          {achievement.description}
        </Text>
        <Text
          style={{
            fontFamily: "PlusJakartaSans_400Regular",
            fontSize: 12,
            color: isDark ? "#999999" : "#999999",
          }}
        >
          {achievement.date}
        </Text>
      </View>
    </View>
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
            Progress
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 14,
                color: isDark ? "#FFFFFF" : "#000000",
                marginRight: 8,
              }}
            >
              {selectedPeriod}
            </Text>
            <ChevronDown size={16} color={isDark ? "#FFFFFF" : "#000000"} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Streak */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 20,
              padding: 24,
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#FFD700",
            }}
          >
            <View
              style={{
                backgroundColor: "#FFD700",
                borderRadius: 20,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Flame size={32} color="#000000" strokeWidth={2} />
            </View>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 36,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 4,
              }}
            >
              {progressStats.streak}
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 18,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 8,
              }}
            >
              Day Streak
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 14,
                color: isDark ? "#CCCCCC" : "#666666",
                textAlign: "center",
              }}
            >
              Keep it up! You're on fire 🔥
            </Text>
          </View>
        </View>

        {/* Weekly Goal Progress */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 18,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
            }}
          >
            This Week
          </Text>

          <View
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 16,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                Weekly Goal
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 16,
                  color: "#10B981",
                }}
              >
                {progressStats.weeklyGoal}%
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 14,
                color: isDark ? "#999999" : "#666666",
                marginBottom: 12,
              }}
            >
              3 of 4 workouts completed
            </Text>
            <View
              style={{
                width: "100%",
                height: 6,
                backgroundColor: isDark ? "#2A2A2A" : "#F0F0F0",
                borderRadius: 3,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: `${progressStats.weeklyGoal}%`,
                  height: 6,
                  backgroundColor: "#10B981",
                  borderRadius: 3,
                }}
              />
            </View>
            {/* Weekly Chart */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {weeklyData.map((day, index) => (
                <View key={index} style={{ alignItems: "center" }}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: day.completed ? "#10B981" : (isDark ? "#2A2A2A" : "#F0F0F0"),
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "PlusJakartaSans_500Medium",
                        fontSize: 12,
                        color: day.completed ? "#000000" : (isDark ? "#666666" : "#999999"),
                      }}
                    >
                      {day.workouts}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_400Regular",
                      fontSize: 12,
                      color: isDark ? "#999999" : "#666666",
                    }}
                  >
                    {day.day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 18,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
            }}
          >
            Overview
          </Text>

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
            <StatCard
              title="Total Workouts"
              value={progressStats.totalWorkouts}
              icon={Activity}
              color="#3B82F6"
            />
            <StatCard
              title="Time Exercised"
              value={progressStats.totalTime}
              icon={Clock}
              color="#8B5CF6"
            />
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <StatCard
              title="Calories Burned"
              value="24.6K"
              icon={Zap}
              color="#F59E0B"
            />
            <StatCard
              title="Personal Records"
              value={progressStats.personalRecords}
              icon={Award}
              color="#EF4444"
            />
          </View>
        </View>

        {/* Achievements */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 18,
                color: isDark ? "#FFFFFF" : "#000000",
              }}
            >
              Recent Achievements
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 14,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}