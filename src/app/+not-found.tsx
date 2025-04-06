import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OutfitRegular } from "../hooks/useFonts";
import { useThemeColors } from "../hooks/useThemeColor";

export default function NotFoundScreen() {
    const colors = useThemeColors();

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text style={{ fontFamily: OutfitRegular, color: colors.text }}>
                Page not found.
            </Text>
        </View>
    );
}
