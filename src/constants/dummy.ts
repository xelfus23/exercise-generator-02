const today = new Date();

const next7Days = [];

for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);

    nextDay.setDate(today.getDate() + i);
    next7Days.push(nextDay);
}

const next7DaysData = next7Days.map((day) => {
    const formattedDate = day.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Manila",
    });

    const parts = formattedDate.split(" ");

    const monthNumbers = day.getMonth(); // Access month number (0-11)
    return {
        weekday: parts[0].replace(",", ""),
        month: parts[1].replace(",", ""),
        day: parts[2].replace(",", ""),
        year: parts[3].replace(",", ""),
        monthNumber: monthNumbers,
    };
});

export const dummyPlanData = [
    {
        planTitle: "Patrick's Home Fitness Plan",
        planDescription:
            "This beginner-friendly home workout plan is designed for Patrick John Medenilla, focusing on strength training, flexibility, and core work.  Exercises are chosen to be easily performed at home with minimal equipment.  The plan emphasizes proper form and gradual progression to avoid injury and maximize results. Rest is crucial; ensure adequate sleep and hydration.",
        generalObjectives: [
            "Increase strength and muscle mass.",
            "Improve posture and flexibility",
            "Enhance overall fitness and well-being",
            "Reduce Stress",
        ],
        weeks: [
            {
                weekNumber: 1,
                weekDescription:
                    "Week 1 focuses on establishing a consistent workout routine and building a foundation of strength and flexibility.  Start with lighter weights or resistance and focus on proper form.  Listen to your body and rest when needed.",
                weekKey: "a1b2c3d4",
                weekObjectives: [
                    "Establish consistent workout routine.",
                    "Build foundational strenth",
                    "Improve basic flexibility",
                    "Learn proper exercise form",
                ],
                days: next7DaysData.map((day, index) => {
                    const dayKey = `day${index + 1}`; // "day1", "day2", etc.

                    return {
                        dayDescription:
                            "Duis non mi vehicula, ultricies eros sit amet, vulputate felis. Nulla hendrerit nunc vitae mattis pharetra. Mauris justo nisi, pretium vel ex sed, ultricies tristique ex. Mauris venenatis volutpat ex, sed tristique libero tincidunt a. Suspendisse rhoncus erat eu neque rutrum iaculis. In nunc odio, maximus sit amet tortor eu, varius suscipit leo. Nunc efficitur justo dapibus nibh scelerisque, id pharetra diam auctor. Fusce imperdiet blandit arcu, at mollis ipsum cursus sit amet.",
                        dayObjectives: [
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            "Duis bibendum mi vel mauris sagittis, eu finibus enim tincidunt.",
                            "Etiam volutpat massa sit amet ex elementum fringilla at a augue",
                            "Vestibulum et leo id lorem convallis hendrerit.",
                        ],
                        estimatedTime: 1800,
                        completed: false,
                        dayKey: `${dayKey}`,
                        weekday: `${day.weekday}`,
                        date: day.day,
                        month: day.monthNumber,
                        year: day.year,
                        motivation: "You got this!",
                        exerciseTips: "Focus on form!",
                        exercises: [
                            {
                                key: `fex1-${dayKey}`,
                                name: "Jumping Jacks",
                                description:
                                    "A full-body cardio exercise where you jump while spreading your arms and legs outward.",
                                categories: ["Category 1", "Category 2"],
                                benefits: ["Benefit 1", "Benefit 2"],
                                muscleGroups: [
                                    "Chest",
                                    "Shoulders",
                                    "Triceps",
                                    "Core",
                                ],
                                instructions: [
                                    "instructions 1",
                                    "instructions 2",
                                ],
                                exerciseTips: "Exercise Tips",
                                reps: 8,
                                sets: 3,
                                distance: 0,
                                type: "reps",
                                duration: 0,
                                equipment: ["None"],
                                calories: 3,
                                completed: false,
                            },
                            {
                                key: `ex2-${dayKey}`,
                                name: "Push Ups",
                                description:
                                    "A bodyweight exercise that targets the chest, shoulders, and triceps.",
                                categories: ["Category 1", "Category 2"],
                                benefits: ["Benefit 1", "Benefit 2"],
                                muscleGroups: ["Legs", "Arms", "Core"],
                                instructions: [
                                    "instructions 1",
                                    "instructions 2",
                                ],
                                exerciseTips: "Exercise tips",
                                reps: 0,
                                sets: 1,
                                distance: 0,
                                type: "duration",
                                duration: 30,
                                equipment: ["None"],
                                calories: 3,
                                completed: true,
                            },
                            {
                                key: `ex3-${dayKey}`,
                                name: "Jogging",
                                description:
                                    "A steady-paced running exercise to improve cardiovascular health and endurance.",
                                categories: ["Category 1", "Category 2"],
                                benefits: ["Benefit 1", "Benefit 2"],
                                muscleGroups: ["Legs", "Core"],
                                instructions: [
                                    "instructions 1",
                                    "instructions 2",
                                ],
                                exerciseTips:
                                    "Keep a good posture and avoid leaning too far forward or backward. Stay hydrated before and after your jog.",
                                reps: 0,
                                sets: 1,
                                distance: 2,
                                type: "distance",
                                duration: 0,
                                equipment: ["None"],
                                calories: 200,
                                completed: true,
                            },
                        ],
                    };
                }),
            },
        ],
    },
];
