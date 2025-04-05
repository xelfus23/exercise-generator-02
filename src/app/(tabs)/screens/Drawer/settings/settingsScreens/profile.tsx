import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "expo-router";
import { routeProps } from "@/src/app/(tabs)/navigation/settingsStackNav";
import ChatHeader from "@/src/components/header/chatHeader";

const ProfileSettings: React.FC<routeProps> = ({
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
            setShowHeader(false);
        }, [])
    );

    return (
        <View>
            <ChatHeader title="Profile" navigation={goBack} />
            <Text>ProfileSettings</Text>
        </View>
    );
};

export default ProfileSettings;
