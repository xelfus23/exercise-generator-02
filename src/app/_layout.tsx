import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView, useColorScheme } from "react-native";
import { AuthContextProvider, useAuth } from "../services/auth/authentication";
import { NavigationContainer } from "@react-navigation/native";
import MainLayout from "./(tabs)/navigation/Main";
import { useThemeColors } from "../hooks/useThemeColor";
import { HP, WP } from "../hooks/useDeviceDimension";
import { StatusBar } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        OutfitRegular: require("../assets/fonts/Outfit-Regular.ttf"),
        OutfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
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
