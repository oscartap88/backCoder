import mongoose from "mongoose";


const msgSchema = new mongoose.Schema({
    user: {type: String, required: true, max :100 },
    message: {type: String, required: true, max :100}
},
{ timestamps: true,
  versionKey: false },
);

export const msgModel = mongoose.model ( 'messages', msgSchema);