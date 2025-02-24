import { WP, HP } from "@/src/hooks/useDeviceDimension";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import Styles from "@/src/styles/styles";

interface DoubleButtonProps {
    leftText: string;
    rightText: string;
}

const DoubleButton: React.FC<DoubleButtonProps> = ({ leftText, rightText }) => {
    const colors = useThemeColors(); // Call the hook to get the color palette

    return (
        <View style={Styles().fullWidthContainer}>
            <TouchableOpacity style={Styles().primaryButton40Percent}>
                <Text style={Styles().fontMedium}>{leftText}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Styles().primaryButton40Percent}>
                <Text style={Styles().fontMedium}>{rightText}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DoubleButton;
