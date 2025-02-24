import { WP, HP } from "@/src/hooks/useDeviceDimension";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import Styles from "@/src/styles/styles";
import { OutfitBold } from "@/src/hooks/useFonts";

interface DoubleButtonProps {
    leftText: string;
    rightText: string;
    onPressLeft: () => void;
    onPressRight: () => void;
}

const DoubleButton: React.FC<DoubleButtonProps> = ({
    leftText,
    rightText,
    onPressLeft,
    onPressRight,
}) => {
    const colors = useThemeColors();

    return (
        <View
            style={{
                width: WP(90),
                flexDirection: "row",
                justifyContent: "space-around",
            }}
        >
            <TouchableOpacity
                style={[
                    Styles().primaryButton40Percent,
                    { backgroundColor: colors.secondary },
                ]}
                onPress={onPressLeft}
            >
                <Text
                    style={{
                        fontSize: HP(2),
                        fontFamily: OutfitBold,
                        color: colors.white,
                    }}
                >
                    {leftText}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    Styles().primaryButton40Percent,
                    { backgroundColor: colors.primary },
                ]}
                onPress={onPressRight}
            >
                <Text
                    style={{
                        fontSize: HP(2),
                        fontFamily: OutfitBold,
                        color: colors.white,
                    }}
                >
                    {rightText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default DoubleButton;
