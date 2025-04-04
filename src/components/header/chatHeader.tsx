import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { lg, OutfitBold, OutfitRegular, xl } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from "react-native";
import { DrawerActions } from "@react-navigation/native"; // Import DrawerActions
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HeaderProps {
    title: string;
    navigation: any;
    onChat?: boolean;
    image?: any;
}
const ChatHeader: React.FC<HeaderProps> = ({
    title,
    navigation,
    onChat,
    image,
}) => {
    const colors = useThemeColors();
    const router = useRouter();

    return (
        <LinearGradient
            colors={[colors.background, colors.card]}
            style={{
                width: WP(100),
                height: HP(10),
                backgroundColor: colors.card,
                flexDirection: "row",
                paddingHorizontal: WP(4),
                borderBottomRightRadius: WP(4),
                borderBottomLeftRadius: WP(4),
                elevation: 8,
                gap: WP(4),
                alignItems: "flex-end",
                paddingBottom: HP(2),
                zIndex: 100,
            }}
        >
            <View
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: WP(4),
                }}
            >
                <TouchableOpacity onPress={navigation}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={xl}
                        color={colors.text}
                    />
                </TouchableOpacity>
                {image && (
                    <Image
                        source={image}
                        style={{
                            height: HP(4),
                            aspectRatio: 1,
                            borderRadius: WP(100),
                        }}
                    />
                )}
                <Text
                    style={{
                        color: colors.text,
                        fontSize: xl,
                        fontFamily: OutfitRegular,
                        maxWidth: WP(80),
                    }}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    {title}
                </Text>
            </View>
        </LinearGradient>
    );
};

export default ChatHeader;
