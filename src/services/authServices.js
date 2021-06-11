import User from '../models/userModel.js'

 const registerService=async(data)=>{
     const res=await User.create(data)
    return res;
}

const findAllUsersService=async()=>{
    const res=await User.find({})
   return res;
}

const userByEmailService=async(email)=>{
      const user=await User.findOne({email})
      return user;
}

const loadUserService=async(_id)=>{
    const user= await User.findOne({_id})
    return user;
}

export {registerService, findAllUsersService,userByEmailService, loadUserService}
