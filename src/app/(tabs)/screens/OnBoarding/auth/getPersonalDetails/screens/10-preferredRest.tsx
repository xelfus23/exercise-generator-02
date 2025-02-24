// import {
//     View,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     Animated,
//     useColorScheme,
// } from "react-native";
// import { useEffect, useRef, useState } from "react";
// import {
//     heightPercentageToDP as HP,
//     widthPercentageToDP as WP,
// } from "react-native-responsive-screen";
// import { useTheme } from "@react-navigation/native";
// import LottieView from "lottie-react-native";

// export default function RestDay({
//     selectedRestDay,
//     setSelectedRestDay,
//     setIndex,
//     scrollY,
//     activityLevel,
// }) {
//     const { colors } = useTheme();
//     const [submitted, setSubmitted] = useState(false);
//     const [restDayNum, setRestDayNum] = useState(null);
//     const [isNext, setIsNext] = useState(false);
//     const [recommendedRestDays, setRecommendedRestDays] = useState(null); // State for recommended days
//     const [error, setError] = useState(false);

//     const days = [
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//         "Sunday",
//     ];

//     const options = [
//         {
//             label: "No Rest Day",
//             value: 0,
//         },
//         {
//             label: "1",
//             value: 1,
//         },
//         {
//             label: "2",
//             value: 2,
//         },

//         {
//             label: "3 - 4",
//             value: 4,
//         },
//     ];

//     const scrollDownIcon =
//         useColorScheme() === "light"
//             ? require("@/assets/json/scrolldownDark.json")
//             : require("@/assets/json/scrolldown.json");

//     const moveScroll = scrollY.interpolate({
//         inputRange: [HP(900), HP(1000)],
//         outputRange: [0, HP(20)],
//         extrapolate: "clamp",
//     });

//     const scrollIconOpacity = scrollY.interpolate({
//         inputRange: [HP(900), HP(1000)],
//         outputRange: [1, 0], // Start at 0 and fade out
//         extrapolate: "clamp",
//     });

//     const fadeOutOpacity = scrollY.interpolate({
//         inputRange: [HP(900), HP(1000)],
//         outputRange: [1, 0],
//         extrapolate: "clamp",
//     });

//     const fadeAnim = useRef(new Animated.Value(1)).current;

//     const handleSubmit = () => {
//         if (selectedRestDay.length === 0) {
//             setError(true);
//             return;
//         }
//         runFadeAnimation();
//     };

//     const runFadeAnimation = () => {
//         Animated.timing(fadeAnim, {
//             toValue: 0,
//             duration: 1000,
//             useNativeDriver: true,
//         }).start(() => {
//             setSubmitted(true);
//             setIndex(10);
//         });
//     };

//     const handleItemPress = (item) => {
//         if (selectedRestDay.includes(item)) {
//             setSelectedRestDay((prev) => prev.filter((d) => d !== item));
//         } else if (selectedRestDay.length < restDayNum) {
//             setSelectedRestDay((prev) => [...prev, item]);
//         }
//     };

//     useEffect(() => {
//         let recommendation = null;

//         switch (activityLevel) {
//             case "Sedentary":
//                 recommendation = 2;
//                 break;
//             case "Lightly Active":
//                 recommendation = 2; //1-2 rest days
//                 break;
//             case "Moderate":
//                 recommendation = 1; //1 rest day
//                 break;
//             case "Very Active":
//                 recommendation = 1; //1 rest day, adjust based on intensity
//                 break;
//             case "Extra Active":
//                 recommendation = 0; //Potentially no dedicated rest days, focus on active recovery
//                 break;
//             default:
//                 recommendation = 1; // Default
//         }

//         setRecommendedRestDays(recommendation);
//     }, [activityLevel]);

//     const handleNext = (item) => {
//         setIsNext(true);
//         setRestDayNum(item);
//         setSelectedRestDay([]);
//     };

//     const handleBack = () => {
//         setIsNext(false);
//     };

//     return (
//         <View
//             style={{
//                 height: HP(100),
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: HP(3),
//             }}
//         >
//             {!submitted ? (
//                 <Animated.Text
//                     style={{
//                         fontSize: HP(3),
//                         textAlign: "center",
//                         fontFamily: "Outfit-Regular",
//                         width: WP(90),
//                         opacity: fadeAnim,
//                         color: colors.text,
//                     }}
//                 >
//                     {isNext
//                         ? restDayNum !== 0 &&
//                           "What day of they week do you prefer to rest?"
//                         : "How many rest days do you prefer each week?"}
//                 </Animated.Text>
//             ) : (
//                 <Animated.Text
//                     style={{
//                         fontSize: HP(2),
//                         textAlign: "center",
//                         fontFamily: "Outfit-Regular",
//                         width: WP(90),
//                     }}
//                 >
//                     Continue scrolling
//                 </Animated.Text>
//             )}

