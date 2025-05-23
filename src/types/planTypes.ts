type distanceType = {
    type: string;
    value: number;
};

export type exerciseType = {
    key: string;
    name: string;
    description: string;
    categories: string[];
    benefits: string[];
    muscleGroups: string[];
    instructions: string[];
    reminders: string[];
    reps?: number;
    sets?: number;
    distance?: distanceType;
    duration?: number;
    equipment: string[];
    calorieBurn: number;
    completed: boolean;
    animation: string[];
};

export type dayType = {
    dayDescription: string;
    dayObjectives: string[];
    estimatedTime: number;
    completed: boolean;
    dayKey: string;
    weekday: string;
    date: string;
    motivation: string;
    exerciseTips: string;
    exercises: exerciseType[];
};

export type weekType = {
    weekNumber: number;
    weekDescription: string;
    weekKey: string;
    weekObjectives: string[];
    days: dayType[];
};

export type planType = {
    planTitle: string;
    planDescription: string;
    generalObjectives: string[];
    weeks: weekType[];
};
