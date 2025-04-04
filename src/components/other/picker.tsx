import { HP, WP } from "@/src/hooks/useDeviceDimension";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { Modal, View } from "react-native";
import SingleButton from "../buttons/single-button";
import { OutfitRegular } from "@/src/hooks/useFonts";

interface props {
    isVisible: boolean;
    setIsVisible: (v: boolean) => void;
    setSelectedValue: (v: any) => void;
    selectedValue: any;
    items: any;
}

const Picker: React.FC<props> = ({
    isVisible,
    setIsVisible,
    selectedValue,
    setSelectedValue,
    items,
}) => {
    const colors = useThemeColors();

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View
                style={{
                    backgroundColor: HexToHexa({
                        hex: colors.text,
                        alpha: 0.03,
                    }),
                    height: HP(100),
                    alignItems: "center",
                    padding: WP(4),
                }}
            >
                <View
                    style={{
                        backgroundColor: HexToHexa({
                            hex: colors.background,
                            alpha: 0.97,
                        }),
                        borderWidth: 0.5,
                        borderColor: colors.secondary,
                        alignItems: "center",
                        gap: HP(2),
                        padding: WP(4),
                        borderRadius: WP(4),
                    }}
                >
                    <ScrollView
                        style={{
                            borderWidth: 0.5,
                            borderRadius: WP(2),
                            borderColor: colors.secondary,
                        }}
                        contentContainerStyle={{
                            alignItems: "center",
                            flexWrap: "wrap",
                            flexDirection: "row",
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        {items.map((val: number, i: number) => (
                            <TouchableOpacity
                                key={val}
                                onPress={() => {
                                    setSelectedValue(val);
                                    setIsVisible(false);
                                }}
                                style={{
                                    width: "50%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingVertical: HP(2),
                                    borderWidth: 0.5,
                                    borderColor: colors.secondary,
                                    backgroundColor:
                                        selectedValue === val
                                            ? HexToHexa({
                                                  hex: colors.primary,
                                                  alpha: 1,
                                              })
                                            : HexToHexa({
                                                  hex: colors.background,
                                                  alpha: 0,
                                              }),
                                    borderTopLeftRadius: i === 0 ? WP(2) : 0,
                                    borderTopRightRadius: i === 1 ? WP(2) : 0,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: HP(2),
                                        fontFamily: OutfitRegular,
                                        color:
                                            selectedValue !== val
                                                ? colors.text
                                                : colors.white,
                                    }}
                                >
                                    {val}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default Picker;
