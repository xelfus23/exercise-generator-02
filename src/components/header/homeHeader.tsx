import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { md, OutfitBold, OutfitRegular, xl, xxl } from "@/src/hooks/useFonts";
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

interface HeaderProps {
    title: string;
    navigation: any;
}
const HomeHeader: React.FC<HeaderProps> = ({ title, navigation }) => {
    const colors = useThemeColors();

    return (
        <LinearGradient
            colors={[colors.background, colors.card]}
            style={{
                width: WP(100),
                height: HP(10),
                backgroundColor: colors.card,
                alignItems: "flex-end",
                flexDirection: "row",
                paddingHorizontal: WP(4),
                borderBottomRightRadius: WP(4),
                borderBottomLeftRadius: WP(4),
                elevation: 8,
                justifyContent: "space-between",
                paddingBottom: HP(1),
            }}
        >
            <Text
                style={{
                    color: colors.text,
                    fontSize: xl,
                    fontFamily: OutfitBold,
                }}
            >
                {title}
            </Text>
            <TouchableOpacity
                onPress={navigation}
                style={{
                    padding: WP(2),
                    borderRadius: WP(2),
                }}
            >
                <Animated.View>
                    <Image
                        source={require("@/src/assets/images/ui/icons-svg/menu-icon.svg")} //consider change the extension of the image.
                        style={{
                            height: HP(3),
                            aspectRatio: 1,
                            tintColor: colors.secondary,
                        }}
                    />
                </Animated.View>
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default HomeHeader;
