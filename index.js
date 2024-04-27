require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const port = process.env.PORT || 3001;
const db = require('./models');

app.use(cors());
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

const userRouter = require('./routes/User');
app.use('/users', userRouter);

const messagesRouter = require('./routes/Messages');
app.use('/messages', messagesRouter);
const groupsRouter = require('./routes/Groups');
app.use('/groups', groupsRouter);
const addUsersRouter = require('./routes/AddUsers');
app.use('/addAndSearch', addUsersRouter);

const groupsRouter = require('./routes/Groups');
app.use('/groups', groupsRouter);

const addUsersRouter = require('./routes/AddUsers'); 
app.use('/addAndSearch', addUsersRouter);

const uploadsRouter = require('./routes/Uploads');
app.use('/uploads', uploadsRouter);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    },
});
//  io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`);
//     socket.on('message', (message) => {
//         socket.join(message.groupId);
//         io.emit('newMessage', message);
//         console.log("message--------------------",message);
//        // socket.disconnect();
//     });
       
//     socket.on('disconnect', () => {
//         socket.disconnect();
//         console.log(`User disconnected: ${socket.id}`);
//     });
// })
io.on('error', (error) => {
    console.error('Socket.IO Error:', error);
});
db.sequelize.sync().then(()=>{
    server.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}); 
