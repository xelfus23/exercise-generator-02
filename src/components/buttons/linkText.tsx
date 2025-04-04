import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { md } from "@/src/hooks/useFonts";
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
                    fontSize: md,
                }}
            >
                {text1}
            </Text>
            <TouchableOpacity onPress={navigate}>
                <Text
                    style={{
                        color: colors.primary,
                        fontSize: md,
                    }}
                >
                    {text2}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LinkText;
