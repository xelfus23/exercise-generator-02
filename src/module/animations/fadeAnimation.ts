import { Animated } from "react-native";

type FadeProps = {
    duration: number;
    fromValue: Animated.Value;
    after: () => void;
    toValue: number;
};

export const Fade = ({ duration, fromValue, after, toValue }: FadeProps) => {
    return Animated.timing(fromValue, {
        toValue: toValue,
        duration: duration,
        useNativeDriver: true,
    }).start(after);
};
