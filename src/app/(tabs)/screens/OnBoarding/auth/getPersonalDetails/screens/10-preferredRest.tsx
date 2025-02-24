import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    useColorScheme,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { WP, HP } from "@/src/hooks/useDeviceDimension";
import LottieView from "lottie-react-native";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import ScrollDown from "@/src/components/other/scrollDown";
import { Fade } from "@/src/module/animations/fadeAnimation";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import SingleButton from "@/src/components/buttons/single-button";
import DoubleButton from "@/src/components/buttons/double-button";
import HexToHexa from "@/src/hooks/useHexa";

interface props {
    setIndex: (v: number) => void;
    YOffset: Animated.Value;
}
const RestDay: React.FC<props> = ({ setIndex, YOffset }) => {
    const colors = useThemeColors();
    const [submitted, setSubmitted] = useState(false);
    const [restDayNum, setRestDayNum] = useState(null);
    const [isNext, setIsNext] = useState(false);
    const [recommendedRestDays, setRecommendedRestDays] = useState(null);
    const [selectedRestDay, setSelectedRestDay] = useState<string[]>([]);
    const [error, setError] = useState(false);

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const options = [
        {
            label: "No Rest Day",
            value: 0,
        },
        {
            label: "1",
            value: 1,
        },
        {
            label: "2",
            value: 2,
        },

        {
            label: "3 - 4",
            value: 4,
        },
    ];

    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;

    const moveScroll = YOffset.interpolate({
        inputRange: [0, HP(100)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [0, HP(100)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const submit = () => {
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(1);
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

    const handleItemPress = (item: string) => {
        if (!restDayNum) return;
        if (selectedRestDay.includes(item)) {
            setSelectedRestDay((prev: any) =>
                prev.filter((d: any) => d !== item)
            );
        } else if (selectedRestDay.length < restDayNum) {
            setSelectedRestDay((prev) => [...prev, item] as any);
        }
    };

    // useEffect(() => {
    //     let recommendation = null;

    //     switch (activityLevel) {
    //         case "Sedentary":
    //             recommendation = 2;
    //             break;
    //         case "Lightly Active":
    //             recommendation = 2; //1-2 rest days
    //             break;
    //         case "Moderate":
    //             recommendation = 1; //1 rest day
    //             break;
    //         case "Very Active":
    //             recommendation = 1; //1 rest day, adjust based on intensity
    //             break;
    //         case "Extra Active":
    //             recommendation = 0; //Potentially no dedicated rest days, focus on active recovery
    //             break;
    //         default:
    //             recommendation = 1; // Default
    //     }

    //     setRecommendedRestDays(recommendation);
    // }, [activityLevel]);

    const handleNext = (item: any) => {
        setIsNext(true);
        setRestDayNum(item);
        setSelectedRestDay([]);
    };

    const handleBack = () => {
        setIsNext(false);
    };

    return !submitted ? (
        <Animated.View
            style={{
                height: HP(100),
                alignItems: "center",
                justifyContent: "center",
                gap: HP(3),
            }}
        >
            <Text
                style={{
                    fontSize: HP(3),
                    textAlign: "center",
                    fontFamily: "Outfit-Regular",
                    width: WP(90),
                    color: colors.text,
                }}
            >
                {isNext
                    ? restDayNum !== 0 &&
                      "What day of they week do you prefer to rest?"
                    : "How many rest days do you prefer each week?"}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: WP(4),
                    alignItems: "center",
                    justifyContent: "center",
                    width: WP(90),
                }}
            >
                {isNext ? (
                    restDayNum === 0 ? (
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: HP(3),
                                fontFamily: "Outfit-regular",
                                textAlign: "center",
                            }}
                        >
                            Are you sure you don't want to add rest days?
                        </Text>
                    ) : (
                        days.map((day, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    backgroundColor: selectedRestDay.includes(
                                        day as string
                                    )
                                        ? colors.primary
                                        : HexToHexa({
                                              hex: colors.secondary,
                                              alpha: 0.2,
                                          }),
                                    borderRadius: WP(4),
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: WP(4),
                                }}
                                activeOpacity={0.8}
                                onPress={() => handleItemPress(day)}
                            >
                                <Text
                                    style={{
                                        color: selectedRestDay.includes(
                                            day as string
                                        )
                                            ? colors.white
                                            : colors.text,
                                        fontSize: HP(2),
                                        fontFamily: "Outfit-Bold",
                                    }}
                                >
                                    {day}
                                </Text>
                            </TouchableOpacity>
                        ))
                    )
                ) : (
                    options.map((v, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => handleNext(v.value)}
                            style={{
                                width: WP(30),
                                backgroundColor:
                                    i === recommendedRestDays
                                        ? colors.success
                                        : HexToHexa({
                                              hex: colors.secondary,
                                              alpha: 0.2,
                                          }),
                                aspectRatio: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: WP(4),
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.text,
                                    fontFamily: "Outfit-Regular",
                                    fontSize: i === 0 ? HP(2) : HP(3),
                                    padding: WP(4),
                                    textAlign: "center",
                                }}
                            >
                                {v.label}
                            </Text>
                            <Text
                                style={{
                                    color: colors.text,
                                    fontFamily: "Outfit-Regular",
                                    fontSize: HP(1.5),
                                    textAlign: "center",
                                    position: "absolute",
                                    bottom: HP(1),
                                }}
                            >
                                {i === recommendedRestDays && "Recommended"}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </View>
            <View
                style={{
                    position: "absolute",
                    bottom: HP(4),
                    width: WP(100),
                    alignItems: "center",
                }}
            >
                {!isNext ? (
                    <SingleButton
                        loading={false}
                        style={{}}
                        color={
                            selectedRestDay.length === 0
                                ? colors.secondary
                                : colors.primary
                        }
                        onPress={submit}
                    >
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: HP(2),
                                fontFamily: OutfitBold,
                            }}
                        >
                            Next
                        </Text>
                    </SingleButton>
                ) : (
                    <DoubleButton
                        leftText="Back"
                        rightText="Next"
                        onPressLeft={handleBack}
                        onPressRight={submit}
                    />
                )}
            </View>
        </Animated.View>
    ) : (
        <Animated.View
            style={{
                padding: WP(4),
                gap: HP(4),
                height: HP(100),
                opacity: fadeIn,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{ padding: WP(4) }}>
                <Text
                    style={{
                        color: colors.text,
                        fontSize: HP(3),
                        fontFamily: OutfitRegular,
                    }}
                >
                    Scroll down
                </Text>
            </View>
            <ScrollDown move={moveScroll as any} fade={fadeScroll as any} />
        </Animated.View>
    );
};

export default RestDay;
