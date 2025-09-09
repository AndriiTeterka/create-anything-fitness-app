import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  Brain,
  Calendar as CalendarIcon,
  Play,
  Target,
  Flame,
  Clock,
  ChevronRight,
  Sparkles,
  Dumbbell,
  Apple,
} from "lucide-react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import { useScheduleStore } from "../../utils/schedule/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function Home() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [aiWorkout, setAiWorkout] = useState(null);
  const [nutritionRecommendation, setNutritionRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const selectedDate = useScheduleStore((s) => s.selectedDate);
  const setSelectedDate = useScheduleStore((s) => s.setSelectedDate);
  const eventsByDate = useScheduleStore((s) => s.eventsByDate);
  const seedDemoData = useScheduleStore((s) => s.seedDemoData);
  const hydrated = useScheduleStore((s) => s.hydrated);

  useEffect(() => {
    if (hydrated && (!eventsByDate || Object.keys(eventsByDate).length === 0)) {
      seedDemoData();
    }
  }, [hydrated]);

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  // Use actual user ID from the database - Alex Johnson
  const userId = "28d64dd0-bc6e-40a3-ae22-f109bb46d462";

  const todayStats = {
    streak: 12,
    weeklyGoal: 75, // percentage
    calories: 1420,
    workoutsThisWeek: 3,
  };

  const fetchAIRecommendations = async () => {
    // Always set fallback data first to ensure app works
    const fallbackWorkout = {
      title: "Upper Body Strength",
      estimatedDuration: 45,
      exercises: [
        { name: "Push-ups" },
        { name: "Dumbbell Rows" },
        { name: "Overhead Press" },
        { name: "Plank" },
        { name: "Pull-ups" },
        { name: "Tricep Dips" },
      ],
      difficulty: "Intermediate",
      adaptedFor: "Full gym equipment available",
      isAI: true,
    };

    const fallbackNutrition = {
      name: "Post-Workout Recovery",
      description: "Perfect protein-rich meal to fuel your recovery",
      calories: 420,
      protein: 35,
      prepTime: "15 min",
      isAI: true,
    };

    setAiWorkout(fallbackWorkout);
    setNutritionRecommendation(fallbackNutrition);
    setLoading(false);

    // API calls disabled (WIP). Using local fallback above.
  };

  useEffect(() => {
    fetchAIRecommendations();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchAIRecommendations();
    setRefreshing(false);
  }, []);

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

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View
          style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 16,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                Good morning
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 28,
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginTop: 4,
                }}
              >
                Ready to train?
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFD700",
                borderRadius: 20,
                padding: 12,
              }}
              activeOpacity={0.8}
              onPress={() => setCalendarVisible(true)}
            >
              <CalendarIcon size={24} color="#000000" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Modal */}
        <Modal
          visible={calendarVisible}
          animationType="slide"
          onRequestClose={() => setCalendarVisible(false)}
          transparent
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: isDark ? "#121212" : "#FFFFFF",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingBottom: insets.bottom + 16,
              }}
            >
              {/* Modal Header */}
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingTop: 16,
                  paddingBottom: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_600SemiBold",
                    fontSize: 18,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  Schedule
                </Text>
                <TouchableOpacity
                  onPress={() => setCalendarVisible(false)}
                  style={{ padding: 8 }}
                  accessibilityLabel="Close calendar"
                >
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_500Medium",
                      color: "#FFD700",
                      fontSize: 16,
                    }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Calendar */}
              <View style={{ paddingHorizontal: 16 }}>
                <RNCalendar
                  onDayPress={(day) => setSelectedDate(day.dateString)}
                  markedDates={(() => {
                    const marks = {};
                    Object.keys(eventsByDate || {}).forEach((d) => {
                      marks[d] = {
                        ...(marks[d] || {}),
                        marked: true,
                        dotColor: "#FFD700",
                      };
                    });
                    if (selectedDate) {
                      marks[selectedDate] = {
                        ...(marks[selectedDate] || {}),
                        selected: true,
                        selectedColor: "#FFD700",
                        selectedTextColor: "#000000",
                      };
                    }
                    return marks;
                  })()}
                  theme={{
                    backgroundColor: isDark ? "#121212" : "#FFFFFF",
                    calendarBackground: isDark ? "#1A1A1A" : "#FFFFFF",
                    textSectionTitleColor: isDark ? "#BBBBBB" : "#666666",
                    dayTextColor: isDark ? "#FFFFFF" : "#000000",
                    monthTextColor: isDark ? "#FFFFFF" : "#000000",
                    todayTextColor: "#FFD700",
                    selectedDayBackgroundColor: "#FFD700",
                    selectedDayTextColor: "#000000",
                    arrowColor: "#FFD700",
                    todayBackgroundColor: isDark ? "#1E1E1E" : "#FFF7CC",
                  }}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: isDark ? "#2A2A2A" : "#EFEFEF",
                  }}
                  enableSwipeMonths
                  firstDay={1}
                />
              </View>

              {/* Day Items */}
              <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 14,
                    color: isDark ? "#BBBBBB" : "#666666",
                    marginBottom: 8,
                  }}
                >
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
                {(eventsByDate[selectedDate] || []).length === 0 ? (
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_400Regular",
                      fontSize: 16,
                      color: isDark ? "#888888" : "#999999",
                      paddingBottom: 8,
                    }}
                  >
                    No workouts scheduled.
                  </Text>
                ) : (
                  <View style={{ gap: 12, paddingBottom: 8 }}>
                    {(eventsByDate[selectedDate] || []).map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => router.push(`/workout-details/${item.id}`)}
                        activeOpacity={0.85}
                        style={{
                          backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                          borderRadius: 16,
                          padding: 16,
                          borderWidth: 1,
                          borderColor: isDark ? "#2A2A2A" : "#EFEFEF",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <View
                            style={{
                              backgroundColor: "#FFD700",
                              borderRadius: 12,
                              padding: 8,
                              marginRight: 12,
                            }}
                          >
                            <Dumbbell size={20} color="#000000" strokeWidth={2} />
                          </View>
                          <View>
                            <Text
                              style={{
                                fontFamily: "PlusJakartaSans_600SemiBold",
                                fontSize: 16,
                                color: isDark ? "#FFFFFF" : "#000000",
                              }}
                            >
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "PlusJakartaSans_400Regular",
                                fontSize: 13,
                                color: isDark ? "#BBBBBB" : "#666666",
                              }}
                            >
                              {item.time} • {item.duration}
                            </Text>
                          </View>
                        </View>
                        <ChevronRight size={20} color={isDark ? "#999999" : "#666666"} strokeWidth={2} />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>

        {/* AI Workout Recommendation */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 24,
              padding: 24,
              borderWidth: 2,
              borderColor: "#FFD700",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFD700",
                  borderRadius: 12,
                  padding: 8,
                  marginRight: 12,
                }}
              >
                <Brain size={20} color="#000000" strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 16,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  AI Recommended
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 14,
                    color: isDark ? "#999999" : "#666666",
                  }}
                >
                  Personalized for you
                </Text>
              </View>
              <Sparkles size={20} color="#FFD700" strokeWidth={2} />
            </View>

            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 20,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 8,
              }}
            >
              {loading
                ? "Loading..."
                : aiWorkout?.title || "Upper Body Strength"}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <Clock
                  size={16}
                  color={isDark ? "#999999" : "#666666"}
                  strokeWidth={2}
                />
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 14,
                    color: isDark ? "#999999" : "#666666",
                    marginLeft: 6,
                  }}
                >
                  {aiWorkout?.estimatedDuration || aiWorkout?.duration || "45"}{" "}
                  min
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Target
                  size={16}
                  color={isDark ? "#999999" : "#666666"}
                  strokeWidth={2}
                />
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 14,
                    color: isDark ? "#999999" : "#666666",
                    marginLeft: 6,
                  }}
                >
                  {aiWorkout?.exercises?.length || aiWorkout?.exercises || 6}{" "}
                  exercises
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: isDark ? "#2A2A2A" : "#F8F8F8",
                borderRadius: 12,
                padding: 12,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 13,
                  color: isDark ? "#CCCCCC" : "#333333",
                }}
              >
                Adapted: {aiWorkout?.adaptedFor || "No equipment needed"}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#FFD700",
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              activeOpacity={0.8}
              onPress={() => router.push("/workout-session")}
            >
              <Play size={20} color="#000000" strokeWidth={2} />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 16,
                  color: "#000000",
                  marginLeft: 8,
                }}
              >
                Start Workout
              </Text>
            </TouchableOpacity>
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
            Today's Progress
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFD700",
                  borderRadius: 12,
                  padding: 8,
                  marginBottom: 8,
                }}
              >
                <Flame size={20} color="#000000" strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 20,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                {todayStats.streak}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                Day Streak
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFD700",
                  borderRadius: 12,
                  padding: 8,
                  marginBottom: 8,
                }}
              >
                <Target size={20} color="#000000" strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 20,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                {todayStats.weeklyGoal}%
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                Weekly Goal
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 18,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>

          <View style={{ gap: 12 }}>
            <TouchableOpacity
              style={{
                backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                borderRadius: 16,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              activeOpacity={0.8}
              onPress={() => router.push("/(tabs)/workouts")}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: isDark ? "#2A2A2A" : "#F8F8F8",
                    borderRadius: 12,
                    padding: 12,
                    marginRight: 16,
                  }}
                >
                  <Dumbbell
                    size={24}
                    color={isDark ? "#FFFFFF" : "#000000"}
                    strokeWidth={2}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_500Medium",
                      fontSize: 16,
                      color: isDark ? "#FFFFFF" : "#000000",
                    }}
                  >
                    Browse Workouts
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_400Regular",
                      fontSize: 14,
                      color: isDark ? "#999999" : "#666666",
                    }}
                  >
                    Explore workout library
                  </Text>
                </View>
              </View>
              <ChevronRight
                size={20}
                color={isDark ? "#999999" : "#666666"}
                strokeWidth={2}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                borderRadius: 16,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              activeOpacity={0.8}
              onPress={() => router.push("/(tabs)/nutrition")}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: isDark ? "#2A2A2A" : "#F8F8F8",
                    borderRadius: 12,
                    padding: 12,
                    marginRight: 16,
                  }}
                >
                  <Apple
                    size={24}
                    color={isDark ? "#FFFFFF" : "#000000"}
                    strokeWidth={2}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_500Medium",
                      fontSize: 16,
                      color: isDark ? "#FFFFFF" : "#000000",
                    }}
                  >
                    Nutrition Plan
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_400Regular",
                      fontSize: 14,
                      color: isDark ? "#999999" : "#666666",
                    }}
                  >
                    View today's meals
                  </Text>
                </View>
              </View>
              <ChevronRight
                size={20}
                color={isDark ? "#999999" : "#666666"}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
