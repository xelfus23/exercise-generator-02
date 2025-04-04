// In ExerciseScreen.tsx
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ExerciseScreenParams } from "@/src/app/(tabs)/navigation/type"; // Import your type
import { RouteProp } from "@react-navigation/native";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import HomeHeader from "@/src/components/header/homeHeader";
import { useNavigation } from "expo-router";
import HexToHexa from "@/src/hooks/useHexa";
import {
    ColorFormat,
    CountdownCircleTimer,
} from "react-native-countdown-circle-timer";
import { Feather, Ionicons } from "@expo/vector-icons";
import ChatHeader from "@/src/components/header/chatHeader";
import { LinearGradient } from "expo-linear-gradient";
import { lg, md, OutfitRegular, xl, xxl } from "@/src/hooks/useFonts";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import DoubleButton from "@/src/components/buttons/double-button";

// Define a type for the route
type ExerciseScreenRouteProp = RouteProp<
    { exerciseScreen: ExerciseScreenParams }, // StackParamList
    "exerciseScreen" // RouteName
>;

interface Props {
    setTabBarVisible: (v: boolean) => void;
    setShowHeader: (v: boolean) => void;
}

const ExerciseScreen: React.FC<Props> = ({
    setTabBarVisible,
    setShowHeader,
}) => {
    const route = useRoute<ExerciseScreenRouteProp>();
    const { item, sets, value } = route.params;
    const colors = useThemeColors();
    const exercise = item;
    const navigation = useNavigation();
    const restTime = 10;
    const getReady = 10;
    const [phase, setPhase] = useState("Get Ready");
    const [currentSet, setCurrentSet] = useState(1);
    const [animationFrame, setAnimationFrame] = useState([]);
    const [timer, setTimer] = useState(0);
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const animationInterval = useRef<any>(null); // Use useRef to hold the interval ID
    const [isModalVisible, setIsModalVisible] = useState(false);

    const idleFrames = [
        require("@/src/assets/images/ui/exercises/idle/idle-01.svg"),
        require("@/src/assets/images/ui/exercises/idle/idle-02.svg"),
        require("@/src/assets/images/ui/exercises/idle/idle-03.svg"),
        require("@/src/assets/images/ui/exercises/idle/idle-04.svg"),
        require("@/src/assets/images/ui/exercises/idle/idle-05.svg"),
        require("@/src/assets/images/ui/exercises/idle/idle-06.svg"),
    ] as any;

    useEffect(() => {
        setTabBarVisible && setTabBarVisible(false);
        setShowHeader && setShowHeader(false);
        return () => {
            setTabBarVisible && setTabBarVisible(true);
            setShowHeader && setShowHeader(true);
        };
    }, [setTabBarVisible, setShowHeader]);

    const handleBackPress = () => {
        setTabBarVisible(true);
        setShowHeader(true);
        navigation.goBack();
    };

    const handlePhaseChange = () => {
        if (phase === "Get Ready") {
            setCurrentFrameIndex(0);
            setPhase("Exercise");
            setAnimationFrame(item.exercise.animation);
            console.log("Phase", phase);
        } else if (phase === "Exercise") {
            setCurrentFrameIndex(0);
            if (currentSet < sets) {
                setPhase("Rest");
                setAnimationFrame(idleFrames);
                console.log("Phase", phase);
            } else {
                setAnimationFrame(idleFrames);
                setPhase("Done");
                console.log("Phase", phase);
            }
        } else if (phase === "Rest") {
            setCurrentFrameIndex(0);
            setPhase("Exercise");
            setAnimationFrame(item.exercise.animation);
            console.log("Phase: ", phase);
            setCurrentSet((prev) => prev + 1);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}`;
    };

    useEffect(() => {
        if (!isModalVisible) {
            animationInterval.current = setInterval(() => {
                setCurrentFrameIndex((prevIndex) => (prevIndex + 1) % 6);
            }, 166);

            if (phase === "Get Ready") {
                setAnimationFrame(idleFrames);
            } else if (phase === "Exercise") {
                setAnimationFrame(item.exercise.animation);
            } else if (phase === "Rest") {
                setAnimationFrame(idleFrames);
            } else {
                setAnimationFrame(idleFrames);
            }

            return () => {
                clearInterval(animationInterval.current);
            };
        }
    }, [item.exercise.animation.length, isModalVisible]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
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
                    gap: WP(4),
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: HP(3),
                        fontFamily: OutfitRegular,
                    }}
                >
                    {exercise.exercise.name}
                </Text>
            </LinearGradient>

            <View
                style={{
                    alignItems: "center",
                    marginTop: HP(15),
                }}
            >
                <Text
                    style={{
                        fontSize: HP(3),
                        color: colors.text,
                        marginTop: HP(2),
                    }}
                >
                    {phase === "Get Ready" && `Get Ready in`}{" "}
                    {phase === "Get Ready" && (
                        <Text
                            style={{
                                color: colors.primary,
                                fontWeight: "bold",
                            }}
                        >
                            {timer}
                        </Text>
                    )}
                    {phase === "Exercise" &&
                        `Set number ${currentSet}`}
                    {phase === "Rest" && "Take a Rest!"}
                </Text>
                <View
                    style={{
                        width: "80%",
                        aspectRatio: 1,
                        borderRadius: WP(2),
                    }}
                >
                    <Image
                        source={animationFrame[currentFrameIndex]}
                        style={{
                            flex: 1,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        }}
                        contentFit="contain"
                        contentPosition={"center"}
                    />
                </View>
            </View>

            {/* {phase === "Done" && (
                <View
                    style={{
                        height: HP(50),
                        aspectRatio: 1,
                        pointerEvents: "none",
                        zIndex: 100,
                        position: "absolute",
                        borderWidth: 1,
                        top: HP(10),
                    }}
                >
                    <LottieView
                        source={require("@/src/assets/json/confetti.json")}
                        autoPlay={true}
                        loop
                        style={{ flex: 1, zIndex: 1000 }}
                    />
                </View>
            )} */}

            {phase !== "Done" ? (
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        alignItems: "center",
                        gap: HP(8),
                    }}
                >
                    {phase === "Get Ready" ||
                    phase === "Rest" ||
                    exercise?.exercise?.type === "duration" ? (
                        <View
                            style={{
                                position: "absolute",
                                bottom: HP(4),
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                flexDirection: "row",
                            }}
                        >
                            <Modal visible={isModalVisible} transparent>
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: HP(4),
                                        backgroundColor: HexToHexa({
                                            hex: colors.background,
                                            alpha: 0.9,
                                        }),
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: colors.text,
                                            fontSize: lg,
                                            fontFamily: OutfitRegular,
                                        }}
                                    >
                                        Are you sure you want to give up?
                                    </Text>

                                    <View>
                                        <DoubleButton
                                            leftText="No"
                                            rightText="Yes"
                                            onPressLeft={() =>
                                                setIsModalVisible(false)
                                            }
                                            onPressRight={() => {
                                                setIsModalVisible(false);
                                                navigation.goBack();
                                            }}
                                        />
                                    </View>
                                </View>
                            </Modal>
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(true)}
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={HP(8)}
                                    color={colors.error}
                                />
                            </TouchableOpacity>
                            <View style={{}}>
                                <CountdownCircleTimer
                                    key={`${phase}-${currentSet}`}
                                    isPlaying={!isModalVisible}
                                    duration={
                                        phase === "Get Ready"
                                            ? getReady
                                            : phase === "Exercise"
                                            ? value
                                            : restTime
                                    }
                                    onComplete={
                                        phase === "Get Ready"
                                            ? handlePhaseChange
                                            : phase === "Exercise"
                                            ? handlePhaseChange
                                            : phase === "Rest"
                                            ? handlePhaseChange
                                            : phase === "Done"
                                            ? handlePhaseChange
                                            : handlePhaseChange
                                    }
                                    colors={
                                        [
                                            colors.primary,
                                            colors.secondary,
                                            colors.success,
                                        ] as any
                                    }
                                    trailColor={
                                        colors.secondaryLight as ColorFormat
                                    }
                                    colorsTime={[10, 5, 0]}
                                    onUpdate={(time) => setTimer(time)}
                                    size={HP(15)}
                                    strokeWidth={WP(2)}
                                >
                                    {({ remainingTime }) => (
                                        <Text
                                            style={{
                                                color: colors.text,
                                                fontSize: HP(3),
                                            }}
                                        >
                                            {formatTime(remainingTime)}
                                        </Text>
                                    )}
                                </CountdownCircleTimer>
                            </View>
                            <TouchableOpacity
                                onPress={handlePhaseChange}
                                accessibilityLabel="Skip to Next Phase"
                                disabled={phase === "Exercise"}
                            >
                                <Ionicons
                                    name="arrow-forward"
                                    size={HP(8)}
                                    color={
                                        phase !== "Exercise"
                                            ? colors.success
                                            : colors.secondary
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View
                            style={{
                                gap: HP(5),
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: WP(2),
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: HP(3),
                                        color: colors.text,
                                    }}
                                >
                                    {exercise?.exercise?.name || "Exercise"}
                                </Text>

                                <Text
                                    style={{
                                        color: colors.primary,
                                        fontSize: HP(3),
                                    }}
                                >
                                    {value}x
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    padding: WP(1),
                                    backgroundColor: colors.primary,
                                    borderRadius: WP(4),
                                    borderColor: colors.primary,
                                    borderWidth: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: WP(80),
                                }}
                                onPress={handlePhaseChange}
                            >
                                <Text
                                    style={{
                                        color: colors.white,
                                        fontSize: HP(2),
                                        padding: WP(3),
                                        fontWeight: "bold",
                                    }}
                                >
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            ) : (
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            padding: WP(1),
                            backgroundColor: colors.primary,
                            borderRadius: WP(4),
                            alignItems: "center",
                            justifyContent: "center",
                            width: WP(70),
                        }}
                        accessibilityLabel="Mark Routine as Done"
                        onPress={handleBackPress}
                    >
                        <Text
                            style={{
                                color: colors.white,
                                fontSize: HP(2),
                                fontWeight: "bold",
                                padding: WP(3),
                            }}
                        >
                            Complete
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default ExerciseScreen;
