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
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import SingleButton from "@/src/components/buttons/single-button";
import { Fade } from "@/src/module/animations/fadeAnimation";
import ScrollDown from "@/src/components/other/scrollDown";

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
        value: Number((i * 0.1 + 20).toFixed(1)),
    }));

    const colors = useThemeColors();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;
    const [selectedWeight, setSelectedWeight] = useState<number>();

    const itemWidth = Math.round(WP(3));

    const moveScroll = YOffset.interpolate({
        inputRange: [HP(300), HP(400)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [HP(300), HP(400)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const weightScroll = (event: any) => {
        const offset = event.nativeEvent.contentOffset.x;
        let weightIndex = Math.max(
            0,
            Math.min(Math.round(offset / itemWidth), weightOptions.length - 1)
        );
        setSelectedWeight(weightOptions[weightIndex].value); // Update selectedHeight
    };

    const submit = async () => {
        setUserProfile({ weight: selectedWeight });
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setTimeout(() => {
                    setIndex(4);
                    Fade({
                        fromValue: fadeIn,
                        duration: 1000,
                        after: () => {
                            console.log(weight);
                        },
                        toValue: 1,
                    });
                }, 1000);
            },
            toValue: 0,
        });
    };

    return !submitted ? (
        <Animated.View
            style={{
                gap: HP(8),
                opacity: fadeOut,
                flex: 1,
            }}
        >
            <Text
                style={{
                    fontSize: HP(3),
                    marginTop: HP(30),
                    color: colors.text,
                    fontFamily: OutfitRegular,
                    paddingLeft: WP(4),
                }}
            >
                Select your weight
            </Text>
            <Meter
                itemWidth={itemWidth}
                loading={loading}
                scroll={weightScroll}
                options={weightOptions}
                unit="kg"
            />
            <View
                style={{
                    width: WP(100),
                    position: "absolute",
                    alignItems: "center",
                    bottom: HP(4),
                }}
            >
                <SingleButton
                    loading={false}
                    style={{}}
                    color={weight === 0 ? colors.secondary : colors.primary}
                    onPress={submit}
                    disabled={weight === 0}
                >
                    <Text
                        style={{
                            color: colors.white,
                            fontSize: HP(2),
                            fontFamily: OutfitBold,
                        }}
                    >
                        Next
                    </Text>
                </SingleButton>
            </View>
        </Animated.View>
    ) : (
        <Animated.View
            style={{
                flex: 1,
                padding: WP(4),
                gap: HP(4),
                height: HP(100),
                opacity: fadeIn,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{ padding: WP(4) }}>
                <Text style={{ color: colors.text, fontSize: HP(3) }}>
                    Scroll down
                </Text>
            </View>

            <ScrollDown move={moveScroll as any} fade={fadeScroll as any} />
        </Animated.View>
    );
};

export default Weight;
