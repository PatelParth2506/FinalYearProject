const users = new Map();

export const addUser = (userId, socketId) => {
    users.set(userId, socketId);
};

export const removeUser = (socketId) => {
    for (let [userId, id] of users.entries()) {
        if (id === socketId) {
            users.delete(userId);
            break;
        }
    }
};

export const getReceiverSocketId = (userId) => {
    return users.get(userId);
};