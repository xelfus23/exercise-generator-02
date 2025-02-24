import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
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
                height: HP(8),
                backgroundColor: colors.card,
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: WP(4),
                borderBottomRightRadius: WP(4),
                borderBottomLeftRadius: WP(4),
                elevation: 8,
                justifyContent: "space-between",
            }}
        >
            <Text
                style={{
                    color: colors.text,
                    fontSize: HP(3),
                    fontFamily: OutfitRegular,
                }}
            >
                {title}
            </Text>

            <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{
                    padding: WP(2),
                    borderRadius: WP(2),
                }}
            >
                <Animated.View>
                    <Image
                        source={require("@/src/assets/images/ui/icons/menu-icon.svg")} //consider change the extension of the image.
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
