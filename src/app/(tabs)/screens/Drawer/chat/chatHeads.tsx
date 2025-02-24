import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Image } from "expo-image";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ChatHeads: React.FC = () => {
    const colors = useThemeColors();
    const [user, setUser] = useState([1, 2, 3, 4, 5]);

    return (
        <View style={{ backgroundColor: colors.background, height: HP(100) }}>
            <View style={{padding: WP(4)}}>
                <Text style={{ fontFamily: OutfitRegular, fontSize: HP(2) }}>
                    Ai Chatbot
                </Text>
                <TouchableOpacity>
                    <Image />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default ChatHeads;
