import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/coasters', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

export default mongoose;
