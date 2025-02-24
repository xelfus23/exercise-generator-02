import SingleButton from "@/src/components/buttons/single-button";
import ScrollDown from "@/src/components/other/scrollDown";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Fade } from "@/src/module/animations/fadeAnimation";
import { useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
interface props {
    YOffset: Animated.Value;
    setIndex: (index: number) => void;
}

const Place: React.FC<props> = ({ YOffset, setIndex }) => {
    const [submitted, setSubmitted] = useState(false);
    const colors = useThemeColors();

    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;

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

    const submit = () => {
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(7);
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

    return !submitted ? (
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
                    color: colors.text,
                    fontFamily: OutfitRegular,
                    fontSize: HP(3),
                    marginTop: HP(30),
                }}
            >
                On what place you prefer doing your workout plan?
            </Text>
            <View
                style={{
                    position: "absolute",
                    bottom: HP(4),
                    width: WP(100),
                    alignItems: "center",
                }}
            >
                <SingleButton
                    loading={false}
                    style={{}}
                    color={colors.primary}
                    onPress={submit}
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
                alignItems: "center",
            }}
        >
            <View style={{ padding: WP(4) }}>
                <Text
                    style={{
                        color: colors.text,
                        fontSize: HP(3),
                        fontFamily: OutfitRegular,
                    }}
                >
                    Scroll down
                </Text>
            </View>
            <ScrollDown move={moveScroll as any} fade={fadeScroll as any} />
        </Animated.View>
    );
};

export default Place;
