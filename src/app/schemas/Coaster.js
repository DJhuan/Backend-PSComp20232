import mongoose from '@/database';

const CoasterSchema = new mongoose.Schema({
  coasterName: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  coasterType: {
    type: String,
    required: true,
  },
  // images: [
  //   {
  //     type: String,
  //     required: true,
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  exitement: {
    type: Number,
    required: true,
  },
  nausea: {
    type: Number,
    required: true,
  },
  maxSpeed: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Coaster', CoasterSchema);
