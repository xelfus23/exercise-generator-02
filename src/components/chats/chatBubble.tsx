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
import { useAuth } from "@/src/services/auth/authentication";
import HexToHexa from "@/src/hooks/useHexa";
// import { collection, doc, getDocs, setDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { db } from "@/components/firebase/config";

interface props {
    userid: string;
    text: string;
    index: number;
    chatLength: number;
    typing: boolean;
    timestamp: any;
}

const ChatBubble: React.FC<props> = ({
    userid,
    text,
    index,
    chatLength,
    typing,
    timestamp,
}) => {
    const colors = useThemeColors();
    const pressIn = () => {};
    const formattedText = formatText(text);
    const { user } = useAuth();

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

    const match = user?.uid === userid;

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
                alignSelf: match ? "flex-end" : "flex-start",
            }}
        >
            <Pressable
                onPressIn={pressIn}
                style={{
                    padding: HP(0.2),
                    paddingHorizontal: HP(1),
                    maxWidth: WP(80),
                    justifyContent: "center",
                    backgroundColor: match ? colors.primary : colors.secondary,
                    alignSelf: match ? "flex-end" : "flex-start",
                    borderTopRightRadius: match ? WP(0) : WP(2),
                    borderTopLeftRadius: match ? WP(2) : WP(0),
                    borderRadius: WP(2),
                    borderWidth: 3,
                    borderColor: match ? colors.primary : colors.secondary,
                    elevation: 7,
                }}
            >
                {typing && !match && index === chatLength - 1 ? (
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
                        userid={userid}
                        userId={user?.uid}
                        match={match}
                    />
                )}

                <View
                    style={{
                        flexDirection: "row",
                        gap: HP(2),
                        width: "100%",
                        alignSelf: match ? "flex-start" : "flex-end",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: !match ? HP(1) : 0,
                    }}
                >
                    {!typing || match ? (
                        <Text
                            style={{
                                color: match
                                    ? HexToHexa({
                                          hex: colors.white,
                                          alpha: 0.8,
                                      })
                                    : HexToHexa({
                                          hex: colors.text,
                                          alpha: 0.8,
                                      }),
                                fontSize: HP(1.5),
                                fontFamily: OutfitRegular,
                            }}
                        >
                            {isToday(timestamp)
                                ? "Today"
                                : // : `${timestamp.month} ${timestamp.date}`}{" "}
                                  ``}
                            {timestamp.time}
                        </Text>
                    ) : null}
                </View>
                <View
                    style={{
                        position: "absolute",
                        width: 0,
                        height: 0,
                        borderBottomWidth: 14,
                        borderTopColor: "transparent",
                        borderBottomColor: "transparent",
                        top: -3,
                        ...(match
                            ? {
                                  right: -10,
                                  borderLeftWidth: 10,
                                  borderLeftColor: colors.primary,
                              }
                            : {
                                  left: -10,
                                  borderRightWidth: 10,
                                  borderRightColor: colors.secondary,
                              }),
                    }}
                />
            </Pressable>

            {/* {userid === "model" && index === chatLength - 1 && !typing && (
                <View
                    style={{
                        flexDirection: "row",
                        gap: HP(2),
                        alignItems: "center",
                        alignSelf: userid !== "model" ? "flex-start" : "flex-end",
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
                                    userid !== "model"
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
    userid,
    userId,
    match,
}: {
    parts: string[];
    userid: string;
    userId: string | undefined;
    match: boolean;
}) => {
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
                                fontSize: HP(1.8),
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
