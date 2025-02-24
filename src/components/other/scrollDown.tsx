import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import LottieView from "lottie-react-native";
import { Animated, useColorScheme, View } from "react-native";

interface props {
    move: number;
    fade: number;
}

const ScrollDown: React.FC<props> = ({ move, fade }) => {
    const scrollDownIcon =
        useColorScheme() !== "dark"
            ? require("@/src/assets/json/arrow-down-dark.json")
            : require("@/src/assets/json/arrow-down-light.json");

    return (
        <Animated.View
            style={{
                position: "absolute",
                bottom: HP(2),
                transform: [{ translateY: move }],
                opacity: fade,
            }}
        >
            <LottieView
                source={scrollDownIcon}
                autoPlay
                loop
                style={{
                    height: HP(20),
                    aspectRatio: 1,
                    zIndex: 1000,
                }}
            />
        </Animated.View>
    );
};

export default ScrollDown;
