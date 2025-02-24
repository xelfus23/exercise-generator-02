import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatStackParamList } from "./type";
import ChatHeads from "../screens/Drawer/chat/chatHeads";
import ChatScreen from "../screens/Drawer/chat/chatScreen";
import ChatHeader from "@/src/components/header/chatHeader";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const ChatStack: React.FC = () => {
    const Stack = createNativeStackNavigator<ChatStackParamList>();
    const navigation = useNavigation();

    return (
        <Stack.Navigator
            screenOptions={{
                header: (props) => (
                    <ChatHeader title="Chats" navigation={navigation} />
                ),
            }}
        >
            <Stack.Screen name="ChatHeads" component={ChatHeads} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
    );
};

export default ChatStack;
