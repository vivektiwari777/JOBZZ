import React,{useState,useContext,useEffect} from 'react';
import "./App.css";
import {Context} from "./main";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login  from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import axios from "axios";
import {Toaster} from "react-hot-toast";

const App = () => {
  const  {isAuthorised,setIsAuthorised,setUser} = useContext(Context);

  useEffect(() => {
     const fetchUser = async () => {
      try{
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser",{withCredentials: true});
        setUser(response.data.user);
        setIsAuthorised(true);
      }catch(error){
        setIsAuthorised(false);
      }
     };
     fetchUser();
  },[isAuthorised]);

  return (
    <Router>
      <Navbar />
       <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/Register" element={<Register />} />
         <Route path="/" element={<Home />} />
         <Route path="/job/getall" element={<Jobs />} />
         <Route path="/job/:id" element={<JobDetails />} />
         <Route path="/job/post" element={<PostJob />} />
         <Route path="job/me" element={<MyJobs />} />
         <Route path="/application/:id" element={<Application />} />
         <Route path="/application/me" element={<MyApplications />} />
         <Route path="*" element={<NotFound />} />
       </Routes>
       <Footer />
       <Toaster />
    </Router>
  )
}

export default App;
