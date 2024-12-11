import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {Application} from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import {Job} from "../models/jobSchema.js"

export const employerGetAllApplications = catchAsyncError(async (req,res,next) => {
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resources",400));
    }
    const {_id} = req.user;
    const applications = await Application.find({"employerID.user": _id});
    res.status(200).json({
        success: true,
        applications
    });
});

export const jobseekerGetAllApplications = catchAsyncError(async (req,res,next) => {
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resources",400));
    }
    const {_id} = req.user;
    const applications = await Application.find({"applicantID.user": _id});
    res.status(200).json({
        success: true,
        applications
    });
});

export const jobseekerDeleteApplication = catchAsyncError(async (req,res,next) => {
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resources",400));
    }
    const {id} = req.params;
    const application = await Application.findById(id);
    if(!application){
        return next(new ErrorHandler("Oops application not found"),404);
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "application deleted successfully!!"
    });
});

export const postApplication = catchAsyncError(async (req,res,next) => {
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resources",400));
    }
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("resume file required"));
    }
    const {resume} = req.files;
    const allowedFormats = ['image/png','image/jpeg','image/webp'];
    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("please upload your resume in png, jpg or webp format",400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("cloudinary error",cloudinaryResponse.error || "unknown cloudinary error");
        return next(new ErrorHandler("failed to upload resume",500));
    }
    const {name, email, coverLetter, address, phone, jobId} = req.body;
    const applicantID = {
        user: req.user._id,
        role: "Job Seeker"
    }
    if(!jobId){
        return next(new ErrorHandler("please give JobId",404));
    }
    const jobDetails = await Job.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler("Job Not Found",404));
    }
    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
    }
    if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return next(new ErrorHandler("please fill all field!!!",400));
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
       success: true,
       message: "Application submitted",
       application,
    });
});

