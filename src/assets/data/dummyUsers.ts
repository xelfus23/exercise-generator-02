const getDate = (date: any) => {
    const dateVal = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const splittedDate = dateVal.split(" ");

    return {
        year: splittedDate[2],
        month: splittedDate[0],
        day: splittedDate[1],
        time: splittedDate[3],
        dayTime: splittedDate[4],
    };
};

const today = new Date();

export const ChatRooms = [
    {
        userId: "1",
        firstName: "Patrick",
        lastName: "Medenilla",
        image: require("@/src/assets/images/ui/photos/user-icon-02.png"),
        lastMessage: {
            message: "Nulla elit veniam minim tempor aliqua.",
            timestamp: {
                year: getDate(today).year,
                month: getDate(today).month,
                day: getDate(today).day,
                time: getDate(today).time,
                dayTime: getDate(today).dayTime,
            },
        },
        chats: [
            {
                userId: "patrick",
                message:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
            {
                userId: "potato",
                message:
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
            {
                userId: "potato",
                message: "Ut enim ad minim veniam",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
        ],
    },
    {
        userId: "2",
        firstName: "Mik",
        lastName: "Fajardo",
        image: require("@/src/assets/images/ui/photos/user-icon-03.png"),
        lastMessage: {
            message:
                "Ipsum duis quis aliquip deserunt anim tempor id id consectetur id cupidatat aliquip nostrud laboris.",
            timestamp: {
                year: getDate(today).year,
                month: getDate(today).month,
                day: getDate(today).day,
                time: getDate(today).time,
                dayTime: getDate(today).dayTime,
            },
        },
        chats: [
            {
                userId: "mik",
                message:
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
            {
                userId: "potato",
                message:
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
            {
                userId: "potato",
                message:
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
            {
                userId: "mik",
                message: "consequat.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
            {
                userId: "potato",
                message: "tion ullamco laboris nisi ut ea commodo consequat.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
            {
                userId: "mik",
                message: "laboris nisi ut consequat.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
        ],
    },
];
