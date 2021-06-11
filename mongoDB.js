import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    // eslint-disable-next-line
    console.log(`MongoDB Connected to: ${conn.connection.host}`);
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
};

export default connectDB;
