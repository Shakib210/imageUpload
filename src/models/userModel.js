import mongoose from 'mongoose';

const { Schema} =mongoose

const userSchema = new Schema({
    role: {
        type: String,
        enum: ['admin', 'user','company']
    },
    firstName: {
        type: String,
    },
    lastName: {
         type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    address: { 
        type: String,
    }
}, {timestamps: true})

const User = mongoose.model('user', userSchema)

export default User;
