import RecommendedExercises from "@/src/components/screenComponents/mainExercise/recommendedExercises";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitRegular } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Text, View } from "react-native";

interface homeProps {
    navigation: any;
}
const MainExercise: React.FC<homeProps> = (nagivation) => {
    const colors = useThemeColors();

    return (
        <View
            style={{
                backgroundColor: colors.background,
                height: HP(100),
            }}
        >
            <View style={{ padding: WP(4) }}>
                <Text
                    style={{
                        color: colors.text,
                        fontSize: HP(2),
                        fontFamily: OutfitRegular,
                    }}
                >
                    My Exercise Today:
                </Text>
            </View>
            <RecommendedExercises />
        </View>
    );
};
export default MainExercise;
