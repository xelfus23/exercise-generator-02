import { HP, WP } from "@/src/hooks/useDeviceDimension";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Text, TouchableOpacity, View } from "react-native";

interface Params {
    text1: string;
    text2: string;
    navigate: () => void;
}

const LinkText: React.FC<Params> = ({ text1, text2, navigate }) => {
    const colors = useThemeColors();

    return (
        <View
            style={{ flexDirection: "row", alignItems: "center", gap: WP(1) }}
        >
            <Text
                style={{
                    color: HexToHexa({ hex: colors.text, alpha: 0.5 }),
                    fontSize: HP(1.8),
                }}
            >
                {text1}
            </Text>
            <TouchableOpacity onPress={navigate}>
                <Text
                    style={{
                        color: colors.primary,
                        fontSize: HP(1.8),
                    }}
                >
                    {text2}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LinkText;
