import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import orderRoutes from '../src/routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import adminAuthRoutes from "./routes/adminAuthRoutes.js"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/auth', adminAuthRoutes);

mongoose.connect("mongodb+srv://johnpatel:swArg1lZ5Iw6btp5@backend.sqelu.mongodb.net/youtube", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

export default app