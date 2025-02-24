import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

interface GridBgProps {
    zIndex: number;
}

const GridBackground: React.FC<GridBgProps> = ({ zIndex }) => {
    const colors = useThemeColors();

    return (
        <View
            style={{
                position: "absolute",
                zIndex: zIndex,
                pointerEvents: "none",
            }}
        >
            <LinearGradient
                colors={[colors.background, "transparent", colors.background]}
                style={{
                    zIndex: 2,
                    position: "absolute",
                    height: HP(100),
                    width: WP(100),
                }}
            />
            <Image
                source={require("@/src/assets/images/ui/background/grid-full.png")}
                contentPosition={"center"}
                contentFit="fill"
                style={{
                    opacity: 0.3,
                    height: HP(100),
                    width: WP(100),
                    tintColor: colors.primary,
                    zIndex: 1,
                }}
            />
        </View>
    );
};

export default GridBackground;
