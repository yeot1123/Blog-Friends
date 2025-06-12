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


app.use(express.json());


app.use(cors({
  origin: 'http://localhost:8080',  // frontend origin ที่ใช้จริง
  methods: ['GET', 'POST'],
  credentials: true
}));


app.use('/api/posts', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', authRoutes);

// สร้าง HTTP Server
const server = http.createServer(app);

// สร้าง Socket.io Server และตั้งค่า CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true
  }
});


app.set('io', io);

// Event ของ Socket.io
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
    await sequelize.sync({ alter: true });  // ปรับ schema ถ้าจำเป็น
    console.log('✅ Database synced');

    server.listen(PORT, () => {
      console.log(`🚀 Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Sync error:', error);
    process.exit(1);
  }
})();
