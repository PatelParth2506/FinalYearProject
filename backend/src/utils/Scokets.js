let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
    console.log(`User added: ${userId}, Socket ID: ${socketId}`);
    console.log('Current users:', users);
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log(`User removed: Socket ID: ${socketId}`);
  console.log('Current users:', users);
};

const getReceiverSocketId = (userId) => {
  console.log('Getting receiver socket ID for user:', userId);
  console.log('Current users:', users);
  const user = users.find((user) => user.userId === userId);
  return user ? user.socketId : null;
};

export { addUser, removeUser, getReceiverSocketId };