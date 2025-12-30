import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from "cookie-parser";

import 'dotenv/config';

import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cardRoutes from './routes/cartRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

const port = process.env.PORT

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.use('/api/user', userRoutes)

app.use('/api/products', productRoutes);

app.use('/api/admin', adminRoutes)

app.use('/api/cart', cardRoutes)

app.use('/api/payment', paymentRoutes)

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));




app.listen(port, console.log('Server is Running'))