import mongoose from "@/database";
import Slugify from "@/utils/Slugify";

const CoasterSchema = new mongoose.Schema({
  coasterName: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
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
  mainImage: {
    type: String,
    required: false,
  },
  images: [
    {
      type: String,
    },
  ],
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
  link: {
    type: String,
    required: true,
  },
});

CoasterSchema.pre("save", function (next) {
  const coName = this.coasterName;
  this.slug = Slugify(coName);
  next();
});

export default mongoose.model("Coaster", CoasterSchema);
