import { View, Animated, Alert, Modal } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Gender from "../../../../../../components/screenComponents/getUserDetails/01-gender";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import GridBackground from "@/src/components/other/grid-background";
import BirthDate from "../../../../../../components/screenComponents/getUserDetails/02-birthdate";
import { OutfitRegular } from "@/src/hooks/useFonts";
import Height from "../../../../../../components/screenComponents/getUserDetails/03-height";
import Weight from "../../../../../../components/screenComponents/getUserDetails/04-weight";
import MainGoals from "../../../../../../components/screenComponents/getUserDetails/05-maingoals";
import FitnesLevel from "../../../../../../components/screenComponents/getUserDetails/06-fitnessLevel";
import Place from "../../../../../../components/screenComponents/getUserDetails/07-preferredPlace";
import RestDay from "../../../../../../components/screenComponents/getUserDetails/09-preferredRest";
import Equipments from "../../../../../../components/screenComponents/getUserDetails/08-equipment";
import Review from "../../../../../../components/screenComponents/getUserDetails/12-review";
import { useAuth } from "@/src/services/auth/authentication";
import Health from "../../../../../../components/screenComponents/getUserDetails/10-health";
import PreferredType from "../../../../../../components/screenComponents/getUserDetails/11-preferredWorkout";
import GeneratingScreen from "@/src/components/screenComponents/getUserDetails/generating";
import { UserProfileTypes } from "@/src/types/userTypes";

//------------------------------------------------------------------------------------

