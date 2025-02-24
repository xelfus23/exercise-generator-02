// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//     Animated,
//     ScrollView,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     useColorScheme,
//     View,
// } from "react-native";
// import {
//     heightPercentageToDP as HP,
//     widthPercentageToDP as WP,
// } from "react-native-responsive-screen";
// import LottieView from "lottie-react-native";
// import { useTheme } from "@react-navigation/native";
// import { RegistrationStyles } from "../signup/registrationStyles";
// import { HexToHexa } from "@/constants/hexToHexa";

// const MeasurementInput = ({ value, unit, onChangeText, name }) => {
//     const { colors } = useTheme();
//     return (
//         <Animated.View
//             style={{
//                 alignItems: "center",
//                 flexDirection: "row",
//                 gap: HP(2),
//                 borderRadius: WP(2),
//                 borderColor: colors.secondary,
//                 paddingHorizontal: WP(2),
//                 justifyContent: "space-around",
//                 backgroundColor: HexToHexa(colors.secondary, 0.2),
//                 borderWidth: 1,
//                 width: WP(30),
//             }}
//         >
//             <TextInput
//                 placeholder=""
//                 style={{
//                     color: colors.text,
//                     fontSize: HP(1.8),
//                     alignItems: "center",
//                     fontFamily: "Outfit-Regular",
//                     height: HP(6),
//                     width: "100%",
//                 }}
//                 value={value}
//                 onChangeText={onChangeText}
//                 inputMode="numeric"
//                 placeholderTextColor={colors.text}
//                 numberOfLines={1}
//                 multiline={false}
//                 textContentType="creditCardNumber"
//                 maxLength={10}
//             />
//             <Text
//                 style={{
//                     color: colors.text,
//                     fontSize: HP(2),
//                     fontFamily: "Outfit-Regular",
//                 }}
//             >
//                 {unit}
//             </Text>
//         </Animated.View>
//     );
// };

// const MeasurementInstructions = ({ instructions }) => {
//     const { colors } = useTheme();
//     return (
//         <View style={{ gap: HP(2) }}>
//             {instructions.map((ins, inv) => (
//                 <View key={inv} style={{ flexDirection: "row" }}>
//                     <Text
//                         style={{
//                             color: colors.text,
//                             fontFamily: "Outfit-Regular",
//                         }}
//                     >
//                         •{" "}
//                     </Text>
//                     <Text
//                         style={{
//                             color: colors.text,
//                             fontFamily: "Outfit-Regular",
//                             fontSize: HP(1.8),
//                         }}
//                     >
//                         {ins}
//                     </Text>
//                 </View>
//             ))}
//         </View>
//     );
// };

// const UnitSelector = ({ unit, onUnitChange, fadeAnim }) => {
//     const { colors } = useTheme();
//     return (
//         <Animated.View
//             style={{
//                 opacity: fadeAnim,
//                 paddingHorizontal: WP(5),
//             }}
//         >
//             <View
//                 style={{
//                     marginTop: HP(2),
//                     borderColor: colors.secondary,
//                     justifyContent: "space-around",
//                     flexDirection: "row",
//                     backgroundColor: colors.card,
//                 }}
//             >
//                 <TouchableOpacity onPress={() => onUnitChange("CM")}>
//                     <Text
//                         style={{
//                             color: unit === "CM" ? colors.primary : colors.text,
//                             fontFamily: "Outfit-Regular",
//                             textAlign: "center",
//                             padding: WP(4),
//                             fontSize: HP(1.8),
//                         }}
//                     >
//                         Centimeters
//                     </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => onUnitChange("IN")}>
//                     <Text
//                         style={{
//                             color: unit === "IN" ? colors.primary : colors.text,
//                             fontFamily: "Outfit-Regular",
//                             textAlign: "center",
//                             padding: WP(4),
//                             fontSize: HP(1.8),
//                         }}
//                     >
//                         Inches
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         </Animated.View>
//     );
// };

// export default function BodyFatPercentageScreen({
//     selectedBodyMeasurements,
//     setSelectedBodyMeasurements,
//     selectedGender,
//     setIndex,
//     scrollY,
// }) {
//     const { colors } = useTheme();
//     const [unit, setUnit] = useState("CM");
//     const [isContinue, setIsContinue] = useState(false);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [error, setError] = useState(null);
//     const SVRef = useRef(null);
//     const [currentMeasurementIndex, setCurrentMeasurementIndex] = useState(0);
//     const fadeAnim = useRef(new Animated.Value(1)).current;
//     const styles = RegistrationStyles();
//     const scrollDownIcon =
//         useColorScheme() === "light"
//             ? require("@/assets/json/scrolldownDark.json")
//             : require("@/assets/json/scrolldown.json");

