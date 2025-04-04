import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatStackParamList } from "./type";
import ChatHeads from "../screens/Drawer/chat/chatHeads";
import ChatScreen from "../screens/Drawer/chat/chatScreen";
import ChatHeader from "@/src/components/header/chatHeader";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";

interface props {
    setRouteName: (v: string) => void;
    setShowHeader: (v: boolean) => void;
}

const ChatStack: React.FC<props> = ({ setRouteName, setShowHeader }) => {
    const Stack = createNativeStackNavigator<ChatStackParamList>();
    const navigation = useNavigation();
    const router = useRouter();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="ChatHeads">
                {() => (
                    <ChatHeads
                        router={router}
                        setRouteName={setRouteName}
                        setShowHeader={setShowHeader}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="ChatScreen">
                {() => (
                    <ChatScreen
                        router={router}
                        setRouteName={setRouteName}
                        setShowHeader={setShowHeader}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default ChatStack;
