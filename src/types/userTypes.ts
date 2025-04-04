import { planType } from "./planTypes";

type BirthDateType = {
    day: number;
    month: number;
    year: number;
};

type measurementTypes = {
    value: number;
    unit: string;
};

type heightAndWeightType = {
    height: measurementTypes;
    weight: measurementTypes;
};

export type userType = {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    birthdate: BirthDateType;
    heightAndWeight: heightAndWeightType;
    fitnessGoal: string;
    plan: {
        currentPlans: planType[];
        otherPlans: planType[];
    };
    fitnessLevel: string;
    targetWeight: measurementTypes;
    equipment: string[];
    preferredTypes: string[];
    restDays: string[];
    location: string[];
    healthCondition: string[];
};

export type UserProfileTypes = {
    gender: "male" | "female";
    birthDate: BirthDateType;
    height: measurementTypes;
    weight: measurementTypes;
};

export type UserDetailsTypes = {
    userProfile: UserProfileTypes;
    fitnessGoal: string;
    fitnessLevel: string;
    targetWeight: measurementTypes;
    equipment: string[];
    preferredTypes: string[];
    restDays: string[];
    location: string[];
    healthCondition: string[];
};