//     const measurementConfig = {
//         Male: [
//             {
//                 name: "Waist",
//                 instructions: [
//                     "First, let's measure your waist.",
//                     "Measure around the narrowest part of your waist, typically just above the belly button.",
//                     "Relax your abdomen and breathe out naturally while measuring to avoid tensing the muscles.",
//                     "Keep the tape measure parallel to the floor",
//                 ],
//             },
//             {
//                 name: "Neck",
//                 instructions: [
//                     "And last, let's measure your neck.",
//                     `Wrap the tape around the neck, just below your Adam’s apple.`,
//                     "Keep the tape level and snug, but avoid compressing the skin.",
//                     "Stand straight and look forward during this measurement.",
//                 ],
//             },
//         ],
//         Female: [
//             {
//                 name: "Waist",
//                 instructions: [
//                     "First, let's measure your waist.",
//                     "Measure around the narrowest part of your waist, typically just above the belly button.",
//                     "Relax your abdomen and breathe out naturally while measuring to avoid tensing the muscles.",
//                     "Keep the tape measure parallel to the floor",
//                 ],
//             },
//             {
//                 name: "Hip",
//                 instructions: [
//                     "Second, let's measure your hip.",
//                     "Stand with your feet together and measure around the widest part of your hips and buttocks.",
//                     "Ensure the tape is snug but not too tight, and it should remain parallel to the floor.",
//                     "This measurement is usually taken at the fullest part of the hips.",
//                 ],
//             },
//             {
//                 name: "Neck",
//                 instructions: [
//                     "And last, let's measure your neck.",
//                     "Wrap the tape around the neck, just at the base of your neck.",
//                     "Keep the tape level and snug, but avoid compressing the skin.",
//                     "Stand straight and look forward during this measurement.",
//                 ],
//             },
//         ],
//     };

//     const circumferences = measurementConfig[selectedGender] || [
//         {
//             name: "Waist",
//             instructions: [
//                 "First, let's measure your waist.",
//                 "Measure around the narrowest part of your waist, typically just above the belly button.",
//                 "Relax your abdomen and breathe out naturally while measuring to avoid tensing the muscles.",
//                 "Keep the tape measure parallel to the floor",
//             ],
//         },
//         {
//             name: "Hip",
//             instructions: [
//                 "And now, let's measure your hip.",
//                 "Stand with your feet together and measure around the widest part of your hips and buttocks.",
//                 "Ensure the tape is snug but not too tight, and it should remain parallel to the floor.",
//                 "This measurement is usually taken at the fullest part of the hips.",
//             ],
//         },
//         {
//             name: "Neck",
//             instructions: [
//                 "And last, let's measure your neck.",
//                 "Wrap the tape around the neck, just below the Adam’s apple for men and at the base of the neck for women.",
//                 "Keep the tape level and snug, but avoid compressing the skin.",
//                 "Stand straight and look forward during this measurement.",
//             ],
//         },
//     ];

//     // Create individual state variables for each measurement
//     const [waist, setWaist] = useState("");
//     const [hip, setHip] = useState("");
//     const [neck, setNeck] = useState("");

//     //Create individual state variables for each unit of measurement
//     const [waistUnit, setWaistUnit] = useState("CM");
//     const [hipUnit, setHipUnit] = useState("CM");
//     const [neckUnit, setNeckUnit] = useState("CM");

//     const convertMeasurement = (value, fromUnit, toUnit) => {
//         const CM_TO_INCH = 0.393701;
//         if (!value) return "";

//         const numericValue = parseFloat(value);
//         if (isNaN(numericValue)) return "";

//         if (fromUnit === toUnit) return value;

//         if (fromUnit === "CM" && toUnit === "IN") {
//             return (numericValue * CM_TO_INCH).toFixed(2);
//         } else if (fromUnit === "IN" && toUnit === "CM") {
//             return (numericValue / CM_TO_INCH).toFixed(2);
//         }

