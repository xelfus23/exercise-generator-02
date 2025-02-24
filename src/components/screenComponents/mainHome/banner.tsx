import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useAuth } from "@/src/services/auth/authentication";
import { Text, View } from "react-native";
import GradientText from "../../other/gradientText";

const Banner: React.FC = () => {
    const colors = useThemeColors();
    const { user } = useAuth();
    console.log(user);

    return (
        <View style={{ padding: WP(8), width: WP(100) }}>
            <View
                style={{
                    flexDirection: "row",
                    gap: WP(2),
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontFamily: OutfitRegular,
                        fontSize: HP(3),
                    }}
                >
                    Hello
                </Text>
                <GradientText
                    colors={[colors.primary, colors.primary]}
                    text={`${user?.firstName} ${user?.lastName}`}
                    style={{
                        color: colors.primary,
                        fontSize: HP(4),
                        fontFamily: OutfitBold,
                    }}
                />
            </View>
        </View>
    );
};

export default Banner;
