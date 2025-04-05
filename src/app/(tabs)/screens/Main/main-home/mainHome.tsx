import Banner from "@/src/components/screenComponents/mainHome/banner";
import Days from "@/src/components/screenComponents/mainHome/days";
import OtherExercise from "@/src/components/screenComponents/mainHome/generatedPlan";
import MyPlans from "@/src/components/screenComponents/mainHome/myPlan";
import PromptInput from "@/src/components/screenComponents/mainHome/promptInput";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

interface homeProps {
    setRouteName: (v: string) => void;
    setTabBarVisible: (v: boolean) => void;
    setShowHeader: (v: boolean) => void;
}
const MainHome: React.FC<homeProps> = ({
    setRouteName,
    setTabBarVisible,
    setShowHeader,
}) => {
    useFocusEffect(
        useCallback(() => {
            setRouteName("Home");
        }, [])
    );

    const colors = useThemeColors();
    const [selectedGeneratedPlan, setSelectedGeneratedPlan] = useState<
        any | null
    >();
    const scrollViewRef = useRef<any>(null);

    useEffect(() => {
        if (scrollViewRef?.current) {
            if (scrollViewRef.current === WP(0)) {
                setSelectedGeneratedPlan(null);
            }
        }
    }, [selectedGeneratedPlan, scrollViewRef.current]);

    const onSelectGeneratedPlan = (item: any) => {
        setSelectedGeneratedPlan(item);
        if (scrollViewRef?.current) {
            scrollViewRef?.current?.scrollTo({ x: WP(100), animated: true });
        }
    };

    return (
        <ScrollView
            style={{
                flex: 1,
            }}
            contentContainerStyle={{
                alignItems: "center",
            }}
            horizontal
            scrollEnabled={false}
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
        >
            <View style={{ height: "100%", width: WP(100) }}>
                <Banner />
                <Days />
                <MyPlans onSelectGeneratedPlan={onSelectGeneratedPlan} />
                <PromptInput />
            </View>
            {selectedGeneratedPlan && (
                <View
                    style={{
                        backgroundColor: colors.background,
                        width: WP(100),
                    }}
                >
                    <OtherExercise
                        item={selectedGeneratedPlan}
                        setTabBar={setTabBarVisible}
                        setShowHeader={setShowHeader}
                        scrollViewRef={scrollViewRef}
                        setSelectedGeneratedPlan={setSelectedGeneratedPlan}
                    />
                </View>
            )}
        </ScrollView>
    );
};
export default MainHome;
