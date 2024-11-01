
import { model, Schema } from 'mongoose';


const transactionSchema = new Schema({
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
});


const transactionModel = model('Transaction', transactionSchema);

export default transactionModel;