import React, { useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileSettings from "../screens/Drawer/settings/settingsScreens/profile";
import SecuritySettings from "../screens/Drawer/settings/settingsScreens/security";
import NotificationSettings from "../screens/Drawer/settings/settingsScreens/notification";
import Settings from "../screens/Drawer/settings/settingsMain/settingsMain";

export interface routeProps {
    setRouteName: (v: string) => void;
    setShowHeader: (v: boolean) => void;
}

const SettingsStackNav: React.FC<routeProps> = ({
    setRouteName,
    setShowHeader,
}) => {
    const Stack = createStackNavigator();

    // Define the components with the props as a separate function
    const SettingsScreen = () => (
        <Settings setRouteName={setRouteName} setShowHeader={setShowHeader} />
    );

    const ProfileSettingsScreen = () => (
        <ProfileSettings
            setRouteName={setRouteName}
            setShowHeader={setShowHeader}
        />
    );

    const SecuritySettingsScreen = () => (
        <SecuritySettings
            setRouteName={setRouteName}
            setShowHeader={setShowHeader}
        />
    );

    const NotificationSettingsScreen = () => (
        <NotificationSettings
            setRouteName={setRouteName}
            setShowHeader={setShowHeader}
        />
    );

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="settings-main"
        >
            <Stack.Screen name="settings-main" component={SettingsScreen} />
            <Stack.Screen
                name="profile-settings"
                component={ProfileSettingsScreen}
            />
            <Stack.Screen
                name="security-settings"
                component={SecuritySettingsScreen}
            />
            <Stack.Screen
                name="notification-settings"
                component={NotificationSettingsScreen}
            />
        </Stack.Navigator>
    );
};

export default SettingsStackNav;
