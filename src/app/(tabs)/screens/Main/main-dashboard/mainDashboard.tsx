import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { router, Router, useFocusEffect } from "expo-router";
import DailyDashboard from "@/src/components/screenComponents/dashboard/dailyDashboard";
import ToDo from "@/src/components/screenComponents/dashboard/todoDashboard";
import LineChartBlock from "@/src/components/screenComponents/dashboard/lineChart";

interface homeProps {
    setRouteName: (v: string) => void;
}

const DRAWER_WIDTH = WP(60);
const ANIMATION_DURATION = 300; //Shorter animation

const MainDashboard: React.FC<homeProps> = ({ setRouteName }) => {
    useFocusEffect(
        useCallback(() => {
            setRouteName("Dashboard");
        }, [])
    );
    const [busy, setBusy] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const colors = useThemeColors();
    const drawerRef = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const toggleDrawer = useCallback(() => {
        if (busy) return;

        setBusy(true);

        Animated.timing(drawerRef, {
            toValue: isDrawerOpen ? -DRAWER_WIDTH : 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start(() => {
            setIsDrawerOpen(!isDrawerOpen);
            setBusy(false);
        });
    }, [isDrawerOpen, busy, drawerRef]); // Dependencies for useCallback

    return (
        <View
            style={{
                height: HP(100),
            }}
        >
            <ToDo drawerRef={drawerRef} toggle={toggleDrawer} busy={busy} />
            <DailyDashboard toggle={toggleDrawer} />
            <LineChartBlock />
        </View>
    );
};
export default MainDashboard;