//         return value;
//     };
//     const handleUnitChange = (newUnit) => {
//         setUnit(newUnit);
//         if (currentMeasurementIndex === 0) {
//             setWaistUnit(newUnit);
//             setWaist(convertMeasurement(waist, unit, newUnit));
//         } else if (currentMeasurementIndex === 1) {
//             setHipUnit(newUnit);
//             setHip(convertMeasurement(hip, unit, newUnit));
//         } else if (currentMeasurementIndex === 2) {
//             setNeckUnit(newUnit);
//             setNeck(convertMeasurement(neck, unit, newUnit));
//         }
//     };
//     const handleBackPress = () => {
//         if (!isContinue) {
//             return;
//         } else if (currentMeasurementIndex > 0) {
//             setCurrentMeasurementIndex(currentMeasurementIndex - 1);
//             return;
//         } else {
//             setIsContinue(false);
//             return;
//         }
//     };

//     const validateInput = useCallback((value) => {
//         if (!value) {
//             setError("Please enter your measurement.");
//             setTimeout(() => {
//                 setError(null);
//             }, 3000);
//             return false;
//         }

//         if (/\s/.test(value)) {
//             setError("Measurement should not contain spaces.");
//             setTimeout(() => {
//                 setError(null);
//             }, 3000);
//             return false;
//         }

//         if (/[^0-9.]/.test(value)) {
//             setError(
//                 "Please enter a valid measurement without special characters."
//             );
//             setTimeout(() => {
//                 setError(null);
//             }, 3000);
//             return false;
//         }

//         if (!/^\d+(\.\d+)?$/.test(value)) {
//             setError("Please enter a numeric measurement.");
//             setTimeout(() => {
//                 setError(null);
//             }, 3000);
//             return false;
//         }

//         if (Math.round(parseFloat(value)) === 0) {
//             setError("Measurement cannot be zero.");
//             setTimeout(() => {
//                 setError(null);
//             }, 3000);
//             return false;
//         }
//         return true;
//     }, []);

//     const moveScroll = scrollY.interpolate({
//         inputRange: [HP(400), HP(500)],
//         outputRange: [0, HP(20)],
//         extrapolate: "clamp",
//     });

//     const scrollIconOpacity = scrollY.interpolate({
//         inputRange: [HP(400), HP(500)],
//         outputRange: [1, 0], // Start at 0 and fade out
//         extrapolate: "clamp",
//     });

//     const fadeOutOpacity = scrollY.interpolate({
//         inputRange: [HP(400), HP(500)],
//         outputRange: [1, 0],
//         extrapolate: "clamp",
//     });

//     const handleNextPress = () => {
//         let measurementValue = "";
//         if (currentMeasurementIndex === 0) {
//             measurementValue = waist;
//         }
//         if (currentMeasurementIndex === 1) {
//             measurementValue = hip;
//         }
//         if (currentMeasurementIndex === 2) {
//             measurementValue = neck;
//         }
//         if (!isContinue) {
//             return;
//         } else if (currentMeasurementIndex < circumferences.length - 1) {
//             if (!validateInput(measurementValue)) {
//                 setTimeout(() => {
//                     setError(null);
//                 }, [3000]);
//                 return;
//             }
//             setCurrentMeasurementIndex((prev) => prev + 1);
//         } else {
//             if (!validateInput(measurementValue)) {
//                 setTimeout(() => {
//                     setError(null);
//                 }, [3000]);
//                 return;
//             }
//             return;
//         }
//     };

//     const runFadeAnimation = () => {
//         Animated.timing(fadeAnim, {
//             toValue: 0,
//             duration: 1000,
//             useNativeDriver: true,
//         }).start(() => {
//             setIsSubmitted(true);
//             setIndex(5);
//         });
//     };

//     const handleSubmit = () => {
//         const measurements = {
//             waist,
//             hip,
//             neck,
//             unit: waistUnit,
//         };

//         if (
//             selectedGender === "Male"
//                 ? !measurements.waist || !measurements.neck
//                 : !measurements.waist || !measurements.hip || !measurements.neck
//         ) {
//             setError("Please enter your measurements");
//         } else {
//             setSelectedBodyMeasurements(measurements);
//             runFadeAnimation();
//         }
//     };

//     const handleSkip = () => {
//         runFadeAnimation();
//     };

//     useEffect(() => {
//         if (SVRef.current) {
//             SVRef.current.scrollTo({
//                 x: WP(100) * currentMeasurementIndex,
//                 animated: true,
//             });
//         }
//     }, [currentMeasurementIndex]);

