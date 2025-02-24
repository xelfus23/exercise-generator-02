import {
    Animated,
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { WP, HP } from "@/src/hooks/useDeviceDimension";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import Meter from "@/src/components/other/meter";
import { OutfitRegular } from "@/src/hooks/useFonts";

//---------------------------------------------------------------------------------------------------------------------

interface props {
    setUserProfile: any;
    YOffset: Animated.Value;
    setIndex: (v: number) => void;
    weight: any;
}

const Weight: React.FC<props> = ({
    setUserProfile,
    YOffset,
    setIndex,
    weight,
}) => {
    const weightOptions = Array.from({ length: 2301 }, (_, i) => ({
        value: (i * 0.1 + 20).toFixed(1),
    }));

    const colors = useThemeColors();
    const [loading, setLoading] = useState(false);

    const isTablet = () => {
        const { height, width } = Dimensions.get("window");
        const aspectRatio = height / width;
        return width >= 600 || aspectRatio < 1.6;
    };

    const itemWidth = isTablet() ? WP(1) : WP(3);
    const snapInterval = itemWidth;

    const weightScroll = (event: any) => {
        setLoading(true);
        const offset = event.nativeEvent.contentOffset.x;
        // Calculate the index based on the scroll offset
        let weightIndex = Math.max(
            0,
            Math.min(
                Math.round(offset / snapInterval),
                weightOptions.length - 1
            )
        );

        setLoading(false);
        // selectedHeightAndWeight.current = {
        //     ...selectedHeightAndWeight.current,
        //     weight: parseFloat(weightOptions[weightIndex].value).toFixed(1),
        //     weightUnit: weightUnit,
        // };
    };

    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                height: HP(100),
            }}
        >
            <Animated.View style={{ alignItems: "center", gap: HP(4) }}>
                <Text
                    style={{
                        color: colors.text,
                        fontFamily: OutfitRegular,
                        fontSize: HP(3),
                    }}
                >
                    Select your weight
                </Text>
                <Meter
                    itemWidth={itemWidth}
                    loading={loading}
                    scroll={weightScroll}
                    options={weightOptions}
                />
            </Animated.View>
        </View>
    );
};

export default Weight;
