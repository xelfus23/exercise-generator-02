import {
    dummyOtherPlanData,
    dummyPlanData,
} from "@/src/assets/data/dummyExercise";
import {
    UserDetailsTypes,
    UserProfileTypes,
    userType,
} from "@/src/types/userTypes";
import React, { createContext, useState, useEffect, useContext } from "react";

interface authContextProps {
    children: any;
}

interface AuthContextType {
    user: userType | null;
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
}

const AuthContext = createContext<AuthContextType>({
    user: null,
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
});

export const AuthContextProvider: React.FC<authContextProps> = ({
    children,
}) => {
    const initialUser = {
        uid: "0",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        birthdate: {
            day: 0,
            month: 0,
            year: 0,
        },
        heightAndWeight: {
            height: {
                value: 0,
                unit: "cm",
            },
            weight: {
                value: 0,
                unit: "kg",
            },
        },
        fitnessGoal: "",
        plan: {
            currentPlans: [],
            otherPlans: [],
        },
        fitnessLevel: "",
        targetWeight: {
            value: 0,
            unit: "kg",
        },
        equipment: [],
        preferredTypes: [],
        restDays: [],
        location: [],
        healthCondition: [],
    };

    const [user, setUser] = useState<userType>(initialUser);
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
    const today = new Date();
    const exercisePlans = user.plan.currentPlans;

    let exerciseKeys = [] as any;

    const [dayExercise, setDayExercise] = useState<any>([]);

    const todayFormatted = today.toLocaleString("en-US", {
        month: "numeric",
        day: "numeric", // Include day for comparison
        year: "numeric",
        timeZone: "Asia/Manila",
    });

    const todayWeekDay = today.toLocaleString("en-US", {
        weekday: "long",
        timeZone: "Asia/Manila",
    });

    const todayParts = todayFormatted.split("/") as any; // Split by '/'

    const newTodayFormatted = `${todayWeekDay}, ${todayParts[0] - 1}/${Number(
        todayParts[1]
    )}/${todayParts[2].trim()}`; // Rebuild formatted date with adjusted month

    const todayYear = new Date().getFullYear();
    const todayMonth = new Date().getMonth(); // Adjust to 1-based month
    const todayDate = new Date().getDate();
    const newToday = new Date(todayYear, todayMonth, todayDate);

    const calculateEverything = () => {
        setExerciseToday([]);
        setCompletedExerciseToday([]);
        setEveryCompletedExercise([]);
        setEveryExercise([]);

        exercisePlans?.forEach((plan: any) => {
            plan?.weeks?.map((week: any) => {
                week?.days?.map((day: any) => {
                    const dayFormatted = `${day?.weekday}, ${day?.month}/${day?.date}/${day?.year}`;
                    if (day?.exercises?.length === 0) return;
                    // const dayDateObj = new Date(dayYear, dayMonth , dayDate);
                    // const dayDateOjb = new Date(day?.year, day?.month, day?.date);
                    // if (dayDateOjb < newToday) {
                    //     addCompletedDay(day);
                    // }
                    if (newTodayFormatted === dayFormatted) {
                        day?.exercises?.map((exe: any) => {
                            if (exe) {
                                if (exe.completed === true) {
                                    setCompletedExerciseToday((prev: any) => [
                                        ...prev,
                                        {
                                            exercise: exe,
                                            plan: plan,
                                        },
                                    ]);
                                }

                                setExerciseToday((prev: any) => [
                                    ...prev,
                                    {
                                        exercise: exe,
                                        plan: plan,
                                    },
                                ]);
                            }
                        });
                    }

                    day?.exercises?.map((exe: any) => {
                        exerciseKeys.push(exe.key);
                        setEveryExercise(exe);
                        if (exe.completed === true) {
                            setEveryCompletedExercise((prev: any) => [
                                ...prev,
                                { exercise: exe, plan: plan },
                            ]);
                        }
                    });
                });
            });
        });

        setDayExercise(
            exerciseToday.filter(
                (exe: any) =>
                    exe?.exercise?.name !== "Rest Day" &&
                    exe?.exercise?.name !== "Rest"
            )
        );

        setDailyProgress(
            (completedExerciseToday?.length / dayExercise?.length) * 100
        );
    };

    useEffect(() => {
        calculateEverything();
    }, [user]);

    useEffect(() => {
        updateUser(0);
        checkDetails();
    }, [isAuthenticated]);

    const checkDetails = () => {
        if (user.gender === "male" || "female") {
            // Check if the user already done sumitting their details.
        }

        // if not, redirect the users to getDetals screen.
    };

    const updateUser = async (uid: number) => {
        try {
            setUser({
                ...user,
                firstName: "John",
                lastName: "Myers",
                email: "user@test.com",
                plan: {
                    currentPlans: [...dummyPlanData] as any,
                    otherPlans: [...dummyOtherPlanData] as any,
                },
            });
        } catch (e) {
            console.warn(e);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await updateUser(0);
            setIsAuthenticated(true);
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    };

    const signup = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        try {
            await updateUser(0);
            // setIsAuthenticated(true);
            return { success: true };
        } catch (e) {
            return { success: false };
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
            await updateUser(0);
            setIsAuthenticated(true);
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    };

    const logout = async () => {
        setUser(initialUser);
        setIsAuthenticated(false);
        return { success: true };
    };

    const value: AuthContextType = {
        user,
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