//             {!submitted && (
//                 <Animated.View
//                     style={{
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         gap: WP(4),
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: WP(90),
//                         opacity: fadeAnim,
//                     }}
//                 >
//                     {isNext ? (
//                         restDayNum === 0 ? (
//                             <Text
//                                 style={{
//                                     color: colors.text,
//                                     fontSize: HP(3),
//                                     fontFamily: "Outfit-regular",
//                                     textAlign: "center",
//                                 }}
//                             >
//                                 Are you sure you don't want to add rest days?
//                             </Text>
//                         ) : (
//                             days.map((day, index) => (
//                                 <TouchableOpacity
//                                     key={index}
//                                     style={{
//                                         backgroundColor:
//                                             selectedRestDay.includes(day)
//                                                 ? colors.primary
//                                                 : colors.secondary,
//                                         borderRadius: WP(4),
//                                         aspectRatio: 1,
//                                         width: WP(26),
//                                         justifyContent: "center",
//                                         alignItems: "center",
//                                     }}
//                                     activeOpacity={0.8}
//                                     onPress={() => handleItemPress(day)}
//                                 >
//                                     <Text
//                                         style={{
//                                             color: colors.white,
//                                             fontSize: HP(2),
//                                             fontFamily: "Outfit-Bold",
//                                         }}
//                                     >
//                                         {day}
//                                     </Text>
//                                 </TouchableOpacity>
//                             ))
//                         )
//                     ) : (
//                         options.map((v, i) => (
//                             <TouchableOpacity
//                                 key={i}
//                                 onPress={() => handleNext(v.value)}
//                                 style={{
//                                     width: WP(30),
//                                     backgroundColor:
//                                         i === recommendedRestDays
//                                             ? colors.success
//                                             : colors.secondary,
//                                     aspectRatio: 1,
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     borderRadius: WP(4),
//                                 }}
//                             >
//                                 <Text
//                                     style={{
//                                         color: colors.white,
//                                         fontFamily: "Outfit-Regular",
//                                         fontSize: i === 0 ? HP(2) : HP(3),
//                                         padding: WP(4),
//                                         textAlign: "center",
//                                     }}
//                                 >
//                                     {v.label}
//                                 </Text>
//                                 <Text
//                                     style={{
//                                         color: colors.white,
//                                         fontFamily: "Outfit-Regular",
//                                         fontSize: HP(1.5),
//                                         textAlign: "center",
//                                         position: "absolute",
//                                         bottom: HP(1),
//                                     }}
//                                 >
//                                     {i === recommendedRestDays && "Recommended"}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))
//                     )}
//                 </Animated.View>
//             )}

//             <Animated.View
//                 style={{
//                     flexDirection: "row",
//                     justifyContent: submitted ? "center" : "space-between",
//                     width: WP(80),
//                     position: "absolute",
//                     bottom: HP(3),
//                     alignItems: "center",
//                 }}
//             >
//                 {submitted ? (
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
//                 ) : (
//                     isNext && (
//                         <>
//                             <TouchableOpacity
//                                 onPress={isNext ? handleBack : handleSubmit}
//                                 style={{
//                                     width: WP(35),
//                                     backgroundColor: colors.secondary,
//                                     borderRadius: WP(4),
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     height: HP(6),
//                                 }}
//                             >
//                                 <Text
//                                     style={{
//                                         color: colors.white,
//                                         fontSize: HP(2),
//                                         padding: WP(3),
//                                         fontFamily: "Outfit-Bold",
//                                     }}
//                                 >
//                                     Back
//                                 </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={{
//                                     width: WP(35),
//                                     backgroundColor: colors.primary,
//                                     borderRadius: WP(4),
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     height: HP(6),
//                                 }}
//                                 onPress={handleSubmit}
//                             >
//                                 <Text
//                                     style={{
//                                         color: colors.white,
//                                         fontFamily: "Outfit-Bold",
//                                         fontSize: HP(2),
//                                         padding: WP(3),
//                                     }}
//                                 >
//                                     Submit
//                                 </Text>
//                             </TouchableOpacity>
//                         </>
//                     )
//                 )}
//             </Animated.View>
//         </View>
//     );
// }