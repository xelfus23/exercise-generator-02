import { Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import Loading from "../../loading/loading";
import { HP } from "@/src/hooks/useDeviceDimension";
import { md, OutfitRegular } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";

const GeneratingScreen: React.FC = () => {
    const colors = useThemeColors();

    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: 0.8,
                    duration: 1000, // Adjust duration for fade-in speed
                    useNativeDriver: true, // Important for performance
                }),
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 1000, // Adjust duration for fade-out speed
                    useNativeDriver: true, // Important for performance
                    delay: 1000,
                }),
            ]),
            { iterations: -1 } // Infinite loop
        ).start();
    }, []);

    useEffect(() => {
        setTimeout(() => {}, 10000);
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.background,
            }}
        >
            <Loading style={{ height: HP(20), aspectRatio: 1 }} />
            <Animated.View
                style={{
                    opacity: anim,
                }}
            >
                <Text
                    style={{
                        fontFamily: OutfitRegular,
                        color: colors.text,
                        fontSize: md,
                        maxWidth: "80%",
                        textAlign: "center",
                    }}
                >
                    Generating a suitable workout plan for you. Please wait...
                </Text>
            </Animated.View>
        </View>
    );
};

export default GeneratingScreen;
