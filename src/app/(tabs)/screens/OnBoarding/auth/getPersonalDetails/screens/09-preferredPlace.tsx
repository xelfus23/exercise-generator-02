// import {
//     View,
//     Text,
//     Pressable,
//     Animated,
//     TouchableOpacity,
//     Image,
//     useColorScheme,
// } from "react-native";
// import React, { useRef, useState } from "react";
// import {
//     heightPercentageToDP as HP,
//     widthPercentageToDP as WP,
// } from "react-native-responsive-screen";
// import LottieView from "lottie-react-native";
// import { useTheme } from "@react-navigation/native";
// import { HexToHexa } from "@/constants/hexToHexa";

// export default function PreferablePlaces({
//     setSelectedPlaces,
//     selectedPlaces,
//     next,
//     scrollY,
//     setIndex,
// }) {
//     const { colors } = useTheme();
//     const places = [
//         {
//             name: "Home",
//             description:
//                 "A personal and private space, typically inside a house or apartment, where you can relax, live, and manage daily activities. It's easily accessible, allowing you to have flexibility in your schedule.",
//             icon: require("@/assets/images/ui/home.png"),
//         },
//         {
//             name: "Outdoor",
//             description:
//                 "Any open, natural environment such as parks, fields, or beaches. It provides fresh air, natural scenery, and a space that can be used for recreational activities, walking, or socializing.",
//             icon: require("@/assets/images/ui/outdoor.png"),
//         },
//         {
//             name: "Gym",
//             description:
//                 "A fitness center or facility equipped with machines, free weights, and other exercise tools. It’s a controlled environment specifically designed for training and physical exercise.",
//             icon: require("@/assets/images/ui/gym.png"),
//         },
//     ];

//     const [error, setError] = useState(null);
//     const [isSubmitted, setSubmitted] = useState(false);
//     const AnimatedTouchableOpacity =
//         Animated.createAnimatedComponent(TouchableOpacity);

//     const updateSelectedItem = (item) => {
//         setSelectedPlaces((prev) => {
//             if (prev?.includes(item)) {
//                 return prev.filter((selectedItem) => selectedItem !== item);
//             } else {
//                 return [...prev, item];
//             }
//         });
//     };
//     const scrollDownIcon =
//         useColorScheme() === "light"
//             ? require("@/assets/json/scrolldownDark.json")
//             : require("@/assets/json/scrolldown.json");

//     const handleNext = () => {
//         if (selectedPlaces?.length === 0) {
//             setError("Please select at least one place.");
//         } else {
//             runFadeAnimation();
//         }
//     };

//     const fadeAnim = useRef(new Animated.Value(1)).current;

//     const moveScroll = scrollY.interpolate({
//         inputRange: [HP(600), HP(700)],
//         outputRange: [0, HP(20)],
//         extrapolate: "clamp",
//     });

//     const scrollIconOpacity = scrollY.interpolate({
//         inputRange: [HP(600), HP(700)],
//         outputRange: [1, 0], // Start at 0 and fade out
//         extrapolate: "clamp",
//     });

//     const fadeOutOpacity = scrollY.interpolate({
//         inputRange: [HP(600), HP(700)],
//         outputRange: [1, 0],
//         extrapolate: "clamp",
//     });

//     const runFadeAnimation = () => {
//         Animated.timing(fadeAnim, {
//             toValue: 0,
//             duration: 1000,
//             useNativeDriver: true,
//         }).start(() => {
//             setSubmitted(true);
//             setIndex(7);
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
//                 <Animated.View
//                     style={{
//                         marginTop: HP(4),
//                         width: WP(100),
//                         alignItems: "center",
//                         gap: HP(2),
//                         opacity: fadeAnim,
//                     }}
//                 >
//                     <Text
//                         style={{
//                             color: colors.text,
//                             fontFamily: "Outfit-Regular",
//                             fontSize: HP(3),
//                             textAlign: "center",
//                             padding: WP(4),
//                         }}
//                     >
//                         Where do you prefer doing your exercise?
//                     </Text>
//                     <Text
//                         style={{
//                             color: colors.text,
//                             fontSize: HP(1.6),
//                             textAlign: "center",
//                             fontFamily: "Outfit-Regular",
//                         }}
//                     >
//                         you can choose one or more
//                     </Text>
//                 </Animated.View>
//             ) : (
//                 <Animated.View
//                     style={{
//                         marginTop: HP(4),
//                         width: WP(100),
//                         alignItems: "center",
//                         gap: HP(2),
//                         opacity: fadeOutOpacity,
//                     }}
//                 >
//                     <Text
//                         style={{
//                             color: colors.text,
//                             fontFamily: "Outfit-Regular",
//                             fontSize: HP(2),
//                             textAlign: "center",
//                             width: WP(70),
//                         }}
//                     >
//                         Continue scrolling
//                     </Text>
//                 </Animated.View>
//             )}

