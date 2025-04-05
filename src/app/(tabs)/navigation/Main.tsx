import AuthStack from "./authStackNav";
import { useAuth } from "@/src/services/auth/authentication";
import MainStack from "./drawerNav";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import GetDetails from "../screens/OnBoarding/auth/getPersonalDetails/getDetails";

const MainLayout: React.FC = () => {
    const { isAuthenticated, needsDetails } = useAuth(); // Get needsDetails

    if (needsDetails) {
        return <GetDetails />; // Navigate to GetDetails screen if needsDetails is true
    }
    
    return isAuthenticated ? <MainStack /> : <AuthStack />;
};

export default MainLayout;
