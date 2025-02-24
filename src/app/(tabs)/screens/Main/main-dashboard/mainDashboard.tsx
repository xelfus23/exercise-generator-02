import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Text, View } from "react-native";

interface homeProps {
    navigation: any;
}
const MainDashboard: React.FC<homeProps> = () => {
    const colors = useThemeColors();
    return (
        <View
            style={{
                backgroundColor: colors.background,
                height: HP(100),
                alignItems: "center",
            }}
        ></View>
    );
};
export default MainDashboard;
