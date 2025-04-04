import SingleButton from "@/src/components/buttons/single-button";
import ScrollDown from "@/src/components/other/scrollDown";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import {
    OutfitRegular,
    xl,
    sm,
    md,
    OutfitBold,
    lg,
} from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Fade } from "@/src/module/animations/fadeAnimation";
import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    Animated,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";

interface props {
    YOffset: Animated.Value;
    setIndex: (index: number) => void;
}

const Health: React.FC<props> = ({ YOffset, setIndex }) => {
    const colors = useThemeColors();
    const [submitted, setSubmitted] = useState(false);
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;

    // Common conditions for autocomplete suggestions
    const healthConditions = [
        // Cardiovascular Conditions
        "Heart Disease",
        "High Blood Pressure",
        "Low Blood Pressure",
        "Arrhythmia",
        "Previous Heart Attack",

        // Respiratory Conditions
        "Asthma",
        "Chronic Bronchitis",
        "COPD (Chronic Obstructive Pulmonary Disease)",
        "Respiratory Issues",

        // Musculoskeletal Conditions
        "Joint Pain",
        "Arthritis",
        "Osteoarthritis",
        "Rheumatoid Arthritis",
        "Osteoporosis",
        "Back Pain",
        "Sciatica",
        "Herniated Disc",
        "Scoliosis",
        "Post-Surgical Recovery",

        // Metabolic & Endocrine Disorders
        "Diabetes Type 1",
        "Diabetes Type 2",
        "Obesity",
        "Thyroid Disorders",
        "Hyperthyroidism",
        "Hypothyroidism",

        // Neurological Conditions
        "Epilepsy",
        "Seizure Disorders",
        "Migraines",
        "Stroke History",
        "Peripheral Neuropathy",
        "Parkinson’s Disease",

        // Autoimmune & Chronic Conditions
        "Lupus",
        "Multiple Sclerosis",
        "Chronic Fatigue Syndrome",
        "Fibromyalgia",
        "Chronic Pain Syndrome",

        // Mental Health Conditions (Affecting Motivation & Energy)
        "Depression",
        "Anxiety Disorders",
        "PTSD (Post-Traumatic Stress Disorder)",
        "Bipolar Disorder",

        // Pregnancy & Postpartum
        "Pregnancy",
        "Postpartum Recovery",
    ];

    // Filter conditions based on user input
    const filteredConditions = inputValue
        ? healthConditions.filter(
              (condition) =>
                  condition.toLowerCase().includes(inputValue.toLowerCase()) &&
                  !selectedConditions.includes(condition)
          )
        : [];

    const addCondition = (condition: string) => {
        if (!selectedConditions.includes(condition)) {
            setSelectedConditions([...selectedConditions, condition]);
        }
        setInputValue(""); // Clear input after selection
    };

    const removeCondition = (condition: string) => {
        setSelectedConditions(
            selectedConditions.filter((c) => c !== condition)
        );
    };

    const submit = () => {
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(10);
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
        inputRange: [HP(900), HP(1000)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [HP(900), HP(1000)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    return !submitted ? (
        <Animated.View style={{ flex: 1, opacity: fadeOut }}>
            {/* Question */}
            <Text
                style={{
                    paddingTop: HP(10),
                    color: colors.text,
                    fontSize: xl,
                    fontFamily: OutfitRegular,
                    paddingHorizontal: WP(4),
                }}
            >
                Do you have any health conditions?
            </Text>
            <Text
                style={{
                    color: colors.text,
                    fontSize: sm,
                    fontFamily: OutfitRegular,
                    paddingHorizontal: WP(4),
                }}
            >
                If none you can skip this.
            </Text>

            <View
                style={{
                    marginTop: HP(2),
                    padding: WP(3),
                    borderRadius: WP(4),
                    marginHorizontal: WP(4),
                    width: WP(80),
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderColor: colors.secondary,
                        borderRadius: WP(2),
                        padding: WP(1),
                    }}
                >
                    <Ionicons
                        name="search-outline"
                        size={md}
                        color={colors.text}
                        style={{ padding: WP(2) }}
                    />
                    <TextInput
                        style={{
                            fontSize: md,
                            color: colors.text,
                            flex: 1,
                            height: HP(5),
                            textAlignVertical: "center",
                        }}
                        placeholder="Type here..."
                        placeholderTextColor={HexToHexa({
                            hex: colors.text,
                            alpha: 0.5,
                        })}
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                </View>
            </View>

            {/* Suggested Conditions */}
            {filteredConditions.length > 0 && (
                <ScrollView
                    contentContainerStyle={{
                        gap: HP(1),
                        paddingVertical: HP(2),
                        maxHeight: HP(20),
                        paddingHorizontal: WP(4),
                    }}
                    style={{
                        maxHeight: HP(20),
                        borderColor: colors.secondary,
                        marginTop: HP(1),
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ flexWrap: "wrap", gap: WP(2) }}>
                        {filteredConditions.map((condition) => (
                            <TouchableOpacity
                                key={condition}
                                onPress={() => addCondition(condition)}
                                style={{
                                    padding: WP(3),
                                    borderRadius: WP(2),
                                    backgroundColor: HexToHexa({
                                        hex: colors.primary,
                                        alpha: 0.2,
                                    }),
                                }}
                            >
                                <Text
                                    style={{ fontSize: sm, color: colors.text }}
                                >
                                    {condition}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}

            {/* Selected Conditions */}
            {selectedConditions.length > 0 && (
                <View
                    style={{
                        width: WP(100),
                        backgroundColor: HexToHexa({
                            hex: colors.secondary,
                            alpha: 0.2,
                        }),
                        borderTopLeftRadius: WP(4),
                        borderTopRightRadius: WP(4),
                        flex: 1,
                        paddingTop: HP(2),
                        marginTop: HP(2),
                    }}
                >
                    <Text
                        style={{
                            fontSize: md,
                            color: colors.text,
                            fontFamily: OutfitRegular,
                            paddingHorizontal: WP(4),
                        }}
                    >
                        Selected:
                    </Text>

                    <ScrollView
                        contentContainerStyle={{
                            gap: HP(1),
                            paddingVertical: HP(2),
                            paddingHorizontal: WP(4),
                            maxHeight: HP(55),
                        }}
                        horizontal
                    >
                        <View
                            style={{
                                gap: WP(2),
                                flexWrap: "wrap",
                                flexDirection: "row",
                                maxWidth: WP(90),
                            }}
                        >
                            {selectedConditions.map((condition) => (
                                <TouchableOpacity
                                    key={condition}
                                    onPress={() => removeCondition(condition)}
                                    style={{
                                        padding: WP(2),
                                        borderRadius: WP(2),
                                        backgroundColor: HexToHexa({
                                            hex: colors.primary,
                                            alpha: 0.2,
                                        }),
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: WP(2),
                                    }}
                                >
                                    <Entypo
                                        name="cross"
                                        size={md}
                                        color={colors.error}
                                    />

                                    <Text
                                        style={{
                                            fontSize: sm,
                                            color: colors.text,
                                        }}
                                    >
                                        {condition}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
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
                    style={{}}
                    color={colors.primary}
                    onPress={submit}
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

export default Health;
