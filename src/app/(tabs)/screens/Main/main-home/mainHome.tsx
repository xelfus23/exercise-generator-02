import HomeHeader from "@/src/components/header/homeHeader";
import Banner from "@/src/components/screenComponents/mainHome/banner";
import PromptInput from "@/src/components/screenComponents/mainHome/promptInput";
import { HP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { Text, View } from "react-native";

interface homeProps {
    navigation: any;
}
const MainHome: React.FC<homeProps> = (nagivation) => {
    const colors = useThemeColors();

    return (
        <View
            style={{
                backgroundColor: colors.background,
                flex: 1,
                alignItems: "center",
            }}
        >
            <Banner />
            <PromptInput />
            
        </View>
    );
};
export default MainHome;