//     return (
//         <View
//             style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: HP(100),
//             }}
//         >
//             {!isSubmitted && selectedBodyMeasurements.neck === 0 ? (
//                 <View
//                     style={{
//                         width: WP(100),
//                         alignItems: "center",
//                         height: "100%",
//                         justifyContent: "center",
//                     }}
//                 >
//                     <Animated.Text
//                         style={{
//                             color: colors.text,
//                             fontSize: HP(3),
//                             textAlign: "center",
//                             width: WP(80),
//                             opacity: fadeAnim,
//                             fontFamily: "Outfit-Regular",
//                         }}
//                     >
//                         Let's take your{" "}
//                         <Text
//                             style={{
//                                 color: colors.primary,
//                                 fontFamily: "Outfit-Bold",
//                             }}
//                         >
//                             {circumferences.map((v, index) => (
//                                 <Text key={v.name}>
//                                     {v.name}
//                                     {index < circumferences.length - 1 ? (
//                                         <Text
//                                             style={{
//                                                 color: colors.text,
//                                                 fontFamily: "Outfit-Regular",
//                                             }}
//                                         >
//                                             {index === circumferences.length - 2
//                                                 ? " and "
//                                                 : ", "}
//                                         </Text>
//                                     ) : null}
//                                 </Text>
//                             ))}
//                         </Text>{" "}
//                         measurements
//                     </Animated.Text>

//                     {isContinue && (
//                         <View
//                             style={{
//                                 width: WP(100),
//                                 justifyContent: "center",
//                             }}
//                         >
//                             <UnitSelector
//                                 unit={unit}
//                                 onUnitChange={handleUnitChange}
//                                 fadeAnim={fadeAnim}
//                             />
//                         </View>
//                     )}

//                     {!isContinue ? (
//                         <Animated.View
//                             style={{
//                                 width: WP(80),
//                                 gap: HP(2),
//                                 marginVertical: HP(5),
//                                 opacity: fadeAnim,
//                             }}
//                         >
//                             <View>
//                                 <Text
//                                     style={{
//                                         color: colors.text,
//                                         fontSize: HP(2),
//                                         fontFamily: "Outfit-Bold",
//                                     }}
//                                 >
//                                     Tools:
//                                 </Text>

//                                 <View
//                                     style={{ gap: HP(1), flexDirection: "row" }}
//                                 >
//                                     <Text
//                                         style={{
//                                             color: colors.text,
//                                             fontSize: HP(2),
//                                             fontFamily: "Outfit-Regular",
//                                         }}
//                                     >
//                                         –
//                                     </Text>
//                                     <Text
//                                         style={{
//                                             color: colors.text,
//                                             fontSize: HP(2),
//                                             fontFamily: "Outfit-Regular",
//                                         }}
//                                     >
//                                         Use a flexible, non-stretchable{" "}
//                                         <Text
//                                             style={{
//                                                 fontFamily: "Outfit-Bold",
//                                                 color: colors.text,
//                                             }}
//                                         >
//                                             Tape Measure.
//                                         </Text>{" "}
//                                         (usually made of cloth or plastic)
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View style={{}}>
//                                 <Text
//                                     style={{
//                                         color: colors.text,
//                                         fontSize: HP(2),
//                                         fontFamily: "Outfit-Bold",
//                                     }}
//                                 >
//                                     Body Position:
//                                 </Text>

//                                 <View
//                                     style={{ gap: HP(1), flexDirection: "row" }}
//                                 >
//                                     <Text
//                                         style={{
//                                             color: colors.text,
//                                             fontSize: HP(2),
//                                             fontFamily: "Outfit-Regular",
//                                         }}
//                                     >
//                                         –
//                                     </Text>
//                                     <Text
//                                         style={{
//                                             color: colors.text,
//                                             fontSize: HP(2),
//                                             fontFamily: "Outfit-Regular",
//                                         }}
//                                     >
//                                         Perform these measurements in{" "}
//                                         <Text
//                                             style={{
//                                                 fontFamily: "Outfit-Bold",
//                                                 color: colors.text,
//                                             }}
//                                         >
//                                             standing{" "}
//                                         </Text>
//                                         and{" "}
//                                         <Text
//                                             style={{
//                                                 fontFamily: "Outfit-Bold",
//                                                 color: colors.text,
//                                             }}
//                                         >
//                                             relaxed{" "}
//                                         </Text>
//                                         position.
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View>
//                                 <Text
//                                     style={{
//                                         color: colors.text,
//                                         fontSize: HP(2),
//                                         fontFamily: "Outfit-Bold",
//                                     }}
//                                 >
//                                     Consistency:
//                                 </Text>

