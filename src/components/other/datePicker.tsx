import { HP, WP } from "@/src/hooks/useDeviceDimension";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Text, TouchableOpacity, View } from "react-native";

interface props {
    handlePress: (v: any) => void;
    items: any;
    selectedMonth: any;
    selectedDate: any;
}

const DatePicker: React.FC<props> = ({
    handlePress,
    items,
    selectedDate,
    selectedMonth,
}) => {
    const colors = useThemeColors();

    return (
        <View
            style={{
                flexDirection: "row",
                flexWrap: "wrap",
            }}
        >
            {items.map((day: any, index: any) => (
                <TouchableOpacity
                    key={index}
                    style={{
                        width: "14.28%",
                        aspectRatio: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: HP(0.5),
                        backgroundColor:
                            selectedMonth && selectedDate
                                ? selectedDate === day
                                    ? colors.primary
                                    : "transparent"
                                : "transparent",
                        borderRadius: selectedMonth
                            ? selectedDate === day
                                ? WP(2)
                                : 0
                            : 0,
                    }}
                    onPress={() => day && handlePress(day)}
                    disabled={!day || selectedMonth === null}
                >
                    <Text
                        style={{
                            fontSize: HP(1.5),
                            color: selectedMonth
                                ? selectedDate === day
                                    ? colors.white
                                    : HexToHexa({
                                          hex: colors.text,
                                          alpha: 0.5,
                                      })
                                : HexToHexa({
                                      hex: colors.text,
                                      alpha: 0.2,
                                  }),
                            fontFamily: "Outfit-Regular",
                        }}
                    >
                        {day || ""}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default DatePicker;
