import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { md, OutfitBold, OutfitRegular, sm, xsm } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Image } from "expo-image";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Animated,
    ImageSourcePropType,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ChatStackParamList } from "../../../navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ChatProps = NativeStackNavigationProp<ChatStackParamList, "ChatScreen">;

interface props {
    router: any;
    setRouteName: (v: string) => void;
    setShowHeader: (v: boolean) => void;
}

const ChatHeads: React.FC<props> = ({
    router,
    setRouteName,
    setShowHeader,
}) => {
    const colors = useThemeColors();
    const navigation = useNavigation<ChatProps>();

    useFocusEffect(
        useCallback(() => {
            setRouteName("Chats");
            setShowHeader(true);
        }, [])
    );

    const getDate = (date: any) => {
        const dateVal = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        const splittedDate = dateVal.split(" ");

        return {
            year: splittedDate[2],
            month: splittedDate[0],
            day: splittedDate[1],
            time: splittedDate[3],
            dayTime: splittedDate[4],
        };
    };

    const today = new Date();

    const [users, setUsers] = useState([
        {
            userId: 1,
            firstName: "Patrick",
            lastName: "Medenilla",
            image: require("@/src/assets/images/ui/photos/nature.png"),
            lastMessage: {
                message: "Nulla elit veniam minim tempor aliqua.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
            chats: [
                {
                    role: "patrick",
                    message:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    timestamp: {
                        year: getDate(today).year,
                        month: getDate(today).month,
                        day: getDate(today).day,
                        time: getDate(today).time,
                        dayTime: getDate(today).dayTime,
                    },
                },
                {
                    role: "John",
                    message:
                        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    timestamp: {
                        year: getDate(today).year,
                        month: getDate(today).month,
                        day: getDate(today).day,
                        time: getDate(today).time,
                        dayTime: getDate(today).dayTime,
                    },
                },
            ],
        },
        {
            userId: 2,
            firstName: "Mik",
            lastName: "Fajardo",
            image: require("@/src/assets/images/ui/photos/nature-1.png"),
            lastMessage: {
                message:
                    "Ipsum duis quis aliquip deserunt anim tempor id id consectetur id cupidatat aliquip nostrud laboris.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
            chats: [
                {
                    role: "mik",
                    message:
                        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    timestamp: {
                        year: getDate(today).year,
                        month: getDate(today).month,
                        day: getDate(today).day,
                        time: getDate(today).time,
                        dayTime: getDate(today).dayTime,
                    },
                },
                {
                    role: "John",
                    message:
                        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    timestamp: {
                        year: getDate(today).year,
                        month: getDate(today).month,
                        day: getDate(today).day,
                        time: getDate(today).time,
                        dayTime: getDate(today).dayTime,
                    },
                },
            ],
        },
    ]);

    const [pressedIndex, setPressedIndex] = useState<number | null>(null);

    const chatBotChats = [
        {
            role: "John",
            message: "Hello there!",
            timestamp: new Date(),
        },
        {
            role: "bot",
            message:
                "I'm here to help! First, let's create a personalized fitness plan. What's your fitness level?",
            timestamp: new Date(),
        },
    ];

    return (
        <View
            style={{
                backgroundColor: colors.background,
                height: HP(100),
                gap: HP(2),
            }}
        >
            <Text
                style={{
                    fontFamily: OutfitRegular,
                    fontSize: md,
                    padding: WP(4),
                    color: colors.text,
                }}
            >
                Chat Bot
            </Text>
            <View style={{}}>
                <TouchableOpacity
                    style={{
                        marginHorizontal: WP(4),
                        flexDirection: "row",
                        alignItems: "center",
                        gap: WP(4),
                    }}
                >
                    <Image
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/426/426217.png",
                        }}
                        style={{
                            height: HP(6),
                            aspectRatio: 1,
                            borderRadius: WP(100),
                        }}
                        contentFit="cover"
                    />
                    <View>
                        <Text
                            style={{
                                fontSize: md,
                                fontFamily: OutfitBold,
                                color: colors.text,
                            }}
                        >
                            Chat Bot
                        </Text>
                        <Text
                            style={{
                                fontSize: sm,
                                fontFamily: OutfitRegular,
                                color: colors.text,
                                maxWidth: WP(70),
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {chatBotChats[0].message}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text
                style={{
                    fontFamily: OutfitRegular,
                    fontSize: md,
                    padding: WP(4),
                    color: colors.text,
                }}
            >
                Messages
            </Text>
            <View style={{}}>
                {users.map((user, index) => {
                    const colorAnimationValue = useRef(
                        new Animated.Value(0)
                    ).current;

                    const textColorAnimationValue = useRef(
                        new Animated.Value(0)
                    ).current;

                    const animate = (v: boolean) => {
                        if (v) {
                            Animated.parallel([
                                Animated.timing(colorAnimationValue, {
                                    toValue: 1,
                                    duration: 300,
                                    useNativeDriver: true,
                                }),
                                Animated.timing(textColorAnimationValue, {
                                    toValue: 1,
                                    duration: 300,
                                    useNativeDriver: false,
                                }),
                            ]).start();
                        } else {
                            Animated.parallel([
                                Animated.timing(colorAnimationValue, {
                                    toValue: 0,
                                    duration: 300,
                                    useNativeDriver: true,
                                }),
                                Animated.timing(textColorAnimationValue, {
                                    toValue: 0,
                                    duration: 300,
                                    useNativeDriver: false,
                                }),
                            ]).start();
                        }
                    };

                    const animatedBgColor = colorAnimationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                            "transparent",
                            HexToHexa({ hex: colors.primary, alpha: 1 }),
                        ],
                    });

                    const animatedTextColor =
                        textColorAnimationValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [colors.text, colors.white],
                        });

                    const onPressIn = (user: any, index: number) => {
                        setPressedIndex(index);
                        animate(true);
                    };

                    const onPressOut = (user: any, index: number) => {
                        setPressedIndex(null);
                        animate(false);
                    };

                    const onPress = (user: any) => {
                        navigation.navigate("ChatScreen", { user });
                    };

                    return (
                        <Animated.View
                            style={{
                                backgroundColor: animatedBgColor,
                            }}
                            key={index}
                        >
                            <Pressable
                                style={{
                                    marginHorizontal: WP(4),
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: WP(4),
                                    paddingVertical: HP(2),
                                }}
                                onPressIn={() =>
                                    onPressIn(user as any, index as number)
                                }
                                onPressOut={() =>
                                    onPressOut(user as any, index as number)
                                }
                                onPress={() => {
                                    onPress(user as any);
                                }}
                            >
                                <Image
                                    source={user.image}
                                    style={{
                                        height: HP(5),
                                        aspectRatio: 1,
                                        borderRadius: WP(100),
                                    }}
                                    contentFit="cover"
                                />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        flex: 1,
                                    }}
                                >
                                    <View>
                                        <Animated.Text
                                            style={{
                                                fontSize: md,
                                                fontFamily: OutfitBold,
                                                color: animatedTextColor,
                                            }}
                                        >
                                            {user.firstName} {user.lastName}
                                        </Animated.Text>
                                        <Animated.Text
                                            style={{
                                                fontSize: sm,
                                                fontFamily: OutfitRegular,
                                                color: animatedTextColor,
                                                maxWidth: WP(65),
                                            }}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {user.lastMessage.message}
                                        </Animated.Text>
                                    </View>
                                    <Animated.Text
                                        style={{
                                            fontSize: xsm,
                                            fontFamily: OutfitRegular,
                                            color: animatedTextColor,
                                            alignSelf: "flex-end",
                                        }}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {`${user.lastMessage.timestamp.time}`}
                                    </Animated.Text>
                                </View>
                            </Pressable>
                        </Animated.View>
                    );
                })}
            </View>
        </View>
    );
};
export default ChatHeads;
