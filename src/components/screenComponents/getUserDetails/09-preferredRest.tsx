import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    useColorScheme,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WP, HP } from "@/src/hooks/useDeviceDimension";
import LottieView from "lottie-react-native";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import ScrollDown from "@/src/components/other/scrollDown";
import { Fade } from "@/src/module/animations/fadeAnimation";
import {
    lg,
    md,
    OutfitBold,
    OutfitRegular,
    sm,
    xl,
} from "@/src/hooks/useFonts";
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

    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;

    const moveScroll = YOffset.interpolate({
        inputRange: [HP(800), HP(900)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [HP(800), HP(900)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const submit = () => {
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(9);
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
        if (selectedRestDay.includes(item)) {
            setSelectedRestDay((prev: any) =>
                prev.filter((d: any) => d !== item)
            );
        } else if (selectedRestDay.length < 4) {
            setSelectedRestDay((prev) => [...prev, item] as any);
        }
    };

    return !submitted ? (
        <Animated.View
            style={{
                gap: HP(2),
                opacity: fadeOut,
                flex: 1,
            }}
        >
            <Text
                style={{
                    fontSize: xl,
                    fontFamily: OutfitRegular,
                    width: WP(90),
                    color: colors.text,
                    marginTop: HP(30),
                    paddingLeft: WP(4),
                }}
            >
                Which days of the week do you prefer to rest on?
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: WP(4),
                    alignItems: "center",
                    paddingLeft: WP(4),
                    maxWidth: WP(90),
                }}
            >
                {days.map((day, index) => (
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
                            borderRadius: WP(3),
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: WP(4),
                            paddingHorizontal: WP(6),
                        }}
                        activeOpacity={0.8}
                        onPress={() => handleItemPress(day)}
                    >
                        <Text
                            style={{
                                color: selectedRestDay.includes(day as string)
                                    ? colors.white
                                    : colors.text,
                                fontSize: md,
                                fontFamily: OutfitRegular,
                            }}
                        >
                            {day}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View
                style={{
                    position: "absolute",
                    bottom: HP(4),
                    width: WP(100),
                    alignItems: "center",
                }}
            >
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
                            color: colors.white,
                            fontSize: md,
                            fontFamily: OutfitBold,
                        }}
                    >
                        Next
                    </Text>
                </SingleButton>
            </View>
        </Animated.View>
    ) : (
        <Animated.View
            style={{
                flex: 1,
                padding: WP(4),
                gap: HP(4),
                opacity: fadeIn,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{ padding: WP(4) }}>
                <Text
                    style={{
                        color: colors.text,
                        fontSize: xl,
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
