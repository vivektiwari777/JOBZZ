import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"please provide your email"],
        minLength: [3,"name must contain atleast 3 characters"],
        maxLength: [30,"name cannot exceed 30 charactres"],
    },
    email: {
        type: String,
        required: [true,"please provide your email"],
        validate: [validator.isEmail, "please provide a valid email"],
    },
    phone: {
        type: Number,
        required: [true, "please provide your phone number"],
    },
    password: {
        type: String,
        required: [true,"please provide your password"],
        minLength: [8,"password must contain 8 characters"],
        maxLength: [32,"password cannot exceed 32 characters"],
        select: false
    },
    role: {
        type: String,
        required: [true,"please provide your role"],
        enum: ["Job Seeker","Employer"],
    },
    createdAt: {
        type: Date,
        defalut: Date.now,
    }
});

// hashing the password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// comparing password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
//generating a jwt token for authorization
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};
export const User = mongoose.model("User",userSchema);