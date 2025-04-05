import {
    View,
    Text,
    TouchableOpacity,
    Pressable,
    ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "@react-navigation/native";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useAuth } from "@/src/services/auth/authentication";
import { OutfitRegular } from "@/src/hooks/useFonts";

const LineChartBlock = () => {
    const colors = useThemeColors();
    const { dailyProgress, everyExercise, exerciseToday, user } = useAuth();
    const [isToggle, setToggle] = useState(false);
    const [allCalories, setAllCalories] = useState<any>([]); // Changed to hold all days
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
    const [todayDate, setTodayDate] = useState(new Date());

    const exercisePlans = user?.plan.currentPlans;

    const weekDays = useMemo(
        () => [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        []
    );

    // const dayLabel = Array(30).fill(0);
    const dayLabel = useMemo(
        () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        []
    );

    // Function to get Monday's date of the current week
    const getWeekMonday = useCallback((offset: any) => {
        const date = new Date();
        const day = date.getDay(); // Get day of week (0-6, Sunday-Saturday)

        // Calculate difference to get to Monday
        let diff = date.getDate() - day + (day === 0 ? -6 : 1);

        date.setDate(diff + offset * 7); // Adjust by offset weeks
        return date;
    }, []);

    // Get the start and end dates for this week
    const startOfWeek = useMemo(
        () => getWeekMonday(currentWeekOffset),
        [getWeekMonday, currentWeekOffset]
    );
    const endOfWeek = useMemo(() => {
        const sow = getWeekMonday(currentWeekOffset);
        const eow = new Date(sow);
        eow.setDate(sow.getDate() + 6);
        return eow;
    }, [getWeekMonday, currentWeekOffset]);

    const weekDaysWithDates = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return {
                date: date.getDate(),
                month: date.getMonth(), // Adjust to 1-based month
                year: date.getFullYear(),
                weekday: weekDays[i],
            };
        });
    }, [startOfWeek, weekDays]);

    const [weekDate, setWeekDate] = useState<any>([]);

    const data = useMemo(() => {
        return {
            labels: dayLabel as string[],
            datasets: [
                {
                    data: Array(7)
                        .fill(0)
                        .map((v) => Math.floor(Math.random() * 3000)),

                    // allCalories?.length > 0
                    //     ? allCalories.map(
                    //           (item: any) => item.completedCalories
                    //       )
                    //     : Array(7).fill(0), // Data for the completed calories
                    color: (opacity: any) => colors.success, // Color for completed calories
                    strokeWidth: 2,
                } as any,
                {
                    data: Array(7)
                        .fill(0)
                        .map((v) => Math.floor(Math.random() * 3000)),

                    // allCalories?.length > 0
                    //     ? allCalories.map((item: any) => item.totalCalories)
                    //     : Array(7).fill(0), // Data for total calories
                    color: (opacity: any) => colors.secondary, // Color for total calories
                    strokeWidth: 1,
                } as any,
            ] as any,
        } as any;
    }, [allCalories, colors.secondary, colors.success, dayLabel]);

    const updateWeekDates = useCallback(() => {
        const startOfWeek = getWeekMonday(currentWeekOffset);
        const weekDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return {
                weekday: dayLabel[i],
                date: `${date.getDate()}`, // Format MM/DD
                month: `${date.getMonth()}`,
                year: `${date.getFullYear()}`,
            };
        });
        setWeekDate(weekDates as any); // Set the week dates to state
    }, [currentWeekOffset, dayLabel, getWeekMonday]);

    const getWeeklyCalories = useCallback(() => {
        const allDayCalories: any = [];
        const exerciseDataMap: any = {};

        // console.log("exercisePlans:", JSON.stringify(exercisePlans, null, 2)); // Log exercisePlans

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

                    // console.log("dateString (inside day loop):", dateString);

                    // Initialize total and completed calories for the *day* to 0
                    let totalCaloriesForDay = 0;
                    let completedCaloriesForDay = 0;

                    day?.exercises?.forEach((exercise: any) => {
                        if (exercise) {
                            const calories = Number(exercise.calorieBurn);

                            // console.log("CALORIES", calories);

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

                    // console.log(
                    //     `Calories for ${dateString}: total=${totalCaloriesForDay}, completed=${completedCaloriesForDay}`
                    // );

                    // Store the calculated totals in the map
                    exerciseDataMap[dateString] = {
                        totalCalories: totalCaloriesForDay,
                        completedCalories: completedCaloriesForDay,
                    };
                });
            });
        });

        // console.log(
        //     "exerciseDataMap:",
        //     JSON.stringify(exerciseDataMap, null, 2)
        // );

        // console.log(
        //     "weekDaysWithDates:",
        //     JSON.stringify(weekDaysWithDates, null, 2)
        // );

        weekDaysWithDates.forEach((day) => {
            // const dateString = `${day.weekday}, ${day.month}/${day.date}/${day.year}`; // Incorrect
            const dateString = `${day.weekday}, ${String(day.month).padStart(
                2,
                "0"
            )}/${day.date}/${day.year}`; // Corrected
            // console.log("dateString (weekDaysWithDates loop):", dateString); //Added console log here
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

        // console.log("allDayCalories:", JSON.stringify(allDayCalories, null, 2));

        setAllCalories(allDayCalories);

        // console.log(
        //     "allCalories (after setAllCalories):",
        //     JSON.stringify(allCalories, null, 2)
        // );
    }, [exercisePlans, weekDaysWithDates]);

    useEffect(() => {
        getWeeklyCalories();
        updateWeekDates(); // Update week dates when offset changes
    }, [exercisePlans, weekDaysWithDates, getWeeklyCalories, updateWeekDates]);

    const nextWeek = () => {
        setCurrentWeekOffset((prevOffset) => prevOffset + 1);
    };

    const prevWeek = () => {
        setCurrentWeekOffset((prevOffset) => prevOffset - 1);
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
                return "Jan";
            case 1:
                return "Feb";
            case 2:
                return "Mar";
            case 3:
                return "Apr";
            case 4:
                return "May";
            case 5:
                return "Jun";
            case 6:
                return "Jul";
            case 7:
                return "Aug";
            case 8:
                return "Sep";
            case 9:
                return "Oct";
            case 10:
                return "Nov";
            case 11:
                return "Dec";
            default:
                return "Invalid month";
        }
    }, []);

    return (
        <View style={{ height: HP(32) }}>
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
                            fontFamily: "Outfit-Regular",
                            fontSize: HP(2),
                        }}
                    >
                        Calories Record
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
                                    borderRadius: HP(1),
                                    backgroundColor: colors.success,
                                }}
                            />
                            <Text
                                style={{
                                    color: colors.text,
                                    fontFamily: "Outfit-Regular",
                                    fontSize: HP(1.5),
                                }}
                            >
                                My Progress
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
                                    borderRadius: HP(1),
                                    backgroundColor: colors.secondary,
                                }}
                            />
                            <Text
                                style={{
                                    color: colors.text,
                                    fontFamily: "Outfit-Regular",
                                    fontSize: HP(1.5),
                                }}
                            >
                                My Goal
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
                            borderBottomWidth: 1,
                            paddingBottom: HP(1),
                            borderColor: colors.secondary,
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: WP(4),
                                width: "20%",
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.primary,
                                    fontSize: HP(1.8),
                                    fontFamily: "Outfit-Regular",
                                }}
                            >
                                {calculateMonth(Number(weekDate?.[0]?.month))}
                            </Text>
                            <Text
                                style={{
                                    color: colors.primary,
                                    fontFamily: "Outfit-Regular",
                                    fontSize: HP(1),
                                }}
                            >
                                {weekDate?.[0]?.year}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                width: "70%",
                                alignItems: "center",
                            }}
                        >
                            {weekDate.map((item: any, i: number) => {
                                const currentDate = new Date(
                                    item.year,
                                    item.month,
                                    item.date
                                );

                                const isTodayDate = isToday(currentDate);

                                return (
                                    <View
                                        key={i}
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "10%",
                                            aspectRatio: 1,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: colors.primary,
                                                fontSize: HP(1.6),
                                                textAlign: "center",
                                                fontFamily: "Outfit-Regular",
                                                width: WP(30),
                                            }}
                                        >
                                            {Number(item.date) === 1
                                                ? `${calculateMonth(
                                                      Number(item.month)
                                                  )}`
                                                : ""}
                                        </Text>
                                        <Text
                                            style={{
                                                color: isTodayDate
                                                    ? colors.white
                                                    : colors.text,
                                                borderRadius: WP(100),
                                                backgroundColor: isTodayDate
                                                    ? colors.primary
                                                    : "transparent",
                                                textAlign: "center",
                                                textAlignVertical: "center",
                                                aspectRatio: 1,
                                                fontFamily: "Outfit-Regular",
                                            }}
                                        >
                                            {item.date}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around",
                        }}
                    >
                        <TouchableOpacity onPress={prevWeek}>
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flex: 1,
                                    backgroundColor: HexToHexa({
                                        hex: colors.secondary,
                                        alpha: 0.2,
                                    }),
                                    paddingHorizontal: WP(2),
                                }}
                            >
                                <AntDesign
                                    name="leftcircleo"
                                    size={HP(2)}
                                    color={
                                        isToggle
                                            ? colors.accent
                                            : colors.primary
                                    }
                                />
                            </View>
                        </TouchableOpacity>

                        <LineChart
                            data={data}
                            width={WP(70)}
                            height={HP(16)}
                            xLabelsOffset={0} // or remove the prop entirely
                            chartConfig={{
                                backgroundColor: colors.background,
                                backgroundGradientFrom: colors.background,
                                backgroundGradientTo: colors.background,
                                decimalPlaces: 0,
                                color: (index: any) =>
                                    index !== 1
                                        ? colors.secondary
                                        : colors.primary,
                                labelColor: (opacity = 0.8): any => colors.text,
                                style: {
                                    borderRadius: WP(4),
                                    marginBottom: HP(2),
                                    opacity: 0.5,
                                } as any,
                                propsForDots: {
                                    r: "2",
                                    strokeWidth: 1,
                                    stroke: colors.text,
                                } as any,
                                propsForLabels: {
                                    fontSize: HP(1),
                                } as any,
                                fillShadowGradient: colors.primary,
                                fillShadowGradientOpacity: 0.1,
                            }}
                            style={{
                                paddingBottom: HP(1),
                            }}
                            yLabelsOffset={HP(1)}
                            formatYLabel={(value: any) => `${value} cal`}
                            withVerticalLines={true}
                            withHorizontalLines={true}
                            withDots={true}
                            formatXLabel={(value: any) => value} // Try this
                        />
                        <TouchableOpacity onPress={nextWeek}>
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flex: 1,
                                    backgroundColor: HexToHexa({
                                        hex: colors.secondary,
                                        alpha: 0.2,
                                    }),
                                    paddingHorizontal: WP(2),
                                }}
                            >
                                <AntDesign
                                    name="rightcircleo"
                                    size={HP(2)}
                                    color={
                                        isToggle
                                            ? colors.accent
                                            : colors.primary
                                    }
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default LineChartBlock;
