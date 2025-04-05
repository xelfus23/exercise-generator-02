import React, { createContext, useState, useEffect, useContext } from "react";
import {
    dummyOtherPlanData,
    dummyPlanData,
} from "@/src/assets/data/dummyExercise";
import { exerciseType, planType } from "@/src/types/planTypes";
import {
    UserDetailsTypes,
    UserProfileTypes,
    userType,
} from "@/src/types/userTypes";
// import { useNavigation, useRouter } from "expo-router"; // REMOVE THIS IMPORT
import { useNavigation, useRouter } from "expo-router";

interface authContextProps {
    children: React.ReactNode; // Use React.ReactNode for children
}

interface AuthContextType {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>; // Correct type for setUser
    isAuthenticated: boolean;
    login: (
        email: string,
        password: string
    ) => Promise<{ success: boolean; error?: string }>;
    signup: (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<{ success: boolean; error?: string }>;
    setUserDetails: (
        userProfile: UserProfileTypes,
        fitnessGoal: string,
        fitnessLevel: string,
        targetWeight: {
            value: number;
            unit: string;
        },
        equipment: string[],
        preferredTypes: string[],
        restDays: string[],
        location: string[],
        healthCondition: string[]
    ) => Promise<{ success: boolean }>;
    exerciseToday: any;
    dailyProgress: number;
    everyExercise: any;
    everyCompletedExercise: any;
    completedExerciseToday: any;
    updateUserData: (uid: string) => Promise<void>; // Changed to async Promise<void> and added uid
    setPlanData: (v: any) => void;
    setOtherPlanData: (v: any) => void;
    needsDetails: boolean; // Add this line
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {}, // Provide an empty function
    isAuthenticated: false,
    login: async () => ({ success: false }),
    logout: async () => ({ success: false }),
    signup: async () => ({ success: false }),
    setUserDetails: async () => ({ success: false }),
    exerciseToday: [],
    dailyProgress: 0,
    everyExercise: [],
    everyCompletedExercise: [],
    completedExerciseToday: [],
    updateUserData: async () => {},
    setPlanData: () => {},
    setOtherPlanData: () => {},
    needsDetails: false, // Add this line
});

// const initialUser: userType = {
//     uid: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     gender: "",
//     birthdate: {
//         day: 0,
//         month: 0,
//         year: 0,
//     },
//     heightAndWeight: {
//         height: {
//             value: 0,
//             unit: "cm",
//         },
//         weight: {
//             value: 0,
//             unit: "kg",
//         },
//     },
//     fitnessGoal: "",
//     plan: {
//         currentPlans: [],
//         otherPlans: [],
//     },
//     fitnessLevel: "",
//     targetWeight: {
//         value: 0,
//         unit: "kg",
//     },
//     equipment: [],
//     preferredTypes: [],
//     restDays: [],
//     location: [],
//     healthCondition: [],
// };

