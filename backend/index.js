const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require('../client/src/config/action');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

const userSoeketMap = {};

const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((e) => {
        console.log('dd', e);
        return {
            socketId: e,
            username: userSoeketMap[e]
        }
    })
}



io.on('connection', (socket) => {
    // console.log(socket.id);

    socket.on('join', ({ roomId, userName }) => {
        userSoeketMap[socket.id] = userName;
        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);
        clients.map(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username: userName,
                socketId: socket.id
            })
        })
    })

    // socket.on('disconnect', () =>{
    //     const rooms = [...socket.rooms];
    //     rooms.forEach((roomId) =>{
    //         socket.in(roomId).emit(ACTIONS.DISCONNECTED,{

    //         })
    //     })
    // })

})


server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
})


