import mongoose, { Schema } from 'mongoose';
import RecipientSchema from './Recipient';

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  field: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },   // Tell surveySchema it is going to belong to a certain user
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);