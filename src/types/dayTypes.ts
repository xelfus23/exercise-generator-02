import { exerciseType } from "./planTypes";

export type dayType = {
    day: string;
    isToday: boolean;
    weekday: string;
    exe?: exerciseType[];
};
