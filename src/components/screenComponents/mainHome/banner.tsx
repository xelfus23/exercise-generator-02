import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useAuth } from "@/src/services/auth/authentication";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import GradientText from "../../other/gradientText";
import React, { useState } from "react";

const Banner: React.FC = () => {
    const colors = useThemeColors();
    const { user } = useAuth();

    return (
        <View style={{ padding: WP(4), width: WP(100) }}>
            <View
                style={{
                    flexDirection: "row",
                    gap: WP(2),
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontFamily: OutfitRegular,
                        fontSize: HP(3),
                    }}
                >
                    Hello
                </Text>
                <GradientText
                    colors={[colors.primary, colors.secondary]}
                    text={`${user?.firstName} ${user?.lastName}`}
                    style={{
                        color: colors.primary,
                        fontSize: HP(4),
                        fontFamily: OutfitBold,
                    }}
                />
            </View>
        </View>
    );
};

export default Banner;
