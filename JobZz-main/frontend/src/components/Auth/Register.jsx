import React,{useState,useContext} from 'react';
import axios from "axios";
import {FaRegUser} from "react-icons/fa";
import { FaPencilAlt} from 'react-icons/fa';
import {Link,Navigate} from "react-router-dom";
import toast from "react-hot-toast";
import {Context} from "../../main";
import {MdOutlineMailOutline} from "react-icons/md";
import {RiLock2Fill} from "react-icons/ri";
import {FaPhoneFlip} from "react-icons/fa6";

const Register = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [name,setName] = useState("");
  const [role,setRole] = useState("");
  const {isAuthorised,setIsAuthorised,user,setUser} = useContext(Context);
   
  const handleRegister = async (e) => {
     e.preventDefault();
     try{
       const {data} = await axios.post("http://localhost:4000/api/v1/user/register",
        {name,email,password,phone,role},
        {withCredentials: true,headers: {"content-Type": "application/json",},});
       toast.success(data.message);
       setName("");
       setEmail("");
       setPhone("");
       setRole("");
       setPassword("");
       setIsAuthorised(true);
     }catch(error){
       toast.error(error.response.data.message);
     }
  };
  if(isAuthorised){
    return <Navigate to={"/"} />;
  }
  return (
    <>
       <div className="authPage">
          <div className='container'>
               <div className='header'>
                  <img src="/JobZeelogo.png" alt="logo" />
                  <h3>Create a new account</h3>
               </div>
               <form>
                 <div className="inputTag">
                   <label>Register As</label>
                   <div>
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                      <option value="">Select Role</option>
                      <option value="Employer">Employer</option>
                      <option value="Job Seeker">Job Seeker</option>
                    </select>
                    <FaRegUser />
                   </div>
                 </div>
                 <div className="inputTag">
                   <label>Name</label>
                   <div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='eg: bhupesh'/>
                    <FaPencilAlt />
                   </div>
                 </div>
                 <div className="inputTag">
                   <label>Email Address</label>
                   <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='eg: bhupesh@gmail.com'/>
                    <MdOutlineMailOutline />
                   </div>
                 </div>
                 <div className="inputTag">
                   <label>Phone</label>
                   <div>
                    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='eg: 8918955988'/>
                    <FaPhoneFlip />
                   </div>
                 </div>
                 <div className="inputTag">
                   <label>Password</label>
                   <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='eg: Or6Q50#f'/>
                    <RiLock2Fill />
                   </div>
                 </div>
                 <button onClick={handleRegister} type="submit">Register</button>
                 <Link to={"/login"}>Login Now</Link>
               </form>
          </div>
          <div className="banner">
            <img src="/register.png" alt="register"/>
          </div>
       </div>
    </>
  )
}

export default Register;
