import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";
import Styles from "@/src/styles/styles";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import Loading from "../loading/loading";
import React from "react";

interface SingleButtonProps extends TouchableOpacityProps {
    children: React.ReactNode;
    color: string;
    style?: any;
    loading: boolean;
}
const SingleButton: React.FC<SingleButtonProps> = ({
    children,
    onPress,
    color,
    style,
    disabled,
    loading,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress} // Correct: Pass the function directly
            style={{
                ...style,
                backgroundColor: color,
                width: WP(85),
                justifyContent: "center",
                alignItems: "center",
                height: HP(6),
                borderRadius: WP(2),
            }}
            disabled={disabled || loading}
        >
            {!loading ? children : <Loading style={{ height: HP(5) }} />}
        </TouchableOpacity>
    );
};

export default SingleButton;
