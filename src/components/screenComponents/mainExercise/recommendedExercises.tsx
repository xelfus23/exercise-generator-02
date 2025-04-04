import {
    Animated,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { md, OutfitBold, OutfitRegular, xl } from "@/src/hooks/useFonts";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "@/src/services/auth/authentication";
interface props {
    onItemPress: (item: any) => void;
}

const RecommendedExercises: React.FC<props> = ({ onItemPress }) => {
    const { user, exerciseToday } = useAuth();
    const [index, setIndex] = useState(0);
    const colors = useThemeColors();

    const handleScroll = (event: any) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(scrollX / WP(100));
        setIndex(currentIndex);
    };

    console.log("EXE TODAY", exerciseToday);

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={WP(100)}
                onScroll={handleScroll}
            >
                {exerciseToday.map((exe: any, i: number) => {
                    const completed = exe.exercise.completed;

                    return (
                        <View
                            key={`${exe.exercise.key} ${i}}`}
                            style={{
                                width: WP(100),
                                paddingHorizontal: WP(8),
                                paddingBottom: HP(4),
                                gap: HP(2),
                            }}
                        >
                            <View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: WP(2),
                                    }}
                                >
                                    <View
                                        style={{
                                            height: HP(1),
                                            width: HP(1),
                                            borderRadius: WP(100),
                                            backgroundColor: exe.exercise
                                                .completed
                                                ? colors.success
                                                : colors.warning,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: colors.text,
                                            fontSize: xl,
                                            fontFamily: OutfitBold,
                                            alignItems: "center",
                                        }}
                                    >
                                        {exe.exercise.name}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        color: colors.success,
                                        fontSize: HP(1.5),
                                        fontFamily: OutfitRegular,
                                    }}
                                >
                                    {exe.plan.planTitle}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    color: colors.text,
                                    fontSize: HP(1.8),
                                    fontFamily: OutfitRegular,
                                }}
                            >
                                {exe.exercise.description}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => onItemPress(exe)}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: WP(2),
                                        backgroundColor: completed
                                            ? colors.success
                                            : colors.primary,
                                        padding: WP(2),
                                        paddingHorizontal: WP(4),
                                        borderRadius: WP(4),
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: OutfitRegular,
                                            fontSize: HP(2),
                                            color: colors.white,
                                        }}
                                    >
                                        {!completed ? "View" : "Done"}
                                    </Text>
                                    {completed && (
                                        <Entypo
                                            name="check"
                                            size={md}
                                            color={colors.white}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
            <View
                style={{
                    flexDirection: "row",
                    width: WP(100),
                    gap: HP(1),
                    justifyContent: "center",
                }}
            >
                {Array(exerciseToday.length)
                    .fill(0)
                    .map((_, i) => (
                        <View
                            key={i}
                            style={{
                                height: HP(1),
                                aspectRatio: 1,
                                borderRadius: WP(100),
                                backgroundColor:
                                    index === i
                                        ? colors.primary
                                        : colors.secondary,
                            }}
                        />
                    ))}
            </View>
        </View>
    );
};

export default RecommendedExercises;
