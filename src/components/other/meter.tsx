import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { OutfitBold, OutfitRegular } from "@/src/hooks/useFonts";
import HexToHexa from "@/src/hooks/useHexa";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextStyle,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";

interface props {
    options: any;
    itemWidth: number;
    loading: boolean;
    unit: string;
    setSelectedValue: (v: string) => void;
}

const Meter: React.FC<props> = ({
    options,
    itemWidth,
    loading,
    unit,
    setSelectedValue,
}) => {
    const colors = useThemeColors();
    const scrollViewRef = useRef(null);

    // Define constants
    const BORDER_WIDTH = 1; // Border width of tick marks
    const TICK_WIDTH = Math.ceil(WP(3)); // Round up
    const ACTUAL_TICK_WIDTH = TICK_WIDTH - BORDER_WIDTH; // Adjust for border width
    const TICKS_PER_SEGMENT = 10; // 10 ticks per segment
    const SEGMENT_WIDTH = Math.ceil(TICK_WIDTH * TICKS_PER_SEGMENT); // Round up
    const CARET_POSITION = Math.ceil(WP(30.5)); // Round up
    const CARET_OFFSET = 6; // Offset adjustment for the carets
    const SEGMENT_VALUE_WIDTH = Math.ceil(WP(15)); // Added to align the segment value

    const lineStyle = {
        fontFamily: OutfitRegular,
        width: ACTUAL_TICK_WIDTH,
        textAlignVertical: "top",
        color: colors.text,
        borderLeftWidth: BORDER_WIDTH,
        borderColor: colors.text,
        marginRight: 1,
    };

    const scroll = (event: any) => {
        console.log("Scrolling");
        const offsetX = event.nativeEvent.contentOffset.x;
        const preciseValue = 20 + offsetX / itemWidth / 10;
        setSelectedValue(preciseValue.toFixed(1) as any);
    };

    return (
        <View
            style={{
                width: WP(100),
                alignItems: "flex-start",
            }}
        >
            <AntDesign
                name="caretdown"
                size={WP(3)}
                color={colors.text}
                style={{ paddingLeft: CARET_POSITION - CARET_OFFSET }}
            />
            <View style={{ height: HP(10), overflow: "hidden" }}>
                <LinearGradient
                    colors={[
                        colors.background,
                        HexToHexa({ hex: colors.secondary, alpha: 0.2 }),
                        HexToHexa({ hex: colors.secondary, alpha: 0.2 }),
                        colors.background,
                    ]}
                    locations={[0, 0.49, 0.51, 1]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        height: HP(10),
                        opacity: 0.8,
                    }}
                >
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        snapToInterval={TICK_WIDTH} // Use the full tick width for snapping
                        style={{
                            width: WP(100),
                        }}
                        contentContainerStyle={{
                            paddingLeft: CARET_POSITION, // Adjust for border
                            paddingRight: WP(100) - SEGMENT_VALUE_WIDTH, // Padding right is calculated to show only one value, so the snapping will not misalign
                        }}
                        showsHorizontalScrollIndicator={false}
                        disableScrollViewPanResponder={loading}
                        onResponderMove={() => console.log("Moving")}
                        decelerationRate="fast"
                        snapToAlignment="start"
                        overScrollMode="never"
                        onScroll={scroll}
                    >
                        {options.map((value: number, idx: number) => (
                            <View
                                key={idx}
                                style={{
                                    width: SEGMENT_WIDTH,
                                }}
                            >
                                <View
                                    style={{
                                        opacity: 0.8,
                                        flexDirection: "row",
                                        width: SEGMENT_WIDTH,
                                        height: "50%",
                                        // Ensure the ticks align properly
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Text
                                        style={[
                                            lineStyle as TextStyle,
                                            {
                                                height: "50%",
                                            },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            lineStyle as TextStyle,
                                            {
                                                height: "20%",
                                            },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            lineStyle as TextStyle,
                                            {
                                                height: "20%",
                                            },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            lineStyle as TextStyle,
                                            {
                                                height: "20%",
                                            },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            lineStyle as TextStyle,
                                            {
                                                height: "20%",
                                            },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            lineStyle as TextStyle,
                                            {
                                                height: "30%",
                                            },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            lineStyle as TextStyle,
                                            {
                                                height: "20%",
                                            },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            lineStyle as TextStyle,
                                            {
                                                height: "20%",
                                            },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            lineStyle as TextStyle,
                                            {
                                                height: "20%",
                                            },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            lineStyle as TextStyle,
                                            {
                                                height: "20%",
                                            },
                                        ]}
                                    />
                                </View>
                                <Text
                                    style={{
                                        color: colors.text,
                                        fontSize: WP(3),
                                        width: WP(15),
                                        paddingLeft: BORDER_WIDTH, // Align text with the first tick
                                    }}
                                >
                                    {value}
                                    {unit}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </LinearGradient>
            </View>
            <AntDesign
                name="caretup"
                size={WP(3)}
                color={colors.text}
                style={{ paddingLeft: CARET_POSITION - CARET_OFFSET }}
            />
        </View>
    );
};

export default Meter;
