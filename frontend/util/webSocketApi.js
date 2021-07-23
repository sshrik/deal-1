const sendSocket = (socket, sendData) => {
  socket.send(JSON.stringify(sendData));
};

export const addOpenRouting = (socket, id) => {
  socket.onopen = function (e) {
    sendSocket(socket, {
      protocol: 'open',
      url: '/',
      id: id,
    });
  };
};

export const sendChat = (
  socket,
  senderId,
  receiverId,
  productId,
  roomId,
  message
) => {
  sendSocket(socket, {
    protocol: 'post',
    url: '/',
    productId: productId,
    id: senderId,
    data: message,
    roomId: roomId,
    sendTo: receiverId,
  });
};

export const addMessageListener = (socket, callback) => {
  socket.onmessage = function (e) {
    const parsedData = JSON.parse(e.data);
    callback(parsedData);
  };
};
