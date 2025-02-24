import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitRegular } from "@/src/hooks/useFonts";
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
    unit: string;
}
const Meter: React.FC<props> = ({
    scroll,
    options,
    itemWidth,
    loading,
    unit,
}) => {
    const colors = useThemeColors();

    return (
        <View
            style={{
                width: Math.round(WP(100)),
                alignItems: "flex-start",
            }}
        >
            <AntDesign
                name="caretdown"
                size={HP(1.5)}
                color={colors.text}
                style={{ paddingLeft: Math.round(WP(30)) }}
            />
            <View style={{ height: HP(10), overflow: "hidden" }}>
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
                            width: Math.round(WP(100)), // Use full width
                        }}
                        contentContainerStyle={{
                            paddingLeft: WP(30),
                            paddingRight: WP(70) - itemWidth,
                        }}
                        onMomentumScrollEnd={scroll}
                        showsHorizontalScrollIndicator={false}
                        disableScrollViewPanResponder={loading}
                        decelerationRate={0.989} // Add decelerationRate
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
                                        justifyContent: "space-between",
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
                                            color: colors.text, // Highlight selected
                                            top:
                                                index % 10 === 0
                                                    ? -HP(0.4)
                                                    : index % 5 === 0
                                                    ? -HP(0.3)
                                                    : -HP(0.1),
                                            opacity: 0.8,
                                            fontFamily: OutfitRegular,
                                        }}
                                    >
                                        |
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        color: colors.text, // Highlight selected
                                        width: WP(15),
                                        fontSize:
                                            index % 10 === 0
                                                ? HP(1.5)
                                                : HP(1.5),
                                        fontFamily: OutfitRegular,
                                        textAlign: "center",
                                    }}
                                >
                                    {index % 10 === 0
                                        ? Math.floor(value.value) + unit
                                        : ""}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </LinearGradient>
            </View>
            <AntDesign
                name="caretup"
                size={HP(1.5)}
                color={colors.text}
                style={{ paddingLeft: Math.round(WP(30)) }}
            />
        </View>
    );
};

export default Meter;
