import dotenv from 'dotenv';
import { createServer } from 'http';
import app from './app.js';
import sequelize from './config/db.config.js';
import initializeSocket from './sockets/socket.js';
import { startCronJobs } from './jobs.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const httpServer = createServer(app);
const io = initializeSocket(httpServer);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('✅ Database connected and models synchronized.');
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
      startCronJobs();
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });
