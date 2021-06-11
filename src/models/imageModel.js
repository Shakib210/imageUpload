import mongoose from "mongoose";

const { Schema } = mongoose;
const imageModel = new Schema({
  image: {
    name: String,
    image: Buffer,
  },
  name:{
      type: String,
  }
});

const ImageModel = mongoose.model("image", imageModel);
export default ImageModel;
