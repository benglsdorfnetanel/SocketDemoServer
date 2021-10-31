const Socket = require('socket.io');

class SocketService {
    constructor(server) {
        if (SocketService._instance) return SocketService._instance
        SocketService._instance = this;
        this.io = Socket(server, { cors: { origin: '*' } });
        this.server = server;
        this.socketDictionary = {};
        this.io.on("connection", socket => {
            socket.on('new-message', (message) => {
                io.emit('reciveMessage', `${message}`);
              })
            socket.on('disconnect', (data) => {
                console.log(`user disconnected ${socket.id}`);
            })
        });
    };
}

module.exports = SocketService;