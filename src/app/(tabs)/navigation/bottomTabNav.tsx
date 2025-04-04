import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainHome from "../screens/Main/main-home/mainHome";
import { useNavigation } from "expo-router";
import MainExercise from "../screens/Main/main-exercise/mainExercise";
import MainDashboard from "../screens/Main/main-dashboard/mainDashboard";
import {
    DrawerStackParamList,
    HomeScreenProps,
    HomeStackParamList,
} from "./type";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Pressable,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import Entypo from "@expo/vector-icons/Entypo";
import HexToHexa from "@/src/hooks/useHexa";
import { DrawerActions } from "@react-navigation/native"; // Import DrawerActions
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { iconRef } from "@/src/constants/ref";
import ExerciseNavigator from "./exerciseStackNav";
import GridBackground from "@/src/components/other/grid-background";

const BottomTab = createBottomTabNavigator<HomeStackParamList>(); // Use the type here

interface Props {
    setRouteName: (v: string) => void;
    setShowHeader: (v: boolean) => void;
}

const HomeStack: React.FC<Props> = ({ setRouteName, setShowHeader }) => {
    const colors = useThemeColors();
    const ref = "@/src/assets/images/ui/icons-svg/";

    const [tabBarVisible, setTabBarVisible] = useState(true);

    const screens = [
        {
            name: "Progress",
            component: <MainDashboard setRouteName={setRouteName} />,
            icon: require(`${ref}progress-icon.svg`),
        },
        {
            name: "Home",
            component: (
                <MainHome
                    setTabBarVisible={setTabBarVisible}
                    setRouteName={setRouteName}
                    setShowHeader={setShowHeader}
                />
            ),
            icon: require(`${ref}dashboard-icon.svg`),
        },
        {
            name: "Exercise",
            component: (
                <ExerciseNavigator
                    setShowHeader={setShowHeader}
                    setRouteName={setRouteName}
                    setTabBarVisible={setTabBarVisible}
                />
            ),
            icon: require(`${ref}exercise-icon.svg`),
        },
    ];

    // Add Animated.Value for rotation
    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <BottomTab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: colors.background,
                        width: WP(100),
                        alignSelf: "center",
                        display: tabBarVisible ? "flex" : "none",
                    },
                    tabBarItemStyle: {
                        paddingTop: HP(0.5),
                        justifyContent: "center",
                        alignItems: "center",
                    },
                }}
                initialRouteName="Home"
            >
                {screens.map((v, i) => (
                    <BottomTab.Screen
                        key={i}
                        name={v.name as any}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Image
                                    source={v.icon}
                                    style={{
                                        height: HP(3),
                                        aspectRatio: 1,
                                        tintColor: focused
                                            ? colors.primary
                                            : colors.secondary,
                                    }}
                                />
                            ),
                        }}
                    >
                        {() => (
                            <>
                                {v.component}
                                <GridBackground zIndex={-1} />
                            </>
                        )}
                    </BottomTab.Screen>
                ))}
            </BottomTab.Navigator>
        </View>
    );
};

export default HomeStack;
