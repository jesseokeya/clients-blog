const socket = io();

$(document).ready(() => {
  handleSockets();
});

let handleSockets = () => {
  const check = windowLocation.includes('post');
  const containsAdmin = windowLocation.includes('admin');
  if (check && (containsAdmin === false)) {
    socket.on('success', (data) => {
      console.log(data.message);
    });
  }
}
