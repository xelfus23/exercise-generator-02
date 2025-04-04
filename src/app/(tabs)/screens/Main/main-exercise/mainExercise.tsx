import ExerciseDescription from "@/src/components/exercise/exerciseDescriptions";
import RecommendedExercises from "@/src/components/screenComponents/mainExercise/recommendedExercises";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { md, OutfitRegular, sm } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";

interface homeProps {
    navigation: any;
    setRouteName: (name: string) => void;
    setShowHeader: (name: boolean) => void; // To show or hide header based on the current route name.
    setTabBarVisible: (visible: boolean) => void; // To show or hide tab bar based on the current route name.
}
const MainExercise: React.FC<homeProps> = ({
    setRouteName,
    setShowHeader,
    setTabBarVisible,
}) => {
    const colors = useThemeColors();
    const [selectedExercise, setSelectedExercise] = useState<null | any>(null);
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        setTabBarVisible(true);
        setShowHeader(true);
    }, [setTabBarVisible, setShowHeader]);

    const onItemPress = (item: any) => {
        setSelectedExercise(item);
        openDescription();
    };

    const moveAnimation = useRef<Animated.Value>(
        new Animated.Value(HP(80))
    ).current;

    const openDescription = () => {
        Animated.timing(moveAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsShown(true);
        });
    };

    const closeDescription = () => {
        Animated.timing(moveAnimation, {
            toValue: HP(80),
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsShown(false);
            setSelectedExercise(null);
        });
    };

    useFocusEffect(
        useCallback(() => {
            setRouteName("Exercise");
        }, [])
    );

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Text
                style={{
                    color: colors.text,
                    fontSize: md,
                    fontFamily: OutfitRegular,
                    padding: WP(8),
                }}
            >
                My Exercise Today:
            </Text>
            <RecommendedExercises onItemPress={onItemPress} />
            {selectedExercise && (
                <ExerciseDescription
                    item={selectedExercise}
                    zIndex={1000}
                    viewRef={moveAnimation}
                    closeDescription={closeDescription}
                    isShown={isShown}
                />
            )}
        </View>
    );
};
export default MainExercise;
