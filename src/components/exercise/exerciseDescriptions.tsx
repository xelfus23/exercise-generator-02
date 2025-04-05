import {
    HomeStackParamList,
    MainExerciseParams,
    ExerciseStackParamList,
} from "@/src/types/stackType";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import {
    lg,
    md,
    OutfitBold,
    OutfitRegular,
    sm,
    xl,
    xxl,
    xxxl,
} from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Text,
    View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type ExerciseDescriptionNavigationProp = StackNavigationProp<
    ExerciseStackParamList,
    "mainExercise" // The screen you are navigating *from* within ExerciseNavigator
>;

interface Props {
    closeDescription: () => void;
    item: any;
    zIndex: number;
    viewRef: Animated.Value;
    isShown: boolean;
}

const ExerciseDescription: React.FC<Props> = ({
    item,
    zIndex,
    closeDescription,
    viewRef,
    isShown,
}) => {
    const colors = useThemeColors();
    const [sets, setSets] = useState(1);
    const [reps, setReps] = useState(1);
    const [duration, setDuration] = useState(5);
    const [distance, setDistance] = useState(5);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const navigation = useNavigation<ExerciseDescriptionNavigationProp>();

    useEffect(() => {
        if (item?.exercise) {
            setSets(item.exercise.sets || 1);
            setReps(item.exercise.reps || 1);
            setDuration(item.exercise.duration || 5);
            setDistance(item.exercise.distance?.value || 5);
        }
    }, [item]);

    const completed = item?.exercise?.completed;
    const exerciseType = item?.exercise?.type || "reps";

    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        return (
            minutes.toString().padStart(2, "0") +
            ":" +
            (seconds % 60).toString().padStart(2, "0")
        );
    };

    // Handles both tap and hold events
    const changeValue = (type: string, change: number, isHold: boolean) => {
        if (isHold) {
            stopChange(); // Ensure only one interval runs at a time
            intervalRef.current = setInterval(() => {
                updateValue(type, change);
            }, 100);
        } else {
            updateValue(type, change); // Immediate update on tap
        }
    };

    const updateValue = (type: string, change: number) => {
        switch (type) {
            case "reps":
                setReps((prev) => Math.max(1, prev + change));
                break;
            case "duration":
                setDuration((prev) => Math.max(5, prev + change));
                break;
            case "distance":
                setDistance((prev) => Math.max(1, prev + change));
                break;
            case "sets":
                setSets((prev) => Math.max(1, prev + change));
                break;
        }
    };

    const stopChange = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const typeConfig = {
        reps: { value: `${reps}x` },
        duration: { value: formatTime(duration) },
        distance: {
            value: distance + " " + (item.exercise.distance?.type || "m"),
        },
    } as any;

    const details = [
        {
            label: "Description",
            value: (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: sm,
                            fontFamily: OutfitRegular,
                        }}
                    >
                        {item?.exercise?.description}
                    </Text>
                </View>
            ),
        },
        {
            label: "Instructions",
            value: (
                <View style={{ gap: HP(1) }}>
                    {item?.exercise?.instructions?.map(
                        (v: string, i: number) => (
                            <View key={i} style={{ flexDirection: "row" }}>
                                <Text
                                    style={{
                                        fontFamily: OutfitRegular,
                                        fontSize: sm,
                                        color: colors.text,
                                    }}
                                >
                                    {i + 1}.{" "}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: OutfitRegular,
                                        fontSize: sm,
                                        color: colors.text,
                                    }}
                                >
                                    {capitalize(v)}
                                </Text>
                            </View>
                        )
                    )}
                </View>
            ),
        },
        {
            label: "Reminders",
            value: (
                <View style={{ gap: HP(1) }}>
                    {item?.exercise?.reminders?.map((v: string, i: number) => (
                        <View
                            key={i}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: colors.text }}>• </Text>
                            <Text
                                style={{
                                    fontFamily: OutfitRegular,
                                    fontSize: sm,
                                    color: colors.text,
                                    borderRadius: WP(2),
                                }}
                            >
                                {capitalize(v)}
                            </Text>
                        </View>
                    ))}
                </View>
            ),
        },
        {
            label: "Benefits",
            value: (
                <View style={{ gap: HP(1) }}>
                    {item?.exercise?.benefits?.map((v: string, i: number) => (
                        <View
                            key={i}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: colors.text }}>• </Text>
                            <Text
                                style={{
                                    fontFamily: OutfitRegular,
                                    fontSize: sm,
                                    color: colors.text,
                                    borderRadius: WP(2),
                                }}
                            >
                                {capitalize(v)}
                            </Text>
                        </View>
                    ))}
                </View>
            ),
        },
        {
            label: "Estimated Calorie Burn",
            value: (
                <View style={{ gap: HP(1) }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: WP(2),
                        }}
                    >
                        <Text style={{ color: colors.text }}>• </Text>
                        <Text
                            style={{
                                fontFamily: OutfitRegular,
                                fontSize: sm,
                                color: colors.text,
                                borderRadius: WP(2),
                            }}
                        >
                            {item.exercise.calorieBurn} cal
                        </Text>
                        <View style={{ width: WP(3), aspectRatio: 1 }}>
                            <Image
                                source={require("@/src/assets/images/ui/icons-svg/flame-icon.svg")}
                                style={{ flex: 1, aspectRatio: 1 }}
                            />
                        </View>
                    </View>
                </View>
            ),
        },
        {
            label: "Muscle Groups",
            value: (
                <View style={{ flexDirection: "row", gap: WP(2) }}>
                    {item?.exercise?.muscleGroups?.map(
                        (v: string, i: number) => (
                            <Text
                                key={i}
                                style={{
                                    fontFamily: OutfitRegular,
                                    fontSize: sm,
                                    color: colors.white,
                                    backgroundColor: colors.secondary,
                                    padding: WP(2),
                                    borderRadius: WP(2),
                                }}
                            >
                                {capitalize(v)}
                            </Text>
                        )
                    )}
                </View>
            ),
        },
        {
            label: "Equipments",
            value: (
                <View style={{ flexDirection: "row", gap: WP(2) }}>
                    {item?.exercise?.equipment?.map((v: string, i: number) => (
                        <Text
                            key={i}
                            style={{
                                fontFamily: OutfitRegular,
                                fontSize: sm,
                                color: colors.white,
                                backgroundColor: colors.secondary,
                                padding: WP(2),
                                borderRadius: WP(2),
                            }}
                        >
                            {capitalize(v)}
                        </Text>
                    ))}
                </View>
            ),
        },
    ];

    return (
        <>
            {/* Background Overlay */}
            <Pressable
                style={{
                    height: HP(100),
                    width: WP(100),
                    position: "absolute",
                    justifyContent: "flex-end",
                }}
                onPress={closeDescription}
                pointerEvents={isShown ? "auto" : "none"}
            />

            {/* Animated Modal */}
            <Animated.View
                style={{
                    height: HP(75),
                    width: WP(100),
                    backgroundColor: colors.card,
                    zIndex: zIndex,
                    transform: [{ translateY: viewRef }],
                    borderTopLeftRadius: WP(4),
                    borderTopRightRadius: WP(4),
                    borderTopWidth: 1,
                    borderLeftWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: colors.secondary,
                    position: "absolute",
                    bottom: 0,
                    paddingTop: HP(2),
                }}
            >
                <View style={{ padding: WP(4), gap: WP(4) }}>
                    <Text
                        style={{
                            fontSize: xl,
                            fontFamily: OutfitBold,
                            color: colors.text,
                        }}
                    >
                        {item?.exercise?.name || "Exercise"}
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                        }}
                    >
                        <TouchableOpacity
                            disabled={completed}
                            onPress={() => {
                                navigation.navigate("exerciseScreen", {
                                    item: item,
                                    sets: sets,
                                    value: duration || distance || reps,
                                });
                            }}
                        >
                            <AntDesign
                                name="play"
                                size={xxxl}
                                color={
                                    completed ? colors.success : colors.primary
                                }
                            />
                        </TouchableOpacity>

                        {/* Exercise Adjustments */}
                        <View style={{ gap: HP(1) }}>
                            {["sets", exerciseType].map((type, index) => (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: WP(4),
                                        width: WP(40),
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: colors.text,
                                            fontSize: sm,
                                            fontFamily: OutfitRegular,
                                        }}
                                    >
                                        {capitalize(type)}:
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            type === "duration"
                                                ? changeValue(type, -5, false)
                                                : changeValue(type, -1, false)
                                        } // Instant increase on tap
                                        onPressIn={() =>
                                            type === "duration"
                                                ? changeValue(type, -5, true)
                                                : changeValue(type, -1, true)
                                        } // Hold to increase continuously
                                        onPressOut={stopChange}
                                    >
                                        <AntDesign
                                            name="minuscircle"
                                            size={md}
                                            color={colors.error}
                                        />
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            color: colors.text,
                                            fontSize: sm,
                                            fontFamily: OutfitRegular,
                                            width: WP(10),
                                            textAlign: "center",
                                        }}
                                    >
                                        {type === "sets"
                                            ? `${sets}x`
                                            : typeConfig[exerciseType].value}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            type === "duration"
                                                ? changeValue(type, +5, false)
                                                : changeValue(type, +1, false)
                                        } // Instant increase on tap
                                        onPressIn={() =>
                                            type === "duration"
                                                ? changeValue(type, +5, true)
                                                : changeValue(type, +1, true)
                                        } // Hold to increase continuously
                                        onPressOut={stopChange}
                                    >
                                        <AntDesign
                                            name="pluscircle"
                                            size={md}
                                            color={colors.success}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* ------------------------------------------------------------------------------------------ */}
                <ScrollView
                    style={{
                        borderWidth: 1,
                        borderColor: colors.secondary,
                        borderTopLeftRadius: WP(4),
                        borderTopRightRadius: WP(4),
                        borderTopWidth: 0.5,
                        borderLeftWidth: 0.5,
                        borderRightWidth: 0.5,
                    }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    overScrollMode="never"
                >
                    {details.map((item, i) => {
                        const moveToRight = useRef<Animated.Value>(
                            new Animated.Value(-WP(40))
                        ).current;

                        const moveToLeft = useRef<Animated.Value>(
                            new Animated.Value(WP(40))
                        ).current;

                        const fadeIn = useRef<Animated.Value>(
                            new Animated.Value(0)
                        ).current;

                        useEffect(() => {
                            Animated.parallel([
                                Animated.timing(moveToRight, {
                                    toValue: 0,
                                    duration: 500,
                                    delay: 100 * i,
                                    useNativeDriver: true,
                                }),

                                Animated.timing(fadeIn, {
                                    toValue: 1,
                                    duration: 500,
                                    delay: 100 * i,
                                    useNativeDriver: true,
                                }),
                            ]).start();
                        }, []);

                        return (
                            <View
                                key={i}
                                style={{
                                    padding: WP(4),
                                    gap: HP(1),
                                    backgroundColor: colors.background,
                                }}
                            >
                                <Animated.View
                                    style={{
                                        flexDirection: "row",
                                        transform: [
                                            { translateX: moveToRight },
                                        ],
                                        alignItems: "center",
                                        opacity: fadeIn,
                                    }}
                                >
                                    {/* <Octicons
                                        name="dot-fill"
                                        size={sm}
                                        color={colors.text}
                                        style={{ marginRight: WP(2) }}
                                    /> */}
                                    <Text
                                        style={{
                                            color: colors.text,
                                            fontSize: lg,
                                            fontFamily: OutfitRegular,
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                </Animated.View>
                                <Animated.View
                                    style={{
                                        transform: [
                                            { translateX: moveToRight },
                                        ],
                                        opacity: fadeIn,
                                    }}
                                >
                                    {item.value}
                                </Animated.View>
                            </View>
                        );
                    })}
                </ScrollView>
            </Animated.View>
        </>
    );
};

export default ExerciseDescription;
