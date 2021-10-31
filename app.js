const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const port = process.env.PORT || 4000;
const socket = require('socket.io');

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

const server = app.listen(port, () => {
  console.log(`app is up listen: ${port}`);
});

let io = socket(server, {
    cors: {
      origin: '*',
    }
})

//Socket Area
io.on('connection', (socket) => {
  console.log(socket.id)
    socket.on('new-message', (message) => {
      console.log(message.data);
        io.emit('ReceiveMessage', `${message.data}`);
      })
      socket.on('disconnect', (data) => {
        console.log(`user disconnected ${socket.id}`);
      })
});
