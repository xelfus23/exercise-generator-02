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
        planTitle: "John's Home Fitness Plan",
        planDescription:
            "This beginner-friendly home workout plan is designed for John Myers, focusing on strength training, flexibility, and core work.  Exercises are chosen to be easily performed at home with minimal equipment.  The plan emphasizes proper form and gradual progression to avoid injury and maximize results. Rest is crucial; ensure adequate sleep and hydration.",
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
                        weekday: String(day.weekday),
                        date: String(day.day),
                        month: String(day.monthNumber),
                        year: String(day.year),
                        motivation: "You got this!",
                        exerciseTips: "Focus on form!",
                        exercises: [
                            {
                                key: "ex1-001",
                                name: "Jumping Jacks",
                                description:
                                    "A full-body cardio exercise where you jump while spreading your arms and legs outward.",
                                categories: ["Cardio", "Full Body"],
                                benefits: [
                                    "Improves cardiovascular endurance",
                                    "Enhances coordination",
                                    "Engages the entire body",
                                ],
                                muscleGroups: [
                                    "Legs",
                                    "Arms",
                                    "Core",
                                    "Shoulders",
                                ],
                                instructions: [
                                    "Stand with your feet together and arms at your sides.",
                                    "Jump while spreading your legs shoulder-width apart and raising your arms above your head.",
                                    "Jump again to return to the starting position.",
                                    "Repeat for the set duration or repetitions.",
                                ],
                                reminders: [
                                    "Land softly on the balls of your feet to reduce impact.",
                                    "Maintain a steady rhythm for consistent cardio benefits.",
                                    "Keep your core engaged throughout the movement.",
                                ],
                                reps: 0,
                                sets: 2,
                                distance: 0,
                                type: "duration",
                                duration: 30,
                                equipment: ["None"],
                                calorieBurn: 10,
                                completed: false,
                                animation: [
                                    require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-01.svg"),
                                    require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-02.svg"),
                                    require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-03.svg"),
                                    require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-04.svg"),
                                    require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-05.svg"),
                                    require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-06.svg"),
                                ],
                            },
                            {
                                key: "ex2-002",
                                name: "Push-Ups",
                                description:
                                    "A bodyweight exercise that targets the chest, shoulders, and triceps.",
                                categories: ["Strength", "Upper Body"],
                                benefits: [
                                    "Builds upper body strength",
                                    "Improves core stability",
                                    "Enhances muscle endurance",
                                ],
                                muscleGroups: [
                                    "Chest",
                                    "Triceps",
                                    "Shoulders",
                                    "Core",
                                ],
                                instructions: [
                                    "Start in a high plank position with hands slightly wider than shoulder-width apart.",
                                    "Lower your body until your chest nearly touches the ground.",
                                    "Keep your elbows at a 45-degree angle and your core engaged.",
                                    "Push through your palms to return to the starting position.",
                                    "Repeat for the desired number of repetitions.",
                                ],
                                reminders: [
                                    "Keep your body in a straight line from head to heels.",
                                    "Avoid flaring your elbows too wide to protect your shoulders.",
                                    "Engage your core to prevent lower back sagging.",
                                ],
                                reps: 10,
                                sets: 2,
                                distance: 0,
                                type: "reps",
                                duration: 0,
                                equipment: ["None"],
                                calorieBurn: 5,
                                completed: index !== 0 ? false : true,
                            },
                            {
                                key: "ex3-003",
                                name: "Jogging",
                                description:
                                    "A steady-paced running exercise to improve cardiovascular health and endurance.",
                                categories: ["Cardio", "Endurance"],
                                benefits: [
                                    "Boosts heart health",
                                    "Increases stamina",
                                    "Strengthens leg muscles",
                                ],
                                muscleGroups: ["Legs", "Core"],
                                instructions: [
                                    "Start at a comfortable pace, keeping your posture upright.",
                                    "Maintain a steady breathing pattern to regulate oxygen intake.",
                                    "Land softly on your midfoot to reduce impact on joints.",
                                    "Continue jogging for the set distance or duration.",
                                ],
                                reminders: [
                                    "Wear proper running shoes for better support.",
                                    "Stay hydrated before and after jogging.",
                                    "Avoid leaning too far forward or backward to maintain balance.",
                                ],
                                reps: 0,
                                sets: 1,
                                distance: {
                                    type: "km",
                                    value: 1,
                                },
                                type: "distance",
                                duration: 0,
                                equipment: ["None"],
                                calorieBurn: 100,
                                completed: index !== 0 ? false : true,
                            },
                        ],
                    };
                }),
            },
        ],
    },
];

