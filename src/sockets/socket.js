import { Server } from 'socket.io';
import { verifySocketToken } from '../api/middlewares/auth.middleware.js';

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
    },
  });

  io.use(verifySocketToken);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join_conversation', (conversationId) => {
      socket.join(conversationId);
      console.log(`User ${socket.id} joined conversation ${conversationId}`);
    });

    socket.on('leave_conversation', (conversationId) => {
      socket.leave(conversationId);
      console.log(`User ${socket.id} left conversation ${conversationId}`);
    });

    socket.on('send_message', (data) => {
      const { conversationId, message } = data;
      io.to(conversationId).emit('receive_message', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

export default initializeSocket;
