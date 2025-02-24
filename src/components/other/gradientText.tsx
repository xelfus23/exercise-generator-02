import { View, Text, StyleProp, TextStyle } from "react-native"; // Import necessary types
import React from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

interface Props {
    style?: StyleProp<TextStyle>; // More specific and safer style type
    text: string;
    colors: LinearGradientProps["colors"]; // Use the correct type from expo-linear-gradient
    maskedElementStyle?: StyleProp<TextStyle>;
}

const GradientText: React.FC<Props> = ({ style, text, colors }) => {
    return (
        <MaskedView
            maskElement={
                <Text style={[style, { backgroundColor: "transparent" }]}>
                    {text}
                </Text>
            }
        >
            <LinearGradient colors={colors} style={{}}>
                <Text style={[style, { opacity: 0 }]}>{text}</Text>
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;
