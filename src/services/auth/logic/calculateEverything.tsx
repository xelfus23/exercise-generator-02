import { dummyPlanData } from "@/src/constants/dummy";

export const Calculator = () => {
    const today = new Date();
    const exercisePlans = dummyPlanData;

    let exerciseToday = [] as any,
        exerciseKeys = [] as any,
        everyExercise = [] as any,
        completedExerciseToday = [] as any,
        everyCompletedExercise = [] as any;

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

    exercisePlans?.forEach((plan: any) => {
        plan?.weeks?.map((week: any) => {
            week?.["days"]?.map((day: any) => {
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
                                completedExerciseToday = [
                                    ...completedExerciseToday,
                                    {
                                        exercise: exe,
                                        plan: plan,
                                    },
                                ];
                            }
                            exerciseToday.push({ exercise: exe, plan: plan });
                        }
                    });
                }

                day?.exercises?.map((exe: any) => {
                    exerciseKeys.push(exe.key);
                    everyExercise.push(exe);
                    if (exe.completed === true) {
                        everyCompletedExercise = [
                            ...everyCompletedExercise,
                            { exercise: exe, plan: plan },
                        ];
                    }
                });
            });
        });
    });

    const dayExercise = exerciseToday.filter(
        (exe: any) =>
            exe?.exercise?.name !== "Rest Day" && exe?.exercise?.name !== "Rest"
    );

    const daily = (completedExerciseToday?.length / dayExercise?.length) * 100;

    return {
        daily: daily,
        exerciseToday: exerciseToday,
        allCompletedExercise: everyCompletedExercise,
        completedExerciseToday: completedExerciseToday,
    };
};
