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
import ScrollDown from "@/src/components/other/scrollDown";
import SingleButton from "@/src/components/buttons/single-button";
import { Fade } from "@/src/module/animations/fadeAnimation";

//---------------------------------------------------------------------------------------------------------------------

interface props {
    setUserProfile: any;
    YOffset: Animated.Value;
    setIndex: (v: number) => void;
    height: any;
}

const Height: React.FC<props> = ({
    setUserProfile,
    YOffset,
    setIndex,
    height,
}) => {
    const weightOptions = Array.from({ length: 2301 }, (_, i) => ({
        value: (i * 0.1 + 20).toFixed(1),
    }));

    const heightOptions = Array.from({ length: 121 }, (_, i) => ({
        value: i + 80,
    }));

    const colors = useThemeColors();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const isTablet = () => {
        const { height, width } = Dimensions.get("window");
        const aspectRatio = height / width;
        return width >= 600 || aspectRatio < 1.6;
    };

    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;

    const itemWidth = isTablet() ? WP(1) : WP(3);
    const snapInterval = itemWidth;

    const moveScroll = YOffset.interpolate({
        inputRange: [0, HP(100)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [0, HP(100)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const submit = async (v: any) => {
        setLoading(true);
        setUserProfile({ gender: v.value });
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(3);
                Fade({
                    fromValue: fadeIn,
                    duration: 1000,
                    after: () => {},
                    toValue: 1,
                });
            },
            toValue: 0,
        });
    };

    const heightScroll = (event: any) => {
        setLoading(true);
        const offset = event.nativeEvent.contentOffset.x;
        // Calculate the index based on the scroll offset
        let heightIndex = Math.max(
            0,
            Math.min(
                Math.round(offset / snapInterval),
                heightOptions.length - 1
            )
        );
        setLoading(false);
        // selectedHeightAndWeight.current = {
        //     ...selectedHeightAndWeight.current,
        //     height: heightOptions[heightIndex].value,
        //     heightUnit: heightUnit,
        // };
    };

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {!submitted ? (
                <Animated.View
                    style={{
                        gap: HP(2),
                        padding: WP(4),
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
                        }}
                    >
                        Select your height
                    </Text>
                    <Meter
                        itemWidth={itemWidth}
                        loading={loading}
                        scroll={heightScroll}
                        options={heightOptions}
                    />
                    <View
                        style={{
                            width: WP(90),
                            alignItems: "center",
                            position: "absolute",
                            bottom: HP(2),
                        }}
                    >
                        <SingleButton
                            loading={false}
                            style={{}}
                            color={
                                height === 0 ? colors.secondary : colors.primary
                            }
                            onPress={submit}
                            disabled={height === 0}
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
                        padding: WP(4),
                        gap: HP(4),
                        height: HP(100),
                        opacity: fadeIn,
                        justifyContent: "center",
                    }}
                >
                    <View style={{ padding: WP(4) }}>
                        <Text style={{ color: colors.text, fontSize: HP(3) }}>
                            Scroll down
                        </Text>
                    </View>
                    <ScrollDown
                        move={moveScroll as any}
                        fade={fadeScroll as any}
                    />
                </Animated.View>
            )}
        </View>
    );
};

export default Height;
