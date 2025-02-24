import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import Styles from "@/src/styles/styles";
import { KeyboardType, TextInput, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Feather } from "@expo/vector-icons";

import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useState } from "react";

interface Props {
    value: string;
    placeholder: string;
    setValue: (v: string) => void;
    maxLength: number;
    secure: boolean;
    setIsHidden: (isHidden: boolean) => void;
    isHidden: boolean;
}
const PasswordInput90percent: React.FC<Props> = ({
    value,
    placeholder,
    setValue,
    maxLength,
    secure,
    setIsHidden,
    isHidden,
}) => {
    const colors = useThemeColors();
    const [error, setError] = useState({ pw: false, cpw: false, msg: "" });
    const [showPassword, setShowPassword] = useState(false);

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
                name="key-outline"
                size={HP(3)}
                color={error.pw ? colors.error : colors.secondary}
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
                secureTextEntry={isHidden}
                onChangeText={(v) => setValue(v)}
            />
            <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
                {isHidden ? (
                    <Feather
                        name="eye"
                        size={HP(3.5)}
                        color={error.pw ? colors.error : colors.secondary}
                    />
                ) : (
                    <Feather
                        name="eye-off"
                        size={HP(3.5)}
                        color={error.pw ? colors.error : colors.secondary}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default PasswordInput90percent;
