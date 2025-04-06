import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView, useColorScheme } from "react-native";
import { AuthContextProvider, useAuth } from "../services/auth/authentication";
import MainLayout from "./(tabs)/navigation/Main";
import { useThemeColors } from "../hooks/useThemeColor";
import { StatusBar } from "react-native";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        OutfitRegular: require("@/src/assets/fonts/outfit-regular.ttf"),
        OutfitBold: require("@/src/assets/fonts/outfit-bold.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    const colors = useThemeColors();

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                    // translucent
                    backgroundColor={colors.background}
                    barStyle={
                        colorScheme !== "dark"
                            ? "dark-content"
                            : "light-content"
                    }
                />
                <AuthContextProvider>
                    <MainLayout />
                </AuthContextProvider>
            </SafeAreaView>
        </ThemeProvider>
    );
}
