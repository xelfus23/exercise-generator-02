import { mainGoalsData } from "@/src/assets/data/mainGoalsData";
import SingleButton from "@/src/components/buttons/single-button";
import Loading from "@/src/components/loading/loading";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import {
    lg,
    md,
    OutfitBold,
    OutfitRegular,
    sm,
    xl,
} from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Fade } from "@/src/module/animations/fadeAnimation";
import React, { useRef, useState, useMemo } from "react";
import { Animated, ScrollView, Text, View, StyleSheet } from "react-native";

interface Props {
    YOffset: Animated.Value;
    setIndex: (index: number) => void;
    registration: () => void;
    userProfile: {
        gender: string;
        height: { value: number; unit: string };
        weight: { value: number; unit: string };
        birthDate: { year: number; month: number; day: number };
    };
    fitnessGoal: string;
    fitnessLevel: string;
    targetWeight: { value: number; unit: string };
    equipment: string[];
    preferredTypes: string[];
    restDays: string[];
    location: string[];
    healthConditions: string[];
}

const Review: React.FC<Props> = ({
    YOffset,
    setIndex,
    registration,
    userProfile,
    fitnessGoal,
    fitnessLevel,
    targetWeight,
    equipment,
    preferredTypes,
    restDays,
    location,
    healthConditions,
}) => {
    const colors = useThemeColors();
    const [submitted, setSubmitted] = useState(false);
    const fadeOut = useRef(new Animated.Value(1)).current;
    const fadeIn = useRef(new Animated.Value(0)).current;

    const moveScroll = useMemo(
        () =>
            YOffset.interpolate({
                inputRange: [1100, HP(1200)],
                outputRange: [0, HP(20)],
                extrapolate: "clamp",
            }),
        [YOffset]
    );

    const fadeScroll = useMemo(
        () =>
            YOffset.interpolate({
                inputRange: [1100, HP(1200)],
                outputRange: [1, 0],
                extrapolate: "clamp",
            }),
        [YOffset]
    );

    const submit = () => {
        registration();

        // Animated.timing(fadeOut, {
        //     toValue: 0,
        //     duration: 1000,
        //     useNativeDriver: false,
        // }).start(() => {
        //     setSubmitted(true);
        //     Animated.timing(fadeIn, {
        //         toValue: 1,
        //         duration: 1000,
        //         useNativeDriver: false,
        //     }).start(() => {
        //         registration();
        //     });
        // });
    };

    const getMonth = (month: number): string => {
        const months = [
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
        return months[month - 1];
    };

    const userProfileItems = useMemo(
        () => ({
            name: "User Profile",
            value: [
                { label: "Gender", value: userProfile.gender },
                {
                    label: "Height",
                    value: `${userProfile.height.value} ${userProfile.height.unit}`,
                },
                {
                    label: "Weight",
                    value: `${userProfile.weight.value} ${userProfile.weight.unit}`,
                },
                {
                    label: "Birth Date",
                    value: `${userProfile.birthDate.year}, ${getMonth(
                        userProfile.birthDate.month
                    )} ${userProfile.birthDate.day}`,
                },
                {
                    label: "Target Weight",
                    value: `${targetWeight.value} ${targetWeight.unit}`,
                },
                { label: "Current Fitness Level", value: fitnessLevel },
            ],
        }),
        [userProfile, targetWeight, fitnessLevel]
    );

    const fitnessGoalsItems = useMemo(
        () => ({
            name: "Fitness Goal",
            primary: mainGoalsData.find((goal) => goal.value === fitnessGoal)
                ?.label,
        }),
        [fitnessGoal, mainGoalsData]
    );

    const renderItem = (item: string, index: number) => (
        <View
            key={index}
            style={[
                styles.itemContainer,
                {
                    backgroundColor: HexToHexa({
                        hex: colors.secondary,
                        alpha: 0.2,
                    }),
                },
            ]}
        >
            <Text style={[styles.itemText, { color: colors.text }]}>
                {item}
            </Text>
        </View>
    );

    const renderDetails = (label: string, value: string) => (
        <View
            key={label}
            style={[
                styles.detailContainer,
                {
                    backgroundColor: HexToHexa({
                        hex: colors.secondary,
                        alpha: 0.2,
                    }),
                },
            ]}
        >
            <Text style={[styles.detailLabel, { color: colors.text }]}>
                {label}:
            </Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>
                {value}
            </Text>
        </View>
    );

    if (!submitted) {
        return (
            <Animated.View style={{ flex: 1 }}>
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.scrollContainer}
                >
                    <View
                        style={[
                            styles.cardContainer,
                            {
                                backgroundColor: HexToHexa({
                                    hex: colors.secondary,
                                    alpha: 0.2,
                                }),
                            },
                        ]}
                    >
                        <Text
                            style={[styles.cardTitle, { color: colors.text }]}
                        >
                            Personal Details
                        </Text>
                        {userProfileItems.value.map((item, index) =>
                            renderDetails(item.label, item.value)
                        )}
                    </View>

                    <View
                        style={[
                            styles.cardContainer,
                            {
                                backgroundColor: HexToHexa({
                                    hex: colors.secondary,
                                    alpha: 0.2,
                                }),
                                width: WP(100),
                                maxHeight: HP(70),
                            },
                        ]}
                    >
                        <Text
                            style={[styles.cardTitle, { color: colors.text }]}
                        >
                            Fitness Goal
                        </Text>
                        <View
                            style={[
                                styles.goalContainer,
                                {
                                    backgroundColor: HexToHexa({
                                        hex: colors.secondary,
                                        alpha: 0.2,
                                    }),
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.goalText,
                                    { color: colors.text },
                                ]}
                            >
                                {fitnessGoalsItems.primary}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.cardContainer,
                            {
                                backgroundColor: HexToHexa({
                                    hex: colors.secondary,
                                    alpha: 0.2,
                                }),
                                maxWidth: WP(100),
                            },
                        ]}
                    >
                        <Text
                            style={[styles.cardTitle, { color: colors.text }]}
                        >
                            Available Equipments:
                        </Text>
                        <View style={styles.itemsContainer}>
                            {equipment.map(renderItem)}
                        </View>
                    </View>

                    <View style={{ gap: HP(2) }}>
                        <View
                            style={[
                                styles.cardContainer,
                                {
                                    backgroundColor: HexToHexa({
                                        hex: colors.secondary,
                                        alpha: 0.2,
                                    }),
                                    maxWidth: WP(80),
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.cardTitle,
                                    { color: colors.text },
                                ]}
                            >
                                Selected Place:
                            </Text>
                            <View style={styles.itemsContainer}>
                                {location.map(renderItem)}
                            </View>
                        </View>

                        <View
                            style={[
                                styles.cardContainer,
                                {
                                    backgroundColor: HexToHexa({
                                        hex: colors.secondary,
                                        alpha: 0.2,
                                    }),
                                    maxWidth: WP(80),
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.cardTitle,
                                    { color: colors.text },
                                ]}
                            >
                                Health Conditions:
                            </Text>
                            <View style={styles.itemsContainer}>
                                {healthConditions.map(renderItem)}
                            </View>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.cardContainer,
                            {
                                backgroundColor: HexToHexa({
                                    hex: colors.secondary,
                                    alpha: 0.2,
                                }),
                                maxWidth: WP(60),
                            },
                        ]}
                    >
                        <Text
                            style={[styles.cardTitle, { color: colors.text }]}
                        >
                            Rest Days:
                        </Text>
                        <View style={styles.itemsContainer}>
                            {restDays.map(renderItem)}
                        </View>
                    </View>

                    <View
                        style={[
                            styles.cardContainer,
                            {
                                backgroundColor: HexToHexa({
                                    hex: colors.secondary,
                                    alpha: 0.2,
                                }),
                                maxWidth: WP(60),
                            },
                        ]}
                    >
                        <Text
                            style={[styles.cardTitle, { color: colors.text }]}
                        >
                            Preferred Workout Types:
                        </Text>
                        <View style={styles.itemsContainer}>
                            {preferredTypes.map(renderItem)}
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <SingleButton
                        loading={false}
                        style={{}}
                        color={colors.primary}
                        onPress={submit}
                        disabled={false}
                    >
                        <Text
                            style={[styles.buttonText, { color: colors.white }]}
                        >
                            Submit
                        </Text>
                    </SingleButton>
                </View>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={[styles.submittedContainer, { opacity: fadeIn }]}>
            <View style={styles.scrollDownTextContainer}>
                <Text style={[styles.scrollDownText, { color: colors.text }]}>
                    Sumitting please wait...
                </Text>
            </View>
            <Loading style={{ height: HP(10) }} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: WP(4),
        gap: WP(4),
        alignItems: "flex-start",
        marginTop: HP(10),
    },
    cardContainer: {
        gap: HP(2),
        paddingHorizontal: WP(4),
        padding: WP(4),
        borderRadius: WP(4),
        width: WP(60),
        maxHeight: HP(80),
    },
    cardTitle: {
        fontSize: lg,
        fontFamily: OutfitRegular,
    },
    detailContainer: {
        padding: WP(4),
        borderRadius: WP(2),
        width: "90%",
    },
    detailLabel: {
        fontSize: sm,
        fontFamily: OutfitRegular,
    },
    detailValue: {
        fontSize: md,
        fontFamily: OutfitRegular,
    },
    sectionLabel: {
        fontSize: sm,
        fontFamily: OutfitRegular,
    },
    goalContainer: {
        padding: WP(4),
        gap: HP(1),
        borderRadius: WP(2),
        maxWidth: WP(70),
    },
    goalText: {
        fontSize: md,
        fontFamily: OutfitRegular,
    },
    itemsContainer: {
        gap: HP(1),
        flexDirection: "row",
        flexWrap: "wrap",
        maxWidth: "100%",
    },
    itemContainer: {
        paddingHorizontal: WP(4),
        paddingVertical: WP(2),
        borderRadius: WP(2),
    },
    itemText: {
        fontSize: sm,
        fontFamily: OutfitRegular,
    },
    buttonContainer: {
        position: "absolute",
        bottom: HP(4),
        width: WP(100),
        alignItems: "center",
    },
    buttonText: {
        fontSize: HP(2),
        fontFamily: OutfitBold,
    },
    submittedContainer: {
        padding: WP(4),
        height: HP(100),
        justifyContent: "center",
        alignItems: "center",
    },
    scrollDownTextContainer: {
        padding: WP(4),
    },
    scrollDownText: {
        fontSize: lg,
        fontFamily: OutfitRegular,
    },
});

export default Review;
