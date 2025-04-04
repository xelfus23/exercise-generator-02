import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { Text, TouchableOpacity, View } from "react-native";
import { OutfitBold } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import React from "react";

interface RoundedButtonProps {
    text: string;
    press: any;
    disabled?: boolean;
}
const RoundedButton: React.FC<RoundedButtonProps> = ({
    text,
    press,
    disabled,
}) => {
    const colors = useThemeColors();

    return (
        <TouchableOpacity
            style={{
                width: WP(50),
                borderRadius: WP(100),
                height: HP(6),
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignItems: "center",
            }}
            disabled={disabled}
            onPress={press}
        >
            <Text
                style={{
                    fontFamily: OutfitBold,
                    fontSize: HP(2),
                    color: colors.white,
                    textAlignVertical: "center",
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default RoundedButton;
