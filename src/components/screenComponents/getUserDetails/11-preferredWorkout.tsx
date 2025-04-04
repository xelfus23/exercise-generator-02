import SingleButton from "@/src/components/buttons/single-button";
import ScrollDown from "@/src/components/other/scrollDown";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitRegular, xl, sm, md, OutfitBold } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Fade } from "@/src/module/animations/fadeAnimation";
import React, { useRef, useState } from "react";
import {
    Animated,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";

interface Props {
    YOffset: Animated.Value;
    setIndex: (index: number) => void;
}

const PreferredType: React.FC<Props> = ({ YOffset, setIndex }) => {
    const colors = useThemeColors();
    const [submitted, setSubmitted] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const fadeOut = useRef(new Animated.Value(1)).current;
    const fadeIn = useRef(new Animated.Value(0)).current;

    // Preferred workout types
    const preferredTypes = [
        "Strength Training",
        "HIIT",
        "Yoga",
        "Pilates",
        "Boxing",
        "CrossFit",
        "Swimming",
        "Cycling",
        "Running",
        "Bodyweight Training",
        "Dumbbell Workouts",
        "Flexibility & Mobility",
    ];

    const toggleType = (type: string) => {
        if (!selectedTypes.includes(type)) {
            setSelectedTypes([...selectedTypes, type]);
        } else {
            setSelectedTypes(selectedTypes.filter((c) => c !== type));
        }
    };

    const submit = () => {
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(11);
                Fade({
                    fromValue: fadeIn,
                    duration: 1000,
                    toValue: 1,
                    after: () => {},
                });
            },
            toValue: 0,
        });
    };

    const moveScroll = YOffset.interpolate({
        inputRange: [HP(1000), HP(1100)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [HP(1000), HP(1100)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    return !submitted ? (
        <Animated.View style={{ flex: 1, opacity: fadeOut }}>
            {/* Question */}
            <Text
                style={{
                    paddingTop: HP(30),
                    color: colors.text,
                    fontSize: xl,
                    fontFamily: OutfitRegular,
                    paddingHorizontal: WP(4),
                    maxWidth: WP(90),
                }}
            >
                What types of workout do you prefer?
            </Text>

            {/* Autocomplete Suggestions */}
            {preferredTypes.length > 0 && (
                <ScrollView
                    contentContainerStyle={{
                        gap: HP(1),
                        paddingVertical: HP(2),
                        paddingHorizontal: WP(4),
                        flexWrap: "wrap",
                        maxHeight: HP(45),
                        maxWidth: WP(150),
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    {preferredTypes.map((type) => (
                        <TouchableOpacity
                            key={type}
                            onPress={() => toggleType(type)}
                            style={{
                                padding: WP(4),
                                borderRadius: WP(2),
                                backgroundColor: selectedTypes.includes(type)
                                    ? colors.primary
                                    : HexToHexa({
                                          hex: colors.primary,
                                          alpha: 0.2,
                                      }),
                                width: WP(40),
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: sm,
                                    color: selectedTypes.includes(type)
                                        ? colors.white
                                        : colors.text,
                                    fontFamily: OutfitRegular,
                                }}
                            >
                                {type}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {/* Submit Button */}
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
                    color={colors.primary}
                    onPress={submit}
                    style={{}}
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

export default PreferredType;