export const AuthContextProvider: React.FC<authContextProps> = ({
    children,
}) => {
    const [user, setUser] = useState<userType | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [everyExercise, setEveryExercise] = useState<any>([]);
    const [exerciseToday, setExerciseToday] = useState<any>([]);
    const [dailyProgress, setDailyProgress] = useState<number>(0);
    const [everyCompletedExercise, setEveryCompletedExercise] = useState<any>(
        []
    );
    const [completedExerciseToday, setCompletedExerciseToday] = useState<any>(
        []
    );
    const [needsDetails, setNeedsDetails] = useState<boolean>(false); // ADD THIS LINE

    const [planData, setPlanData] = useState(dummyPlanData);
    const [otherPlanData, setOtherPlanData] = useState(dummyOtherPlanData);

    const today = new Date();
    let exerciseKeys: any[] = [];

    const navigation = useNavigation();

    const calculateEverything = () => {
        console.log("Calculating Everything...");

        let newExerciseToday: any[] = [];
        let newCompletedExerciseToday: any[] = [];
        let newEveryCompletedExercise: any[] = [];
        let newEveryExercise: any[] = [];
        let newProgress = 0;

        if (!planData || planData.length === 0) {
            console.warn("planData is empty or null.  Skipping calculation.");
            return false; // Or handle the empty state appropriately
        }

        for (const plan of planData) {
            for (const week of plan.weeks) {
                for (const day of week.days) {
                    if (day.exercises.length === 0) continue;

                    const newToday = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                    );

                    const match = newToday.toISOString() === day.date;

                    if (match) {
                        day.exercises.forEach((exe: any) => {
                            if (exe) {
                                if (exe.completed === true) {
                                    newCompletedExerciseToday.push({
                                        exercise: exe,
                                        plan: plan,
                                    });
                                }

                                newExerciseToday.push({
                                    exercise: exe,
                                    plan: plan,
                                });
                            }
                        });
                    }

                    day.exercises.forEach((exe: any) => {
                        exerciseKeys.push(exe.key);
                        newEveryExercise.push(exe);
                        if (exe.completed === true) {
                            newEveryCompletedExercise.push({
                                exercise: exe,
                                plan: plan,
                            });
                        }
                    });
                }
            }
        }

        newProgress =
            (newCompletedExerciseToday?.length / newExerciseToday?.length) *
            100;

        setExerciseToday(newExerciseToday);
        setCompletedExerciseToday(newCompletedExerciseToday);
        setEveryCompletedExercise(newEveryCompletedExercise);
        setEveryExercise(newEveryExercise);
        setDailyProgress(newProgress);

        // console.log("newExerciseToday:", newExerciseToday);
        // console.log("newCompletedExerciseToday:", newCompletedExerciseToday);
    };

    // const checkDetails = () => {
    //     console.log("Checking details...");
    //     console.log(user);
    //     if (isAuthenticated && !user?.uid) {
    //         console.log("Routing");
    //         navigation.navigate("Details");
    //     }
    // };

    useEffect(() => {
        if (user?.uid) {
            updateUserData(user.uid);
            calculateEverything();
        }
    }, [user?.uid]);

    useEffect(() => {
        setNeedsDetails(isAuthenticated && !user?.uid); // SET needsDetails here
        console.log(user);

        console.log({ isAuthenticated, user });
    }, [isAuthenticated, user, user?.uid]);

    const updateUserData = async (uid: string) => {
        try {
            const fetchedUser: userType = {
                uid: uid,
                firstName: "Potato",
                lastName: "Fries",
                email: "potato.fries@email.com",
                plan: {
                    currentPlans: planData,
                    otherPlans: otherPlanData,
                },
                gender: "",
                birthdate: {
                    day: 0,
                    month: 0,
                    year: 0,
                },
                heightAndWeight: {
                    height: {
                        value: 0,
                        unit: "",
                    },
                    weight: {
                        value: 0,
                        unit: "",
                    },
                },
                fitnessGoal: "",
                fitnessLevel: "",
                targetWeight: {
                    value: 0,
                    unit: "",
                },
                equipment: [],
                preferredTypes: [],
                restDays: [],
                location: [],
                healthCondition: [],
            };

            setUser(fetchedUser);
        } catch (e) {
            console.warn("Error updating user data:", e);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const newId = "potato";
            await updateUserData(newId);
            setIsAuthenticated(true);
            return { success: true };
        } catch (e) {
            console.error("Login failed:", e);
            return { success: false, error: "Invalid credentials" };
        }
    };

    const signup = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        try {
            setIsAuthenticated(true);
            return { success: true };
        } catch (e) {
            console.error("Signup failed:", e);
            return { success: false, error: "Failed to create user" };
        }
    };

    const setUserDetails = async (
        userProfile: UserProfileTypes,
        fitnessGoal: string,
        fitnessLevel: string,
        targetWeight: {
            value: number;
            unit: string;
        },
        equipment: string[],
        preferredTypes: string[],
        restDays: string[],
        location: string[],
        healthCondition: string[]
    ): Promise<{ success: boolean }> => {
        try {
            setIsAuthenticated(true);
            const newId = "potato";
            await updateUserData(newId);

            return { success: true };
        } catch (e) {
            console.error("Setting user details failed:", e);
            return { success: false };
        }
    };

    const logout = async () => {
        setUser(null);
        setIsAuthenticated(false);
        return { success: true };
    };

    const value: AuthContextType = {
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
        signup,
        setUserDetails,
        exerciseToday,
        dailyProgress,
        everyExercise,
        everyCompletedExercise,
        completedExerciseToday,
        updateUserData,
        setPlanData,
        setOtherPlanData,
        needsDetails, // ADD THIS LINE
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("userAuth must be used within an AuthContextProvider");
    }
    return context;
};
