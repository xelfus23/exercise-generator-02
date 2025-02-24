import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useAuth } from "@/src/services/auth/authentication";
import { Text, TouchableOpacity, View, Animated } from "react-native";
import { WP, HP } from "@/src/hooks/useDeviceDimension";
import { Image } from "expo-image";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import SingleButton from "@/src/components/buttons/single-button";
import { useEffect, useRef, useState } from "react";
import { Fade } from "@/src/module/animations/fadeAnimation";
import ScrollDown from "@/src/components/other/scrollDown";

interface props {
    gender: string;
    setUserProfile: (v: any) => void;
    YOffset: Animated.Value;
    setIndex: (v: number) => void;
}

const Gender: React.FC<props> = ({
    gender,
    setUserProfile,
    YOffset,
    setIndex,
}) => {
    const colors = useThemeColors();
    const { user } = useAuth();

    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;

    const [submitted, setSubmitted] = useState(false);

    const genderItems = [
        {
            label: "Male",
            value: "male",
            icon: require("@/src/assets/images/ui/human/male.png"),
        },
        {
            label: "Female",
            value: "female",
            icon: require("@/src/assets/images/ui/human/female.png"),
        },
    ];

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

    const handlePress = (v: any) => {
        setUserProfile({ gender: v.value });
    };

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

    return (
        <View style={{ flex: 1 }}>
            {!submitted ? (
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
                        What is your gender {user?.firstName}?
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            backgroundColor: HexToHexa({
                                hex: colors.secondary,
                                alpha: 0.2,
                            }),
                            paddingVertical: WP(4),
                            borderRadius: WP(4),
                            gap: WP(4),
                        }}
                    >
                        {genderItems.map((v, i) => (
                            <TouchableOpacity
                                key={i}
                                style={{ alignItems: "center" }}
                                onPress={() => handlePress(v as any)}
                            >
                                <Image
                                    source={v.icon}
                                    style={{
                                        height: HP(30),
                                        width: WP(40),
                                        opacity: gender === v.value ? 1 : 0.5,
                                    }}
                                    contentFit="contain"
                                />
                                <Text
                                    style={{
                                        color: colors.text,
                                        fontSize: HP(2),
                                    }}
                                >
                                    {v.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View
                        style={{
                            width: WP(90),
                            alignItems: "center",
                            position: "absolute",
                            bottom: HP(2),
                        }}
                    >
                        <SingleButton
                            loading={false}
                            style={{}}
                            color={
                                gender === ""
                                    ? colors.secondary
                                    : colors.primary
                            }
                            onPress={submit}
                            disabled={gender === ""}
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
                    }}
                >
                    <View style={{ padding: WP(4) }}>
                        <Text style={{ color: colors.text, fontSize: HP(3) }}>
                            Scroll down
                        </Text>
                    </View>
                    <ScrollDown
                        move={moveScroll as any}
                        fade={fadeScroll as any}
                    />
                </Animated.View>
            )}
        </View>
    );
};

export default Gender;
