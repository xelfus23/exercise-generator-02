import { HP, WP } from "@/src/hooks/useDeviceDimension";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import Styles from "@/src/styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardType, TextInput, View } from "react-native";

interface Props {
    value: string;
    placeholder: string;
    setValue: (v: string) => void;
    maxLength: number;
    icon: any;
}
const Input90percent: React.FC<Props> = ({
    value,
    placeholder,
    setValue,
    icon,
    maxLength,
}) => {
    const colors = useThemeColors();
    const [error, setError] = useState(null);

    return (
        <View
            style={{
                width: WP(85),
                backgroundColor: HexToHexa({
                    hex: colors.secondary,
                    alpha: 0.2,
                }),
                borderRadius: WP(4),
                height: HP(6),
                paddingHorizontal: WP(4),
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <MaterialCommunityIcons
                name={icon}
                size={HP(3)}
                color={error ? colors.error : colors.secondary}
            />

            <TextInput
                style={Styles().input85percent}
                placeholder={placeholder}
                placeholderTextColor={HexToHexa({
                    hex: colors.secondary,
                    alpha: 1,
                })}
                value={value}
                maxLength={maxLength}
                onChangeText={(v) => setValue(v)}
            />
        </View>
    );
};

export default Input90percent;
