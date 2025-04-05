import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import GeneratedExerciseDescription from "./generatedPlanScreen";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";

export default function OtherExercise({
    item,
    setTabBar,
    setShowHeader,
    scrollViewRef,
    setSelectedGeneratedPlan,
}: {
    item: any;
    setTabBar: any;
    setShowHeader: any;
    scrollViewRef: any;
    setSelectedGeneratedPlan: any;
}) {
    const Stack = createStackNavigator();
    const colors = useThemeColors();

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Stack.Navigator initialRouteName="title">
                <Stack.Screen name="title" options={{ headerShown: false }}>
                    {(props) => (
                        <TitleScreen
                            {...props}
                            item={item}
                            colors={colors}
                            scrollViewRef={scrollViewRef}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="otherExerciseContent"
                    options={{ headerShown: false }}
                >
                    {(props) => (
                        <GeneratedExerciseDescription
                            {...props}
                            item={item}
                            colors={colors}
                            setTabBar={setTabBar}
                            setShowHeader={setShowHeader}
                            scrollViewRef={scrollViewRef}
                            setSelectedGeneratedPlan={setSelectedGeneratedPlan}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </View>
    );
}

const TitleScreen = ({
    route,
    item,
    colors,
    scrollViewRef,
}: {
    route: any;
    item: any;
    colors: any;
    scrollViewRef: any;
}) => {
    const navigation = useNavigation<any>();
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                padding: WP(5),
                gap: HP(4),
                flex: 1,
            }}
        >
            <View style={{ position: "absolute", zIndex: 0 }}>
                <LinearGradient
                    colors={[
                        colors.background,
                        "transparent",
                        colors.background,
                    ]}
                    style={{
                        zIndex: 2,
                        position: "absolute",
                        height: HP(100),
                        width: WP(100),
                    }}
                />
                <Image
                    source={require("@/src/assets/images/ui/background/grid-full.png")}
                    contentPosition={"center"}
                    contentFit="fill"
                    style={{
                        opacity: 0.2,
                        height: HP(100),
                        width: WP(100),
                        tintColor: colors.primary,
                        zIndex: 1,
                    }}
                />
            </View>
            <Text
                style={{
                    color: colors.text,
                    fontSize: HP(4),
                    fontFamily: OutfitBold,
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                {item?.planTitle}
            </Text>
            <View
                style={{
                    backgroundColor: colors.primary,
                    borderRadius: WP(100),
                }}
            >
                <TouchableOpacity
                    style={{
                        padding: WP(4),
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() =>
                        navigation.navigate("otherExerciseContent", {
                            item: item,
                            colors: colors,
                            scrollViewRef: scrollViewRef,
                        })
                    } // Pass item as params
                >
                    <Text
                        style={{
                            color: colors.white,
                            textAlign: "center",
                            fontSize: HP(2),
                            paddingHorizontal: WP(20),
                            fontFamily: OutfitRegular,
                        }}
                    >
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
