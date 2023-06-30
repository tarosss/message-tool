import {Server} from 'socket.io';


interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    hello: (a: string) => string;
    hello2: (a: string) => string;
    message: (message: string) => void;
  }
  
  interface ClientToServerEvents {
    hello: () => void;
    message: (message: string) => void;

  }
  
  interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>({  
    cors: {
        origin: "http://localhost"
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);
  
    // イベント発行
    socket.emit("hello", "from server");
    
    // イベント受信
    socket.on("message", (message) => {
      console.log(`from client: ${message}`)
      io.emit("hello2", "from server2")
    });
  
    // 切断イベント受信
    socket.on("disconnect", (reason) => {
      console.log(`user disconnected. reason is ${reason}.`);
    });
  });

io.listen(3000)