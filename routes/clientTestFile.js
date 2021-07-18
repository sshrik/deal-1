// Client에선 이렇게 사용하면 됩니다.
let socket = new WebSocket('ws://localhost:3000/');

socket.onopen = function (e) {
  let sendData = { protocol: 'open', url: '/' };
  socket.send(JSON.stringify(sendData));
};

socket.onmessage = function (e) {
  console.log('we have a message');
  console.log(e.data.toString());
  setTimeout((e) => {
    socket.send(
      JSON.stringify({ protocol: 'get', url: '/', data: 'hello server!' })
    );
    console.log('Sending!');
  }, 200);
};

socket.onclose = function (e) {
  console.log('socket closed');
  if (e.wasClean) {
    console.log('clean close');
    console.log(e.code);
    console.log(e.reason);
  } else {
    console.log('conection died');
    console.log(e.code);
  }
};
