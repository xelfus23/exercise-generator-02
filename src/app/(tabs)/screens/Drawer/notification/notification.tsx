import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Text, View } from "react-native";
interface props {
    setRouteName: (v: string) => void;
    setShowHeader: (v: boolean) => void;
}
const Notification: React.FC<props> = ({ setRouteName, setShowHeader }) => {
    useFocusEffect(
        useCallback(() => {
            setRouteName("Inbox");
        }, [])
    );

    return (
        <View>
            <Text></Text>
        </View>
    );
};

export default Notification;
