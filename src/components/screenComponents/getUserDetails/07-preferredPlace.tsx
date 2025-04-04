import SingleButton from "@/src/components/buttons/single-button";
import ScrollDown from "@/src/components/other/scrollDown";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold, OutfitRegular, xl } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Fade } from "@/src/module/animations/fadeAnimation";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

interface Props {
    YOffset: Animated.Value;
    setIndex: (index: number) => void;
}

const Place: React.FC<Props> = ({ YOffset, setIndex }) => {
    const [submitted, setSubmitted] = useState(false);
    const colors = useThemeColors();
    const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
    const fadeOut = useRef(new Animated.Value(1)).current;
    const fadeIn = useRef(new Animated.Value(0)).current;

    const places = [
        {
            name: "Home",
            description:
                "A personal and private space, typically inside a house or apartment, where you can relax, live, and manage daily activities. It's easily accessible, allowing you to have flexibility in your schedule.",
            icon: require("@/src/assets/images/ui/icons-svg/home-place-icon.svg"),
        },
        {
            name: "Outdoor",
            description:
                "Any open, natural environment such as parks, fields, or beaches. It provides fresh air, natural scenery, and a space that can be used for recreational activities, walking, or socializing.",
            icon: require("@/src/assets/images/ui/icons-svg/outdoor-icon.svg"),
        },
        {
            name: "Gym",
            description:
                "A fitness center or facility equipped with machines, free weights, and other exercise tools. It’s a controlled environment specifically designed for training and physical exercise.",
            icon: require("@/src/assets/images/ui/icons-svg/gym-icon.svg"),
        },
    ];

    // Create a map of Animated values for borders
    const borderWidths = useRef(
        Object.fromEntries(
            places.map((place) => [place.name, new Animated.Value(0)])
        )
    ).current;

    const borderColors = useRef(
        Object.fromEntries(
            places.map((place) => [place.name, new Animated.Value(0)])
        )
    ).current;

    const onPress = (placeName: string) => {
        setSelectedPlaces((prevSelected) => {
            if (prevSelected.includes(placeName)) {
                return prevSelected.filter((name) => name !== placeName);
            } else {
                return [...prevSelected, placeName];
            }
        });
    };

    useEffect(() => {
        places.forEach((place) => {
            const isSelected = selectedPlaces.includes(place.name);

            Animated.parallel([
                Animated.timing(borderWidths[place.name], {
                    toValue: isSelected ? 5 : 0,
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.timing(borderColors[place.name], {
                    toValue: isSelected ? 1 : 0,
                    duration: 500,
                    useNativeDriver: false,
                }),
            ]).start();
        });
    }, [selectedPlaces, colors.primary, colors.text]);

    const submit = () => {
        // if (selectedPlaces.length === 0) return; // Prevent empty submission

        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(7);
                Fade({
                    fromValue: fadeIn,
                    duration: 1000,
                    toValue: 1,
                    after: () => {},
                } as any);
            },
            toValue: 0,
        });
    };

    const getColor = (animatedValue: Animated.Value) =>
        animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [colors.text, colors.primary],
        });

    const moveScroll = YOffset.interpolate({
        inputRange: [HP(600), HP(700)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [HP(600), HP(700)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

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
                    color: colors.text,
                    fontFamily: OutfitRegular,
                    fontSize: xl,
                    marginTop: HP(30),
                    paddingHorizontal: WP(4),
                }}
            >
                Where do you prefer doing your exercise?
            </Text>

            <View
                style={{ gap: HP(2), width: WP(80), paddingHorizontal: WP(4) }}
            >
                {places.map((place) => (
                    <TouchableOpacity
                        key={place.name}
                        onPress={() => onPress(place.name)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: WP(70),
                        }}
                    >
                        <Animated.View
                            style={{
                                height: HP(10),
                                aspectRatio: 1,
                                borderWidth: borderWidths[place.name],
                                borderColor: getColor(borderColors[place.name]),
                                borderRadius: WP(100),
                                overflow: "hidden",
                                padding: WP(2),
                            }}
                        >
                            <Image
                                source={place.icon}
                                style={{
                                    flex: 1,
                                    aspectRatio: 1,
                                    tintColor: colors.text,
                                }}
                            />
                        </Animated.View>
                        <View style={{ padding: WP(2) }}>
                            <Text
                                style={{
                                    color: colors.text,
                                    fontSize: HP(2),
                                    fontFamily: OutfitRegular,
                                }}
                            >
                                {place.name}
                            </Text>
                            <Text
                                style={{
                                    color: colors.text,
                                    fontSize: HP(1.4),
                                    fontFamily: OutfitRegular,
                                    maxWidth: WP(65),
                                }}
                            >
                                {place.description}
                            </Text>
                        </View>
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
                    style={{}}
                    loading={false}
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

export default Place;