//                                 <View
//                                     style={{ gap: HP(1), flexDirection: "row" }}
//                                 >
//                                     <Text
//                                         style={{
//                                             color: colors.text,
//                                             fontSize: HP(2),
//                                             fontFamily: "Outfit-Regular",
//                                         }}
//                                     >
//                                         –
//                                     </Text>
//                                     <Text
//                                         style={{
//                                             color: colors.text,
//                                             fontSize: HP(2),
//                                             fontFamily: "Outfit-Regular",
//                                         }}
//                                     >
//                                         Measure each area three times, and use
//                                         the average of the readings for the most
//                                         accurate results.
//                                     </Text>
//                                 </View>
//                             </View>
//                         </Animated.View>
//                     ) : (
//                         <Animated.View
//                             style={{
//                                 opacity: fadeAnim,
//                                 height: HP(50),
//                                 overflow: "visible",
//                             }}
//                         >
//                             <ScrollView
//                                 horizontal
//                                 style={{ width: WP(100) }}
//                                 contentContainerStyle={{
//                                     justifyContent: "center",
//                                 }}
//                                 snapToInterval={WP(100)}
//                                 ref={SVRef}
//                                 scrollEnabled={false}
//                                 showsHorizontalScrollIndicator={false}
//                             >
//                                 {circumferences.map((v, i) => (
//                                     <View
//                                         key={i}
//                                         style={{
//                                             width: WP(100),
//                                             padding: WP(5),
//                                             gap: HP(2),
//                                             alignItems: "center",
//                                             overflow: "visible",
//                                         }}
//                                     >
//                                         <View
//                                             style={{
//                                                 alignItems: "center",
//                                                 flexDirection: "row",
//                                                 gap: HP(2),
//                                                 width: WP(100),
//                                             }}
//                                         >
//                                             <Text
//                                                 style={{
//                                                     color: colors.text,
//                                                     fontFamily:
//                                                         "Outfit-Regular",
//                                                     fontSize: HP(2.5),
//                                                     marginLeft: WP(5),
//                                                 }}
//                                             >
//                                                 {i + 1}. {v.name}
//                                             </Text>

//                                             <MeasurementInput
//                                                 name={v.name}
//                                                 value={
//                                                     selectedGender === "Male"
//                                                         ? i === 0
//                                                             ? waist
//                                                             : neck
//                                                         : i === 0
//                                                         ? waist
//                                                         : i === 1
//                                                         ? hip
//                                                         : neck
//                                                 }
//                                                 unit={
//                                                     i === 0
//                                                         ? waistUnit
//                                                         : i === 1
//                                                         ? hipUnit
//                                                         : neckUnit
//                                                 }
//                                                 onChangeText={(text) => {
//                                                     if (v.name === "Waist") {
//                                                         setWaist(text);
//                                                     } else if (
//                                                         v.name === "Hip"
//                                                     ) {
//                                                         setHip(text);
//                                                     } else {
//                                                         setNeck(text);
//                                                     }
//                                                 }}
//                                             />
//                                         </View>

//                                         <View
//                                             style={{
//                                                 width: WP(90),
//                                                 height: 1,
//                                                 backgroundColor: HexToHexa(
//                                                     colors.secondary,
//                                                     0.2
//                                                 ),
//                                             }}
//                                         />

//                                         <MeasurementInstructions
//                                             instructions={v.instructions}
//                                         />

//                                         <View
//                                             style={{
//                                                 width: WP(90),
//                                                 height: 1,
//                                                 backgroundColor: HexToHexa(
//                                                     colors.secondary,
//                                                     0.2
//                                                 ),
//                                             }}
//                                         />

//                                         {error && (
//                                             <Text
//                                                 style={{
//                                                     color: colors.error,
//                                                     fontFamily:
//                                                         "Outfit-Regular",
//                                                 }}
//                                             >
//                                                 {error}
//                                             </Text>
//                                         )}

