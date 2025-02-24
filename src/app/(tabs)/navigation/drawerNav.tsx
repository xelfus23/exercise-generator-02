import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./bottomTabNav";
import { DrawerStackParamList } from "./type";
import Settings from "../screens/Drawer/settings/settings";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import HexToHexa from "@/src/hooks/useHexa";
import React from "react";
import { Image } from "expo-image";
import { useAuth } from "@/src/services/auth/authentication";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import ChatStack from "./chatStackNav";
import Notification from "../screens/Drawer/notification/notification";

const MainStack: React.FC = () => {
    const Drawer = createDrawerNavigator<DrawerStackParamList>();
    const { user, logout } = useAuth();

    const colors = useThemeColors();

    const photoRef = "@/src/assets/images/ui/photos/";
    const iconRef = "@/src/assets/images/ui/icons/";

    const featureScreens = [
        {
            name: "HomeDrawer",
            component: HomeStack,
            label: "Home",
            icon: require(`${iconRef}home-icon.svg`),
        },
        {
            name: "ChatDrawer",
            component: ChatStack,
            label: "Chats",
            icon: require(`${iconRef}chat-icon.svg`),
        },
        {
            name: "NotificationDrawer",
            component: Notification,
            label: "Notifications",
            icon: require(`${iconRef}notification-icon.svg`),
        },
        {
            name: "SettingsDrawer",
            component: Settings,
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
                    borderRadius: WP(4),
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

                <View
                    style={{
                        height: "40%",
                        width: 2,
                        backgroundColor: isFocused
                            ? colors.white
                            : colors.secondary,
                        borderRadius: WP(100),
                    }}
                />

                <Text
                    style={{
                        color: isFocused ? colors.white : colors.secondary,
                        fontSize: HP(2),
                        fontFamily: OutfitRegular,
                    }}
                >
                    {options.drawerLabel}
                </Text>
            </TouchableOpacity>
        );
    };

    //-----------------------------------------------------------------------------------------------------------

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: colors.background,
                    width: WP(70),
                    borderRightWidth: 1,
                    borderRightColor: colors.secondary,
                },
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

                    {/* {---------------------------------------------------------------------------------------} */}

                    <TouchableOpacity
                        onPress={logout}
                        style={{
                            flexDirection: "row",
                            gap: WP(4),
                            paddingHorizontal: WP(4),
                            alignItems: "center",
                            backgroundColor: colors.error,
                            borderRadius: WP(4),
                            height: HP(6),
                        }}
                    >
                        <View style={{}}>
                            <Image
                                source={require(`${iconRef}logout-icon.svg`)}
                                style={{
                                    height: HP(3),
                                    aspectRatio: 1,
                                    tintColor: colors.white,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                height: "40%",
                                width: 2,
                                backgroundColor: colors.white,
                                borderRadius: WP(100),
                            }}
                        />

                        <Text
                            style={{
                                color: colors.white,
                                fontSize: HP(2),
                                fontFamily: OutfitRegular,
                            }}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        >
            {featureScreens.map((v, i) => (
                <Drawer.Screen
                    key={i}
                    name={v.name as any}
                    component={v.component as any}
                    options={{
                        drawerLabel: v.label,
                        drawerIcon: () => (
                            <Image
                                source={v.icon}
                                style={{ height: HP(3), aspectRatio: 1 }}
                            />
                        ),
                    }}
                />
            ))}
        </Drawer.Navigator>
    );
};

export default MainStack;
