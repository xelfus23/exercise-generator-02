import { KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

interface Props {
    children: React.ReactNode;
    zIndex: number;
}
const ScrollableInput: React.FC<Props> = ({ children, zIndex }) => {
    const { colors } = useTheme();
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, zIndex: zIndex }} //  Use flex: 1
        >
            <ScrollView
                style={{ flex: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }} // IMPORTANT: Add flexGrow: 1
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
export default ScrollableInput;
