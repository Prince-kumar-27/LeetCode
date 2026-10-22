import mongoose from "mongoose";
const{Schema} = mongoose;

const userSchema = new Schema({
    firstName :{
        type:String,
        required:true,
        minLength:3,
        maxLength:20

    },
    LastName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:10
    },
    emailID:{
        type:String,
        required:true,
        unique:true,
        trim: true

    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"This si the default photo"
    }


},{timestamps:true})

const User = mongoose.model("user", userSchema);
export default User;