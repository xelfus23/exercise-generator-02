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
        id: "1",
        title: "Room 1",
        lastMessage: "Hello, how are you?",
        lastMessageTimestamp: getDate(today),
        user: {
            id: "1",
            name: "John Doe",
            avatar: "https://example.com/avatar.jpg",
        },
        chats: [
            {
                role: "0",
                message: "Nulla elit veniam minim tempor aliqua.",
                timestamp: {
                    year: getDate(today).year,
                    month: getDate(today).month,
                    day: getDate(today).day,
                    time: getDate(today).time,
                    dayTime: getDate(today).dayTime,
                },
            },
            {
                role: "1",
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
        ],
    },
];
