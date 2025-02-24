// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Animated,
//     useColorScheme,
// } from "react-native";
// import React, { useRef, useState } from "react";
// import {
//     heightPercentageToDP as HP,
//     widthPercentageToDP as WP,
// } from "react-native-responsive-screen";
// import { LinearGradient } from "expo-linear-gradient";
// import { useTheme } from "@react-navigation/native";
// import LottieView from "lottie-react-native";
// import { HexToHexa } from "@/constants/hexToHexa";

// export default function SelectFitnessLevel({
//     setSelectedFitnessLevel,
//     scrollY,
//     setIndex,
// }) {
//     const { colors } = useTheme();
//     const FitnessLevels = [
//         {
//             label: "Beginner",
//             characteristics: [
//                 "New to exercise or returning after a long break.",
//                 "May have low endurance and strength.",
//             ],
//             typicalActivities: [
//                 "Light cardio (walking, jogging).",
//                 "Basic strength exercises (bodyweight squats, push-ups).",
//                 "Flexibility exercises (stretching, yoga).",
//             ],
//         },
//         {
//             label: "Intermediate",
//             characteristics: [
//                 "Regularly exercises but has not reached advanced fitness levels.",
//                 "Moderate endurance and strength.",
//             ],
//             typicalActivities: [
//                 "Moderate cardio (running, cycling).",
//                 "Weight training (using weights or resistance bands).",
//                 "More structured flexibility routines (yoga, Pilates).",
//             ],
//         },
//         {
//             label: "Advanced",
//             characteristics: [
//                 "Highly consistent with workouts, with significant strength and endurance.",
//                 "Often participates in specific sports or competitive activities.",
//             ],
//             typicalActivities: [
//                 "Intense cardio (interval training, long-distance running).",
//                 "Advanced weight training (heavy lifting, complex compound movements).",
//                 "Specialized flexibility and mobility work (dynamic stretching, advanced yoga).",
//             ],
//         },
//         {
//             label: "Athlete",
//             characteristics: [
//                 "Dedicated to a specific sport or competitive training program.",
//                 "High endurance, strength, and skill level in specific physical activities.",
//             ],
//             typicalActivities: [
//                 "Sport-specific training (speed, agility, skill drills).",
//                 "Sport-specific strength and conditioning exercises.",
//                 "Recovery techniques (foam rolling, sports massage, advanced stretching).",
//             ],
//         },
//     ];

//     const [fitnessLevel, setFitnessLevel] = useState({
//         label: "Beginner",
//         characteristics: [
//             "New to exercise or returning after a long break.",
//             "May have low endurance and strength.",
//         ],
//         typicalActivities: [
//             "Light cardio (walking, jogging).",
//             "Basic strength exercises (bodyweight squats, push-ups).",
//             "Flexibility exercises (stretching, yoga).",
//         ],
//     });

//     const [error, setError] = useState(false);
//     const [isSubmitted, setSubmitted] = useState(false);
//     const fadeAnimationOpacity = useRef(new Animated.Value(0)).current;

//     const updateSelectedItems = (item) => {
//         if (!fitnessLevel || fitnessLevel.label !== item.label) {
//             setFitnessLevel(item);
//         }
//     };

//     const AnimatedTouchableOpacity =
//         Animated.createAnimatedComponent(TouchableOpacity);

//     const scrollDownIcon =
//         useColorScheme() === "light"
//             ? require("@/assets/json/scrolldownDark.json")
//             : require("@/assets/json/scrolldown.json");

//     const moveScroll = scrollY.interpolate({
//         inputRange: [HP(800), HP(900)],
//         outputRange: [0, HP(20)],
//         extrapolate: "clamp",
//     });

//     const scrollIconOpacity = scrollY.interpolate({
//         inputRange: [HP(800), HP(900)],
//         outputRange: [1, 0], // Start at 0 and fade out
//         extrapolate: "clamp",
//     });

//     const fadeOutOpacity = scrollY.interpolate({
//         inputRange: [HP(800), HP(900)],
//         outputRange: [1, 0],
//         extrapolate: "clamp",
//     });

//     const fadeAnim = useRef(new Animated.Value(1)).current;

//     const handleNext = () => {
//         if (!fitnessLevel) {
//             setError(true);
//             return;
//         }
//         setSelectedFitnessLevel(fitnessLevel.label);
//         runFadeAnimation();
//     };

//     const runFadeAnimation = () => {
//         Animated.timing(fadeAnim, {
//             toValue: 0,
//             duration: 1000,
//             useNativeDriver: true,
//         }).start(() => {
//             setSubmitted(true);
//             setIndex(9);
//         });
//     };

//     return (
//         <View
//             style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: HP(100),
//             }}
//         >
//             {!isSubmitted ? (
//                 <Animated.Text
//                     style={{
//                         color: colors.text,
//                         width: WP(90),
//                         marginBottom: HP(2),
//                         textAlign: "center",
//                         fontSize: HP(3),
//                         opacity: fadeAnim,
//                         fontFamily: "Outfit-Regular",
//                     }}
//                 >
//                     Select your current{" "}
//                     <Text
//                         style={{
//                             color: colors.primary,
//                             fontFamily: "Outfit-Bold",
//                         }}
//                     >
//                         fitness level
//                     </Text>
//                 </Animated.Text>
//             ) : (
//                 <Text
//                     style={{
//                         color: colors.text,
//                         width: WP(90),
//                         marginBottom: HP(2),
//                         textAlign: "center",
//                         fontSize: HP(2),
//                         fontFamily: "Outfit-Regular",
//                     }}
//                 >
//                     Continue scrolling
//                 </Text>
//             )}

