import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    Animated,
    Pressable,
    TouchableOpacity,
} from "react-native";

import { formatText } from "./formatText";
import { useTheme } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
// import { collection, doc, getDocs, setDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { db } from "@/components/firebase/config";

interface props {
    role: string;
    text: string;
    index: number;
    chatLength: number;
    typing: boolean;
    flag?: string;
    user: any;
    timestamp: any;
}

const ChatBubble: React.FC<props> = ({
    role,
    text,
    index,
    chatLength,
    typing,
    user,
    timestamp,
}) => {
    const colors = useThemeColors();
    const pressIn = () => {};
    const formattedText = formatText(text);

    console.log(user, role);

    // const [itemFlag, setItemFlag] = useState(flag);
    const isToday = (timestamp: any) => {
        const today = new Date();
        return (
            timestamp.date === today.getDate() &&
            timestamp.month ===
                today.toLocaleString("default", { month: "short" }) &&
            timestamp.year === today.getFullYear()
        );
    };

    // const flagItem = async (value: any) => {
    //     try {
    //         setItemFlag(value);
    //     } catch (e) {
    //         console.log("Error", e);
    //     }
    // };

    return (
        <View
            style={{
                marginBottom: index === chatLength - 1 ? HP(8) : HP(2),
                gap: HP(1),
                maxWidth: WP(80),
                alignSelf: role !== user ? "flex-start" : "flex-end",
            }}
        >
            <Pressable
                onPressIn={pressIn}
                style={{
                    padding: HP(0.2),
                    paddingHorizontal: HP(1),
                    maxWidth: WP(80),
                    justifyContent: "center",
                    backgroundColor:
                        role !== user ? colors.secondary : colors.accent,
                    alignSelf: role === user ? "flex-end" : "flex-start",
                    borderTopRightRadius: role === user ? WP(0) : WP(2),
                    borderTopLeftRadius: role !== user ? WP(0) : WP(2),
                    borderRadius: WP(2),
                    borderWidth: 3,
                    borderColor:
                        role !== user ? colors.secondary : colors.accent,
                    elevation: 7,
                }}
            >
                {typing && role !== user && index === chatLength - 1 ? (
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: HP(1.7),
                            fontFamily: OutfitRegular,
                        }}
                    >
                        {/* <View
                            style={{
                                width: WP(20),
                                justifyContent: "center",
                            }}
                        >
                            <LottieView
                                source={require("@/src/assets/json/typing.json")}
                                loop
                                autoPlay
                                style={{ height: HP(3) }}
                            />
                        </View> */}
                    </Text>
                ) : (
                    <RenderText
                        parts={formattedText as any}
                        role={role}
                        user={user}
                    />
                )}

                <View
                    style={{
                        flexDirection: "row",
                        gap: HP(2),
                        width: "100%",
                        alignSelf: role === user ? "flex-start" : "flex-end",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: role !== user ? HP(1) : 0,
                    }}
                >
                    {!typing || role === user ? (
                        <Text
                            style={{
                                color:
                                    role === user ? colors.white : colors.text,
                                fontSize: HP(1.2),
                                opacity: 0.6,
                                fontFamily: OutfitRegular,
                            }}
                        >
                            {isToday(timestamp)
                                ? "Today"
                                : `${timestamp.month} ${timestamp.date}`}{" "}
                            {timestamp.time}
                        </Text>
                    ) : null}
                </View>
                <View
                    style={{
                        position: "absolute",
                        width: 0,
                        height: 0,
                        borderBottomWidth: 5,
                        borderTopColor: "transparent",
                        borderBottomColor: "transparent",
                        top: -3,
                        ...(role === user
                            ? {
                                  right: -10,
                                  borderLeftWidth: 10,
                                  borderLeftColor: colors.accent,
                              }
                            : {
                                  left: -10,
                                  borderRightWidth: 10,
                                  borderRightColor: colors.secondary,
                              }),
                    }}
                />
            </Pressable>

            {/* {role === "model" && index === chatLength - 1 && !typing && (
                <View
                    style={{
                        flexDirection: "row",
                        gap: HP(2),
                        alignItems: "center",
                        alignSelf: role !== "model" ? "flex-start" : "flex-end",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity onPress={() => flagItem("Good")}>
                        <MaterialCommunityIcons
                            name="thumb-up-outline"
                            size={HP(1.5)}
                            color={
                                itemFlag === "Good"
                                    ? colors.success
                                    : colors.text
                            }
                            style={{
                                borderWidth: 1,
                                borderColor:
                                    itemFlag === "Good"
                                        ? colors.success
                                        : colors.text,
                                padding: HP(0.5),
                                borderRadius: WP(2),
                                alignSelf:
                                    role !== "model"
                                        ? "flex-start"
                                        : "flex-end",
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => flagItem("Bad")}>
                        <MaterialCommunityIcons
                            name="thumb-down-outline"
                            size={HP(1.5)}
                            color={
                                itemFlag === "Bad" ? colors.error : colors.text
                            }
                            style={{
                                borderWidth: 1,
                                borderColor:
                                    itemFlag === "Bad"
                                        ? colors.error
                                        : colors.text,
                                padding: HP(0.5),
                                borderRadius: WP(2),
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )} */}
        </View>
    );
};

const RenderText = ({
    parts,
    role,
    user,
}: {
    parts: string[];
    role: string;
    user: string;
}) => {
    const match = role === user;
    const colors = useThemeColors();

    return (
        <Text
            style={{
                color: colors.white,
                fontSize: HP(1.8),
                fontFamily: OutfitRegular,
            }}
        >
            {parts.map((part: any, index) => {
                const text = typeof part === "string" ? part : part.text || "";
                return (
                    <Text
                        key={index}
                        style={[
                            {
                                color: match ? colors.white : colors.text,
                                fontSize: HP(1.7),
                                fontFamily: OutfitRegular,
                            },
                            part.bold
                                ? {
                                      fontFamily: OutfitBold,
                                      color: match ? colors.white : colors.text,
                                  }
                                : {},
                            part.bullet ? { marginLeft: WP(5) } : {},
                        ]}
                    >
                        {/* {text.includes("\n\n\n\n\n")
                            ? text.replace(
                                  "\n\n\n\n\n",
                                  "———————————————————————————————"
                              )
                            : text.includes("\n\n\n")
                            ? text.replace(/\n\n\n/gm, "\n\n")
                            : text.includes("\n\n")
                            ? text.replace(/\n\n/gm, "\n\n")
                            : text.replace(/\n/, "\n\n")} */}
                        {text}
                    </Text>
                );
            })}
        </Text>
    );
};

export default ChatBubble;
