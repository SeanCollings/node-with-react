import mongoose, { Schema } from 'mongoose';

const recipientSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  responded: { type: Boolean, default: false }
});

export default recipientSchema;