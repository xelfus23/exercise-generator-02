import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { routeProps } from "@/src/app/(tabs)/navigation/settingsStackNav";
import { useFocusEffect, useNavigation } from "expo-router";
import ChatHeader from "@/src/components/header/chatHeader";

const SecuritySettings: React.FC<routeProps> = ({
    setRouteName,
    setShowHeader,
}) => {
    const navigation = useNavigation<any>();

    const goBack = useCallback(() => {
        setShowHeader(true);
        navigation.goBack();
    }, [navigation]);
    useFocusEffect(
        useCallback(() => {
            setRouteName("Settings");
            setShowHeader(false);
        }, [])
    );

    return (
        <View>
            <ChatHeader title="Security" navigation={goBack} />
            <Text>SecuritySettings</Text>
        </View>
    );
};

export default SecuritySettings;
