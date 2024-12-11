import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"please provide job title"],
        minLength: [3,"job title must contain at least 3 characters"],
        maxLength: [50,"job title cannot exceed 50 characters"],
    },
    description: {
        type: String,
        required: [true,"please provide job description"],
        minLength: [10,"job description must contain at least 50 characters"],
        maxLength: [350,"job description cannot exceed 350 characters"],
    },
    city: {
        type: String,
        required: [true, "Please provide a city name."],
    },
    category: {
        type: String,
        required: [true,"job category is required"],
    },
    country: {
        type: String,
        required: [true,"job city is required"],
    },
    location: {
        type: String,
        required: [true,"please provide exact location"],
        minLength:[5,"job location must contain 50 characters"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4,"fixed salary contain at least 4 digits"],
        maxLength: [9,"fixed salary cannot exceed 9 digits"],
    },
    salaryFrom: {
        type: Number,
        minLength: [4,"salary From must contain at least 4 digits"],
        maxLength: [9,"salary From cannot exceed 9 digits"],
    },
    salaryTo: {
        type: Number,
        minLength: [4,"salaryTo must contain at least 4 digits"],
        maxLength: [9,"salaryTo cannot exceed 9 digits"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Job = mongoose.model("Job",jobSchema);