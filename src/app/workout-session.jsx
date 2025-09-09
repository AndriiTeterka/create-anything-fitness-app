import React, { useState, useEffect } from "react";
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
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Timer,
  Check,
  X,
  ChevronLeft,
  Brain,
  Target,
  Repeat
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function WorkoutSession() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(90);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const workout = {
    title: "Upper Body Strength",
    totalExercises: 6,
    estimatedTime: "45 min",
    isAI: true,
  };

  const exercises = [
    {
      id: 1,
      name: "Push-ups",
      targetMuscles: ["Chest", "Shoulders", "Triceps"],
      sets: 3,
      reps: "12-15",
      weight: "Bodyweight",
      restTime: 90,
      instructions: "Keep your body in a straight line from head to heels. Lower your chest to the floor and push back up.",
      tips: "Engage your core throughout the movement",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      name: "Dumbbell Rows",
      targetMuscles: ["Back", "Biceps"],
      sets: 3,
      reps: "8-10",
      weight: "15-20 lbs",
      restTime: 120,
      instructions: "Bend forward at the hips with knees slightly bent. Pull the weight to your lower ribs.",
      tips: "Squeeze your shoulder blades together at the top",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      name: "Overhead Press",
      targetMuscles: ["Shoulders", "Triceps"],
      sets: 3,
      reps: "8-10",
      weight: "12-15 lbs",
      restTime: 120,
      instructions: "Press the weights straight up above your head. Lower with control.",
      tips: "Keep your core tight and avoid arching your back",
      difficulty: "Intermediate",
    },
  ];

  const currentExercise = exercises[currentExerciseIndex];

  useEffect(() => {
    let interval = null;
    if (isActive && isResting) {
      interval = setInterval(() => {
        setRestTime(prevTime => {
          if (prevTime <= 1) {
            setIsResting(false);
            setIsActive(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            return 90; // Reset rest time
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (isActive && !isResting) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isResting, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRest = async () => {
    await Haptics.selectionAsync();
    setIsResting(true);
    setIsActive(true);
    setRestTime(currentExercise.restTime);
  };

  const handleCompleteSet = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
      handleStartRest();
    } else {
      // Exercise completed
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setIsResting(false);
        setIsActive(false);
      } else {
        // Workout completed
        router.push("/(tabs)/home");
      }
    }
  };

  const handleSkipRest = async () => {
    await Haptics.selectionAsync();
    setIsResting(false);
    setIsActive(false);
    setRestTime(90);
  };

  const handleNextExercise = async () => {
    await Haptics.selectionAsync();
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setIsResting(false);
      setIsActive(false);
    }
  };

  const handlePreviousExercise = async () => {
    await Haptics.selectionAsync();
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setCurrentSet(1);
      setIsResting(false);
      setIsActive(false);
    }
  };

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
          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 16,
              padding: 12,
            }}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={isDark ? "#FFFFFF" : "#000000"} strokeWidth={2} />
          </TouchableOpacity>
          
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 18,
                color: isDark ? "#FFFFFF" : "#000000",
              }}
            >
              {workout.title}
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 14,
                color: isDark ? "#999999" : "#666666",
              }}
            >
              Exercise {currentExerciseIndex + 1} of {exercises.length}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#EF4444",
              borderRadius: 16,
              padding: 12,
            }}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Rest Timer Overlay */}
      {isResting && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <View
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 24,
              padding: 40,
              alignItems: "center",
              marginHorizontal: 40,
            }}
          >
            <View
              style={{
                backgroundColor: "#FFD700",
                borderRadius: 20,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <Timer size={32} color="#000000" strokeWidth={2} />
            </View>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 48,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 8,
              }}
            >
              {formatTime(restTime)}
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 18,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 4,
              }}
            >
              Rest Time
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 14,
                color: isDark ? "#999999" : "#666666",
                textAlign: "center",
                marginBottom: 32,
              }}
            >
              Take a breather before your next set
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFD700",
                borderRadius: 16,
                paddingHorizontal: 32,
                paddingVertical: 16,
              }}
              activeOpacity={0.8}
              onPress={handleSkipRest}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 16,
                  color: "#000000",
                }}
              >
                Skip Rest
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Exercise Info */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 20,
              padding: 24,
              borderWidth: workout.isAI ? 2 : 0,
              borderColor: workout.isAI ? "#FFD700" : "transparent",
            }}
          >
            {workout.isAI && (
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                <View
                  style={{
                    backgroundColor: "#FFD700",
                    borderRadius: 8,
                    padding: 6,
                    marginRight: 8,
                  }}
                >
                  <Brain size={16} color="#000000" strokeWidth={2} />
                </View>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 14,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  AI Personalized
                </Text>
              </View>
            )}

            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 28,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 12,
              }}
            >
              {currentExercise.name}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <View
                style={{
                  backgroundColor: isDark ? "#2A2A2A" : "#F8F8F8",
                  borderRadius: 8,
                  padding: 6,
                  marginRight: 8,
                }}
              >
                <Target size={16} color={isDark ? "#FFFFFF" : "#000000"} strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 14,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                {currentExercise.targetMuscles.join(", ")}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: isDark ? "#2A2A2A" : "#F8F8F8",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 16,
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginBottom: 8,
                }}
              >
                Instructions
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 14,
                  color: isDark ? "#CCCCCC" : "#666666",
                  lineHeight: 20,
                  marginBottom: 8,
                }}
              >
                {currentExercise.instructions}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 13,
                  color: "#FFD700",
                  fontStyle: "italic",
                }}
              >
                💡 {currentExercise.tips}
              </Text>
            </View>
          </View>
        </View>

        {/* Current Set Info */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 16,
                  color: isDark ? "#999999" : "#666666",
                  marginBottom: 8,
                }}
              >
                Current Set
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 48,
                  color: "#FFD700",
                  marginBottom: 4,
                }}
              >
                {currentSet}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 14,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                of {currentExercise.sets} sets
              </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 12,
                    color: isDark ? "#999999" : "#666666",
                    marginBottom: 4,
                  }}
                >
                  Reps
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_600SemiBold",
                    fontSize: 20,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {currentExercise.reps}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 12,
                    color: isDark ? "#999999" : "#666666",
                    marginBottom: 4,
                  }}
                >
                  Weight
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_600SemiBold",
                    fontSize: 20,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {currentExercise.weight}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 12,
                    color: isDark ? "#999999" : "#666666",
                    marginBottom: 4,
                  }}
                >
                  Rest
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_600SemiBold",
                    fontSize: 20,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {currentExercise.restTime}s
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Exercise Progress */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_500Medium",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 12,
            }}
          >
            Exercise Progress
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {Array.from({ length: currentExercise.sets }).map((_, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: index < currentSet ? "#FFD700" : (isDark ? "#2A2A2A" : "#F0F0F0"),
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Controls */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#2A2A2A" : "#F8F8F8",
              borderRadius: 16,
              padding: 16,
            }}
            activeOpacity={0.8}
            onPress={handlePreviousExercise}
            disabled={currentExerciseIndex === 0}
          >
            <RotateCcw 
              size={24} 
              color={currentExerciseIndex === 0 ? (isDark ? "#666666" : "#CCCCCC") : (isDark ? "#FFFFFF" : "#000000")} 
              strokeWidth={2} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#FFD700",
              borderRadius: 20,
              paddingHorizontal: 32,
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
            activeOpacity={0.8}
            onPress={handleCompleteSet}
          >
            <Check size={24} color="#000000" strokeWidth={2} />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 18,
                color: "#000000",
                marginLeft: 8,
              }}
            >
              Complete Set
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#2A2A2A" : "#F8F8F8",
              borderRadius: 16,
              padding: 16,
            }}
            activeOpacity={0.8}
            onPress={handleNextExercise}
            disabled={currentExerciseIndex === exercises.length - 1}
          >
            <SkipForward 
              size={24} 
              color={currentExerciseIndex === exercises.length - 1 ? (isDark ? "#666666" : "#CCCCCC") : (isDark ? "#FFFFFF" : "#000000")} 
              strokeWidth={2} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}