import { Server } from 'socket.io';
const io = new Server({
    cors: {
        origin: 'http://localhost',
    },
});
io.on('connection', (socket) => {
    console.log(socket.id);
    // イベント発行
    socket.emit('hello', 'from server');
    // イベント受信
    socket.on('message', (message) => {
        console.log(`from client: ${message}`);
        io.emit('hello2', 'from server2');
    });
    // 切断イベント受信
    socket.on('disconnect', (reason) => {
        console.log(`user disconnected. reason is ${reason}.`);
    });
});
io.listen(3000);
//# sourceMappingURL=socket-server.js.map