import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  Target, 
  Zap,
  Brain,
  ChevronRight,
  Dumbbell,
  User,
  Heart
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function Workouts() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const categories = ["All", "Strength", "Cardio", "Flexibility", "HIIT"];

  const workouts = [
    {
      id: 1,
      title: "Upper Body Blast",
      type: "AI Recommended",
      duration: "45 min",
      exercises: 8,
      difficulty: "Intermediate",
      category: "Strength",
      description: "Personalized upper body strength workout",
      isAI: true,
    },
    {
      id: 2,
      title: "Morning Cardio",
      type: "Popular",
      duration: "30 min",
      exercises: 6,
      difficulty: "Beginner",
      category: "Cardio",
      description: "High-energy cardio to start your day",
      isAI: false,
    },
    {
      id: 3,
      title: "Full Body HIIT",
      type: "Featured",
      duration: "25 min",
      exercises: 10,
      difficulty: "Advanced",
      category: "HIIT",
      description: "Intense full-body interval training",
      isAI: false,
    },
    {
      id: 4,
      title: "Flexibility Flow",
      type: "AI Recommended",
      duration: "20 min",
      exercises: 12,
      difficulty: "Beginner",
      category: "Flexibility",
      description: "AI-adapted stretching routine for your needs",
      isAI: true,
    },
    {
      id: 5,
      title: "Lower Body Power",
      type: "Popular",
      duration: "40 min",
      exercises: 9,
      difficulty: "Intermediate",
      category: "Strength",
      description: "Build lower body strength and power",
      isAI: false,
    },
  ];

  const filteredWorkouts = selectedCategory === "All" 
    ? workouts 
    : workouts.filter(workout => workout.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "#10B981";
      case "Intermediate":
        return "#FFD700";
      case "Advanced":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const WorkoutCard = ({ workout }) => (
    <TouchableOpacity
      style={{
        backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: workout.isAI ? 2 : 0,
        borderColor: workout.isAI ? "#FFD700" : "transparent",
      }}
      activeOpacity={0.8}
      onPress={() => router.push(`/workout-details/${workout.id}`)}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            {workout.isAI && (
              <View
                style={{
                  backgroundColor: "#FFD700",
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 10,
                    color: "#000000",
                  }}
                >
                  AI
                </Text>
              </View>
            )}
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 12,
                color: isDark ? "#999999" : "#666666",
              }}
            >
              {workout.type}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 18,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 4,
            }}
          >
            {workout.title}
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 14,
              color: isDark ? "#CCCCCC" : "#666666",
              marginBottom: 12,
            }}
          >
            {workout.description}
          </Text>
        </View>
        {workout.isAI && (
          <Brain size={20} color="#FFD700" strokeWidth={2} />
        )}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Clock size={16} color={isDark ? "#999999" : "#666666"} strokeWidth={2} />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 13,
                color: isDark ? "#999999" : "#666666",
                marginLeft: 4,
              }}
            >
              {workout.duration}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Target size={16} color={isDark ? "#999999" : "#666666"} strokeWidth={2} />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 13,
                color: isDark ? "#999999" : "#666666",
                marginLeft: 4,
              }}
            >
              {workout.exercises} exercises
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: getDifficultyColor(workout.difficulty),
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "PlusJakartaSans_500Medium",
              fontSize: 12,
              color: "#000000",
            }}
          >
            {workout.difficulty}
          </Text>
        </View>
      </View>
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
            Workouts
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFD700",
              borderRadius: 20,
              padding: 12,
            }}
            activeOpacity={0.8}
            onPress={() => router.push("/workout-builder")}
          >
            <Plus size={24} color="#000000" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={{ paddingHorizontal: 24, marginBottom: 20 }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
            activeOpacity={0.8}
          >
            <Search size={20} color={isDark ? "#999999" : "#666666"} strokeWidth={2} />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 16,
                color: isDark ? "#999999" : "#666666",
                marginLeft: 12,
              }}
            >
              Search workouts...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
            }}
            activeOpacity={0.8}
          >
            <Filter size={20} color={isDark ? "#FFFFFF" : "#000000"} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Pills */}
      <View style={{ paddingLeft: 24, marginBottom: 24 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 12, paddingRight: 24 }}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={{
                  backgroundColor: selectedCategory === category ? "#FFD700" : (isDark ? "#1A1A1A" : "#FFFFFF"),
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                }}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 14,
                    color: selectedCategory === category ? "#000000" : (isDark ? "#FFFFFF" : "#000000"),
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Workout List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 20,
          right: 24,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#FFD700",
            borderRadius: 28,
            width: 56,
            height: 56,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8,
          }}
          activeOpacity={0.8}
          onPress={() => router.push("/workout-builder")}
        >
          <Plus size={24} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}