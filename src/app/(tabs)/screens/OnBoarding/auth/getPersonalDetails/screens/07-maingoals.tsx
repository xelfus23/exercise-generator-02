// import {
//     View,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     useColorScheme,
//     SafeAreaView,
//     Animated,
// } from "react-native";
// import React, { useState, useRef } from "react";
// import {
//     heightPercentageToDP as HP,
//     widthPercentageToDP as WP,
// } from "react-native-responsive-screen";
// import LottieView from "lottie-react-native";
// import { useTheme } from "@react-navigation/native";
// import { HexToHexa } from "@/constants/hexToHexa";

// export default function MainGoal({
//     setSelectedGoal,
//     selectedGoal,
//     next,
//     scrollY,
//     setIndex,
//     nickName,
// }) {
//     const { colors } = useTheme();
//     const [error, setError] = useState(null);
//     const [isSubmitted, setSubmitted] = useState(false);
//     const AnimatedTouchableOpacity =
//         Animated.createAnimatedComponent(TouchableOpacity);

//     const scrollDownIcon =
//         useColorScheme() === "light"
//             ? require("@/assets/json/scrolldownDark.json")
//             : require("@/assets/json/scrolldown.json");

//     const moveScroll = scrollY.interpolate({
//         inputRange: [HP(500), HP(600)],
//         outputRange: [0, HP(20)],
//         extrapolate: "clamp",
//     });

//     const scrollIconOpacity = scrollY.interpolate({
//         inputRange: [HP(500), HP(600)],
//         outputRange: [1, 0], // Start at 0 and fade out
//         extrapolate: "clamp",
//     });

//     const fadeOutOpacity = scrollY.interpolate({
//         inputRange: [HP(500), HP(600)],
//         outputRange: [1, 0],
//         extrapolate: "clamp",
//     });

//     const mainGoals = [
//         "Muscle Gain",
//         "Improve Balance",
//         "Weight Loss",
//         "Reduce Stress",
//         "Increase Endurance",
//         "Improve Flexibility",
//         "Rehabilitation",
//         "Increase Strength",
//         "Improve Posture",
//         "Improve Overall Fitness",
//         "Enhance Athletic Performance",
//     ];
//     const fadeAnim = useRef(new Animated.Value(1)).current;

//     const onPress = (item) => {
//         if (selectedGoal.includes(item)) {
//             setSelectedGoal((prev) => prev.filter((goal) => goal !== item));
//         } else {
//             setSelectedGoal((prev) => [...prev, item]);
//         }
//     };

//     const runFadeAnimation = () => {
//         Animated.timing(fadeAnim, {
//             toValue: 0,
//             duration: 1000,
//             useNativeDriver: true,
//         }).start(() => {
//             setSubmitted(true);
//             setIndex(6);
//         });
//     };

//     const handleNext = () => {
//         if (selectedGoal.length < 1) {
//             setError("Please select one or more main goals.");
//             setTimeout(() => {
//                 setError(null);
//             }, 5000);
//         } else {
//             runFadeAnimation();
//         }
//     };

//     return (
//         <SafeAreaView
//             style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: HP(100),
//             }}
//         >
//             {!isSubmitted ? (
//                 <Animated.View
//                     style={{ opacity: fadeAnim, alignItems: "center" }}
//                 >
//                     <Animated.View
//                         style={{
//                             width: WP(90),
//                             paddingTop: HP(2),
//                             marginBottom: HP(3),
//                             alignItems: "center",
//                         }}
//                     >
//                         <Text
//                             style={{
//                                 fontSize: HP(3),
//                                 fontFamily: "Outfit-Regular",
//                                 color: colors.text,
//                                 textAlign: "center",
//                             }}
//                             numberOfLines={1}
//                             adjustsFontSizeToFit
//                         >
//                             What are your goals{" "}
//                             <Text
//                                 style={{
//                                     color: colors.primary,
//                                     fontFamily: "Outfit-Bold",
//                                 }}
//                             >
//                                 {nickName}
//                             </Text>
//                             ?
//                         </Text>
//                         <Text
//                             style={{ color: colors.text, textAlign: "center" }}
//                         >
//                             you can select one or more
//                         </Text>
//                     </Animated.View>
//                     <View
//                         style={{
//                             borderRadius: WP(4),
//                             width: WP(100),
//                         }}
//                     >
//                         <Text
//                             style={{
//                                 color: colors.text,
//                                 marginLeft: WP(4),
//                                 fontSize: HP(1.5),
//                                 marginBottom: HP(2),
//                                 fontFamily: "Outfit-Regular",
//                             }}
//                         >
//                             Selected:{" "}
//                             <Text
//                                 style={{
//                                     color: colors.primary,
//                                     fontFamily: "Outfit-Regular",
//                                 }}
//                             >
//                                 {selectedGoal?.length}
//                             </Text>{" "}
//                             items
//                         </Text>

//                         <ScrollView
//                             contentContainerStyle={{
//                                 flexWrap: "wrap",
//                                 gap: HP(1),
//                                 maxWidth: WP(200),
//                                 padding: HP(1),
//                             }}
//                             style={{
//                                 borderRadius: WP(4),
//                                 width: WP(100),
//                             }}
//                             showsHorizontalScrollIndicator={false}
//                             horizontal
//                         >
//                             {mainGoals.map((item, index) => (
//                                 <TouchableOpacity
//                                     key={item}
//                                     onPress={() => onPress(item)}
//                                     style={{
//                                         justifyContent: "center",
//                                         alignItems: "center",
//                                         padding: WP(4),
//                                         backgroundColor: !selectedGoal.includes(
//                                             item
//                                         )
//                                             ? HexToHexa(colors.secondary, 0.2)
//                                             : colors.accent,
//                                         borderRadius: WP(3),
//                                     }}
//                                 >
//                                     <Text
//                                         style={{
//                                             borderColor: colors.secondary,
//                                             textAlign: "center",
//                                             color: !selectedGoal.includes(item)
//                                                 ? colors.text
//                                                 : colors.white,
//                                             fontSize: HP(1.5),
//                                             fontFamily: "Outfit-Regular",
//                                         }}
//                                     >
//                                         {item}
//                                     </Text>
//                                 </TouchableOpacity>
//                             ))}
//                         </ScrollView>
//                     </View>

//                     <Text
//                         style={{
//                             color: colors.error,
//                             textAlign: "center",
//                         }}
//                     >
//                         {error}
//                     </Text>
//                 </Animated.View>
//             ) : (
//                 <Text
//                     style={{
//                         color: colors.text,
//                         fontSize: HP(2),
//                         fontFamily: "Outfit-Regular",
//                     }}
//                 >
//                     Continue scrolling
//                 </Text>
//             )}

//             <Animated.View
//                 style={{
//                     opacity: fadeOutOpacity,
//                     width: WP(100),
//                     alignItems: "center",
//                     position: "absolute",
//                     bottom: HP(2),
//                 }}
//             >
//                 {selectedGoal.length > 0 && !isSubmitted && (
//                     <AnimatedTouchableOpacity
//                         style={{
//                             height: HP(6),
//                             width: WP(80),
//                             borderWidth: 1,
//                             borderColor: colors.primary,
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
//                 )}

//                 {isSubmitted && selectedGoal.length > 0 && (
//                     <Animated.View
//                         style={{
//                             alignItems: "center",
//                             justifyContent: "center",
//                             height: HP(15),
//                             transform: [{ translateY: moveScroll }],
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
//         </SafeAreaView>
//     );
// }