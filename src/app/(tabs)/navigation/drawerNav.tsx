import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./bottomTabNav";
import { DrawerStackParamList } from "./type";
import Settings from "../screens/Drawer/settings/settings";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import HexToHexa from "@/src/hooks/useHexa";
import React, { useState } from "react";
import { Image } from "expo-image";
import { useAuth } from "@/src/services/auth/authentication";
import { lg, md, OutfitBold, OutfitRegular, xl } from "@/src/hooks/useFonts";
import ChatStack from "./chatStackNav";
import Notification from "../screens/Drawer/notification/notification";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import HomeHeader from "@/src/components/header/homeHeader";
import GridBackground from "@/src/components/other/grid-background";

const MainStack: React.FC = () => {
    const Drawer = createDrawerNavigator<DrawerStackParamList>();
    const { user, logout } = useAuth();
    const [routeName, setRouteName] = useState("Home");
    const [showHeader, setShowHeader] = useState(true);

    const colors = useThemeColors();
    const navigation = useNavigation();

    const photoRef = "@/src/assets/images/ui/photos/";
    const iconRef = "@/src/assets/images/ui/icons-svg/";

    const featureScreens = [
        {
            name: "HomeDrawer",
            component: (
                <HomeStack
                    setRouteName={setRouteName}
                    setShowHeader={setShowHeader}
                />
            ),
            label: "Home",
            icon: require(`${iconRef}home-icon.svg`),
        },
        {
            name: "ChatDrawer",
            component: (
                <ChatStack
                    setRouteName={setRouteName}
                    setShowHeader={setShowHeader}
                />
            ),
            label: "Chats",
            icon: require(`${iconRef}chat-icon.svg`),
        },
        {
            name: "NotificationDrawer",
            component: (
                <Notification
                    setRouteName={setRouteName}
                    setShowHeader={setShowHeader}
                />
            ),
            label: "Notifications",
            icon: require(`${iconRef}notification-icon.svg`),
        },
        {
            name: "SettingsDrawer",
            component: (
                <Settings
                    setRouteName={setRouteName}
                    setShowHeader={setShowHeader}
                />
            ),
            label: "Settings",
            icon: require(`${iconRef}settings-icon.svg`),
        },
    ];

    //--------------------------------------------------------------------------------------------------------------------

    const renderDrawerItem = (props: any, routeName: string, index: number) => {
        const { options } = props.descriptors[props.state.routes[index].key];
        const isFocused = props.state.index === index;

        return (
            <TouchableOpacity
                key={routeName}
                onPress={() => props.navigation.navigate(routeName)}
                style={{
                    flexDirection: "row",
                    gap: WP(4),
                    paddingHorizontal: WP(4),
                    alignItems: "center",
                    backgroundColor: isFocused ? colors.primary : "transparent",
                    height: HP(6),
                    borderRadius: WP(3),
                }}
            >
                {options.drawerIcon && (
                    <View style={{}}>
                        {React.cloneElement(options.drawerIcon(), {
                            tintColor: isFocused
                                ? colors.white
                                : colors.secondary,
                        })}
                    </View>
                )}

                <Text
                    style={{
                        color: isFocused ? colors.white : colors.secondary,
                        fontSize: md,
                        fontFamily: OutfitRegular,
                    }}
                >
                    {options.drawerLabel}
                </Text>
            </TouchableOpacity>
        );
    };

    const Header = ({ routeName }: { routeName: string }) => {
        return (
            <LinearGradient
                colors={[colors.background, colors.card]}
                style={{
                    width: WP(100),
                    height: HP(8),
                    backgroundColor: colors.card,
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: WP(4),
                    borderBottomRightRadius: WP(4),
                    borderBottomLeftRadius: WP(4),
                    elevation: 8,
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: HP(3),
                        fontFamily: OutfitRegular,
                    }}
                >
                    {routeName}
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        navigation.dispatch(DrawerActions.openDrawer())
                    }
                    style={{
                        padding: WP(2),
                        borderRadius: WP(2),
                    }}
                >
                    <Animated.View>
                        <Image
                            source={require("@/src/assets/images/ui/icons-svg/menu-icon.svg")} //consider change the extension of the image.
                            style={{
                                height: HP(3),
                                aspectRatio: 1,
                                tintColor: colors.secondary,
                            }}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </LinearGradient>
        );
    };

    //-----------------------------------------------------------------------------------------------------------

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: showHeader,
                drawerStyle: {
                    backgroundColor: colors.background,
                    width: WP(70),
                    borderRightWidth: 1,
                    borderRightColor: colors.secondary,
                },
                header: (props) => (
                    <HomeHeader
                        title={routeName}
                        navigation={() =>
                            navigation.dispatch(DrawerActions.openDrawer())
                        }
                    />
                ),
            }}
            drawerContent={(props) => (
                <View
                    style={{
                        flex: 1,
                        padding: WP(4),
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ gap: HP(2) }}>
                        <TouchableOpacity style={{ marginTop: HP(10) }}>
                            <Image
                                source={require(`${photoRef}usericon-1.png`)}
                                style={{
                                    height: HP(15),
                                    aspectRatio: 1,
                                    borderRadius: WP(100),
                                    borderWidth: WP(1),
                                    borderColor: colors.primary,
                                }}
                            />
                        </TouchableOpacity>

                        {/* {---------------------------------------------------------------------------------------} */}

                        <View>
                            <Text
                                style={{
                                    fontFamily: OutfitBold,
                                    fontSize: HP(2.5),
                                    color: colors.text,
                                }}
                            >
                                {user?.firstName || "User Name"}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: OutfitRegular,
                                    fontSize: HP(2),
                                    color: colors.text,
                                    opacity: 0.8,
                                }}
                            >
                                {user?.email || "user@email.com"}
                            </Text>
                        </View>

                        <View>
                            {props.state.routeNames.map((v, i) =>
                                renderDrawerItem(props, v, i)
                            )}
                        </View>
                    </View>
                </View>
            )}
        >
            {featureScreens.map((v, i) => (
                <Drawer.Screen
                    key={i}
                    name={v.name as any}
                    options={{
                        drawerLabel: v.label,
                        drawerIcon: () => (
                            <Image
                                source={v.icon}
                                style={{ height: lg, aspectRatio: 1 }}
                            />
                        ),
                    }}
                >
                    {() => v.component as any}
                </Drawer.Screen>
            ))}
        </Drawer.Navigator>
    );
};

export default MainStack;