//                                         <Animated.View
//                                             style={{
//                                                 flexDirection: "row",
//                                                 justifyContent: "space-between",
//                                                 width: WP(90),
//                                                 overflow: "visible",
//                                                 opacity: fadeAnim,
//                                             }}
//                                         >
//                                             <TouchableOpacity
//                                                 onPress={handleBackPress}
//                                                 style={{
//                                                     height: HP(6),
//                                                     width: "45%",
//                                                     backgroundColor:
//                                                         colors.secondary,
//                                                     borderRadius: WP(4),
//                                                     justifyContent: "center",
//                                                     alignItems: "center",
//                                                 }}
//                                             >
//                                                 <Text
//                                                     style={{
//                                                         color: colors.white,
//                                                         fontFamily:
//                                                             "Outfit-Bold",
//                                                         fontSize: HP(2),
//                                                     }}
//                                                 >
//                                                     Back
//                                                 </Text>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity
//                                                 onPress={
//                                                     i ===
//                                                     circumferences.length - 1
//                                                         ? handleSubmit
//                                                         : handleNextPress
//                                                 }
//                                                 style={{
//                                                     backgroundColor:
//                                                         colors.primary,
//                                                     justifyContent: "center",
//                                                     alignItems: "center",
//                                                     borderRadius: WP(4),
//                                                     width: "45%",
//                                                     height: HP(6),
//                                                     zIndex: 100,
//                                                 }}
//                                             >
//                                                 <Text
//                                                     style={{
//                                                         color: colors.white,
//                                                         fontSize: HP(2),
//                                                         fontFamily:
//                                                             "Outfit-Bold",
//                                                     }}
//                                                 >
//                                                     {i ===
//                                                     circumferences.length - 1
//                                                         ? "Submit"
//                                                         : "Next"}
//                                                 </Text>
//                                             </TouchableOpacity>
//                                         </Animated.View>
//                                     </View>
//                                 ))}
//                             </ScrollView>
//                         </Animated.View>
//                     )}

//                     {!isContinue && (
//                         <Animated.View
//                             style={{
//                                 opacity: fadeAnim,
//                                 width: WP(90),
//                                 alignItems: "center",
//                                 position: "absolute",
//                                 bottom: HP(2),
//                                 flexDirection: "row",
//                                 justifyContent: "space-between",
//                                 marginTop: HP(2),
//                             }}
//                         >
//                             <TouchableOpacity
//                                 onPress={handleSkip}
//                                 style={{
//                                     height: HP(6),
//                                     width: "45%",
//                                     backgroundColor: colors.secondary,
//                                     borderRadius: WP(4),
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                 }}
//                             >
//                                 <Text
//                                     style={{
//                                         color: colors.white,
//                                         textAlign: "center",
//                                         fontFamily: "Outfit-Bold",
//                                         fontSize: HP(2),
//                                     }}
//                                 >
//                                     Skip
//                                 </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 onPress={() => setIsContinue(true)}
//                                 style={{
//                                     backgroundColor: colors.primary,
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     borderRadius: WP(4),
//                                     width: "45%",
//                                     height: HP(6),
//                                     zIndex: 100,
//                                 }}
//                             >
//                                 <Text
//                                     style={{
//                                         color: colors.white,
//                                         textAlign: "center",
//                                         fontFamily: "Outfit-Bold",
//                                         fontSize: HP(2),
//                                     }}
//                                 >
//                                     Continue
//                                 </Text>
//                             </TouchableOpacity>
//                         </Animated.View>
//                     )}
//                 </View>
//             ) : (
//                 <>
//                     <Animated.Text
//                         style={{
//                             color: colors.text,
//                             fontSize: HP(2),
//                             opacity: fadeOutOpacity,
//                             fontFamily: "Outfit-Regular",
//                         }}
//                     >
//                         Scroll down to continue
//                     </Animated.Text>
//                     <Animated.View
//                         style={{
//                             alignItems: "center",
//                             justifyContent: "center",
//                             height: HP(15),
//                             transform: [{ translateY: moveScroll }], // Use interpolated value
//                             opacity: scrollIconOpacity,
//                             position: "absolute",
//                             bottom: HP(2),
//                         }}
//                     >
//                         <LottieView
//                             source={scrollDownIcon}
//                             autoPlay
//                             loop
//                             style={{
//                                 height: "100%",
//                                 aspectRatio: 1,
//                                 zIndex: 1000,
//                             }}
//                         />
//                     </Animated.View>
//                 </>
//             )}
//         </View>
//     );
// }