//             {!isSubmitted && (
//                 <Animated.View
//                     style={{
//                         marginHorizontal: WP(5),
//                         marginTop: HP(3),
//                         borderRadius: WP(4),
//                         width: WP(90),
//                         padding: HP(1),
//                         gap: HP(1),
//                         opacity: fadeAnim,
//                     }}
//                 >
//                     {places.map((item, index) => (
//                         <Pressable
//                             key={index}
//                             onPress={() => updateSelectedItem(item.name)}
//                         >
//                             <View
//                                 style={{
//                                     justifyContent: "space-between",
//                                     alignItems: "center",
//                                     borderRadius: WP(4),
//                                     borderWidth: 1,
//                                     borderColor: selectedPlaces?.includes(
//                                         item.name
//                                     )
//                                         ? colors.primary
//                                         : colors.secondary,
//                                     padding: HP(1),
//                                     paddingHorizontal: HP(2),
//                                     flexDirection: "row",
//                                     gap: WP(4),
//                                     backgroundColor: selectedPlaces?.includes(
//                                         item.name
//                                     )
//                                         ? colors.primary
//                                         : HexToHexa(colors.secondary, 0.2),
//                                 }}
//                             >
//                                 <View
//                                     style={{
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         width: "30%",
//                                     }}
//                                 >
//                                     <Image
//                                         source={item.icon}
//                                         style={{
//                                             tintColor: selectedPlaces?.includes(
//                                                 item.name
//                                             )
//                                                 ? colors.white
//                                                 : colors.text,
//                                             aspectRatio: 1,
//                                             height: HP(3),
//                                             opacity: selectedPlaces?.includes(
//                                                 item.name
//                                             )
//                                                 ? 1
//                                                 : 0.5,
//                                         }}
//                                     />
//                                     <Text
//                                         style={{
//                                             color: selectedPlaces?.includes(
//                                                 item.name
//                                             )
//                                                 ? colors.white
//                                                 : colors.text,
//                                             fontSize: HP(2),
//                                             elevation: selectedPlaces?.includes(
//                                                 item.name
//                                             )
//                                                 ? 4
//                                                 : 0,
//                                             opacity: selectedPlaces?.includes(
//                                                 item.name
//                                             )
//                                                 ? 1
//                                                 : 0.5,
//                                             fontFamily: "Outfit-Regular",
//                                         }}
//                                     >
//                                         {item.name}
//                                     </Text>
//                                 </View>

//                                 <Text
//                                     style={{
//                                         color: selectedPlaces?.includes(
//                                             item.name
//                                         )
//                                             ? colors.white
//                                             : colors.text,
//                                         fontSize: HP(1.5),
//                                         width: WP(50),
//                                         fontFamily: "Outfit-Regular",
//                                     }}
//                                 >
//                                     {item.description}
//                                 </Text>
//                             </View>
//                         </Pressable>
//                     ))}
//                 </Animated.View>
//             )}

//             {error && (
//                 <Animated.Text
//                     style={{
//                         color: colors.error,
//                         textAlign: "center",
//                         paddingVertical: HP(2),
//                         opacity: fadeAnim,
//                     }}
//                 >
//                     {error}
//                 </Animated.Text>
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
//                 {!isSubmitted && selectedPlaces?.length > 0 ? (
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
//                     selectedPlaces.length > 0 && (
//                         <Animated.View
//                             style={{
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 height: HP(15),
//                                 transform: [{ translateY: moveScroll }], // Use interpolated value
//                                 opacity: scrollIconOpacity,
//                             }}
//                         >
//                             <LottieView
//                                 source={scrollDownIcon}
//                                 autoPlay
//                                 loop
//                                 style={{
//                                     height: "100%",
//                                     aspectRatio: 1,
//                                     zIndex: 1000,
//                                 }}
//                             />
//                         </Animated.View>
//                     )
//                 )}
//             </Animated.View>
//         </View>
//     );
// }