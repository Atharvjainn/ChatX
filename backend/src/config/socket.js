import { Server } from 'socket.io'
import express from 'express'
import http from 'http'
import { CLIENT_URL } from './serverConfig.js'
import { socketAuthMiddleware } from '../middlewares/socketAuth-middleware.js'

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors : {
        origin : CLIENT_URL,
        credentials : true,
    }
});

io.use(socketAuthMiddleware)

export function getReceiverSocketId(userId){
    return userSocketmap[userId]
}

const userSocketmap = {}

io.on("connection",(socket) => {
    console.log("A user is connected",socket.user.fullName);

    const userId = socket.userId
    userSocketmap[userId] = socket.id

    io.emit('getOnlineUsers',Object.keys(userSocketmap))

    socket.on('disconnect',() => {
        console.log("A user disconnected",socket.user.fullName);
        delete userSocketmap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketmap));
    })
})

export {server,app,io}