const GetDetails: React.FC = () => {
    const colors = useThemeColors();
    const [index, setIndex] = useState(0);
    const [YValue, setYvalue] = useState(0);
    const YOffset = useRef(new Animated.Value(0)).current;
    const { setUserDetails } = useAuth();
    const [loading, setLoading] = useState(false);

    //-----------------------------------------------------------------------------

    const [userProfile, setUserProfile] = useState<UserProfileTypes>({
        gender: "male",
        birthDate: {
            year: 2003,
            month: 7,
            day: 23,
        },
        height: {
            value: 167,
            unit: "cm",
        },
        weight: {
            value: 52,
            unit: "kg",
        },
    });
    const [fitnessGoal, setFitnessGoal] = useState("");
    const [fitnessLevel, setFitnessLevel] = useState("Sedentary");
    const [targetWeight, setTargetWeight] = useState({
        value: 54,
        unit: "kg",
    });

    const [equipment, setEquipment] = useState([
        "Equipment 1",
        "Equipment 2",
        "Equipment 3",
        "Equipment 4",
        "Equipment 5",
        "Equipment 6",
        "Equipment 7",
        "Equipment 8",
        "Equipment 9",
        "Equipment 10",
    ]);

    const [preferredTypes, setPreferredTypes] = useState([
        "Yoga",
        "Pilates",
        "Boxing",
        "CrossFit",
    ]);
    const [restDays, setRestDays] = useState(["Sunday", "Saturday"]);
    const [location, setLocation] = useState(["Home", "Gym", "Outdoor"]);
    const [healthConditions, setHealthConditions] = useState([
        "Diabetes",
        "Heart Disease",
    ]);

    const registration = async () => {
        setLoading(true);
        setTimeout(async () => {
            const res = await setUserDetails(
                userProfile,
                fitnessGoal,
                fitnessLevel,
                targetWeight,
                equipment,
                preferredTypes,
                restDays,
                location,
                healthConditions
            );
            if (res.success) {
                Alert.alert("Success!", "Workout plan created");
                setLoading(false);
            } else {
                Alert.alert("Error", "Registration Failed Please try again");
                setLoading(false);
            }
        }, 5000);
    };

    //---------------------------------------------------------------

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
        {
            label: "Main Goals",
            screen: (
                <MainGoals
                    setFitnessGoals={setFitnessGoal}
                    fitnessGoals={fitnessGoal}
                    YOffset={YOffset}
                    setIndex={setIndex}
                />
            ),
        },
        {
            label: "Fitness Level",
            screen: (
                <FitnesLevel
                    YOffset={YOffset}
                    setIndex={setIndex}
                    fitnessLevel={fitnessLevel}
                />
            ),
        },
        {
            label: "Place",
            screen: <Place YOffset={YOffset} setIndex={setIndex} />,
        },
        {
            label: "Equipment",
            screen: <Equipments YOffset={YOffset} setIndex={setIndex} />,
        },
        {
            label: "Rest Days",
            screen: <RestDay YOffset={YOffset} setIndex={setIndex} />,
        },
        {
            label: "Medical Conditions",
            screen: <Health YOffset={YOffset} setIndex={setIndex} />,
        },
        {
            label: "Workout Types",
            screen: <PreferredType YOffset={YOffset} setIndex={setIndex} />,
        },
        {
            label: "Review",
            screen: (
                <Review
                    YOffset={YOffset}
                    setIndex={setIndex}
                    registration={registration}
                    userProfile={userProfile}
                    fitnessGoal={fitnessGoal}
                    fitnessLevel={fitnessLevel}
                    targetWeight={targetWeight}
                    equipment={equipment}
                    preferredTypes={preferredTypes}
                    restDays={restDays}
                    location={location}
                    healthConditions={healthConditions}
                />
            ),
        },
    ];

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: YOffset } } }],
        { useNativeDriver: false }
    );

    const backgroundMove = YOffset.interpolate({
        inputRange: [0, HP(100) * screens.length],
        outputRange: [0, screens.length * HP(80)],
        extrapolate: "clamp",
    });

    const progressBar = YOffset.interpolate({
        inputRange: [0, HP(100) * (screens.length - 1)],
        outputRange: [0, HP(80)],
        extrapolate: "clamp",
    });

    useEffect(() => {
        const listenerId = YOffset.addListener(({ value }) => {
            // console.log("YOffset Value:", value);
            setYvalue(value);
        });

        return () => {
            YOffset.removeListener(listenerId);
        };
    }, []);

    return (
        <View
            style={{
                backgroundColor: colors.background,
                height: HP(100),
            }}
        >
            <View
                style={{
                    position: "absolute",
                    top: HP(5),
                    right: WP(2),
                    flexDirection: "row",
                    zIndex: 5,
                    pointerEvents: "none",
                }}
            >
                <View
                    style={{
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                    }}
                >
                    {screens.map((v: any, i: number) => {
                        const changeColor = (i: number) => {
                            return YOffset.interpolate({
                                inputRange: [HP(100) * (i - 1), HP(100) * i], // When to change color
                                outputRange: [colors.card, colors.success], // Transition colors
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
                                    fontSize: HP(1),
                                    letterSpacing: i + 1 < 10 ? 0 : 1,
                                    textAlign: "left",
                                    width: WP(6),
                                }}
                            >
                                {i + 1 < 10 ? `0${i + 1}` : `${i + 1}`} —
                            </Animated.Text>
                        );
                    })}
                </View>
                <View
                    style={{
                        height: HP(80),
                        width: WP(0.1),
                        borderRadius: WP(100),
                        backgroundColor: colors.card,
                    }}
                >
                    <Animated.View
                        style={{
                            width: WP(0.5),
                            height: progressBar,
                            backgroundColor: colors.success,
                            borderRadius: WP(100),
                        }}
                    />
                </View>
            </View>

            <Modal visible={loading}>
                <GridBackground zIndex={0} />
                <GeneratingScreen />
            </Modal>

            <Animated.ScrollView
                onScroll={handleScroll}
                showsVerticalScrollIndicator={false}
                snapToInterval={HP(100)}
                contentContainerStyle={{ width: WP(100) }}
            >
                {screens?.map(
                    (v, i) =>
                        i <= index && (
                            <View key={i} style={{ height: HP(100) }}>
                                {v.screen}
                                {i < 3 && ( // Hide backgrounds progressively
                                    <Animated.View
                                        style={{
                                            position: "absolute",
                                            pointerEvents: "none",
                                            transform: [
                                                {
                                                    translateY: backgroundMove,
                                                },
                                            ],
                                            zIndex: -1,
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
