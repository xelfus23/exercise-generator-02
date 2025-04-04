import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    useColorScheme,
} from "react-native";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { dayType } from "@/src/types/dayTypes";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { md, OutfitRegular, sm, xl, xsm } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import { Image } from "expo-image";
import SingleButton from "../../buttons/single-button";
import { exerciseType, planType } from "@/src/types/planTypes";
import { useAuth } from "@/src/services/auth/authentication";
const Days: React.FC = () => {
    const today = useMemo(() => new Date(), []);
    const { user } = useAuth();
    const [currentDate, setCurrentDate] = useState(today);
    const [days, setDays] = useState<dayType[]>([]);
    const colors = useThemeColors();
    const styles = style();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const iconSrc =
        useColorScheme() === "dark"
            ? require("@/src/assets/images/ui/icons-svg/dark-calendar-icon.svg")
            : require("@/src/assets/images/ui/icons-svg/light-calendar-icon.svg");

    const plan = user?.plan?.currentPlans;

    const daysInMonth = useCallback((month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    }, []);

    const formatDate = (date: Date): string => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const isSameDate = (date1: Date, date2: Date): boolean => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    const getDays = useCallback(() => {
        if (!plan) return;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const daysInCurrentMonth = daysInMonth(month, year);
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const leadingBlanks = firstDayOfMonth.getDay();
        const daysArray: dayType[] = [];

        for (let i = 1; i <= daysInCurrentMonth; i++) {
            const date = new Date(year, month - 1, i);
            const isToday = isSameDate(date, today);
            let exe = undefined;

            plan.forEach((planItem: planType) => {
                planItem.weeks.forEach((week) => {
                    week.days.forEach((dayPlan) => {
                        const planDate = new Date(
                            Number(dayPlan.year),
                            Number(dayPlan.month),
                            Number(dayPlan.date)
                        );
                        if (isSameDate(date, planDate)) {
                            exe = dayPlan.exercises;
                        }
                    });
                });
            });

            daysArray.push({
                day: String(i),
                isToday,
                weekday: `${date.getDay()}`,
                exe,
            });
        }

        return daysArray;
    }, [currentDate, daysInMonth, plan, today]);

    useEffect(() => {
        setDays(getDays() || []);
    }, [plan]);

    const getWeekDays = useCallback((day: number) => {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return weekdays[day] || "";
    }, []);

    const getMonthName = useCallback((month: number) => {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return monthNames[month - 1];
    }, []);

    // Calculate the number of empty cells needed before the first day of the month
    const getLeadingBlanks = useCallback(() => {
        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );
        return firstDayOfMonth.getDay();
    }, [currentDate]);

    const leadingBlanks = useMemo(() => getLeadingBlanks(), [getLeadingBlanks]);

    const renderCalendarDays = useCallback(() => {
        const totalDays =
            daysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear()) +
            leadingBlanks;
        const rows = [];
        let cells = [];

        for (let i = 0; i < leadingBlanks; i++) {
            cells.push(<View key={`empty-${i}`} style={styles.emptyCell} />);
        }

        for (
            let i = 1;
            i <=
            daysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
            i++
        ) {
            const day = days.find((d) => Number(d.day) === i); // Find the day object in the days array
            const dayKey = `day-${i}`; // Unique key for each day cell

            console.log(day);

            cells.push(
                <TouchableOpacity
                    key={dayKey}
                    style={[
                        styles.dayCell,
                        day?.isToday && styles.todayCell,
                        {
                            backgroundColor: HexToHexa({
                                hex: day?.isToday
                                    ? colors.primary
                                    : colors.secondary,
                                alpha: 0.1,
                            }),
                        },
                    ]}
                    // Add onPress={() => handleDayPress(day.day)} later
                >
                    <Text
                        style={[
                            styles.dayText,
                            {
                                color: HexToHexa({
                                    alpha: 0.8,
                                    hex: colors.text,
                                }),
                            },
                        ]}
                    >
                        {day?.day}
                    </Text>
                    {day?.exe?.map((exe: exerciseType, index: number) => (
                        <View key={`exe-${index}`}>
                            <Text
                                style={{
                                    fontSize: xsm,
                                    color: exe.completed
                                        ? colors.success
                                        : colors.text,
                                }}
                            >
                                • {exe.name}
                            </Text>
                        </View>
                    ))}
                </TouchableOpacity>
            );

            if (cells.length === 7) {
                rows.push(
                    <View key={`row-${rows.length}`} style={styles.row}>
                        {cells}
                    </View>
                );
                cells = [];
            }
        }
        if (cells.length > 0) {
            rows.push(
                <View key={`row-${rows.length}`} style={styles.row}>
                    {cells}
                </View>
            );
        }

        return rows;
    }, [
        colors.primary,
        colors.secondary,
        colors.text,
        currentDate,
        days,
        daysInMonth,
        leadingBlanks,
        styles,
    ]);

    return (
        <View style={{ width: WP(100) }}>
            <View
                style={{
                    paddingHorizontal: WP(4),
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: WP(2),
                }}
            >
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <View style={{ height: HP(4), aspectRatio: 1 }}>
                        <Image
                            source={iconSrc}
                            style={{
                                flex: 1,
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <Modal visible={isModalVisible} style={{ flex: 1 }} animationType="slide">
                <ScrollView
                    horizontal
                    style={{
                        backgroundColor: colors.background,
                        flex: 1,
                        paddingVertical: WP(4),
                    }}
                    overScrollMode="never"
                    contentContainerStyle={{
                        justifyContent: "space-between",
                        gap: WP(2),
                    }}
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <View style={styles.header}>
                            <Text
                                style={[
                                    styles.monthYearText,
                                    { color: colors.text },
                                ]}
                            >
                                {getMonthName(currentDate.getMonth() + 1)}{" "}
                                {currentDate.getFullYear()}
                            </Text>
                        </View>

                        <View style={styles.weekdays}>
                            {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                            ].map((day, index) => (
                                <Text
                                    key={index + day}
                                    style={[
                                        styles.weekdayText,
                                        { color: colors.text },
                                    ]}
                                >
                                    {day}
                                </Text>
                            ))}
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.calendar}>
                                {renderCalendarDays()}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
                <View style={{ alignItems: "center", bottom: HP(2) }}>
                    <SingleButton
                        style={{ position: "absolute", bottom: 0 }}
                        loading={false}
                        color={colors.primary}
                        onPress={() => setIsModalVisible(false)}
                    >
                        <Text
                            style={{
                                color: colors.white,
                                fontSize: md,
                                fontFamily: OutfitRegular,
                            }}
                        >
                            Close
                        </Text>
                    </SingleButton>
                </View>
            </Modal>
        </View>
    );
};

const style = () => {
    const colors = useThemeColors();

    return StyleSheet.create({
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        monthYearText: {
            fontSize: md,
            fontFamily: OutfitRegular,
            marginBottom: HP(2),
        },
        weekdays: {
            flexDirection: "row",
        },
        weekdayText: {
            fontSize: md,
            fontFamily: OutfitRegular,
            textAlign: "center",
            width: WP(28),
            backgroundColor: colors.secondary,
            height: HP(5),
            textAlignVertical: "center",
        },
        calendar: {},
        row: {
            flexDirection: "row",
        },
        dayCell: {
            width: WP(28),
            padding: WP(2),
            minHeight: WP(28),
        },
        todayCell: {
            borderWidth: 1,
            borderColor: colors.secondary, // Example: Highlight with blue
        },
        dayText: {
            fontSize: sm,
            fontFamily: OutfitRegular,
        },
        emptyCell: {
            width: WP(28),
            aspectRatio: 1,
        },
    });
};

export default Days;
