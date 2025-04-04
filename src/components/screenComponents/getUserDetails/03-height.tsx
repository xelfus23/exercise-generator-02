import {
    Animated,
    Dimensions,
    SafeAreaView,
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
import Loading from "@/src/components/loading/loading";

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
    const heightOptions = Array.from({ length: 231 }, (_, i) => 20 + i); // 20kg to 250kg
    const colors = useThemeColors();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;
    const itemWidth = WP(3);
    const [selectedHeight, setSelectedHeight] = useState("20.0");

    const moveScroll = YOffset.interpolate({
        inputRange: [HP(200), HP(300)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [HP(200), HP(300)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const submit = async () => {
        // setUserProfile({ height: currentHeight });
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(3);
                Fade({
                    fromValue: fadeIn,
                    duration: 1000,
                    after: () => {
                        setLoading(false);
                        console.log(height);
                    },
                    toValue: 1,
                });
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
                Select your height {selectedHeight}
            </Text>
            <View
                style={{
                    alignItems: "center",
                    width: WP(100),
                }}
            >
                <Meter
                    itemWidth={itemWidth}
                    loading={loading}
                    options={heightOptions}
                    unit="cm"
                    setSelectedValue={setSelectedHeight}
                />
            </View>
            <View
                style={{
                    width: WP(100),
                    position: "absolute",
                    bottom: HP(4),
                    alignItems: "center",
                }}
            >
                <SingleButton
                    loading={false}
                    style={{}}
                    color={height === 0 ? colors.secondary : colors.primary}
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
                flex: 1,
                padding: WP(4),
                gap: HP(4),
                opacity: fadeIn,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {!loading ? (
                <>
                    <View style={{ padding: WP(4) }}>
                        <Text style={{ color: colors.text, fontSize: HP(3) }}>
                            Scroll down
                        </Text>
                    </View>
                    <ScrollDown
                        move={moveScroll as any}
                        fade={fadeScroll as any}
                    />
                </>
            ) : (
                <>
                    <View style={{ padding: WP(4) }}>
                        <Text style={{ color: colors.text, fontSize: HP(3) }}>
                            Please wait a moment...
                        </Text>
                    </View>
                </>
            )}
        </Animated.View>
    );
};

export default Height;
