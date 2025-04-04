import RoundedButton from "@/src/components/buttons/rounded-button";
import { TypingAnimation } from "@/src/components/other/typingText";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

interface ScreenProps {
    handleScroll: (value: number) => void;
    navigator: any;
    screenIndex: number;
}

const WelcomeScreen2: React.FC<ScreenProps> = ({ navigator, screenIndex }) => {
    const colors = useThemeColors();
    const opacity1 = useRef(new Animated.Value(0)).current;
    const opacity2 = useRef(new Animated.Value(0)).current;
    const opacity3 = useRef(new Animated.Value(0)).current;

    const buttonOpacity = useRef(new Animated.Value(0)).current;

    const [enable, setEnable] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const animateTexts = () => {
        Animated.timing(opacity1, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            delay: 1000,
        }).start(() => {
            Animated.timing(opacity2, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => {
                Animated.timing(opacity3, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                    delay: 1500,
                }).start(() => {
                    Animated.timing(buttonOpacity, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }).start(() => {
                        setEnable(true);
                    });
                });
            });
            setLoaded(true);
        });
    };

    useEffect(() => {
        if (screenIndex === 1) {
            if (!loaded) {
                animateTexts();
            }
        }
    }, [screenIndex]);

    console.log("Welcome 2");

    return (
        <View
            style={{
                width: WP(100),
                alignItems: "center",
                gap: HP(2),
                marginTop: HP(40),
            }}
        >
            <View style={{ alignItems: "center" }}>
                <Animated.Text
                    style={{
                        fontSize: HP(5),
                        color: colors.primary,
                        opacity: opacity1,
                        fontFamily: OutfitBold,
                        textAlignVertical: "bottom",
                    }}
                >
                    Welcome!
                </Animated.Text>
                {loaded && (
                    <Animated.Text
                        style={{
                            color: colors.text,
                            opacity: opacity2,
                            fontSize: HP(1.6),
                            textAlign: "center",
                            width: WP(90),
                            fontFamily: OutfitRegular,
                        }}
                    >
                        <TypingAnimation
                            text={`Let's kickstart your personalized fitness journey with AI-powered workouts tailored just for you.`}
                            speed={20}
                        />
                    </Animated.Text>
                )}
            </View>

            <Animated.View
                style={{
                    opacity: buttonOpacity,
                }}
            >
                <RoundedButton
                    text="Continue"
                    press={() => navigator.navigate("SignUp")}
                    disabled={!enable}
                />
            </Animated.View>
        </View>
    );
};

export default WelcomeScreen2;
