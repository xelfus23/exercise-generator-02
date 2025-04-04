import { HP, WP } from "@/src/hooks/useDeviceDimension";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const PromptInput: React.FC = () => {
    const colors = useThemeColors();
    const [input, setInput] = useState("");

    return (
        <View
            style={{
                width: WP(100),
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                alignItems: "center",
                padding: WP(4),
                gap: WP(2),
            }}
        >
            <TextInput
                style={{
                    backgroundColor: colors.card,
                    borderRadius: WP(100),
                    flex: 1,
                    height: HP(6),
                    color: colors.text,
                    fontSize: HP(1.8),
                    paddingLeft: WP(4),
                }}
                placeholder="Enter your desired plan here..."
                placeholderTextColor={colors.secondary}
                value={input}
                onChangeText={(v) => setInput(v)}
            />
            <TouchableOpacity disabled={input === ""}>
                <Image
                    source={require("@/src/assets/images/ui/icons-svg/send-icon.svg")}
                    style={{
                        height: HP(5),
                        aspectRatio: 1,
                        tintColor:
                            input === ""
                                ? HexToHexa({ alpha: 0.2, hex: colors.text })
                                : colors.primary,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default PromptInput;
