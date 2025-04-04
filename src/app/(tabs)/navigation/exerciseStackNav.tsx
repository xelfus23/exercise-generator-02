// exerciseStackNav.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainExercise from "../screens/Main/main-exercise/mainExercise";
import ExerciseScreen from "../screens/Main/main-exercise/exerciseScreen";
import GridBackground from "@/src/components/other/grid-background";
import React from "react";
import { ExerciseScreenParams } from "./type";

const Stack = createNativeStackNavigator<ExerciseStackParamList>(); // Add type here

export type ExerciseStackParamList = {
    // Define the type
    mainExercise: undefined;
    exerciseScreen: ExerciseScreenParams;
};

interface props {
    setRouteName: (routeName: string) => void;
    setShowHeader: (v: boolean) => void;
    setTabBarVisible: (v: boolean) => void; // Add type here
}

const ExerciseNavigator: React.FC<props> = ({
    setRouteName,
    setShowHeader,
    setTabBarVisible,
}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="mainExercise">
                {() => (
                    <>
                        <MainExercise
                            navigation={navigator}
                            setRouteName={setRouteName}
                            setShowHeader={setShowHeader}
                            setTabBarVisible={setTabBarVisible}
                        />
                        <GridBackground zIndex={-1} />
                    </>
                )}
            </Stack.Screen>
            <Stack.Screen
                name="exerciseScreen"
                component={() => (
                    <ExerciseScreen
                        setShowHeader={setShowHeader}
                        setTabBarVisible={setTabBarVisible}
                    />
                )}
            />
        </Stack.Navigator>
    );
};

export default ExerciseNavigator;
