import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calculator } from "@/src/services/auth/logic/calculateEverything";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import { Image } from "expo-image";
import { useState } from "react";

const RecommendedExercises: React.FC = () => {
    const { exerciseToday } = Calculator();
    const [index, setIndex] = useState(0);
    const colors = useThemeColors();

    const handleScroll = (event: any) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(scrollX / WP(100));
        setIndex(currentIndex);
    };

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={WP(100)}
                onScroll={handleScroll}
            >
                {exerciseToday.map((exe: any, i: number) => (
                    <View
                        key={i}
                        style={{ width: WP(100), padding: WP(8), gap: HP(2) }}
                    >
                        <View>
                            <Text
                                style={{
                                    color: colors.text,
                                    fontSize: HP(3),
                                    fontFamily: OutfitBold,
                                }}
                            >
                                {exe.exercise.name}
                            </Text>
                            <Text
                                style={{
                                    color: colors.success,
                                    fontSize: HP(1.5),
                                    fontFamily: OutfitRegular,
                                }}
                            >
                                {exe.plan.planTitle}
                            </Text>
                        </View>
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: HP(1.8),
                                fontFamily: OutfitRegular,
                            }}
                        >
                            {exe.exercise.description}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: WP(2),
                                    backgroundColor: colors.primary,
                                    padding: WP(2),
                                    paddingHorizontal: WP(4),
                                    borderRadius: WP(4),
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: OutfitRegular,
                                        fontSize: HP(2),
                                        color: colors.white,
                                    }}
                                >
                                    Play
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View
                style={{
                    flexDirection: "row",
                    width: WP(100),
                    gap: HP(1),
                    justifyContent: "center",
                }}
            >
                {Array(exerciseToday.length)
                    .fill(0)
                    .map((_, i) => (
                        <View
                            key={i}
                            style={{
                                height: HP(1),
                                aspectRatio: 1,
                                borderRadius: WP(100),
                                backgroundColor:
                                    index === i
                                        ? colors.primary
                                        : colors.secondary,
                            }}
                        />
                    ))}
            </View>
        </View>
    );
};

export default RecommendedExercises;
