let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getReceiverSocketId = (userId) => {
  const user = users.find((user) => user.userId === userId);
  return user ? user.socketId : null;
};

export { addUser, removeUser, getReceiverSocketId };