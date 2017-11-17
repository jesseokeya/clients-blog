const socket = io();

$(document).ready(() => {
  handleSockets();
});

let handleSockets = () => {
  const check = window.location.pathname.includes('post');
  const containsAdmin = window.location.pathname.includes('admin');
  if (check && (containsAdmin === false)) {
    socket.on('success', (data) => {
      console.log(data.message);
    });
  }
}