//             {!isSubmitted && (
//                 <Animated.View
//                     style={{
//                         flexDirection: "row",
//                         paddingBottom: HP(3),
//                         justifyContent: "space-evenly",
//                         width: WP(100),
//                         padding: WP(4),
//                         height: HP(50),
//                         opacity: fadeAnim,
//                     }}
//                 >
//                     <View style={{ gap: WP(4) }}>
//                         {FitnessLevels.map((levels) => (
//                             <TouchableOpacity
//                                 key={levels.label}
//                                 style={{
//                                     borderRadius: WP(4),
//                                     backgroundColor:
//                                         fitnessLevel?.label === levels.label
//                                             ? colors.primary
//                                             : HexToHexa(colors.secondary, 0.2),
//                                     overflow: "hidden",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     borderColor:
//                                         fitnessLevel?.label === levels.label
//                                             ? colors.accent
//                                             : HexToHexa(colors.secondary, 0.2),
//                                     borderWidth: 1,
//                                 }}
//                                 onPress={() => updateSelectedItems(levels)}
//                             >
//                                 <Text
//                                     style={{
//                                         color:
//                                             fitnessLevel?.label === levels.label
//                                                 ? colors.white
//                                                 : colors.text,
//                                         padding: WP(4),
//                                         fontFamily: "Outfit-Regular",
//                                         fontSize: HP(2),
//                                     }}
//                                 >
//                                     {levels.label}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>

//                     <View
//                         style={{
//                             width: WP(48),
//                             backgroundColor: HexToHexa(colors.secondary, 0.2),
//                             padding: WP(4),
//                             borderRadius: WP(4),
//                         }}
//                     >
//                         {fitnessLevel && (
//                             <View style={{ gap: HP(1) }}>
//                                 <Text
//                                     style={{
//                                         color: colors.accent,
//                                         fontFamily: "Outfit-Bold",
//                                         fontSize: HP(2),
//                                     }}
//                                 >
//                                     Description:
//                                 </Text>
//                                 {fitnessLevel.characteristics.map(
//                                     (char, index) => (
//                                         <View
//                                             style={{ flexDirection: "row" }}
//                                             key={index}
//                                         >
//                                             <Text
//                                                 style={{
//                                                     color: colors.text,
//                                                     fontFamily:
//                                                         "Outfit-Regular",
//                                                 }}
//                                             >
//                                                 •{" "}
//                                             </Text>
//                                             <Text
//                                                 key={index}
//                                                 style={{
//                                                     color: colors.text,
//                                                     fontSize: HP(1.6),
//                                                     fontFamily:
//                                                         "Outfit-Regular",
//                                                 }}
//                                             >
//                                                 {char}
//                                             </Text>
//                                         </View>
//                                     )
//                                 )}

//                                 <Text
//                                     style={{
//                                         color: colors.accent,
//                                         fontFamily: "Outfit-Bold",
//                                         fontSize: HP(2),
//                                     }}
//                                 >
//                                     Typical Activities:
//                                 </Text>
//                                 {fitnessLevel.typicalActivities.map(
//                                     (act, index) => (
//                                         <View
//                                             style={{ flexDirection: "row" }}
//                                             key={index}
//                                         >
//                                             <Text
//                                                 style={{ color: colors.text }}
//                                             >
//                                                 •{" "}
//                                             </Text>
//                                             <Text
//                                                 key={index}
//                                                 style={{
//                                                     color: colors.text,
//                                                     fontSize: HP(1.5),
//                                                     fontFamily:
//                                                         "Outfit-Regular",
//                                                 }}
//                                             >
//                                                 {act}
//                                             </Text>
//                                         </View>
//                                     )
//                                 )}
//                             </View>
//                         )}
//                     </View>
//                 </Animated.View>
//             )}

//             <Animated.View
//                 style={{
//                     opacity: fadeOutOpacity,
//                     position: "absolute",
//                     alignItems: "center",
//                     width: WP(100),
//                     height: HP(6),
//                     bottom: HP(2),
//                 }}
//             >
//                 {!isSubmitted ? (
//                     <AnimatedTouchableOpacity
//                         style={{
//                             height: HP(6),
//                             width: WP(80),
//                             backgroundColor: colors.primary,
//                             borderRadius: WP(4),
//                             justifyContent: "center",
//                             alignItems: "center",
//                             opacity: fadeAnim,
//                         }}
//                         onPress={handleNext}
//                     >
//                         <Text
//                             style={{
//                                 color: colors.white,
//                                 fontFamily: "Outfit-Bold",
//                                 fontSize: HP(2),
//                             }}
//                         >
//                             Submit
//                         </Text>
//                     </AnimatedTouchableOpacity>
//                 ) : (
//                     <Animated.View
//                         style={{
//                             alignItems: "center",
//                             justifyContent: "center",
//                             height: HP(15),
//                             transform: [{ translateY: moveScroll }], // Use interpolated value
//                             opacity: scrollIconOpacity,
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
//                 )}
//             </Animated.View>
//         </View>
//     );
// }