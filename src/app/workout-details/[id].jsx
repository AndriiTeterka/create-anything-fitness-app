import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Play,
  Clock,
  Target,
  Zap,
  Brain,
  Bookmark,
  Share,
  Info,
  Users,
  TrendingUp,
  Dumbbell,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { getWorkoutById as getWorkoutFromData } from "../../utils/workouts/data";
import { useWorkoutsStore } from "../../utils/workouts/store";
import useUser from "../../utils/auth/useUser";

export default function WorkoutDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useUser();

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  useEffect(() => {
    fetchWorkoutDetails();
  }, [id]);

  const fetchWorkoutDetails = async () => {
    try {
      const fromData = getWorkoutFromData(id);
      const workoutDetails = fromData || getStaticWorkoutById(id);
      setWorkout(workoutDetails);
      // record recent access
      try {
        const userKeyFor = useWorkoutsStore.getState().userKeyFor;
        const recordAccess = useWorkoutsStore.getState().recordAccess;
        recordAccess(userKeyFor(user), id);
      } catch {}
    } catch (error) {
      console.error("Error fetching workout details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStaticWorkoutById = (workoutId) => {
    const workouts = {
      1: {
        id: 1,
        title: "Upper Body Blast",
        type: "AI Recommended",
        duration: "45 min",
        exercises: 8,
        difficulty: "Intermediate",
        category: "Strength",
        description:
          "A comprehensive upper body strength workout designed to build muscle and improve overall upper body power. Perfect for intermediate fitness levels.",
        isAI: true,
        targetMuscles: ["Chest", "Back", "Shoulders", "Arms"],
        equipment: ["Dumbbells", "Pull-up bar", "Bench"],
        calories: 420,
        rating: 4.8,
        completions: 1247,
        adaptations:
          "Personalized based on your strength level and available equipment",
        exercises: [
          {
            id: 1,
            name: "Push-ups",
            sets: 3,
            reps: "12-15",
            rest: "60 sec",
            muscle: "Chest, Triceps",
            difficulty: "Beginner",
            description: "Classic bodyweight exercise for chest and tricep development",
            tips:
              "Keep your body straight and lower until chest almost touches ground",
          },
          {
            id: 2,
            name: "Dumbbell Rows",
            sets: 3,
            reps: "10-12",
            rest: "90 sec",
            muscle: "Back, Biceps",
            difficulty: "Intermediate",
            description: "Single-arm dumbbell rows for back width and thickness",
            tips: "Squeeze shoulder blades together at the top of the movement",
          },
          {
            id: 3,
            name: "Overhead Press",
            sets: 3,
            reps: "8-10",
            rest: "90 sec",
            muscle: "Shoulders, Triceps",
            difficulty: "Intermediate",
            description:
              "Standing overhead press for shoulder strength and stability",
            tips: "Keep core tight and avoid arching your back excessively",
          },
          {
            id: 4,
            name: "Plank",
            sets: 3,
            reps: "45-60 sec",
            rest: "60 sec",
            muscle: "Core, Shoulders",
            difficulty: "Beginner",
            description: "Isometric hold for core strength and stability",
            tips: "Keep body straight from head to heels, breathe normally",
          },
          {
            id: 5,
            name: "Pull-ups",
            sets: 3,
            reps: "5-8",
            rest: "120 sec",
            muscle: "Back, Biceps",
            difficulty: "Advanced",
            description: "Compound pulling exercise for upper body strength",
            tips: "Full range of motion, chin over bar at top",
          },
          {
            id: 6,
            name: "Tricep Dips",
            sets: 3,
            reps: "10-15",
            rest: "90 sec",
            muscle: "Triceps, Chest",
            difficulty: "Intermediate",
            description: "Bodyweight exercise targeting triceps and chest",
            tips: "Lower until shoulders are below elbows, keep torso upright",
          },
          {
            id: 7,
            name: "Bicep Curls",
            sets: 3,
            reps: "12-15",
            rest: "60 sec",
            muscle: "Biceps",
            difficulty: "Beginner",
            description: "Isolation exercise for bicep development",
            tips: "Control the weight on both up and down phases",
          },
          {
            id: 8,
            name: "Face Pulls",
            sets: 3,
            reps: "15-20",
            rest: "60 sec",
            muscle: "Rear Delts, Rhomboids",
            difficulty: "Beginner",
            description:
              "Cable exercise for rear deltoid and upper back strength",
            tips: "Pull to face level, squeeze shoulder blades together",
          },
        ],
      },
      2: {
        id: 2,
        title: "Morning Cardio",
        type: "Popular",
        duration: "30 min",
        exercises: 6,
        difficulty: "Beginner",
        category: "Cardio",
        description:
          "High-energy cardio workout to kickstart your day. Perfect for beginners looking to improve cardiovascular fitness.",
        isAI: false,
        targetMuscles: ["Full Body", "Cardiovascular System"],
        equipment: ["None"],
        calories: 280,
        rating: 4.6,
        completions: 2341,
        exercises: [
          {
            id: 1,
            name: "Jumping Jacks",
            sets: 4,
            reps: "30 sec",
            rest: "30 sec",
            muscle: "Full Body",
            difficulty: "Beginner",
            description: "Classic cardio exercise to warm up the entire body",
            tips: "Land softly and keep a steady rhythm",
          },
          {
            id: 2,
            name: "High Knees",
            sets: 4,
            reps: "30 sec",
            rest: "30 sec",
            muscle: "Legs, Core",
            difficulty: "Beginner",
            description: "Running in place with high knee lifts",
            tips: "Pump your arms and lift knees to waist height",
          },
          {
            id: 3,
            name: "Burpees",
            sets: 3,
            reps: "8-10",
            rest: "60 sec",
            muscle: "Full Body",
            difficulty: "Intermediate",
            description: "Full body exercise combining squat, plank, and jump",
            tips: "Maintain good form even when tired",
          },
          {
            id: 4,
            name: "Mountain Climbers",
            sets: 4,
            reps: "30 sec",
            rest: "30 sec",
            muscle: "Core, Shoulders",
            difficulty: "Intermediate",
            description:
              "Dynamic plank variation for cardio and core strength",
            tips: "Keep hips level and maintain plank position",
          },
          {
            id: 5,
            name: "Jump Squats",
            sets: 3,
            reps: "12-15",
            rest: "60 sec",
            muscle: "Legs, Glutes",
            difficulty: "Intermediate",
            description: "Explosive squat variation for power development",
            tips: "Land softly and immediately go into next rep",
          },
          {
            id: 6,
            name: "Cool Down Walk",
            sets: 1,
            reps: "3-5 min",
            rest: "0 sec",
            muscle: "Full Body",
            difficulty: "Beginner",
            description: "Gentle walking to gradually reduce heart rate",
            tips: "Focus on deep breathing and gentle stretching",
          },
        ],
      },
    };

    return workouts[workoutId] || workouts[1];
  };

  // Normalize exercises data from different sources
  const exercisesList = Array.isArray(workout?.exercises)
    ? workout.exercises
    : [];
  const exercisesCount = Array.isArray(workout?.exercises)
    ? workout.exercises.length
    : typeof workout?.exercises === "number"
    ? workout.exercises
    : 0;

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

  const ExerciseCard = ({ exercise, index }) => (
    <View
      style={{
        backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            <View
              style={{
                backgroundColor: "#FFD700",
                borderRadius: 12,
                width: 24,
                height: 24,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 12,
                  color: "#000000",
                }}
              >
                {index + 1}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 16,
                color: isDark ? "#FFFFFF" : "#000000",
              }}
            >
              {exercise.name}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 13,
              color: isDark ? "#CCCCCC" : "#666666",
              marginLeft: 36,
              marginBottom: 8,
            }}
          >
            {exercise.muscle}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: getDifficultyColor(exercise.difficulty),
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "PlusJakartaSans_500Medium",
              fontSize: 10,
              color: "#000000",
            }}
          >
            {exercise.difficulty}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isDark ? "#2A2A2A" : "#F8F8F8",
          borderRadius: 12,
          padding: 12,
          marginBottom: 12,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#000000",
            }}
          >
            {exercise.sets}
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 11,
              color: isDark ? "#999999" : "#666666",
            }}
          >
            Sets
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#000000",
            }}
          >
            {exercise.reps}
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 11,
              color: isDark ? "#999999" : "#666666",
            }}
          >
            Reps
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#000000",
            }}
          >
            {exercise.rest}
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 11,
              color: isDark ? "#999999" : "#666666",
            }}
          >
            Rest
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontFamily: "PlusJakartaSans_400Regular",
          fontSize: 13,
          color: isDark ? "#CCCCCC" : "#666666",
          marginBottom: 8,
        }}
      >
        {exercise.description}
      </Text>

      <View
        style={{
          backgroundColor: isDark ? "#2A2A2A" : "#F0F9FF",
          borderRadius: 8,
          padding: 10,
          borderLeftWidth: 3,
          borderLeftColor: "#FFD700",
        }}
      >
        <Text
          style={{
            fontFamily: "PlusJakartaSans_500Medium",
            fontSize: 12,
            color: isDark ? "#FFD700" : "#1D4ED8",
            marginBottom: 2,
          }}
        >
          💡 Pro Tip
        </Text>
        <Text
          style={{
            fontFamily: "PlusJakartaSans_400Regular",
            fontSize: 12,
            color: isDark ? "#CCCCCC" : "#374151",
          }}
        >
          {exercise.tips}
        </Text>
      </View>
    </View>
  );

  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDark ? "#000000" : "#FFFEF7",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "PlusJakartaSans_500Medium",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
          }}
        >
          Loading workout...
        </Text>
      </View>
    );
  }

  if (!workout) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDark ? "#000000" : "#FFFEF7",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "PlusJakartaSans_500Medium",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
          }}
        >
          Workout not found
        </Text>
      </View>
    );
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
            borderRadius: 12,
            padding: 12,
          }}
          activeOpacity={0.8}
        >
          <ArrowLeft size={24} color={isDark ? "#FFFFFF" : "#000000"} strokeWidth={2} />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            onPress={() => setIsBookmarked(!isBookmarked)}
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 12,
              padding: 12,
            }}
            activeOpacity={0.8}
          >
            <Bookmark
              size={24}
              color={isBookmarked ? "#FFD700" : isDark ? "#FFFFFF" : "#000000"}
              fill={isBookmarked ? "#FFD700" : "none"}
              strokeWidth={2}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 12,
              padding: 12,
            }}
            activeOpacity={0.8}
          >
            <Share size={24} color={isDark ? "#FFFFFF" : "#000000"} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Workout Header */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            {workout.isAI && (
              <View
                style={{
                  backgroundColor: "#FFD700",
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginRight: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Brain size={12} color="#000000" strokeWidth={2} />
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 10,
                    color: "#000000",
                    marginLeft: 4,
                  }}
                >
                  AI
                </Text>
              </View>
            )}
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 14,
                color: isDark ? "#999999" : "#666666",
              }}
            >
              {workout.type}
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 28,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 8,
            }}
          >
            {workout.title}
          </Text>

          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 16,
              color: isDark ? "#CCCCCC" : "#666666",
              marginBottom: 20,
              lineHeight: 24,
            }}
          >
            {workout.description}
          </Text>

          {/* Stats Row */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 8,
                }}
              >
                <Clock size={24} color="#FFD700" strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 14,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                {workout.duration}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                Duration
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 8,
                }}
              >
                <Target size={24} color="#FFD700" strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 14,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                {Array.isArray(workout.exercises) ? workout.exercises.length : workout.exercises} exercises
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                Exercises
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 8,
                }}
              >
                <Zap size={24} color="#FFD700" strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 14,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                {workout.calories} cal
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                Calories
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: getDifficultyColor(workout.difficulty),
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 8,
                }}
              >
                <TrendingUp size={24} color="#000000" strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 14,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                {workout.difficulty}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#666666",
                }}
              >
                Level
              </Text>
            </View>
          </View>

          {/* Additional Info */}
          <View
            style={{
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Info size={16} color="#FFD700" strokeWidth={2} />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 14,
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginLeft: 8,
                }}
              >
                Workout Details
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 13,
                    color: isDark ? "#999999" : "#666666",
                  }}
                >
                  Target Muscles:
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 13,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {workout.targetMuscles?.join(", ")}
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 13,
                    color: isDark ? "#999999" : "#666666",
                  }}
                >
                  Equipment:
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 13,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {workout.equipment?.join(", ")}
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 13,
                    color: isDark ? "#999999" : "#666666",
                  }}
                >
                  Rating:
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 13,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  ⭐ {workout.rating} ({workout.completions} completions)
                </Text>
              </View>
            </View>
          </View>

          {/* AI Adaptations (if applicable) */}
          {workout.isAI && workout.adaptations && (
            <View
              style={{
                backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                marginBottom: 24,
                borderWidth: 2,
                borderColor: "#FFD700",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <Brain size={16} color="#FFD700" strokeWidth={2} />
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 14,
                    color: isDark ? "#FFFFFF" : "#000000",
                    marginLeft: 8,
                  }}
                >
                  AI Personalization
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 13,
                  color: isDark ? "#CCCCCC" : "#666666",
                }}
              >
                {workout.adaptations}
              </Text>
            </View>
          )}
        </View>

        {/* Exercises List */}
        <Text
          style={{
            fontFamily: "PlusJakartaSans_600SemiBold",
            fontSize: 20,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 16,
          }}
        >
          Exercises ({exercisesCount})
        </Text>
        {exercisesList.map((exercise, index) => (
          <ExerciseCard key={exercise.id ?? index} exercise={exercise} index={index} />
        ))}
      </ScrollView>

      {/* Fixed Start Button */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 20,
          left: 24,
          right: 24,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#FFD700",
            borderRadius: 20,
            paddingVertical: 18,
            paddingHorizontal: 32,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
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
          onPress={() =>
            router.push({
              pathname: "/workout-session",
              params: { workoutId: workout.id, workoutTitle: workout.title },
            })
          }
        >
          <Play size={24} color="#000000" strokeWidth={2} />
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 18,
              color: "#000000",
              marginLeft: 12,
            }}
          >
            Start Workout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


