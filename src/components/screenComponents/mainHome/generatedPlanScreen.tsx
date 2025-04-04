import React, { useRef, useState, useEffect } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Animated,
} from "react-native";
import { WP, HP } from "@/src/hooks/useDeviceDimension";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import HexToHexa from "@/src/hooks/useHexa";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import ChatHeader from "../../header/chatHeader";

export default function GeneratedExerciseDescription({
    item,
    back,
    colors,
    setTabBar,
    setShowHeader,
}: {
    item: any;
    back: any;
    colors: any;
    setTabBar: any;
    setShowHeader: any;
}) {
    const [adding, setAdding] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setTabBar(false);
        setShowHeader(false);
        return () => {
            setTabBar(true);
            setShowHeader(true);
        };
    }, []);

    // const auth = getAuth();
    // const currentUser = auth.currentUser;

    const addTextAnim = useRef(new Animated.Value(WP(62))).current;
    const deleteTextAnim = useRef(new Animated.Value(0)).current;

    const animateText = (t: any) => {
        setIsAnimating(true);
        Animated.parallel([
            Animated.timing(deleteTextAnim, {
                toValue: t ? 0 : WP(62),
                duration: 500,
                useNativeDriver: false,
            }),
            Animated.timing(addTextAnim, {
                toValue: t ? WP(62) : 0,
                duration: 500,
                useNativeDriver: false,
            }),
        ]).start(() => {
            setIsAnimating(false);
        });
    };

    const onPressDelete = () => {
        animateText(false);
    };

    const onPressAdd = () => {
        animateText(true);
    };

    const addToPlan = async () => {
        setAdding(true);
        back();

        // try {
        //     const userDocRef = doc(db, "users", currentUser.uid);
        //     const subCollectionRef = collection(userDocRef, "exercisePlans");

        //     const noSubCollection = (await getDocs(subCollectionRef)).empty;

        //     if (noSubCollection) {
        //         return;
        //     } else {
        //         const querySnapshot = await getDocs(subCollectionRef);

        //         querySnapshot.docs.map(async (doc) => {
        //             const exercisePlans = doc.data().exercisePlans || [];

        //             await updateDoc(doc.ref, {
        //                 exercisePlans: [...exercisePlans, item],
        //             });

        //             const otherExercise = doc.data().otherExercise || [];
        //             console.log(otherExercise);
        //         });

        //         deleteExercise();
        //         updateUserData(currentUser.uid);
        //     }
        // } catch (error) {
        //     console.error("Error saving exercise data to Firestore:", error);
        // } finally {
        //     updateUserData(currentUser.uid);
        //     setAdding(false);
        // }
    };

    const deleteExercise = async () => {
        setDeleting(true);
        back();
        // try {
        //     const userDocRef = doc(db, "users", currentUser.uid);
        //     const subCollectionRef = collection(userDocRef, "exercisePlans");

        //     const querySnapshot = await getDocs(subCollectionRef);
        //     querySnapshot.docs.map(async (doc) => {
        //         const exercisePlans = doc.data().otherExercise || [];

        //         // Check if the exercise is in the plans
        //         if (exercisePlans.some((ex) => ex.title === item.title)) {
        //             await updateDoc(doc.ref, {
        //                 otherExercise: arrayRemove(item), // This will remove the exercise from the array
        //             });
        //         }
        //     });
        //     await updateUserData(currentUser.uid);
        // } catch (error) {
        //     console.error(
        //         "Error deleting exercise data from Firestore:",
        //         error
        //     );
        // } finally {
        //     setDeleting(false);
        //     back();
        // }
    };

    const getAllPlanExercise = (item: any) => {
        console.log(item.weeks?.length);
        item.weeks.map((v: any) => {
            // v.week.map((v2) => console.log(v2));
        });
    };

    useEffect(() => {
        getAllPlanExercise(item);
    }, [item]);

    return (
        <View style={{ flex: 1 }}>
            <ChatHeader
                title={item.planTitle}
                navigation={back}
                onChat={false}
            />
            <View
                style={{
                    position: "absolute",
                    zIndex: 0,
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
                        opacity: 0.2,
                        height: HP(100),
                        width: WP(100),
                        tintColor: colors.primary,
                        zIndex: 1,
                    }}
                />
            </View>
            <View
                style={{
                    padding: WP(4),
                    flexDirection: "row",
                    borderColor: colors.secondary,
                    position: "absolute",
                    justifyContent: "space-between",
                    width: WP(100),
                    bottom: 0,
                    zIndex: 2,
                }}
            >
                <View
                    style={{
                        backgroundColor: colors.error,
                        borderRadius: WP(4),
                        height: HP(6),
                        padding: WP(2),
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity onPress={onPressDelete}>
                        <Image
                            source={require("@/src/assets/images/ui/icons-png/trash-icon.png")}
                            style={{
                                width: WP(5),
                                aspectRatio: 1,
                                tintColor: colors.white,
                                margin: WP(2),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteExercise}>
                        <Animated.Text
                            style={{
                                borderColor: colors.white,
                                color: colors.white,
                                fontSize: HP(1.5),
                                textAlign: "center",
                                textAlignVertical: "center",
                                width: deleteTextAnim,
                                height: HP(2.5),
                                fontFamily: OutfitRegular,
                            }}
                            numberOfLines={1}
                            ellipsizeMode="clip" // Changed from "tail" to "clip"
                        >
                            Press to delete this plan
                        </Animated.Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        backgroundColor: colors.primary,
                        borderRadius: WP(4),
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        height: HP(6),
                        padding: WP(2),
                    }}
                >
                    <TouchableOpacity onPress={onPressAdd}>
                        <Image
                            source={require("@/src/assets/images/ui/icons-png/add-icon.png")}
                            style={{
                                width: WP(5),
                                aspectRatio: 1,
                                tintColor: colors.white,
                                margin: WP(2),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addToPlan}>
                        <Animated.Text
                            style={{
                                borderColor: colors.white,
                                color: colors.white,
                                fontSize: HP(1.5),
                                textAlign: "center",
                                textAlignVertical: "center",
                                width: addTextAnim,
                                height: HP(2.5),
                                overflow: "hidden", // Add this
                                fontFamily: OutfitRegular,
                            }}
                            ellipsizeMode="clip" // Changed from "tail" to "clip"
                            numberOfLines={1}
                        >
                            Add this to my plan
                        </Animated.Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View
                style={{
                    width: WP(100),
                    backgroundColor: HexToHexa({
                        hex: colors.secondary,
                        alpha: 0.2,
                    }),
                    paddingVertical: WP(4),
                    paddingHorizontal: WP(2),
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: HP(3),
                        fontFamily: OutfitBold,
                        textAlign: "center",
                    }}
                >
                    {item?.planTitle}
                </Text>
            </View> */}
            <ScrollView
                contentContainerStyle={{ paddingVertical: HP(2) }}
                showsVerticalScrollIndicator={false}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: HP(2),
                        paddingHorizontal: WP(4),
                        fontFamily: OutfitBold,
                    }}
                >
                    Description:
                </Text>
                <View
                    style={{
                        padding: WP(4),
                    }}
                >
                    <Text
                        style={{
                            color: colors.text,
                            opacity: 0.8,
                            fontSize: HP(1.8),
                            backgroundColor: HexToHexa({
                                hex: colors.secondary,
                                alpha: 0.2,
                            }),
                            padding: WP(4),
                            borderRadius: WP(4),
                            fontFamily: OutfitRegular,
                        }}
                    >
                        {item?.planDescription}
                    </Text>
                </View>

                <View
                    style={{
                        width: WP(100),
                    }}
                >
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: HP(2),
                            padding: WP(4),
                            fontFamily: OutfitBold,
                        }}
                    >
                        Objetives of this plan:
                    </Text>
                </View>
                {/* Objectives */}
                <View
                    style={{
                        gap: WP(2),
                        padding: WP(4),
                        margin: WP(4),
                        borderRadius: WP(4),
                        backgroundColor: HexToHexa({
                            hex: colors.secondary,
                            alpha: 0.2,
                        }),
                    }}
                >
                    {item?.generalObjectives?.map((obj: any, index: number) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.text,
                                    fontSize: HP(1.8),
                                    fontFamily: OutfitRegular,
                                }}
                            >
                                <Entypo
                                    name="dot-single"
                                    size={14}
                                    color={colors.text}
                                />

                                {obj}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
