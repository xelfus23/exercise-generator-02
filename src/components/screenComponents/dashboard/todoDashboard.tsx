import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    ScrollView,
    Modal,
} from "react-native";
import React, { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { WP, HP } from "@/src/hooks/useDeviceDimension";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useTheme } from "@react-navigation/native";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useAuth } from "@/src/services/auth/authentication";
import { exerciseType } from "@/src/types/planTypes";

interface TodoTypes {
    drawerRef: any;
    toggle: () => void;
    busy: boolean;
}
const ToDo: React.FC<TodoTypes> = ({ drawerRef, toggle, busy }) => {
    const colors = useThemeColors();
    const { exerciseToday } = useAuth();

    const sortExercises = (exercises: any) => {
        if (!exercises || exercises.length === 0) return [];
        return [...exercises].sort((a, b) => {
            if (
                a?.exercise?.name === "Rest Day" &&
                b?.exercise?.name !== "Rest Day"
            ) {
                return 1;
            }
            if (
                a?.exercise?.name !== "Rest Day" &&
                b?.exercise?.name === "Rest Day"
            ) {
                return -1;
            }
            return a?.exercise?.completed === b.exercise?.completed
                ? 0
                : a?.exercise?.completed
                ? 1
                : -1;
        });
    };

    const sortedExercises = sortExercises(exerciseToday);

    return (
        <Animated.View
            style={{
                position: "absolute",
                width: WP(60),
                height: HP(80),
                zIndex: 5,
                backgroundColor: colors.background,
                gap: WP(3),
                borderColor: colors.secondary,
                borderWidth: 1,
                paddingRight: WP(2),
                transform: [{ translateX: drawerRef }],
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderRadius: WP(4),
            }}
        >
            <View
                style={{
                    borderColor: colors.secondary,
                    padding: WP(3),
                    gap: WP(3),
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderRadius: WP(4),
                    height: "100%",
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontWeight: "bold",
                        fontSize: HP(2.5),
                        textAlign: "center",
                    }}
                >
                    Exercise to do
                </Text>
                <ScrollView
                    style={{
                        borderWidth: 1,
                        borderColor: colors.secondary,
                        borderRadius: WP(4),
                        backgroundColor: HexToHexa({
                            hex: colors.secondary,
                            alpha: 0.2,
                        }),
                        width: "100%",
                    }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: WP(4),
                        padding: WP(4),
                    }}
                >
                    {sortedExercises?.length !== 0 ? (
                        sortedExercises?.map(
                            (item, index) =>
                                item?.exercise?.name !== "Rest Day" && (
                                    <View
                                        key={
                                            item?.exercise?.name +
                                            item?.exercise?.key +
                                            index
                                        }
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: WP(2),
                                        }}
                                    >
                                        {item?.exercise?.completed ? (
                                            <AntDesign
                                                name="checkcircle"
                                                size={HP(2)}
                                                color={colors.success}
                                            />
                                        ) : (
                                            <AntDesign
                                                name="checkcircleo"
                                                size={HP(2)}
                                                color={colors.secondary}
                                            />
                                        )}

                                        <Text
                                            style={{
                                                fontSize: HP(1.5),
                                                color: colors.text,
                                            }}
                                        >
                                            {item?.exercise?.name}
                                        </Text>
                                    </View>
                                )
                        )
                    ) : (
                        <Text
                            style={{
                                color: colors.text,
                                fontWeight: "bold",
                                fontSize: 14,
                                padding: WP(3),
                                textAlign: "center",
                            }}
                        >
                            You don't have exercise yet please generate
                        </Text>
                    )}
                </ScrollView>
                <TouchableOpacity onPress={toggle} disabled={busy}>
                    <Text
                        style={{
                            color: colors.white,
                            fontWeight: "bold",
                            padding: WP(2),
                            textAlign: "center",
                            backgroundColor: colors.primary,
                            borderRadius: WP(4),
                            fontSize: HP(2),
                            width: WP(40),
                            alignSelf: "center",
                        }}
                    >
                        Close
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default ToDo;
