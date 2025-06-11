const express = require('express');
const cors = require('cors');
const http = require('http');
const { sequelize } = require('./models');
const { Server } = require('socket.io');

// Routes
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comment');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Routes ใช้งาน
app.use('/api/posts', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', authRoutes);

// สร้าง HTTP Server แยก
const server = http.createServer(app);

// Socket.io
const io = new Server(server, { cors: { origin: '*' } });
app.set('io', io);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ alter: true });  // ใช้ alter:true เพื่อปรับ schema
    console.log('✅ Database synced');

    server.listen(PORT, () => {
      console.log(`🚀 Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Sync error:', error);
    process.exit(1);
  }
})();
