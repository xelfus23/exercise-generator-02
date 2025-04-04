import { Animated, Text, TouchableOpacity, View } from "react-native";
import { DrawerActions, RouteProp, useRoute } from "@react-navigation/native";
import { ChatStackParamList } from "../../../navigation/type";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { lg, md, OutfitBold, OutfitRegular, xl } from "@/src/hooks/useFonts";
import { useFocusEffect, useNavigation } from "expo-router";
import { Image } from "expo-image";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ChatBubble from "@/src/components/chats/chatBubble";
import ChatHeader from "@/src/components/header/chatHeader";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useAuth } from "@/src/services/auth/authentication";
import { TextInput } from "react-native";
import HexToHexa from "@/src/hooks/useHexa";

type ChatScreenRouteProp = RouteProp<ChatStackParamList, "ChatScreen">;

interface props {
    router: any;
    setRouteName: (v: string) => void;
    setShowHeader: (v: boolean) => void;
}

const ChatScreen: React.FC<props> = ({
    router,
    setRouteName,
    setShowHeader,
}) => {
    const route = useRoute<ChatScreenRouteProp>();
    const colors = useThemeColors();
    const { user } = route.params;
    const { user: u } = useAuth();
    const debounceScroll = useRef<any>(null);
    const [refreshing, setRefreshing] = useState(false);
    const flatListRef = useRef<any>(null);
    const [loading, setLoading] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        setShowHeader(false);
    }, []);

    const renderChatItem = ({ item, index }: { item: any; index: any }) => (
        <ChatBubble
            text={item.message}
            role={item.role}
            timestamp={item.timestamp}
            // flag={item.flag}
            user={u?.firstName}
            index={index}
            chatLength={user?.chats?.length}
            typing={loading}
        />
    );

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const viewHeight = event.nativeEvent.layoutMeasurement.height;
        const atBottom = offsetY + viewHeight >= contentHeight - 10; // Threshold of 10 pixels

        if (debounceScroll.current) clearTimeout(debounceScroll.current);
        debounceScroll.current = setTimeout(() => {
            setIsAtBottom(atBottom);
        }, 100);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ChatHeader
                title={user.firstName}
                image={user?.image}
                onChat={false}
                navigation={() => router.back()}
            />
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    onScroll={handleScroll} // Attach the scroll handler here
                    scrollEventThrottle={16} // Throttle for smooth performance
                    data={user?.chats}
                    renderItem={renderChatItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        paddingTop: HP(1.5),
                        paddingHorizontal: HP(1.5),
                    }}
                    showsVerticalScrollIndicator={true}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={refreshing}
                    //         onRefresh={onRefresh}
                    //     />
                    // }
                />

                <View
                    style={{
                        alignItems: "center",
                        paddingHorizontal: WP(4),
                        paddingVertical: HP(1),
                        width: WP(100),
                        justifyContent: "space-between",
                        flexDirection: "row",
                        height: HP(8),
                        position: "absolute",
                        bottom: 0,
                        backgroundColor: colors.background,
                        borderTopWidth: 0.2,
                        borderTopColor: colors.secondary,
                    }}
                >
                    <TextInput
                        placeholder="Type a message..."
                        placeholderTextColor={HexToHexa({
                            hex: colors.text,
                            alpha: 0.6,
                        })}
                        style={{
                            fontSize: 16,
                            color: colors.text,
                            paddingHorizontal: 15,
                            borderRadius: 25,
                            backgroundColor: HexToHexa({
                                hex: colors.background,
                                alpha: 0.8,
                            }),
                            justifyContent: "center",
                            width: "85%",
                            height: "100%",
                            borderWidth: 1,
                            borderColor: colors.secondary,
                            fontFamily: OutfitRegular,
                        }}
                        onChangeText={setUserInput}
                        value={userInput}
                        onPress={() =>
                            setTimeout(() => {
                                flatListRef.current?.scrollToEnd({
                                    animated: true,
                                });
                            }, 300)
                        }
                        multiline
                    />
                    <TouchableOpacity
                        // onPress={handleUserInput}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            height: "95%",
                            borderRadius: WP(100),
                            aspectRatio: 1,
                            backgroundColor: !userInput
                                ? colors.secondary
                                : colors.primaryLight,
                        }}
                        disabled={!userInput}
                    >
                        <AntDesign
                            name="arrowup"
                            size={HP(4)}
                            color={colors.white}
                            style={{
                                alignSelf: "center",
                                opacity: !userInput ? 0.3 : 1,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ChatScreen;
