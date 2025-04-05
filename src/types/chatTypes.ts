export type timeStampType = {
    year: string | number;
    month: string | number;
    day: string | number;
    time: string | number;
    dayTime: string | number;
};

export type lastMessageType = {
    message: string;
    timestamp: timeStampType;
};

export type chatsType = {
    message: string;
    timestamp: timeStampType;
};

export type ChatRoomType = {
    userId: string;
    firstName: string;
    lastName: string;
    image: string;
    lastMessage: lastMessageType;
    chats: chatsType[];
};
