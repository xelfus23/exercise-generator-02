import { Dimensions } from "react-native";

export function HP(percentage: number) {
    const { height } = Dimensions.get("window");
    return height * (percentage / 100);
}

export function WP(percentage: number) {
    const { width } = Dimensions.get("window");
    return width * (percentage / 100);
}
