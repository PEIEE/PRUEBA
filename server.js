const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let users = {};

io.on('connection', socket => {
  // Configura perfil de usuario
  socket.on('set profile', profile => {
    users[socket.id] = profile;
    io.emit('users list', Object.values(users));
  });

  // Mensaje de chat
  socket.on('chat message', data => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('users list', Object.values(users));
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
