import {
    View,
    ScrollView,
    Modal,
    Alert,
    StatusBar,
    Animated,
    Text,
    useColorScheme,
    SafeAreaView,
} from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";

import { Image } from "expo-image";
import Gender from "./screens/01-gender";
import { LinearGradient } from "expo-linear-gradient";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import GridBackground from "@/src/components/other/grid-background";
import BirthDate from "./screens/02-birthdate";
import { OutfitRegular } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import Height from "./screens/04-height";
import Weight from "./screens/05-weight";

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const GetDetails: React.FC = () => {
    const colors = useThemeColors();
    const [index, setIndex] = useState(0);
    const YOffset = useRef(new Animated.Value(0)).current;
    const progress = useRef<Animated.Value>(new Animated.Value(0)).current;

    //---------------------------------------------------------------------------------------------------------------

    const [userProfile, setUserProfile] = useState({
        gender: "",
        birthDate: {
            year: 0,
            month: 0,
            day: 0,
        },
        height: {
            value: 0,
            unit: "cm",
        },
        weight: {
            value: 0,
            unit: "kg",
        },
    });

    const [fitnessLevel, setFitnessLevel] = useState("");
    const [fitnessGoal, setFitnessGoal] = useState({
        primaryGoal: "",
        secondaryGoals: [],
    });
    const [targetWeight, setTargetWeight] = useState({
        value: 0,
        unit: "kg",
    });
    const [equipment, setEquipment] = useState([]);
    const [preferredTypes, setPreferredTypes] = useState([]);
    const [restDays, setRestDays] = useState([]);
    const [location, setLocation] = useState([]);
    const [healthConditions, setHealthConditions] = useState([]);
    const [progressVal, setProgressVal] = useState(0);

    //---------------------------------------------------------------------------------------------------------------

    const screens = [
        {
            label: "Gender",
            screen: (
                <Gender
                    gender={userProfile.gender}
                    setUserProfile={setUserProfile}
                    YOffset={YOffset}
                    setIndex={setIndex}
                />
            ),
        },

        {
            label: "Birth Date",
            screen: (
                <BirthDate
                    setUserProfile={setUserProfile}
                    birthDate={userProfile.birthDate}
                    YOffset={YOffset}
                    setIndex={setIndex}
                />
            ),
        },
        {
            label: "Height",
            screen: (
                <Height
                    setUserProfile={setUserProfile}
                    height={userProfile.height}
                    YOffset={YOffset}
                    setIndex={setIndex}
                />
            ),
        },
        {
            label: "Weight",
            screen: (
                <Weight
                    setUserProfile={setUserProfile}
                    weight={userProfile.weight}
                    YOffset={YOffset}
                    setIndex={setIndex}
                />
            ),
        },
    ];

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: YOffset } } }],
        { useNativeDriver: false }
    );

    const backgroundMove = YOffset.interpolate({
        inputRange: [0, 8000],
        outputRange: [0, 6000],
        extrapolate: "clamp",
    });

    const progressBar = YOffset.interpolate({
        inputRange: [0, HP(100) * (screens.length - 1)],
        outputRange: [0, HP(80)],
        extrapolate: "clamp",
    });

    return (
        <View
            style={{
                backgroundColor: colors.background,
                flex: 1,
                alignItems: "center",
            }}
        >
            <View
                style={{
                    position: "absolute",
                    top: HP(5),
                    right: WP(2),
                    flexDirection: "row",
                    zIndex: 5,
                }}
            >
                <View
                    style={{
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                    }}
                >
                    {screens.map((v, i) => {
                        const changeColor = (i: number) => {
                            return YOffset.interpolate({
                                inputRange: [HP(100) * (i - 1), HP(100) * i], // When to change color
                                outputRange: [colors.secondary, colors.success], // Transition colors
                                extrapolate: "clamp",
                            });
                        };
                        const labelColor = changeColor(i); // Get interpolated color

                        return (
                            <Animated.Text
                                key={i}
                                style={{
                                    color: labelColor, // Use the interpolated value
                                    fontFamily: OutfitRegular,
                                    fontSize: HP(1.2),
                                }}
                            >
                                {v.label} —
                            </Animated.Text>
                        );
                    })}
                </View>
                <View
                    style={{
                        height: HP(80),
                        width: WP(1),
                        borderRadius: WP(100),
                        backgroundColor: colors.card,
                    }}
                >
                    <Animated.View
                        style={{
                            width: WP(1),
                            height: progressBar,
                            backgroundColor: colors.success,
                            borderRadius: WP(100),
                        }}
                    ></Animated.View>
                </View>
            </View>
            <Animated.ScrollView
                onScroll={handleScroll}
                decelerationRate={0.998}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{ height: HP(100) }}
            >
                {screens?.map(
                    (v, i) =>
                        i <= index && (
                            <View key={i} style={{}}>
                                <View style={{ zIndex: 1, height: HP(100) }}>
                                    {v.screen}
                                </View>
                                {i < 3 && (
                                    <Animated.View
                                        style={{
                                            position: "absolute",
                                            pointerEvents: "none",
                                            transform: [
                                                { translateY: backgroundMove },
                                            ],
                                            zIndex: 0,
                                        }}
                                    >
                                        <GridBackground zIndex={0} />
                                    </Animated.View>
                                )}
                            </View>
                        )
                )}
            </Animated.ScrollView>
        </View>
    );
};

export default GetDetails;
