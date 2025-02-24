// import GradientText from "@/src/components/screen/gradientText";
import SingleButton from "@/src/components/buttons/single-button";
import Input80percent from "@/src/components/input/input-80";
import PasswordInput85percent from "@/src/components/input/passwordInput-80";
import GradientText from "@/src/components/other/gradientText";
import ScrollableInput from "@/src/components/other/scrollableInput";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import Styles from "@/src/styles/styles";
import { NavigationProp } from "@react-navigation/native";
import { Image } from "expo-image";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Import
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { AuthStackParamList } from "../../../navigation/type";
import LinkText from "@/src/components/buttons/linkText";
import GridBackground from "@/src/components/other/grid-background";

type SignUpProps = NativeStackNavigationProp<AuthStackParamList, "SignUp">;

const SignUp: React.FC = () => {
    const colors = useThemeColors();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isHidden, setIsHidden] = useState(true);
    const navigation = useNavigation<SignUpProps>(); // Correctly typed

    const handleSignUp = () => {
        navigation.navigate("Details");
    };

    const items = [
        {
            placeholder: "First Name",
            value: firstName,
            setValue: setFirstName,
            maxLength: 20,
            secure: false,
            icon: "face-man-profile",
        },
        {
            placeholder: "Last Name",
            value: lastName,
            setValue: setLastName,
            maxLength: 20,
            secure: false,
            icon: "face-man-profile",
        },
        {
            placeholder: "Password",
            value: password,
            setValue: setPassword,
            maxLength: 32,
            secure: true,
        },
        {
            placeholder: "Confirm Password",
            value: conPassword,
            setValue: setConPassword,
            maxLength: 32,
            secure: true,
        },
        {
            placeholder: "Email",
            value: email,
            setValue: setEmail,
            maxLength: 20,
            secure: false,
            icon: "email-outline",
        },
    ];

    console.log("Sign up");

    return (
        <View style={{ flex: 1 }}>
            <GridBackground zIndex={0} />
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
                            fontSize: HP(5),
                            fontFamily: OutfitBold,
                            marginTop: HP(25),
                            zIndex: 2,
                        }}
                        text={"Sign Up"}
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
                            <Input80percent
                                key={i}
                                value={v.value}
                                setValue={v.setValue}
                                placeholder={v.placeholder}
                                maxLength={v.maxLength}
                                icon={v.icon}
                            />
                        )
                    )}

                    <SingleButton onPress={handleSignUp} color={colors.primary}>
                        <Text
                            style={{
                                color: colors.white,
                                fontFamily: OutfitBold,
                                fontSize: HP(2),
                            }}
                        >
                            Sign Up
                        </Text>
                    </SingleButton>
                    <LinkText
                        text1="Already have account?"
                        text2="Login"
                        navigate={() => navigation.navigate("Login")}
                    />
                </View>
            </ScrollableInput>
        </View>
    );
};

export default SignUp;
