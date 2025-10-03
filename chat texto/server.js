const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('chat message', data => {
    io.emit('chat message', data); // Envía mensaje, apodo e imagen a todos los usuarios
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
