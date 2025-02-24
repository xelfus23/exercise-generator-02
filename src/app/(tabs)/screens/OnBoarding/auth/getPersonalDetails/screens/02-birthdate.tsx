import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useAuth } from "@/src/services/auth/authentication";
import {
    Text,
    TouchableOpacity,
    View,
    Animated,
    ScrollView,
    TextInput,
    FlatList,
    Modal,
} from "react-native";
import { WP, HP } from "@/src/hooks/useDeviceDimension";
import { Image } from "expo-image";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import SingleButton from "@/src/components/buttons/single-button";
import { useEffect, useRef, useState } from "react";
import { Fade } from "@/src/module/animations/fadeAnimation";
import ScrollDown from "@/src/components/other/scrollDown";
import { AntDesign } from "@expo/vector-icons";
import Picker from "@/src/components/other/picker";
import DatePicker from "@/src/components/other/datePicker";

interface props {
    setUserProfile: (v: any) => void;
    YOffset: Animated.Value;
    setIndex: (v: number) => void;
    birthDate: any;
}

const BirthDate: React.FC<props> = ({
    setUserProfile,
    setIndex,
    YOffset,
    birthDate,
}) => {
    const colors = useThemeColors();

    const today = new Date();
    const currentYear = today.getFullYear();
    const [submitted, setSubmitted] = useState(false);

    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    const [isYearPickerVisible, setYearPickerVisible] = useState(false);
    const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);

    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;

    const generateYears = (start: number, end: number) => {
        let years = [];
        for (let i = start; i <= end; i++) {
            years.push(i);
        }
        return years;
    };

    const getDaysInMonth = (month: any, year: any) =>
        new Date(year, month + 1, 0).getDate();

    const getFirstDayOfMonth = (month: any, year: any) =>
        new Date(year, month, 1).getDay();

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

    const getMonthIndex = (v: string) => {
        switch (v) {
            case "January":
                return 0;
            case "February":
                return 1;
            case "March":
                return 2;
            case "April":
                return 3;
            case "May":
                return 4;
            case "June":
                return 5;
            case "July":
                return 6;
            case "August":
                return 7;
            case "September":
                return 8;
            case "October":
                return 9;
            case "November":
                return 10;
            case "December":
                return 11;
            default:
                return null;
        }
    };

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const showYearPicker = () => {
        setYearPickerVisible(true);
    };

    const showMonthPicker = () => {
        setMonthPickerVisible(true);
    };

    const handleDayPress = (day: number | null) => {
        if (day) {
            setSelectedDate(day);
        }
    };

    const daysArray = (() => {
        if (selectedMonth === null || selectedYear === null) return []; // Avoid errors

        const daysInMonth = getDaysInMonth(
            getMonthIndex(selectedMonth),
            selectedYear
        );
        const firstDayOfMonth = getFirstDayOfMonth(
            getMonthIndex(selectedMonth),
            selectedYear
        );

        return Array.from({ length: firstDayOfMonth }, () => null).concat(
            Array.from({ length: daysInMonth }, (_, index) => index + 1) as any
        );
    })();

    const moveScroll = YOffset.interpolate({
        inputRange: [HP(100), HP(200)], // Ensure the first value is smaller
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [HP(100), HP(200)], // Ensure the first value is smaller
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const getMonthTextStyle = () => ({
        color:
            selectedYear && selectedMonth == null
                ? colors.primary
                : selectedYear && selectedMonth != null
                ? colors.primary
                : HexToHexa({ hex: colors.secondary, alpha: 0.2 }),
        fontSize: HP(2),
        paddingHorizontal: WP(8),
        paddingVertical: WP(2),
        fontFamily: "Outfit-Bold",
        textAlign: "center",
        borderWidth: 0.5,
        borderColor: colors.secondary,
        borderRadius: WP(2),
    });

    const getYearTextStyle = () => ({
        fontSize: HP(2),
        fontFamily: "Outfit-Bold",
        textAlign: "center",
        paddingHorizontal: WP(8),
        paddingVertical: WP(2),
        color:
            selectedMonth != null || selectedYear
                ? colors.primary
                : colors.primary,
        borderWidth: 0.5,
        borderColor: colors.secondary,
        borderRadius: WP(2),
    });

    const submit = () => {
        // setUserProfile({
        //     birthDate: {
        //         year: selectedYear,
        //         month: getMonthIndex(selectedMonth as string),
        //         day: selectedDate,
        //     },
        // });
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(2);
                Fade({
                    fromValue: fadeIn,
                    duration: 1000,
                    after: () => {},
                    toValue: 1,
                });
            },
            toValue: 0,
        });
    };

    return !submitted ? (
        <Animated.View
            style={{
                gap: HP(2),
                padding: WP(4),
                opacity: fadeOut,
                flex: 1,
            }}
        >
            <Text
                style={{
                    fontSize: HP(3),
                    marginTop: HP(30),
                    color: colors.text,
                    fontFamily: OutfitRegular,
                }}
            >
                Your date of birth
            </Text>

            <View
                style={{
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                <View
                    style={{
                        padding: HP(1),
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingVertical: HP(2),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                gap: WP(4),
                            }}
                        >
                            <TouchableOpacity onPress={showYearPicker}>
                                <Text style={getYearTextStyle() as any}>{` ${
                                    selectedYear || "Year"
                                }`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={showMonthPicker}
                                disabled={!selectedYear}
                            >
                                <Text style={getMonthTextStyle() as any}>{`${
                                    selectedMonth ? selectedMonth : "Month"
                                }`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Days of the Week */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            paddingVertical: WP(4),
                        }}
                    >
                        {daysOfWeek.map((day) => (
                            <Text
                                key={day}
                                style={{
                                    width: "14.28%",
                                    textAlign: "center",
                                    fontFamily: "Outfit-Bold",
                                    color:
                                        selectedMonth === null
                                            ? HexToHexa({
                                                  hex: colors.secondary,
                                                  alpha: 0.2,
                                              })
                                            : colors.text,
                                }}
                            >
                                {day}
                            </Text>
                        ))}
                    </View>

                    <DatePicker
                        items={daysArray}
                        selectedDate={selectedDate}
                        selectedMonth={selectedMonth}
                        handlePress={handleDayPress}
                    />
                </View>
            </View>

            <View
                style={{
                    width: WP(100),
                    position: "absolute",
                    bottom: HP(4),
                    alignItems: "center",
                }}
            >
                <SingleButton
                    loading={false}
                    style={{}}
                    color={selectedDate ? colors.primary : colors.secondary}
                    onPress={submit}
                    // disabled={!selectedDate}
                >
                    <Text
                        style={{
                            color: colors.white,
                            fontSize: HP(2),
                            fontFamily: OutfitBold,
                        }}
                    >
                        Next
                    </Text>
                </SingleButton>
            </View>

            <Picker
                isVisible={isMonthPickerVisible}
                items={monthNames}
                setIsVisible={setMonthPickerVisible}
                selectedValue={selectedMonth}
                setSelectedValue={setSelectedMonth}
            />
            <Picker
                isVisible={isYearPickerVisible}
                items={generateYears(currentYear - 71, currentYear).reverse()}
                setIsVisible={setYearPickerVisible}
                selectedValue={selectedYear}
                setSelectedValue={setSelectedYear}
            />
        </Animated.View>
    ) : (
        <Animated.View
            style={{
                flex: 1,
                padding: WP(4),
                gap: HP(4),
                height: HP(100),
                opacity: fadeIn,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{ padding: WP(4) }}>
                <Text style={{ color: colors.text, fontSize: HP(3) }}>
                    Scroll down
                </Text>
            </View>

            <ScrollDown move={moveScroll as any} fade={fadeScroll as any} />
        </Animated.View>
    );
};

export default BirthDate;
