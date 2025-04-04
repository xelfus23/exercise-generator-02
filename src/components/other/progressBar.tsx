import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

interface ProgressBarTypes {
    radius: number;
    strokeWidth: number;
    percentage: number;
    color: string;
    emptyColor: string;
    textColor?: string;
    textStyle: any;
    showPercentage?: boolean;
    gradientColors?: string[];
    progressGradientColors?: string[];
}

const RoundProgressBar: React.FC<ProgressBarTypes> = ({
    radius = 50,
    strokeWidth = 10,
    percentage = 0, // Value between 0 and 100
    color = "#3498db",
    emptyColor = "#e0e0e0",
    textColor = "#000",
    textStyle = {},
    showPercentage = true,
    gradientColors = null, // Optional: Array of colors for gradient for empty color
    progressGradientColors = null, // Optional: Array of colors for gradient for progress bar
}) => {
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * percentage) / 100;

    const viewBoxSize = radius * 2 + strokeWidth; // Ensure the stroke doesn't get cut off

    return (
        <View style={styles.container}>
            <Svg
                height={viewBoxSize}
                width={viewBoxSize}
                viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            >
                {(gradientColors || progressGradientColors) && (
                    <Defs>
                        {gradientColors && (
                            <LinearGradient
                                id="emptyGrad"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                {gradientColors.map((color, index) => (
                                    <Stop
                                        key={index}
                                        offset={`${
                                            index / (gradientColors.length - 1)
                                        }`} // Calculate stop position
                                        stopColor={color}
                                    />
                                ))}
                            </LinearGradient>
                        )}
                        {progressGradientColors && (
                            <LinearGradient
                                id="progressGrad"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                {progressGradientColors.map((color, index) => (
                                    <Stop
                                        key={index}
                                        offset={`${
                                            index /
                                            (progressGradientColors.length - 1)
                                        }`} // Calculate stop position
                                        stopColor={color}
                                    />
                                ))}
                            </LinearGradient>
                        )}
                    </Defs>
                )}

                <Circle
                    cx={radius + strokeWidth / 2}
                    cy={radius + strokeWidth / 2}
                    r={radius}
                    stroke={gradientColors ? "url(#emptyGrad)" : emptyColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <Circle
                    cx={radius + strokeWidth / 2}
                    cy={radius + strokeWidth / 2}
                    r={radius}
                    stroke={
                        progressGradientColors ? "url(#progressGrad)" : color
                    } // Use gradient if defined
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                    transform={`rotate(-90 ${radius + strokeWidth / 2} ${
                        radius + strokeWidth / 2
                    })`} // Start from top
                />
            </Svg>

            <View
                style={[
                    styles.textContainer,
                    {
                        top: strokeWidth / 2,
                        left: strokeWidth / 2,
                        width: viewBoxSize - strokeWidth,
                        height: viewBoxSize - strokeWidth,
                    },
                ]}
            >
                <Text style={[styles.text, textStyle]}>
                    {showPercentage ? `${percentage.toFixed(2)}%` : ""}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
    },
});

export default RoundProgressBar;
