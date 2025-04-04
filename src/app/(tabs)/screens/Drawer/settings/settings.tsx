import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { md, OutfitRegular, xl } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useAuth } from "@/src/services/auth/authentication";
import { Image } from "expo-image";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
interface props {
    setRouteName: (v: string) => void;
    setShowHeader: (v: boolean) => void;
}
const Settigs: React.FC<props> = ({ setRouteName, setShowHeader }) => {
    useFocusEffect(
        useCallback(() => {
            setRouteName("Settings");
        }, [])
    );

    const navigation = useNavigation<any>();
    const colors = useThemeColors();
    const { logout } = useAuth();
    const ref = "@/src/assets/images/ui/icons-svg/";

    const userSettings = [
        {
            label: "Profile",
            navigation: () => navigation.navigate("profile"),
            icon: require(`${ref}profile-icon.svg`),
        },
        {
            label: "Security",
            navigation: () => navigation.navigate("security"),
            icon: require(`${ref}security-icon.svg`),
        },
    ];

    const appSettings = [
        {
            label: "Notifications",
            navigation: () => navigation.navigate("notifications"),
            icon: require(`${ref}notification-icon.svg`),
        },
        // {
        //     label: "Help & Support",
        //     navigation: () => navigation.navigate("helpSupport"),
        //     // icon: require(`${ref}help-icon.svg`),
        // },
    ];

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: WP(4), gap: HP(2) }}>
                <Text
                    style={{
                        fontSize: md,
                        fontFamily: OutfitRegular,
                        color: colors.text,
                    }}
                >
                    User Settings
                </Text>
                <View style={{ gap: HP(1) }}>
                    {userSettings.map((set, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                backgroundColor: HexToHexa({
                                    alpha: 0.2,
                                    hex: colors.secondary,
                                }),
                                borderRadius: WP(2),
                                padding: WP(4),
                                flexDirection: "row",
                                gap: WP(4),
                                alignItems: "center",
                            }}
                            onPress={set.navigation}
                        >
                            <View style={{ height: HP(3), aspectRatio: 1 }}>
                                <Image
                                    source={set.icon}
                                    style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        tintColor: colors.text,
                                    }}
                                />
                            </View>
                            <Text style={{ color: colors.text, fontSize: md }}>
                                {set.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text
                    style={{
                        fontSize: md,
                        fontFamily: OutfitRegular,
                        color: colors.text,
                    }}
                >
                    App Settings
                </Text>
                <View style={{ gap: HP(1) }}>
                    {appSettings.map((set, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                backgroundColor: HexToHexa({
                                    alpha: 0.2,
                                    hex: colors.secondary,
                                }),
                                borderRadius: WP(2),
                                padding: WP(4),
                                flexDirection: "row",
                                gap: WP(4),
                                alignItems: "center",
                            }}
                            onPress={set.navigation}
                        >
                            <View style={{ height: HP(3), aspectRatio: 1 }}>
                                <Image
                                    source={set.icon}
                                    style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        tintColor: colors.text,
                                    }}
                                />
                            </View>
                            <Text style={{ color: colors.text, fontSize: md }}>
                                {set.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: HexToHexa({
                            alpha: 1,
                            hex: colors.error,
                        }),
                        borderRadius: WP(2),
                        padding: WP(4),
                        flexDirection: "row",
                        gap: WP(4),
                        alignItems: "center",
                    }}
                    onPress={logout}
                >
                    <View style={{ height: HP(3), aspectRatio: 1 }}>
                        <Image
                            source={require(`${ref}logout-icon.svg`)}
                            style={{
                                flex: 1,
                                aspectRatio: 1,
                                tintColor: colors.text,
                            }}
                        />
                    </View>
                    <Text style={{ color: colors.text, fontSize: md }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Settigs;