export const dummyOtherPlanData = [
    {
        planTitle: "John Beginner's Bodyweight Plan",
        planDescription:
            "This is a bodyweight workout plan designed for beginners who want to improve their overall fitness. It focuses on fundamental exercises that can be performed anywhere, without any equipment. The plan emphasizes proper form, controlled movements, and gradual progression to build a solid foundation for more advanced training.",
        generalObjectives: [
            "Improve overall strength and endurance.",
            "Increase flexibility and mobility.",
            "Develop body awareness and control.",
            "Establish a consistent workout routine.",
        ],
        weeks: [
            {
                weekNumber: 1,
                weekDescription:
                    "This first week is all about getting started and building consistency. Focus on learning the proper form for each exercise and listen to your body. Don't be afraid to modify exercises to suit your fitness level. Rest and recovery are just as important as the workouts themselves.",
                weekKey: "week1-bodyweight",
                weekObjectives: [
                    "Learn proper form for basic bodyweight exercises.",
                    "Increase muscular endurance.",
                    "Improve joint mobility and flexibility.",
                    "Establish a consistent workout schedule.",
                ],
                days: next7DaysData.map((day, index) => {
                    const dayKey = `day${index + 1}`; // "day1", "day2", etc.

                    let dayDescription = "";
                    let dayObjectives = [];
                    let exercises = [];

                    switch (index) {
                        case 0: // Monday - Focus: Full Body Activation
                            dayDescription =
                                "Today's workout focuses on activating all major muscle groups with low-impact exercises. The goal is to warm up your body and prepare it for the week ahead.";
                            dayObjectives = [
                                "Increase blood flow to muscles.",
                                "Improve joint mobility.",
                                "Activate core muscles.",
                                "Prepare body for more intense workouts.",
                            ];
                            exercises = [
                                {
                                    key: "ex1-004",
                                    name: "Arm Circles",
                                    description:
                                        "Small, controlled circles with your arms to warm up shoulder muscles.",
                                    categories: ["Warm-up", "Mobility"],
                                    benefits: [
                                        "Improves shoulder mobility",
                                        "Increases blood flow to upper body",
                                    ],
                                    muscleGroups: ["Shoulders", "Arms"],
                                    instructions: [
                                        "Stand with your feet shoulder-width apart and arms extended to the sides.",
                                        "Make small circles with your arms, gradually increasing the size of the circles.",
                                        "Repeat in both forward and backward directions.",
                                    ],
                                    reminders: [
                                        "Keep your core engaged throughout the movement.",
                                        "Avoid shrugging your shoulders.",
                                        "Maintain a controlled pace.",
                                    ],
                                    reps: 0,
                                    sets: 2,
                                    distance: 0,
                                    type: "duration",
                                    duration: 30,
                                    equipment: ["None"],
                                    calorieBurn: 5,
                                    completed: false,
                                    animation: [
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-01.svg"),
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-02.svg"),
                                    ],
                                },
                                {
                                    key: "ex2-005",
                                    name: "Bodyweight Squats",
                                    description:
                                        "A fundamental exercise for lower body strength and mobility.",
                                    categories: ["Strength", "Lower Body"],
                                    benefits: [
                                        "Strengthens legs and glutes",
                                        "Improves hip mobility",
                                    ],
                                    muscleGroups: [
                                        "Quads",
                                        "Hamstrings",
                                        "Glutes",
                                    ],
                                    instructions: [
                                        "Stand with your feet shoulder-width apart and toes slightly pointed out.",
                                        "Lower your body as if sitting in a chair, keeping your back straight and core engaged.",
                                        "Go as low as you can comfortably, ideally until your thighs are parallel to the ground.",
                                        "Push through your heels to return to the starting position.",
                                    ],
                                    reminders: [
                                        "Keep your knees behind your toes.",
                                        "Maintain a straight back.",
                                        "Engage your core throughout the movement.",
                                    ],
                                    reps: 10,
                                    sets: 2,
                                    distance: 0,
                                    type: "reps",
                                    duration: 0,
                                    equipment: ["None"],
                                    calorieBurn: 8,
                                    completed: false,
                                },
                            ];
                            break;
                        case 1: // Tuesday - Focus: Core Strength
                            dayDescription =
                                "Today is dedicated to strengthening your core muscles. A strong core is essential for stability, balance, and injury prevention.";
                            dayObjectives = [
                                "Strengthen abdominal muscles.",
                                "Improve core stability.",
                                "Enhance balance and posture.",
                            ];
                            exercises = [
                                {
                                    key: "ex3-006",
                                    name: "Plank",
                                    description:
                                        "A static exercise that engages all core muscles for improved stability and endurance.",
                                    categories: ["Strength", "Core"],
                                    benefits: [
                                        "Strengthens core muscles",
                                        "Improves posture",
                                        "Enhances stability",
                                    ],
                                    muscleGroups: [
                                        "Abs",
                                        "Lower Back",
                                        "Shoulders",
                                    ],
                                    instructions: [
                                        "Start in a push-up position with your forearms on the ground, elbows directly under your shoulders.",
                                        "Keep your body in a straight line from head to heels, engaging your core muscles.",
                                        "Hold the position for the set duration.",
                                    ],
                                    reminders: [
                                        "Avoid sagging your hips.",
                                        "Keep your core engaged throughout the movement.",
                                        "Breathe deeply and consistently.",
                                    ],
                                    reps: 0,
                                    sets: 3,
                                    distance: 0,
                                    type: "duration",
                                    duration: 30,
                                    equipment: ["None"],
                                    calorieBurn: 6,
                                    completed: false,
                                    animation: [
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-03.svg"),
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-04.svg"),
                                    ],
                                },
                            ];
                            break;
                        default: // Rest of the week - Minimal content
                            dayDescription =
                                "Active Recovery Day. Light stretching and walking.";
                            dayObjectives = [
                                "Promote blood flow",
                                "Reduce Muscle Soreness",
                            ];
                            exercises = [
                                {
                                    key: "ex4-007",
                                    name: "Walking",
                                    description:
                                        "A gentle walk to promote blood flow and recovery.",
                                    categories: ["Cardio", "Recovery"],
                                    benefits: [
                                        "Improves circulation",
                                        "Reduces muscle soreness",
                                    ],
                                    muscleGroups: ["Legs"],
                                    instructions: [
                                        "Walk at a comfortable pace for the set duration.",
                                    ],
                                    reminders: [
                                        "Stay hydrated",
                                        "Enjoy the scenery",
                                    ],
                                    reps: 0,
                                    sets: 1,
                                    distance: { type: "km", value: 0.5 },
                                    type: "distance",
                                    duration: 0,
                                    equipment: ["None"],
                                    calorieBurn: 30,
                                    completed: false,
                                    animation: [
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-05.svg"),
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-06.svg"),
                                    ],
                                },
                            ];
                            break;
                    }

                    return {
                        dayDescription: dayDescription,
                        dayObjectives: dayObjectives,
                        estimatedTime: 1200, // Reduced time
                        completed: false,
                        dayKey: `${dayKey}`,
                        weekday: String(day.weekday),
                        date: String(day.day),
                        month: String(day.monthNumber),
                        year: String(day.year),
                        motivation: "Keep pushing! You're doing great!",
                        exerciseTips: "Focus on proper form over speed.",
                        exercises: exercises,
                    };
                }),
            },
        ],
    },
    {
        planTitle: "AI-Generated Beginner's Bodyweight Plan",
        planDescription:
            "This is a bodyweight workout plan designed for beginners who want to improve their overall fitness. It focuses on fundamental exercises that can be performed anywhere, without any equipment. The plan emphasizes proper form, controlled movements, and gradual progression to build a solid foundation for more advanced training.",
        generalObjectives: [
            "Improve overall strength and endurance.",
            "Increase flexibility and mobility.",
            "Develop body awareness and control.",
            "Establish a consistent workout routine.",
        ],
        weeks: [
            {
                weekNumber: 1,
                weekDescription:
                    "This first week is all about getting started and building consistency. Focus on learning the proper form for each exercise and listen to your body. Don't be afraid to modify exercises to suit your fitness level. Rest and recovery are just as important as the workouts themselves.",
                weekKey: "week1-bodyweight",
                weekObjectives: [
                    "Learn proper form for basic bodyweight exercises.",
                    "Increase muscular endurance.",
                    "Improve joint mobility and flexibility.",
                    "Establish a consistent workout schedule.",
                ],
                days: next7DaysData.map((day, index) => {
                    const dayKey = `day${index + 1}`; // "day1", "day2", etc.

                    let dayDescription = "";
                    let dayObjectives = [];
                    let exercises = [];

                    switch (index) {
                        case 0: // Monday - Focus: Full Body Activation
                            dayDescription =
                                "Today's workout focuses on activating all major muscle groups with low-impact exercises. The goal is to warm up your body and prepare it for the week ahead.";
                            dayObjectives = [
                                "Increase blood flow to muscles.",
                                "Improve joint mobility.",
                                "Activate core muscles.",
                                "Prepare body for more intense workouts.",
                            ];
                            exercises = [
                                {
                                    key: "ex1-004",
                                    name: "Arm Circles",
                                    description:
                                        "Small, controlled circles with your arms to warm up shoulder muscles.",
                                    categories: ["Warm-up", "Mobility"],
                                    benefits: [
                                        "Improves shoulder mobility",
                                        "Increases blood flow to upper body",
                                    ],
                                    muscleGroups: ["Shoulders", "Arms"],
                                    instructions: [
                                        "Stand with your feet shoulder-width apart and arms extended to the sides.",
                                        "Make small circles with your arms, gradually increasing the size of the circles.",
                                        "Repeat in both forward and backward directions.",
                                    ],
                                    reminders: [
                                        "Keep your core engaged throughout the movement.",
                                        "Avoid shrugging your shoulders.",
                                        "Maintain a controlled pace.",
                                    ],
                                    reps: 0,
                                    sets: 2,
                                    distance: 0,
                                    type: "duration",
                                    duration: 30,
                                    equipment: ["None"],
                                    calorieBurn: 5,
                                    completed: false,
                                    animation: [
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-01.svg"),
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-02.svg"),
                                    ],
                                },
                                {
                                    key: "ex2-005",
                                    name: "Bodyweight Squats",
                                    description:
                                        "A fundamental exercise for lower body strength and mobility.",
                                    categories: ["Strength", "Lower Body"],
                                    benefits: [
                                        "Strengthens legs and glutes",
                                        "Improves hip mobility",
                                    ],
                                    muscleGroups: [
                                        "Quads",
                                        "Hamstrings",
                                        "Glutes",
                                    ],
                                    instructions: [
                                        "Stand with your feet shoulder-width apart and toes slightly pointed out.",
                                        "Lower your body as if sitting in a chair, keeping your back straight and core engaged.",
                                        "Go as low as you can comfortably, ideally until your thighs are parallel to the ground.",
                                        "Push through your heels to return to the starting position.",
                                    ],
                                    reminders: [
                                        "Keep your knees behind your toes.",
                                        "Maintain a straight back.",
                                        "Engage your core throughout the movement.",
                                    ],
                                    reps: 10,
                                    sets: 2,
                                    distance: 0,
                                    type: "reps",
                                    duration: 0,
                                    equipment: ["None"],
                                    calorieBurn: 8,
                                    completed: false,
                                },
                            ];
                            break;
                        case 1: // Tuesday - Focus: Core Strength
                            dayDescription =
                                "Today is dedicated to strengthening your core muscles. A strong core is essential for stability, balance, and injury prevention.";
                            dayObjectives = [
                                "Strengthen abdominal muscles.",
                                "Improve core stability.",
                                "Enhance balance and posture.",
                            ];
                            exercises = [
                                {
                                    key: "ex3-006",
                                    name: "Plank",
                                    description:
                                        "A static exercise that engages all core muscles for improved stability and endurance.",
                                    categories: ["Strength", "Core"],
                                    benefits: [
                                        "Strengthens core muscles",
                                        "Improves posture",
                                        "Enhances stability",
                                    ],
                                    muscleGroups: [
                                        "Abs",
                                        "Lower Back",
                                        "Shoulders",
                                    ],
                                    instructions: [
                                        "Start in a push-up position with your forearms on the ground, elbows directly under your shoulders.",
                                        "Keep your body in a straight line from head to heels, engaging your core muscles.",
                                        "Hold the position for the set duration.",
                                    ],
                                    reminders: [
                                        "Avoid sagging your hips.",
                                        "Keep your core engaged throughout the movement.",
                                        "Breathe deeply and consistently.",
                                    ],
                                    reps: 0,
                                    sets: 3,
                                    distance: 0,
                                    type: "duration",
                                    duration: 30,
                                    equipment: ["None"],
                                    calorieBurn: 6,
                                    completed: false,
                                    animation: [
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-03.svg"),
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-04.svg"),
                                    ],
                                },
                            ];
                            break;
                        default: // Rest of the week - Minimal content
                            dayDescription =
                                "Active Recovery Day. Light stretching and walking.";
                            dayObjectives = [
                                "Promote blood flow",
                                "Reduce Muscle Soreness",
                            ];
                            exercises = [
                                {
                                    key: "ex4-007",
                                    name: "Walking",
                                    description:
                                        "A gentle walk to promote blood flow and recovery.",
                                    categories: ["Cardio", "Recovery"],
                                    benefits: [
                                        "Improves circulation",
                                        "Reduces muscle soreness",
                                    ],
                                    muscleGroups: ["Legs"],
                                    instructions: [
                                        "Walk at a comfortable pace for the set duration.",
                                    ],
                                    reminders: [
                                        "Stay hydrated",
                                        "Enjoy the scenery",
                                    ],
                                    reps: 0,
                                    sets: 1,
                                    distance: { type: "km", value: 0.5 },
                                    type: "distance",
                                    duration: 0,
                                    equipment: ["None"],
                                    calorieBurn: 30,
                                    completed: false,
                                    animation: [
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-05.svg"),
                                        require("@/src/assets/images/ui/exercises/jumping-jacks/jumping-jacks-06.svg"),
                                    ],
                                },
                            ];
                            break;
                    }

                    return {
                        dayDescription: dayDescription,
                        dayObjectives: dayObjectives,
                        estimatedTime: 1200, // Reduced time
                        completed: false,
                        dayKey: `${dayKey}`,
                        weekday: String(day.weekday),
                        date: String(day.day),
                        month: String(day.monthNumber),
                        year: String(day.year),
                        motivation: "Keep pushing! You're doing great!",
                        exerciseTips: "Focus on proper form over speed.",
                        exercises: exercises,
                    };
                }),
            },
        ],
    },
];
