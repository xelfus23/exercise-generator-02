import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export function HP(percentage: number) {
    return Math.ceil(height * (percentage / 100));
}

export function WP(percentage: number) {
    return Math.ceil(width * (percentage / 100));
}
