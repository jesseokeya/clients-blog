const socket = io();

$(document).ready(() => {
  socket.on('success', function(data) {
    console.log(data.message);
  });

});
