import RoundedButton from "@/src/components/buttons/rounded-button";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ScreenProps {
    handleScroll: (value: number) => void;
    screenIndex: number;
    navigator: any;
}

const WelcomeScreen1: React.FC<ScreenProps> = ({ handleScroll, navigator }) => {
    const colors = useThemeColors();
    // console.log("Welcome 1");

    return (
        <View
            style={{
                width: WP(100),
                height: HP(100),
                alignItems: "center",
                gap: HP(2),
                marginTop: HP(45),
            }}
        >
            <RoundedButton text="Get Started" press={() => handleScroll(1)} />
            <TouchableOpacity onPress={() => navigator.navigate("Login")}>
                <Text style={{ color: colors.secondary, fontSize: HP(1.8) }}>
                    Already have an account?
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default WelcomeScreen1;
