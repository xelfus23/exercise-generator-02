import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../screens/OnBoarding/onBoarding";
import Login from "../screens/OnBoarding/auth/login";
import SignUp from "../screens/OnBoarding/auth/signup";
import GetDetails from "../screens/OnBoarding/auth/getPersonalDetails/getDetails";
import { AuthStackParamList } from "../../../types/stackType";
import React from "react";

const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Start" component={OnBoarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
};

export default AuthStack;
