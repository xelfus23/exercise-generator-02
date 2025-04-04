import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type ExerciseScreenParams = {
    item: any; // Replace 'any' with the actual type of your item
    sets: number;
    value: number;
};

export type ExerciseStackParamList = {
    mainExercise: undefined; // Or the correct params if it takes any
    exerciseScreen: ExerciseScreenParams; // Use your existing type
};

export type MainDashboardParams = {
    // Add parameters that MainDashboard might receive, e.g.,
    // userId?: string;
};
export type MainHomeParams = {
    // Add parameters that MainHome might receive, e.g.,
};

export type MainExerciseParams = {
    exerciseScreen: ExerciseScreenParams;
};

export type AuthStackParamList = {
    Start: undefined;
    Login: undefined;
    SignUp: undefined;
    Details: undefined;
    // Add other screens in your AuthStack if you have them.
};

export type HomeStackParamList = {
    Dashboard: MainDashboardParams; // Use the specific param list
    Home: MainHomeParams; // Use the specific param list
    Exercise: MainExerciseParams; // Use the specific param list
};

export type ChatStackParamList = {
    ChatHeads: undefined;
    ChatScreen: { user: any };
};

export type DrawerStackParamList = {
    HomeDrawer: undefined;
    SettingsDrawer: undefined;
    ChatDrawer: undefined;
    Notification: undefined;
};

export type HomeScreenProps<T extends keyof HomeStackParamList> = {
    navigation: BottomTabNavigationProp<HomeStackParamList, T>;
    route: RouteProp<HomeStackParamList, T>;
};
