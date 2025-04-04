import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuth } from "@/src/services/auth/authentication";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { md, OutfitBold, OutfitRegular, sm } from "@/src/hooks/useFonts";
import { LinearGradient } from "expo-linear-gradient";
import { planType } from "@/src/types/planTypes";
interface MyPansType {
    onSelectGeneratedPlan: (v: any) => void;
}
const MyPlans: React.FC<MyPansType> = ({ onSelectGeneratedPlan }) => {
    const { user } = useAuth();
    const colors = useThemeColors();
    const currentPlans = user?.plan?.currentPlans;
    const otherPlans = user?.plan?.otherPlans;
    if (!otherPlans || !currentPlans) return;

    return (
        <View style={{ width: WP(100), gap: HP(2), marginTop: HP(4) }}>
            <Text
                style={{
                    fontSize: md,
                    color: colors.text,
                    fontFamily: OutfitRegular,
                    marginLeft: WP(4),
                }}
            >
                My Workout Plans
            </Text>
            <ScrollView
                horizontal
                contentContainerStyle={{ gap: WP(4), paddingHorizontal: WP(4) }}
                showsHorizontalScrollIndicator={false}
            >
                {currentPlans.map((plan: planType, index: number) => (
                    <View
                        key={index}
                        style={{
                            borderRadius: WP(2),
                            backgroundColor:
                                index % 2 ? colors.card : colors.secondary,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                padding: WP(6),
                                paddingVertical: HP(5),
                                width: WP(70),
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: OutfitBold,
                                    color: colors.text,
                                    fontSize: sm,
                                }}
                            >
                                {plan.planTitle}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View>
                <Text
                    style={{
                        fontSize: md,
                        color: colors.text,
                        fontFamily: OutfitRegular,
                        marginLeft: WP(4),
                    }}
                >
                    Generated plans
                </Text>
                {/* <Text
                    style={{
                        fontSize: sm,
                        color: colors.warning,
                        fontFamily: OutfitRegular,
                        marginLeft: WP(4),
                    }}
                >
                    All Generated plan today will be deleted tomorrow.
                </Text> */}
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{ gap: WP(4), paddingHorizontal: WP(4) }}
                showsHorizontalScrollIndicator={false}
            >
                {otherPlans.map((plan: planType, index: number) => (
                    <View
                        key={index}
                        style={{
                            borderRadius: WP(2),
                            backgroundColor:
                                index % 2 ? colors.card : colors.accent,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => onSelectGeneratedPlan(plan)}
                            style={{
                                padding: WP(6),
                                width: WP(70),
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: OutfitRegular,
                                    color: colors.text,
                                    fontSize: sm,
                                }}
                            >
                                {plan.planTitle}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default MyPlans;
