import { useThemeColors } from "@/src/hooks/useThemeColor";
import React, { useEffect, useRef, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Animated,
    TextInput,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { HP, WP } from "@/src/hooks/useDeviceDimension";
import HexToHexa from "@/src/hooks/useHexa";
import {
    lg,
    md,
    OutfitBold,
    OutfitRegular,
    sm,
    xl,
    xxl,
} from "@/src/hooks/useFonts";
import { Fade } from "@/src/module/animations/fadeAnimation";
import ScrollDown from "@/src/components/other/scrollDown";
import Ionicons from "@expo/vector-icons/Ionicons";
import Loading from "@/src/components/loading/loading";
import Height from "./03-height";
import SingleButton from "@/src/components/buttons/single-button";
import { AntDesign, Entypo } from "@expo/vector-icons";

interface props {
    YOffset: Animated.Value;
    setIndex: (v: number) => void;
}

type renderItemProps = {
    equipment: string;
    index: number;
};

const Equipments: React.FC<props> = ({ YOffset, setIndex }) => {
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);
    const colors = useThemeColors();

    const allEquipments = [
        // 🏋️‍♂️ Weight Lifting
        "Dumbbells",
        "Barbell",
        "Kettlebell",
        "Resistance Bands",
        "Weight Plates",
        "Squat Rack",
        "Bench Press",
        "Smith Machine",
        "Power Tower",
        "EZ Curl Bar",
        "Trap Bar",
        "Leg Press Machine",
        "Cable Machine",
        "Lat Pulldown Machine",
        "Hack Squat Machine",
        "Deadlift Platform",
        "Wrist Wraps",
        "Lifting Straps",
        "Hip Thrust Bench",
        "Pec Deck Machine",
        "Seated Row Machine",
        "Leg Extension Machine",
        "Leg Curl Machine",
        "Glute Ham Developer (GHD)",
        "Hyperextension Bench",
        "Weighted Chains",
        "Dip Belt",

        // 🏃‍♂️ Cardio Equipment
        "Treadmill",
        "Rowing Machine",
        "Stationary Bike",
        "Spin Bike",
        "Jump Rope",
        "Elliptical Machine",
        "Stair Climber",
        "Air Bike",
        "Battle Ropes",
        "Sled Push",
        "Ski Erg Machine",
        "Punching Bag",
        "Speed Ladder",
        "Agility Cones",
        "Speed Parachute",
        "Mini Trampoline (Rebounder)",
        "Kickboxing Bag",

        // 🤸‍♂️ Bodyweight & Calisthenics Equipment
        "Pull-Up Bar",
        "Parallettes",
        "Dip Station",
        "Gymnastic Rings",
        "Push-Up Bars",
        "Ab Roller",
        "Sliders",
        "Calisthenics Blocks",
        "Parallel Bars",
        "Monkey Bars",
        "TRX Suspension Trainer",
        "Plyometric Box",
        "Weighted Vest",
        "Wall Bars (Swedish Ladder)",
        "Climbing Rope",

        // 🧘‍♀️ Flexibility, Recovery & Mobility
        "Yoga Mat",
        "Foam Roller",
        "Massage Gun",
        "Stretching Strap",
        "Balance Board",
        "Resistance Loops",
        "Exercise Ball",
        "Acupressure Mat",
        "Trigger Point Ball",
        "Stretching Bands",
        "Percussion Massager",
        "Bosu Ball",
        "Thera Cane Massager",

        // 🏀 Functional & Sports Training
        "Medicine Ball",
        "Sandbag",
        "Battle Rope Anchor",
        "Agility Hurdles",
        "Weighted Sled",
        "Bumper Plates",
        "Farmers Carry Handles",
        "Yoke",
        "Strongman Log",
        "Atlas Stones",
        "Indian Clubs",
        "Macebell",
        "Bulgarian Bag",

        // 🏋️ Gym Accessories
        "Knee Sleeves",
        "Elbow Sleeves",
        "Lifting Belt",
        "Hand Grippers",
        "Finger Strength Trainer",
        "Grip Strength Ball",
        "Weightlifting Chalk",
        "Jump Box (Step Platform)",

        // 🏕 Outdoor & Home Gym Equipment
        "Outdoor Pull-Up Bar",
        "Climbing Wall Grips",
        "Sledgehammer",
        "Tire Flip",
        "Parachute Resistance Trainer",
        "Obstacle Course Rigs",

        // ⚕️ Rehabilitation & Therapy
        "Compression Sleeves",
        "Ankle Weights",
        "Wrist Weights",
        "Posture Corrector",
        "Vibration Plate",
        "TheraBands",
        "Cervical Traction Device",
        "Cold Compression Wrap",

        // 🏊 Aquatic & Swimming Training
        "Aqua Dumbbells",
        "Kickboard",
        "Pull Buoy",
        "Swim Parachute",
        "Water Jogging Belt",
        "Aqua Resistance Bands",
    ];

    const filteredEquipments = allEquipments.filter(
        (item) =>
            !selectedEquipment.includes(item) && // Remove selected items
            item.toLowerCase().includes(searchText.toLowerCase()) // Apply search
    );
    const toggleItem = (item: string) => {
        setSelectedEquipment((prev) =>
            prev.includes(item)
                ? prev.filter((x) => x !== item)
                : [...prev, item]
        );
    };

    const fadeOut = useRef<Animated.Value>(new Animated.Value(1)).current;
    const fadeIn = useRef<Animated.Value>(new Animated.Value(0)).current;

    const moveScroll = YOffset.interpolate({
        inputRange: [HP(700), HP(800)],
        outputRange: [0, HP(20)],
        extrapolate: "clamp",
    });

    const fadeScroll = YOffset.interpolate({
        inputRange: [HP(700), HP(800)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const submit = () => {
        Fade({
            fromValue: fadeOut,
            duration: 1000,
            after: () => {
                setSubmitted(true);
                setIndex(8);
                Fade({
                    fromValue: fadeIn,
                    duration: 1000,
                    after: () => {},
                    toValue: 1,
                });
            },
            toValue: 0,
        });
    };

    return !submitted ? (
        <Animated.View style={{ flex: 1, gap: HP(2), opacity: fadeOut }}>
            <Text
                style={{
                    fontSize: xl,
                    color: colors.text,
                    paddingHorizontal: WP(4),
                    marginTop: HP(10),
                    fontFamily: OutfitRegular,
                }}
            >
                Select the equipments that you have
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    marginHorizontal: WP(4),
                    backgroundColor: HexToHexa({
                        hex: colors.secondary,
                        alpha: 0.2,
                    }),
                    width: WP(55),
                    alignItems: "center",
                    borderRadius: WP(2),
                    marginTop: HP(4),
                }}
            >
                <Ionicons
                    name="search-outline"
                    size={lg}
                    color={colors.text}
                    style={{ marginLeft: WP(2) }}
                />
                <TextInput
                    style={{
                        fontSize: sm,
                        padding: WP(2),
                        flex: 1,
                        color: colors.text,
                    }}
                    maxLength={20}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    placeholder="Search equipment..."
                    placeholderTextColor={HexToHexa({
                        hex: colors.text,
                        alpha: 0.5,
                    })}
                />
            </View>

            <ScrollView
                contentContainerStyle={{
                    gap: HP(2),
                    paddingHorizontal: WP(4),
                    paddingVertical: HP(2),
                    maxHeight: HP(30),
                }}
                style={{ maxHeight: HP(20) }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View
                    style={{ maxHeight: HP(30), flexWrap: "wrap", gap: HP(2) }}
                >
                    {filteredEquipments.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => toggleItem(item)}
                            style={{
                                padding: WP(2),
                                borderRadius: WP(2),
                                backgroundColor: HexToHexa({
                                    hex: colors.secondary,
                                    alpha: selectedEquipment.includes(item)
                                        ? 0.6
                                        : 0.2,
                                }),
                            }}
                        >
                            <Text style={{ fontSize: sm, color: colors.text }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View>
                <Text
                    style={{
                        fontSize: xl,
                        color: colors.text,
                        paddingHorizontal: WP(4),
                        fontFamily: OutfitRegular,
                    }}
                >
                    Selected:
                </Text>

                {selectedEquipment.length > 0 && (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: WP(5),
                        }}
                        onPress={() => setSelectedEquipment([])}
                    >
                        <Text
                            style={{
                                fontSize: sm,
                                color: HexToHexa({
                                    hex: colors.error,
                                    alpha: 0.8,
                                }),
                                fontFamily: OutfitRegular,
                            }}
                        >
                            Deselect All
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                contentContainerStyle={{
                    gap: HP(2),
                    paddingHorizontal: WP(4),
                    paddingBottom: HP(4),
                    maxHeight: HP(35),
                }}
                style={{ maxHeight: HP(35) }}
                horizontal
            >
                <View
                    style={{ maxHeight: HP(35), flexWrap: "wrap", gap: HP(0) }}
                >
                    {selectedEquipment.map((equipment, index) => (
                        <View key={index}>
                            <TouchableOpacity
                                onPress={() => toggleItem(equipment)}
                                style={{
                                    padding: WP(2),
                                    borderRadius: WP(2),
                                }}
                            >
                                <Text
                                    style={{ fontSize: sm, color: colors.text }}
                                >
                                    <AntDesign
                                        name="checkcircle"
                                        size={sm}
                                        color={colors.success}
                                    />{" "}
                                    {equipment}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View
                style={{
                    position: "absolute",
                    bottom: HP(4),
                    width: WP(100),
                    alignItems: "center",
                }}
            >
                <SingleButton
                    loading={false}
                    style={{}}
                    color={colors.primary}
                    onPress={submit}
                >
                    <Text
                        style={{
                            color: colors.white,
                            fontSize: md,
                            fontFamily: OutfitBold,
                        }}
                    >
                        Next
                    </Text>
                </SingleButton>
            </View>
        </Animated.View>
    ) : (
        <Animated.View
            style={{
                flex: 1,
                padding: WP(4),
                gap: HP(4),
                opacity: fadeIn,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{ padding: WP(4) }}>
                <Text
                    style={{
                        color: colors.text,
                        fontSize: HP(3),
                        fontFamily: OutfitRegular,
                    }}
                >
                    Scroll down
                </Text>
            </View>
            <ScrollDown move={moveScroll as any} fade={fadeScroll as any} />
        </Animated.View>
    );
};

export default Equipments;
