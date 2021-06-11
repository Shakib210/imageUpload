import mongoose from 'mongoose';

const {Schema} =mongoose
const postModel= new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true,
    },
    heading:{
        type:String,
        required: true,
    },
    description:{
        type:String,
         required: true,
    },
    requirement:{
        type: String,
         required: true,
    },
    salary:{
        type: String,
         required: true,
    },
    address:{
        type: String,
         required: true,
    }
})

const Post= mongoose.model('post',postModel)
export default Post