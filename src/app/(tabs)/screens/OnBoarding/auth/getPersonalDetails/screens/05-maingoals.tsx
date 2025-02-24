import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    ScrollView,
} from "react-native";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import ScrollDown from "@/src/components/other/scrollDown";
import HexToHexa from "@/src/hooks/useHexa";
import AntDesign from "@expo/vector-icons/AntDesign";
import SingleButton from "@/src/components/buttons/single-button";
import { Fade } from "@/src/module/animations/fadeAnimation";

interface Props {
    YOffset: Animated.Value; // Removed for now
    fitnessGoals: any; // Define a more specific type later
    setFitnessGoals: (v: any) => void; // Define a more specific type later
    setIndex: (v: number) => void; // Define a more specific type later
}

// Define a type for the sub-goal objects
interface SubGoal {
    value: string;
    category: string;
}

const MainGoals: React.FC<Props> = ({
    YOffset,
    fitnessGoals,
    setFitnessGoals,
    setIndex,
}) => {
    const colors = useThemeColors();

    const [expandedCategory, setExpandedCategory] = useState<string[]>([]);
    const [selectedSubGoals, setSelectedSubGoals] = useState<SubGoal[]>([]);
    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;
    const [submitted, setSubmitted] = useState(false);

    const handlePressMainGoal = (categoryLabel: string) => {
        expandedCategory?.includes(categoryLabel)
            ? setExpandedCategory(
                  expandedCategory.filter((x) => x !== categoryLabel)
              )
            : setExpandedCategory((prev: any) => [...prev, categoryLabel]);
    };

    const handlePressSubGoal = (subGoal: SubGoal) => {
        // Use .some() for comparison
        const isAlreadySelected = selectedSubGoals.some(
            (selected) =>
                selected.value === subGoal.value &&
                selected.category === subGoal.category
        );

        if (isAlreadySelected) {
            // Remove the sub-goal (filter out the matching object)
            setSelectedSubGoals(
                selectedSubGoals.filter(
                    (selected) =>
                        selected.value !== subGoal.value ||
                        selected.category !== subGoal.category
                )
            );
        } else {
            // Add the sub-goal
            setSelectedSubGoals([...selectedSubGoals, subGoal]);
        }
    };

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

    const mainGoalOptions = [
        {
            label: "Improve General Fitness",
            value: [
                {
                    label: "Increase Physical Activity",
                    value: "Increase Activity",
                },
                {
                    label: "Enhance Overall Well-Being",
                    value: "Enhance Well-Being",
                },
                {
                    label: "Learn Fundamental Exercises",
                    value: "Learn Exercises",
                },
                {
                    label: "Improve Posture and Mobility",
                    value: "Improve Posture",
                },
            ],
        },
        {
            label: "Weight Management",
            value: [
                { label: "Achieve Gradual Weight Loss", value: "Lose Weight" },
                {
                    label: "Improve Physical Appearance",
                    value: "Improve Appearance",
                },
                {
                    label: "Develop Healthier Eating Habits",
                    value: "Healthy Eating",
                },
                {
                    label: "Maintain a Healthy Weight",
                    value: "Maintain Weight",
                },
            ],
        },
        {
            label: "Strength and Muscle Development",
            value: [
                {
                    label: "Enhance Muscular Strength",
                    value: "Increase Strength",
                },
                { label: "Build Lean Muscle Mass", value: "Build Muscle" },
                {
                    label: "Improve Muscle Definition",
                    value: "Improve Definition",
                },
                {
                    label: "Increase Lifting Capacity",
                    value: "Increase Lifting Capacity",
                },
            ],
        },
        {
            label: "Enhance Energy and Endurance",
            value: [
                { label: "Reduce Fatigue", value: "Reduce Fatigue" },
                {
                    label: "Improve Stamina for Daily Activities",
                    value: "Increase Stamina",
                },
                {
                    label: "Enhance Cardiovascular Health",
                    value: "Improve Cardiovascular Health",
                },
                { label: "Improve Sleep Quality", value: "Better Sleep" },
            ],
        },
        {
            label: "Increase Flexibility and Mobility",
            value: [
                {
                    label: "Enhance Range of Motion",
                    value: "Increase Mobility",
                },
                {
                    label: "Engage in Stretching or Yoga",
                    value: "Stretching & Yoga",
                },
                { label: "Reduce Muscle Stiffness", value: "Reduce Stiffness" },
                {
                    label: "Improve Balance and Coordination",
                    value: "Improve Balance",
                },
            ],
        },
        {
            label: "Sports Performance Training",
            value: [
                { label: "Basketball", value: "Basketball" },
                { label: "Soccer", value: "Soccer" },
                { label: "Tennis", value: "Tennis" },
                { label: "Swimming", value: "Swimming" },
                { label: "Running", value: "Running" },
                { label: "Cycling", value: "Cycling" },
                { label: "Rock Climbing", value: "Rock Climbing" },
                { label: "Martial Arts", value: "Martial Arts" },
                { label: "Gymnastics", value: "Gymnastics" },
                { label: "Dancing", value: "Dancing" },
            ],
        },
        {
            label: "Mental and Physical Well-Being",
            value: [
                { label: "Reduce Stress and Anxiety", value: "Reduce Stress" },
                { label: "Enhance Mood and Confidence", value: "Improve Mood" },
                {
                    label: "Improve Relaxation and Focus",
                    value: "Relax & Focus",
                },
                {
                    label: "Engage in Mind-Body Practices",
                    value: "Mind-Body Practices",
                },
            ],
        },
    ];
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
                    What are your main goals?
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
                horizontal
                contentContainerStyle={{ gap: WP(4), paddingHorizontal: WP(4) }}
            >
                {mainGoalOptions.map((mainGoal, index) => (
                    <View key={mainGoal.label}>
                        <View
                            style={{
                                backgroundColor: HexToHexa({
                                    hex: colors.primary,
                                    alpha: 0.2,
                                }),
                                borderRadius: WP(2),
                                padding: WP(4),
                                gap: HP(1),
                            }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    handlePressMainGoal(mainGoal.label as any)
                                }
                            >
                                <Text
                                    style={{
                                        fontSize: HP(2),
                                        color: colors.text,
                                        fontFamily: OutfitRegular,
                                        borderRadius: WP(4),
                                    }}
                                >
                                    {mainGoal.label}
                                </Text>
                            </TouchableOpacity>

                            {expandedCategory?.includes(mainGoal.label) && (
                                <View
                                    style={{
                                        flexDirection:
                                            index === 5 ? "row" : "column",
                                        flexWrap: "wrap",
                                        gap: HP(1),
                                        borderRadius: WP(2),
                                        maxWidth: index === 5 ? WP(80) : "auto",
                                    }}
                                >
                                    {mainGoal.value.map((subGoal) => (
                                        <TouchableOpacity
                                            key={subGoal.value} // Use subGoal.value as the key
                                            onPress={() =>
                                                handlePressSubGoal({
                                                    value: subGoal.value,
                                                    category: mainGoal.label,
                                                })
                                            }
                                        >
                                            <Text
                                                style={{
                                                    color: HexToHexa({
                                                        alpha: 0.8,
                                                        hex: colors.text,
                                                    }),
                                                    fontFamily: OutfitRegular,
                                                    fontSize: HP(1.8),
                                                    paddingVertical: WP(2),
                                                    borderRadius: WP(2),
                                                    textAlignVertical: "center",
                                                    width:
                                                        index === 5
                                                            ? WP(35)
                                                            : "auto",
                                                }}
                                            >
                                                {selectedSubGoals.some(
                                                    (selected) =>
                                                        selected.value ===
                                                            subGoal.value &&
                                                        selected.category ===
                                                            mainGoal.label
                                                ) ? (
                                                    <AntDesign
                                                        name="checkcircle"
                                                        size={HP(2)}
                                                        color={colors.primary}
                                                    />
                                                ) : (
                                                    <AntDesign
                                                        name="checkcircleo"
                                                        size={HP(2)}
                                                        color="black"
                                                    />
                                                )}
                                                {"  "}
                                                {subGoal.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                ))}
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
                        selectedSubGoals.length === 0
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

export default MainGoals;
