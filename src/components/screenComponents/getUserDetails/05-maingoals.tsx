import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    ScrollView,
    Pressable,
} from "react-native";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import ScrollDown from "@/src/components/other/scrollDown";
import HexToHexa from "@/src/hooks/useHexa";
import SingleButton from "@/src/components/buttons/single-button";
import { Fade } from "@/src/module/animations/fadeAnimation";
import { mainGoalsData } from "@/src/assets/data/mainGoalsData";

interface Props {
    YOffset: Animated.Value;
    fitnessGoals: any;
    setFitnessGoals: (v: any) => void;
    setIndex: (v: number) => void;
}

const MainGoals: React.FC<Props> = ({
    YOffset,
    fitnessGoals,
    setFitnessGoals,
    setIndex,
}) => {
    const colors = useThemeColors();
    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;
    const [submitted, setSubmitted] = useState(false);

    const submit = () => {
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(5);
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

    const moveScroll = YOffset.interpolate({
        inputRange: [HP(400), HP(500)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [HP(400), HP(500)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const mainGoals = mainGoalsData;

    const handleGoalPress = (goalValue: string) => {
        setFitnessGoals(goalValue); // Select the new goal directly
    };

    return !submitted ? (
        <Animated.View
            style={{
                gap: HP(2),
                opacity: fadeOut,
                flex: 1,
            }}
        >
            <View style={{ marginTop: HP(20) }}>
                <Text
                    style={{
                        fontSize: HP(3),
                        color: colors.text,
                        fontFamily: OutfitRegular,
                        maxWidth: WP(90),
                        paddingLeft: WP(4),
                    }}
                >
                    What is your main goal?
                </Text>
                <Text
                    style={{
                        fontSize: HP(1.8),
                        color: colors.text,
                        fontFamily: OutfitRegular,
                        maxWidth: WP(90),
                        paddingLeft: WP(4),
                    }}
                >
                    Press to select goals.
                </Text>
            </View>

            <ScrollView
                contentContainerStyle={{
                    gap: WP(4),
                    paddingHorizontal: WP(4),
                    maxWidth: WP(90),
                }}
            >
                {mainGoals.map((goal) => {
                    return (
                        <Animated.View key={goal.value}>
                            <Pressable
                                style={{
                                    padding: WP(4),
                                    backgroundColor:
                                        fitnessGoals === goal.value
                                            ? colors.primary
                                            : HexToHexa({
                                                  hex: colors.secondary,
                                                  alpha: 0.2,
                                              }),
                                    borderRadius: WP(2),
                                }}
                                onPress={() => handleGoalPress(goal.value)}
                            >
                                <Text
                                    style={{
                                        fontFamily: OutfitRegular,
                                        color:
                                            fitnessGoals === goal.value
                                                ? colors.white
                                                : colors.text,
                                        fontSize: HP(1.8),
                                    }}
                                >
                                    {goal.label}
                                </Text>
                            </Pressable>
                        </Animated.View>
                    );
                })}
            </ScrollView>

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
                        fitnessGoals.length === 0
                            ? colors.secondary
                            : colors.primary
                    }
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

export default MainGoals;
