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
  Brain, 
  Plus, 
  Target, 
  Zap,
  Clock,
  ChefHat,
  Apple,
  Coffee,
  UtensilsCrossed,
  Moon,
  ChevronRight
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function Nutrition() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const todayNutrition = {
    calories: { consumed: 1420, target: 2200 },
    protein: { consumed: 85, target: 140 },
    carbs: { consumed: 140, target: 220 },
    fats: { consumed: 45, target: 75 },
  };

  const todayMeals = [
    {
      id: 1,
      type: "breakfast",
      name: "Protein Power Bowl",
      calories: 485,
      time: "7:30 AM",
      isAI: true,
      completed: true,
      icon: Coffee,
    },
    {
      id: 2,
      type: "lunch",
      name: "Grilled Chicken Salad",
      calories: 520,
      time: "12:30 PM",
      isAI: true,
      completed: true,
      icon: UtensilsCrossed,
    },
    {
      id: 3,
      type: "snack",
      name: "Greek Yogurt & Berries",
      calories: 180,
      time: "3:00 PM",
      isAI: false,
      completed: false,
      icon: Apple,
    },
    {
      id: 4,
      type: "dinner",
      name: "Salmon & Quinoa Bowl",
      calories: 650,
      time: "7:00 PM",
      isAI: true,
      completed: false,
      icon: ChefHat,
    },
  ];

  const aiRecommendation = {
    title: "Post-Workout Recovery",
    description: "Perfect protein-rich meal to fuel your recovery",
    calories: 420,
    protein: 35,
    prepTime: "15 min",
  };

  const getProgressPercentage = (consumed, target) => {
    return Math.min((consumed / target) * 100, 100);
  };

  const MacroCard = ({ title, consumed, target, color }) => (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
        borderRadius: 16,
        padding: 16,
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
          marginBottom: 4,
        }}
      >
        {consumed}
        <Text
          style={{
            fontFamily: "PlusJakartaSans_400Regular",
            fontSize: 14,
            color: isDark ? "#999999" : "#666666",
          }}
        >
          /{target}g
        </Text>
      </Text>
      <View
        style={{
          width: "100%",
          height: 4,
          backgroundColor: isDark ? "#2A2A2A" : "#F0F0F0",
          borderRadius: 2,
        }}
      >
        <View
          style={{
            width: `${getProgressPercentage(consumed, target)}%`,
            height: 4,
            backgroundColor: color,
            borderRadius: 2,
          }}
        />
      </View>
    </View>
  );

  const MealCard = ({ meal }) => (
    <TouchableOpacity
      style={{
        backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: meal.completed ? 0.7 : 1,
        borderWidth: meal.isAI ? 1 : 0,
        borderColor: meal.isAI ? "#FFD700" : "transparent",
      }}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <View
          style={{
            backgroundColor: meal.completed ? (isDark ? "#2A2A2A" : "#F0F0F0") : "#FFD700",
            borderRadius: 12,
            padding: 12,
            marginRight: 16,
          }}
        >
          <meal.icon 
            size={20} 
            color={meal.completed ? (isDark ? "#666666" : "#999999") : "#000000"} 
            strokeWidth={2} 
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            {meal.isAI && (
              <View
                style={{
                  backgroundColor: "#FFD700",
                  borderRadius: 6,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 9,
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
                textTransform: "capitalize",
              }}
            >
              {meal.type} • {meal.time}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_500Medium",
              fontSize: 16,
              color: meal.completed ? (isDark ? "#666666" : "#999999") : (isDark ? "#FFFFFF" : "#000000"),
              marginBottom: 4,
              textDecorationLine: meal.completed ? "line-through" : "none",
            }}
          >
            {meal.name}
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 14,
              color: isDark ? "#999999" : "#666666",
            }}
          >
            {meal.calories} calories
          </Text>
        </View>
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
            Nutrition
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFD700",
              borderRadius: 20,
              padding: 12,
            }}
            activeOpacity={0.8}
          >
            <Plus size={24} color="#000000" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Nutrition Recommendation */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 20,
              padding: 20,
              borderWidth: 2,
              borderColor: "#FFD700",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <View
                style={{
                  backgroundColor: "#FFD700",
                  borderRadius: 10,
                  padding: 8,
                  marginRight: 12,
                }}
              >
                <Brain size={18} color="#000000" strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 16,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                AI Meal Suggestion
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
              {aiRecommendation.title}
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 14,
                color: isDark ? "#CCCCCC" : "#666666",
                marginBottom: 16,
              }}
            >
              {aiRecommendation.description}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Zap size={16} color={isDark ? "#999999" : "#666666"} strokeWidth={2} />
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_400Regular",
                      fontSize: 13,
                      color: isDark ? "#999999" : "#666666",
                      marginLeft: 4,
                    }}
                  >
                    {aiRecommendation.calories} cal
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
                    {aiRecommendation.protein}g protein
                  </Text>
                </View>
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
                    {aiRecommendation.prepTime}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFD700",
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
                alignItems: "center",
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
                Add to Plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Progress */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 18,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
            }}
          >
            Today's Progress
          </Text>

          {/* Calories Overview */}
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
                Calories
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 14,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                {todayNutrition.calories.target - todayNutrition.calories.consumed} left
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 24,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 8,
              }}
            >
              {todayNutrition.calories.consumed}
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 16,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                /{todayNutrition.calories.target}
              </Text>
            </Text>
            <View
              style={{
                width: "100%",
                height: 6,
                backgroundColor: isDark ? "#2A2A2A" : "#F0F0F0",
                borderRadius: 3,
              }}
            >
              <View
                style={{
                  width: `${getProgressPercentage(todayNutrition.calories.consumed, todayNutrition.calories.target)}%`,
                  height: 6,
                  backgroundColor: "#FFD700",
                  borderRadius: 3,
                }}
              />
            </View>
          </View>

          {/* Macros */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <MacroCard 
              title="Protein" 
              consumed={todayNutrition.protein.consumed} 
              target={todayNutrition.protein.target} 
              color="#10B981" 
            />
            <MacroCard 
              title="Carbs" 
              consumed={todayNutrition.carbs.consumed} 
              target={todayNutrition.carbs.target} 
              color="#3B82F6" 
            />
            <MacroCard 
              title="Fats" 
              consumed={todayNutrition.fats.consumed} 
              target={todayNutrition.fats.target} 
              color="#F59E0B" 
            />
          </View>
        </View>

        {/* Today's Meals */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 18,
                color: isDark ? "#FFFFFF" : "#000000",
              }}
            >
              Today's Meals
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
                Edit Plan
              </Text>
            </TouchableOpacity>
          </View>

          {todayMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}