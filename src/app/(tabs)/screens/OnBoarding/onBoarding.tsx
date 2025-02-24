import { ScrollView, Text, useColorScheme, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { WP, HP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { useRef, useState } from "react";
import WelcomeScreen1 from "./welcomeScreen1";
import WelcomeScreen2 from "./welcomeScreen2";
import { useNavigation } from "expo-router";

const OnBoarding: React.FC = () => {
    const navigator = useNavigation();
    const colors = useThemeColors();
    const scrollViewRef = useRef<ScrollView>(null);
    const [screenIndex, setScreenIndex] = useState(0);

    const handleScroll = (screenIndex: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: WP(100) });
        }
        setScreenIndex(screenIndex);
    };

    console.log("ONboarding");

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ position: "absolute", zIndex: 0 }}>
                <LinearGradient
                    colors={[
                        colors.background,
                        colors.background,
                        "transparent",
                    ]}
                    start={[0, 0]}
                    end={[0, 1]} //  Transition to transparent starts earlier
                    style={[
                        {
                            position: "absolute",
                            width: "100%",
                            zIndex: 2, // Gradients on top of the image
                            top: 0,
                            height: HP(50),
                        },
                    ]}
                />
                <LinearGradient
                    colors={[
                        "transparent",
                        colors.background,
                        colors.background,
                    ]}
                    start={[0, 0]}
                    end={[0, 1]}
                    style={{
                        position: "absolute",
                        width: "100%",
                        zIndex: 2, // Gradients on top of the image
                        bottom: 0,
                        height: HP(50),
                    }} // 40% of screen height
                />
                <Image
                    source={require("@/src/assets/images/ui/background/grid-full.png")}
                    contentPosition={"center"}
                    contentFit="fill"
                    style={{
                        opacity: 0.2,
                        height: HP(100),
                        width: WP(100),
                        tintColor: colors.primary,
                        zIndex: 1,
                    }}
                />
            </View>
            <ScrollView
                ref={scrollViewRef}
                style={{ flex: 1 }}
                bounces={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToInterval={WP(100)}
                pagingEnabled={true}
                decelerationRate={0.8}
                scrollEnabled={false}
            >
                <WelcomeScreen1
                    navigator={navigator}
                    handleScroll={handleScroll}
                    screenIndex={screenIndex}
                />
                <WelcomeScreen2
                    navigator={navigator}
                    handleScroll={handleScroll}
                    screenIndex={screenIndex}
                />
            </ScrollView>
        </View>
    );
};

export default OnBoarding;
