import { HP, WP } from "@/src/hooks/useDeviceDimension";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";

interface props {
    scroll: any;
    options: any;
    itemWidth: number;
    loading: boolean;
}
const Meter: React.FC<props> = ({ scroll, options, itemWidth, loading }) => {
    const colors = useThemeColors();

    return (
        <View style={{ alignItems: "center" }}>
            <AntDesign name="caretdown" size={HP(1.5)} color={colors.text} />

            <View
                style={{
                    height: HP(10),
                    overflow: "hidden",
                }}
            >
                <LinearGradient
                    colors={[
                        colors.background,
                        HexToHexa({ hex: colors.secondary, alpha: 0.2 }),
                        HexToHexa({ hex: colors.secondary, alpha: 0.2 }),
                        colors.background,
                    ]}
                    locations={[0, 0.49, 0.51, 1]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        height: HP(10),
                        opacity: 0.8,
                    }}
                >
                    <ScrollView
                        horizontal
                        snapToInterval={itemWidth}
                        style={{
                            width: WP(81.5),
                        }}
                        contentContainerStyle={{
                            justifyContent: "center",
                            paddingHorizontal: WP(39.4),
                        }}
                        onMomentumScrollEnd={scroll}
                        showsHorizontalScrollIndicator={false}
                        disableScrollViewPanResponder={loading}
                    >
                        {options.map((value: any, index: number) => (
                            <View
                                style={{
                                    alignItems: "center",
                                    width: itemWidth,
                                }}
                                key={index}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        width: "100%",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize:
                                                index % 10 === 0
                                                    ? HP(3)
                                                    : index % 5 === 0
                                                    ? HP(2.5)
                                                    : HP(1.8),
                                            color: colors.text,
                                            top:
                                                index % 10 === 0
                                                    ? -HP(0.4)
                                                    : index % 5 === 0
                                                    ? -HP(0.3)
                                                    : -HP(0.1),
                                            opacity: 0.8,
                                            fontFamily: "Outfit-Regular",
                                        }}
                                    >
                                        |
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        color: colors.text,
                                        fontSize:
                                            index % 10 === 0
                                                ? HP(1.8)
                                                : HP(1.5),
                                        width: WP(15),
                                        fontFamily: "Outfit-Regular",
                                        textAlign: "center",
                                    }}
                                >
                                    {index % 10 === 0
                                        ? Math.floor(value.value) + "cm"
                                        : ""}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </LinearGradient>
            </View>
            <AntDesign name="caretup" size={HP(1.5)} color={colors.text} />
        </View>
    );
};

export default Meter;
