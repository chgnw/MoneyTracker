import express from 'express';
import cors from 'cors';
import transactionModel from './models/transactions.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json('test ok')
});

app.post('/api/transaction', async(req, res) => {   
    await mongoose.connect(process.env.MONGO_URL);
    const {date, price, name, desc} = req.body;

    const trans = await transactionModel.create({date, price, name, desc});


    res.json(trans);
});

app.get('/api/transactions', async(req, res) => {
    await mongoose.connect(process.env.MONGO_URL);

    const transactions = await transactionModel.find({});
    res.json(transactions);

});

app.listen(4040);