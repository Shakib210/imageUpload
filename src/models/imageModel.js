import mongoose from "mongoose";

const { Schema } = mongoose;
const imageModel = new Schema({
  image: {
    size: Number,
    img: Buffer,
    contentType:String
  },
  name:{
    type:String
  }
  
});

const ImageModel = mongoose.model("image", imageModel);
export default ImageModel;
