import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  _userId: {
    type: mongoose.ObjectId,
    required: true,
  },
});

const Model = mongoose.model('Activity', ActivitySchema);

export default Model;
