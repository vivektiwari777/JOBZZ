import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
   name: {
     type: String,
     required: [true,"please provide your name"],
     minLength: [3,"name must contain atleast three characters"],
     maxLength: [30,"name cannot exceed 30 characters"],
   },
   email: {
      type: String,
      validator: [validator.isEmail,"please provide a valid email"],
      required: [true,"please provide your email"], 
   },
   coverLetter: {
    type: String,
    required: [true,"please provide your cover letter"],
   },
   phone: {
    type: Number,
    required: [true,"please provide your phone number"],
   },
   address: {
    type: String,
    required: [true,"please provide your address"],
   },
   resume: {
     public_id: {
        type: String,
        required: true,
     },
     url: {
        type: String,
        required: true,
     }
   },
    applicantID: {
        user: {
            type: mongoose.Schema.ObjectId,
            res: "user",
            required: true,
        },
        role: {
            type: String,
            enum: ["Job Seeker"],
            required: true,
        }
    },
    employerID: {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            required: true,
        },
        role: {
            type: String,
            enum: ["Employer"],
            required: true,
        }
    },
});

export const Application = mongoose.model("Application",applicationSchema);