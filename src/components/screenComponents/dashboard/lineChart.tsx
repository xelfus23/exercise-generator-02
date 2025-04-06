import {
    View,
    Text,
    TouchableOpacity,
    Pressable,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useAuth } from "@/src/services/auth/authentication";
import { md, OutfitRegular, sm, xl, xsm } from "@/src/hooks/useFonts";
import {
    BarChart,
    LineChart,
    PieChart,
    PopulationPyramid,
    RadarChart,
} from "react-native-gifted-charts";

const LineChartBlock = () => {
    const colors = useThemeColors();
    const { dailyProgress, everyExercise, exerciseToday, user } = useAuth();
    const [isToggle, setToggle] = useState(false);
    const [allCalories, setAllCalories] = useState<any>([]);
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0); // State for month offset
    const [todayDate, setTodayDate] = useState(new Date());

    const exercisePlans = user?.plan.currentPlans;

    const dayLabel = useMemo(
        () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        []
    );

    const monthNames = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    // Function to get the first day of the month based on offset
    const getFirstDayOfMonth = useCallback((offset: number) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + offset; // Adjust month by offset

        return new Date(year, month, 1); // First day of the adjusted month
    }, []);

    // Calculate the start and end dates for the current month
    const startOfMonth = useMemo(
        () => getFirstDayOfMonth(currentMonthOffset),
        [getFirstDayOfMonth, currentMonthOffset]
    );

    const endOfMonth = useMemo(() => {
        const som = getFirstDayOfMonth(currentMonthOffset);
        return new Date(som.getFullYear(), som.getMonth() + 1, 0); // Last day of the month
    }, [getFirstDayOfMonth, currentMonthOffset]);

    // Generate an array of dates for the current month
    const daysInMonth = useMemo(() => {
        const days = [];
        let currentDate = new Date(startOfMonth);

        while (currentDate <= endOfMonth) {
            days.push({
                date: currentDate.getDate(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
                weekday: dayLabel[currentDate.getDay()], //Map to array
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return days;
    }, [startOfMonth, endOfMonth, dayLabel]);

    const [monthDate, setMonthDate] = useState<any>([]); // Store date information for display

    const data1 = useMemo(() => {
        const numberOfPairs = monthDate.length; // Or however you determine the number of pairs
        return Array(numberOfPairs * 2)
            .fill(0)
            .map((_, i) => {
                const value1 = Math.floor(Math.random() * 1000);
                const value2 = Math.floor(Math.random() * (value1 + 1)); // Generates random number from 0 to value1 (inclusive)
                const index = Math.floor(i / 2) + 1; // Calculate the shared label
                const skip2 = (i % 2) - 1; // Simpler way to alternate (0 or 1)

                return {
                    value: skip2 ? value1 : value2,
                    label: skip2 ? "" : String(index), // Use the calculated shared label
                    frontColor: colors.card,
                    gradientColor: skip2
                        ? HexToHexa({ hex: colors.accent, alpha: 0.5 })
                        : HexToHexa({ hex: colors.success, alpha: 0.5 }),
                    capColor: skip2 ? colors.accent : colors.success,
                    spacing: skip2 ? 0 : WP(4),
                };
            });
    }, [monthDate]);

    const updateMonthDates = useCallback(() => {
        // Extract relevant information for display
        const monthDates = daysInMonth.map((day, index) => ({
            weekday: day.weekday,
            date: `${day.date}`,
            month: `${day.month}`,
            year: `${day.year}`,
        }));

        setMonthDate(monthDates);
    }, [daysInMonth]);

    const getMonthlyCalories = useCallback(() => {
        const allDayCalories: any = [];
        const exerciseDataMap: any = {};

        exercisePlans?.forEach((plan) => {
            plan?.weeks?.forEach((week) => {
                week?.days?.forEach((day: any) => {
                    if (!day) {
                        console.warn(
                            "Skipping day because it is null or undefined."
                        );
                        return;
                    }

                    const dateString = `${day.weekday}, ${String(
                        day.month
                    ).padStart(2, "0")}/${day.date}/${day.year}`; // Ensure consistent date format

                    // Initialize total and completed calories for the *day* to 0
                    let totalCaloriesForDay = 0;
                    let completedCaloriesForDay = 0;

                    day?.exercises?.forEach((exercise: any) => {
                        if (exercise) {
                            const calories = Number(exercise.calorieBurn);

                            if (isNaN(calories)) {
                                console.warn(
                                    `Invalid calories value: ${exercise.calorieBurn}. Skipping exercise.`
                                );
                                return;
                            }

                            totalCaloriesForDay += calories; // Accumulate calories for the day

                            if (exercise.completed) {
                                completedCaloriesForDay += calories; // Accumulate completed calories
                            }
                        }
                    });

                    // Store the calculated totals in the map
                    exerciseDataMap[dateString] = {
                        totalCalories: totalCaloriesForDay,
                        completedCalories: completedCaloriesForDay,
                    };
                });
            });
        });

        daysInMonth.forEach((day) => {
            const dateString = `${day.weekday}, ${String(day.month).padStart(
                2,
                "0"
            )}/${day.date}/${day.year}`;
            const dayData = exerciseDataMap[dateString] || {
                totalCalories: 0,
                completedCalories: 0,
            };
            allDayCalories.push({
                date: `${day.weekday}, ${day.month}/${day.date}`,
                totalCalories: dayData.totalCalories,
                completedCalories: dayData.completedCalories,
            });
        });

        setAllCalories(allDayCalories);
    }, [exercisePlans, daysInMonth]);

    useEffect(() => {
        getMonthlyCalories();
        updateMonthDates();
    }, [exercisePlans, daysInMonth, getMonthlyCalories, updateMonthDates]);

    const nextMonth = () => {
        setCurrentMonthOffset((prevOffset) => prevOffset + 1);
    };

    const prevMonth = () => {
        setCurrentMonthOffset((prevOffset) => prevOffset - 1);
    };

    const isToday = useCallback((date: any) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }, []);

    const calculateMonth = useCallback((month: number) => {
        switch (month) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                return "Invalid month";
        }
    }, []);

    return (
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            <LinearGradient
                colors={[
                    HexToHexa({ hex: colors.secondary, alpha: 0.2 }),
                    colors.background,
                ]}
                locations={[0, 1]}
                start={{ x: 0.1, y: 0 }}
                style={{
                    borderColor: colors.secondary,
                    borderRadius: WP(4),
                    borderWidth: 1,
                    flex: 1,
                    marginHorizontal: WP(3),
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                        padding: WP(3),
                        flexDirection: "row",
                        gap: HP(3),
                    }}
                >
                    <Text
                        style={{
                            color: colors.primary,
                            fontFamily: OutfitRegular,
                            fontSize: HP(2),
                        }}
                    >
                        Calorie Record
                    </Text>
                    <View style={{ flexDirection: "row", gap: HP(2) }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: HP(1),
                            }}
                        >
                            <View
                                style={{
                                    aspectRatio: 1,
                                    height: HP(1),
                                    // borderRadius: HP(1),
                                    backgroundColor: colors.success,
                                }}
                            />
                            <Text
                                style={{
                                    color: colors.text,
                                    fontFamily: OutfitRegular,
                                    fontSize: HP(1.5),
                                }}
                            >
                                Calories Burned
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: HP(1),
                            }}
                        >
                            <View
                                style={{
                                    aspectRatio: 1,
                                    height: HP(1),
                                    // borderRadius: HP(1),
                                    backgroundColor: colors.secondary,
                                }}
                            />
                            <Text
                                style={{
                                    color: colors.text,
                                    fontFamily: OutfitRegular,
                                    fontSize: HP(1.5),
                                }}
                            >
                                Goal
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        gap: HP(1),
                        marginHorizontal: WP(3),
                        marginBottom: WP(3),
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around",
                            overflow: "hidden",
                        }}
                    >
                        <BarChart
                            isAnimated
                            animationDuration={1000}
                            hideRules
                            data={data1}
                            yAxisLabelSuffix={" cal"}
                            xAxisColor={colors.secondary}
                            yAxisColor={colors.secondary}
                            barWidth={WP(3)}
                            cappedBars
                            yAxisTextStyle={{
                                color: HexToHexa({
                                    hex: colors.text,
                                    alpha: 0.8,
                                }),
                                fontFamily: OutfitRegular,
                                fontSize: xsm,
                            }}
                            xAxisLabelTextStyle={{
                                color: HexToHexa({
                                    hex: colors.text,
                                    alpha: 0.8,
                                }),
                                fontFamily: OutfitRegular,
                                fontSize: xsm,
                                marginRight: WP(3),
                            }}
                            onPress={() => (
                                <Text style={{ color: colors.text }}>W</Text>
                            )}
                            yAxisLabelWidth={WP(15)}
                            yAxisLabelContainerStyle={{
                                color: colors.primary,
                            }}
                            showGradient
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <TouchableOpacity onPress={prevMonth}>
                            <AntDesign
                                name="leftcircleo"
                                color={colors.primary}
                                size={xl}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: colors.primary,
                                fontSize: md,
                                fontFamily: OutfitRegular,
                            }}
                        >
                            {calculateMonth(Number(monthDate?.[0]?.month))}
                        </Text>
                        <TouchableOpacity onPress={nextMonth}>
                            <AntDesign
                                name="rightcircleo"
                                color={colors.primary}
                                size={xl}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default LineChartBlock;
