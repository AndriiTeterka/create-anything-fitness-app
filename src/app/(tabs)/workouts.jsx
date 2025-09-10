import React, { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Animated,
  Platform,
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
import { useWorkoutsUIStore, FILTERS } from "../../utils/workouts/uiStore";
import {
  fetchAIRecommended,
  fetchMyWorkouts,
  fetchRecentWorkouts,
  fetchWorkoutCounts,
  DIFFICULTY_COLORS,
} from "../../utils/workouts/data";

export default function Workouts() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const activeFilter = useWorkoutsUIStore((s) => s.activeFilter);
  const setActiveFilter = useWorkoutsUIStore((s) => s.setActiveFilter);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({ my: 0, recent: 0, ai: 0 });
  const fade = useRef(new Animated.Value(0)).current;
  const requestIdRef = useRef(0);
  const [isSwitching, setIsSwitching] = useState(true); // hide list until first load completes
  const firstLoadRef = useRef(true);
  const listRef = useRef(null);
  const CARD_TOTAL_HEIGHT = 184; // approx card height + spacing for getItemLayout

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });
  const getDifficultyColor = (difficulty) => DIFFICULTY_COLORS[difficulty] || (isDark ? "#6B7280" : "#6B7280");

  const filters = useMemo(
    () => [
      { key: FILTERS.MY, label: "My Workouts", count: counts.my },
      { key: FILTERS.RECENT, label: "Recent", count: counts.recent },
      { key: FILTERS.AI, label: "AI Picks", count: counts.ai },
    ],
    [counts]
  );

  const loadCounts = async () => {
    try {
      const c = await fetchWorkoutCounts();
      setCounts(c);
    } catch (e) {
      // ignore for now
    }
  };

  const loadItems = async (filter) => {
    const reqId = ++requestIdRef.current;
    setIsSwitching(true);
    // Immediately hide current list to prevent previous content flashing
    fade.stopAnimation();
    fade.setValue(0);
    // Keep previous items until swap to reduce visible state churn
    // Ensure list is at top for new dataset
    try { listRef.current?.scrollToOffset({ offset: 0, animated: false }); } catch {}
    // Start fetch in parallel with fade-out
    const fetchPromise = (async () => {
      let data = [];
      if (filter === FILTERS.MY) data = await fetchMyWorkouts();
      else if (filter === FILTERS.RECENT) data = await fetchRecentWorkouts({ withinDays: 30 });
      else data = await fetchAIRecommended();
      return data;
    })();

    const fadeTo = (toValue, duration) =>
      new Promise((resolve) =>
        Animated.timing(fade, { toValue, duration, useNativeDriver: true }).start(() => resolve())
      );

    try {
      await fadeTo(0, 0); // already hidden; ensure value locked
      const data = await fetchPromise; // wait for new data
      if (reqId !== requestIdRef.current) return; // stale request, ignore
      setItems(data); // swap while invisible
      setIsSwitching(false); // mount new list
      if (firstLoadRef.current) {
        // first load: avoid any perceived flicker by setting instantly
        fade.setValue(1);
        firstLoadRef.current = false;
      } else {
        await fadeTo(1, 180); // fade back in with new list
      }
    } catch (e) {
      if (reqId !== requestIdRef.current) return;
      // keep current items but restore opacity
      setIsSwitching(false);
      await fadeTo(1, 120);
    } finally {
      if (reqId === requestIdRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      loadItems(activeFilter);
    }
  }, [activeFilter, fontsLoaded]);

  const WorkoutCard = ({ workout, index = 0 }) => {
    const appear = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      if (index > 5) {
        // Render below-the-fold items immediately to keep FPS high
        appear.setValue(1);
        return;
      }
      appear.setValue(0);
      Animated.spring(appear, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 80,
        delay: Math.min(index, 5) * 30,
      }).start();
    }, [workout?.id]);

    const translateY = appear.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });
    const scale = appear.interpolate({ inputRange: [0, 1], outputRange: [0.99, 1] });

    return (
      <Animated.View
        renderToHardwareTextureAndroid
        shouldRasterizeIOS
        style={{ opacity: appear, transform: [{ translateY }, { scale }] }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
            borderRadius: 20,
            padding: 20,
            marginBottom: 16,
            borderWidth: workout.isAI ? 2 : 1,
            borderColor: workout.isAI ? "#FFD700" : (isDark ? "#1F1F1F" : "#EAEAEA"),
            shadowColor: "#000",
            shadowOpacity: Platform.OS === 'ios' ? 0.12 : 0,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 4 },
            elevation: 1,
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
              {workout.type || (workout.isAI ? "AI Recommended" : "Workout")}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 20,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 4,
            }}
          >
            {workout.title}
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 13,
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
      </Animated.View>
    );
  };

  const MemoWorkoutCard = memo(WorkoutCard);
  const renderItem = useCallback(({ item, index }) => (
    <MemoWorkoutCard workout={item} index={index} />
  ), [isDark]);
  const keyExtractor = useCallback((item) => String(item.id), []);

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
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}
            activeOpacity={0.8}
            onPress={() => router.push("/workout-builder")}
          >
            <Plus size={24} color="#000000" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: isDark ? "#2A2A2A" : "#EAEAEA",
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
              borderWidth: 1,
              borderColor: isDark ? "#2A2A2A" : "#EAEAEA",
            }}
            activeOpacity={0.8}
          >
            <Filter size={20} color={isDark ? "#FFFFFF" : "#000000"} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters Tabs */}
      <View style={{ paddingHorizontal: 24, marginBottom: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
          {filters.map((f) => {
            const selected = activeFilter === f.key;
            return (
              <TouchableOpacity
                key={f.key}
                onPress={() => setActiveFilter(f.key)}
                activeOpacity={0.8}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                accessibilityLabel={f.label}
                style={{
                  flex: 1,
                  backgroundColor: selected ? "#FFD700" : isDark ? "#1A1A1A" : "#FFFFFF",
                  borderRadius: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 6,
                  borderWidth: selected ? 0 : 1,
                  borderColor: isDark ? "#2A2A2A" : "#EAEAEA",
                }}
              >
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_600SemiBold",
                    fontSize: 14,
                    color: selected ? "#000000" : isDark ? "#FFFFFF" : "#000000",
                    flexShrink: 1,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {f.label}
                </Text>
                <View
                  style={{
                    minWidth: 24,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 12,
                    backgroundColor: selected ? "#000000" : isDark ? "#2A2A2A" : "#F0F0F0",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_500Medium",
                      fontSize: 12,
                      color: selected ? "#FFD700" : isDark ? "#FFFFFF" : "#000000",
                    }}
                  >
                    {f.count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Workout List */}
      <Animated.View style={{ flex: 1, opacity: fade }}>
        {
          (!isSwitching) && (
          <FlatList
            ref={listRef}
            key={activeFilter}
            data={items}
            keyExtractor={keyExtractor}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 140 }}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={4}
            updateCellsBatchingPeriod={80}
            windowSize={6}
            removeClippedSubviews={true}
            renderItem={renderItem}
            getItemLayout={(data, index) => ({ length: CARD_TOTAL_HEIGHT, offset: CARD_TOTAL_HEIGHT * index, index })}
            ListEmptyComponent={() => (
              <View style={{ paddingTop: 40, alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'PlusJakartaSans_600SemiBold',
                    fontSize: 18,
                    color: isDark ? '#FFFFFF' : '#000000',
                  }}
                >
                  No workouts here yet
                </Text>
                <Text
                  style={{
                    fontFamily: 'PlusJakartaSans_400Regular',
                    fontSize: 14,
                    color: isDark ? '#CCCCCC' : '#666666',
                    marginTop: 8,
                    textAlign: 'center',
                    paddingHorizontal: 24,
                  }}
                >
                  {activeFilter === FILTERS.MY
                    ? 'Create or save workouts to see them here.'
                    : activeFilter === FILTERS.RECENT
                    ? 'Your recently accessed workouts will appear here.'
                    : 'AI recommendations will appear here based on your activity.'}
                </Text>
              </View>
            )}
          />)
        }
      </Animated.View>
    </View>
  );
}
