import SingleButton from "@/src/components/buttons/single-button";
import Input85percent from "@/src/components/input/input-80";
import PasswordInput85percent from "@/src/components/input/passwordInput-80";
import GradientText from "@/src/components/other/gradientText";
import ScrollableInput from "@/src/components/other/scrollableInput";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { md, OutfitBold, xxxl } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import {
    AuthStackParamList,
    HomeStackParamList,
} from "../../../../../types/stackType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Import
import { useNavigation } from "expo-router";
import LinkText from "@/src/components/buttons/linkText";
import { useAuth } from "@/src/services/auth/authentication";
type LoginProps = NativeStackNavigationProp<AuthStackParamList, "Login">;

const Login: React.FC = () => {
    const navigation = useNavigation<LoginProps>();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isHidden, setIsHidden] = useState(true);
    const colors = useThemeColors();
    const items = [
        {
            placeholder: "Email",
            value: email,
            setValue: setEmail,
            maxLength: 30,
            secure: false,
            icon: "email-outline",
        },
        {
            placeholder: "Password",
            value: password,
            setValue: setPassword,
            maxLength: 32,
            secure: true,
        },
    ];

    const handleLogin = async () => {
        try {
            const res = await login("Patato", "potato123");
            if (res.success) {
                console.log("Login success");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    position: "absolute",
                    zIndex: 1,
                    pointerEvents: "none",
                }}
            >
                <LinearGradient
                    colors={[
                        colors.background,
                        "transparent",
                        colors.background,
                    ]}
                    style={{
                        zIndex: 2,
                        position: "absolute",
                        height: HP(100),
                        width: WP(100),
                    }}
                />
                <Image
                    source={require("@/src/assets/images/ui/background/grid-full.png")}
                    contentPosition={"center"}
                    contentFit="fill"
                    style={{
                        opacity: 0.3,
                        height: HP(100),
                        width: WP(100),
                        tintColor: colors.primary,
                        zIndex: 1,
                    }}
                />
            </View>
            <ScrollableInput zIndex={2}>
                <View
                    style={{
                        width: WP(100),
                        alignItems: "center",
                        gap: HP(2),
                        paddingBottom: HP(5), // ADD:  Give some space at the bottom
                    }}
                >
                    <GradientText
                        style={{
                            fontSize: xxxl,
                            fontFamily: OutfitBold,
                            marginTop: HP(25),
                            zIndex: 2,
                        }}
                        text={"Login"}
                        colors={[colors.primary, colors.primary]}
                    />
                    {items.map((v, i) =>
                        v.secure ? (
                            <PasswordInput85percent
                                key={i}
                                value={v.value}
                                setValue={v.setValue}
                                placeholder={v.placeholder}
                                maxLength={v.maxLength}
                                secure={v.secure}
                                setIsHidden={setIsHidden}
                                isHidden={isHidden}
                            />
                        ) : (
                            <Input85percent
                                key={i}
                                value={v.value}
                                setValue={v.setValue}
                                placeholder={v.placeholder}
                                maxLength={v.maxLength}
                                icon={v.icon}
                            />
                        )
                    )}
                    <SingleButton
                        loading={false}
                        style={{}}
                        onPress={handleLogin}
                        color={colors.primary}
                    >
                        <Text
                            style={{
                                color: colors.white,
                                fontFamily: OutfitBold,
                                fontSize: md,
                            }}
                        >
                            Login
                        </Text>
                    </SingleButton>

                    <LinkText
                        text1="Don't have account?"
                        text2="Signup"
                        navigate={() => navigation.navigate("SignUp")}
                    />
                </View>
            </ScrollableInput>
        </View>
    );
};

export default Login;
