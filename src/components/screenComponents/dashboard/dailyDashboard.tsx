import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { ProgressChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import HexToHexa from "@/src/hooks/useHexa";
import { useFocusEffect, useNavigation } from "expo-router";
import RoundProgressBar from "../../other/progressBar";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useAuth } from "@/src/services/auth/authentication";
import { WP, HP } from "@/src/hooks/useDeviceDimension";

export default function DailyDashboard({ toggle, busy }: any) {
    const { exerciseToday, dailyProgress } = useAuth();
    const colors = useThemeColors();
    const navigation = useNavigation<any>();

    const validProgress =
        typeof dailyProgress === "number" && !isNaN(dailyProgress)
            ? Math.max(0, Math.min(dailyProgress, 100))
            : 0;
    // const validWeekProgress =
    //     typeof weekProgress === "number" && !isNaN(weekProgress)
    //         ? Math.max(0, Math.min(weekProgress, 100))
    //         : 0;

    const data = {
        data: [validProgress], // Ensure values are between 0 and 1
    };

    // console.log("Chart Data:", data); // Log the final data being used

    return (
        <View
            style={{
                flexDirection: "row",
                gap: WP(4),
                marginHorizontal: WP(3),
                marginVertical: WP(3),
            }}
        >
            <LinearGradient
                colors={[
                    HexToHexa({ hex: colors.secondary, alpha: 0.2 }),
                    colors.background,
                ]}
                locations={[0, 1]}
                start={{ x: 0.1, y: 0 }}
                style={{
                    borderColor: colors.secondary,
                    borderWidth: 1,
                    borderRadius: WP(4),
                    padding: WP(4),
                }}
            >
                <View style={{ gap: HP(2) }}>
                    <RoundProgressBar
                        radius={HP(8)}
                        color={colors.primary}
                        percentage={dailyProgress}
                        emptyColor={colors.secondary}
                        gradientColors={[
                            colors.secondary,
                            colors.accent,
                            colors.secondary,
                        ]}
                        strokeWidth={WP(4)}
                        textStyle={{
                            color: colors.text,
                            fontSize: HP(2),
                            fontFamily: "Outfit-Regular",
                        }}
                    />
                </View>
            </LinearGradient>
            <View
                style={{
                    gap: WP(3),
                    flex: 1,
                }}
            >
                <View
                    style={{
                        borderWidth: 1,
                        borderRadius: WP(4),
                        padding: WP(4),
                        borderColor: colors.secondary,
                    }}
                >
                    <Text
                        style={{
                            color: colors.primary,
                            fontSize: HP(2),
                            fontFamily: "Outfit-Regular",
                        }}
                    >
                        Today's Progress
                    </Text>
                </View>
                <TouchableOpacity onPress={toggle} disabled={busy} style={{}}>
                    <View
                        style={{
                            padding: WP(3),
                            backgroundColor:
                                exerciseToday?.length === 0
                                    ? colors.secondary
                                    : colors.primary,
                            borderRadius: WP(4),
                            flexDirection: "row",
                            alignItems: "center",
                            gap: WP(2),
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                color: colors.white,
                                fontSize: HP(1.5),
                                textAlign: "center",
                                fontFamily: "Outfit-Regular",
                            }}
                        >
                            Exercise Todo
                        </Text>
                        <AntDesign
                            name="arrowright"
                            size={HP(2)}
                            color={colors.white}
                        />
                    </View>
                </TouchableOpacity>

                {exerciseToday.length === 0 && (
                    <>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Exercises")}
                        >
                            <View
                                style={{
                                    padding: WP(3),
                                    backgroundColor: colors.primary,
                                    borderRadius: WP(4),
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: WP(2),
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        color: colors.white,
                                        fontSize: HP(1.5),
                                        textAlign: "center",
                                        fontFamily: "Outfit-Regular",
                                    }}
                                >
                                    Generate Exercise
                                </Text>
                                <AntDesign
                                    name="arrowright"
                                    size={HP(2)}
                                    color={colors.white}
                                />
                            </View>
                        </TouchableOpacity>

                        <Text
                            style={{
                                color: colors.warning,
                                backgroundColor: colors.accent,
                                padding: WP(2),
                                fontSize: HP(1.5),
                                borderRadius: WP(2),
                                fontFamily: "Outfit-Regular",
                            }}
                        >
                            You don't have any exercises today. Please generate.
                        </Text>
                    </>
                )}
            </View>
        </View>
    );
}
