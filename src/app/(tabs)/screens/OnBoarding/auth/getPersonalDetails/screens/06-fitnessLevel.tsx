import { Animated, Text, TouchableOpacity, View } from "react-native";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useRef, useState } from "react";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import SingleButton from "@/src/components/buttons/single-button";
import { Fade } from "@/src/module/animations/fadeAnimation";
import ScrollDown from "@/src/components/other/scrollDown";

interface props {
    YOffset: Animated.Value;
    setIndex: (v: number) => void;
}

const FitnesLevel: React.FC<props> = ({ YOffset, setIndex }) => {
    const colors = useThemeColors();
    const [submitted, setSubmitted] = useState(false);
    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;
    const [selected, setSelected] = useState("");

    const moveScroll = YOffset.interpolate({
        inputRange: [HP(500), HP(600)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [HP(500), HP(600)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const fitnessLevels = [
        {
            label: "Beginner",
            value: "beginner",
            description:
                "You are new to exercise or returning after a long break. Focus on building foundational strength, endurance, and mobility with low-impact activities.",
        },
        {
            label: "Intermediate",
            value: "intermediate",
            description:
                "You have a consistent fitness routine and are looking to improve your strength, endurance, and flexibility through moderate-intensity workouts.",
        },
        {
            label: "Advanced",
            value: "advanced",
            description:
                "You are highly active and engage in challenging workouts regularly. Training involves high-intensity exercises and advanced techniques to optimize performance.",
        },
    ];

    const submit = () => {
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(6);
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
                opacity: fadeOut,
                flex: 1,
            }}
        >
            <Text
                style={{
                    fontSize: HP(3),
                    color: colors.text,
                    fontFamily: OutfitRegular,
                    maxWidth: WP(90),
                    paddingLeft: WP(4),
                    marginTop: HP(20),
                }}
            >
                What is your current fitness level?
            </Text>

            <View
                style={{ gap: WP(4), paddingLeft: WP(4), paddingRight: WP(10) }}
            >
                {fitnessLevels.map((f) => (
                    <TouchableOpacity
                        onPress={() => setSelected(f.value)}
                        key={f.label}
                        style={{
                            padding: WP(4),
                            backgroundColor:
                                selected === f.value
                                    ? HexToHexa({
                                          hex: colors.primary,
                                          alpha: 1,
                                      })
                                    : HexToHexa({
                                          hex: colors.secondary,
                                          alpha: 0.2,
                                      }),
                            borderRadius: WP(4),
                            gap: HP(1),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: HP(2),
                                color:
                                    selected === f.value
                                        ? colors.white
                                        : colors.text,
                            }}
                        >
                            {f.label}
                        </Text>
                        <Text
                            style={{
                                fontSize: HP(1.5),
                                color:
                                    selected === f.value
                                        ? colors.white
                                        : colors.text,
                            }}
                        >
                            {f.description}
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
                    color={colors.primary}
                    onPress={submit}
                    disabled={false}
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

export default FitnesLevel;
