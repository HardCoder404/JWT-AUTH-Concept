import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Eye, EyeOff} from 'lucide-react'
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BASE_URL } from '../constant';

export default function Signup() {
  const navigate = useNavigate();
  const [showEye, setshowEye] = useState(false);
  const [hideEye, setHideEye] = useState(true);
  const [userInfo, setuserInfo] = useState({
    name: "",
    email:"",
    password: ""
  });

  const showeyeHandler = () =>{
    setHideEye(false);
    setshowEye(true);
  }

  const hideEyeHandler = () =>{
    setHideEye(true);
    setshowEye(false);
  }

   // Handler for input change
   const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit  = async(e)=>{
    e.preventDefault();  
    const {name,email,password} = userInfo;
    if(!name || !email || !password){
      toast.error("Fields are required")
    }

    try {        
       const response = await axios.post(`${BASE_URL}/signup`, userInfo,{
          headers: {
            'Content-Type' : 'application/json'
          },
       })
       const result = response.data;
       
       const {success,message} = result;
       
       if(success){
        toast.success(message);
        setTimeout(() => {
            navigate("/login");
        }, 2000)
       };

    } catch (error) {
        const errorDetails = error.response.data.error?.details[0].message;
        const signupError = error.response.data?.message;

        console.log("Error",errorDetails);  
        if(errorDetails){
            toast.error(errorDetails)
        } else if(signupError){
            toast.error(signupError)
          }
    }

  };

  return (
    <div>
      <div className="font-[sans-serif]">
        <ToastContainer />
      <div className="min-h-screen flex fle-col items-center justify-center p-6">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-7xl max-lg:max-w-xl w-full">
          <form className="lg:max-w-md w-full" onSubmit={handleSubmit}>
            <h3 className="text-gray-800 text-3xl font-extrabold mb-12">Registration</h3>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                <input name="name" type="text" value={userInfo.name} onChange={handleChange} className="bg-gray-100 rounded-lg w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input name="email" type="text" value={userInfo.email} onChange={handleChange} className="bg-gray-100 rounded-lg w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className='relative'>
                <input name="password" type={showEye?"text":"password"} value={userInfo.password} onChange={handleChange} className="bg-gray-100 rounded-lg w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
                {
                    hideEye ? (
                        <EyeOff size={20} color='gray' className='absolute right-3 bottom-4'onClick={showeyeHandler} />
                    ):(
                        <Eye size={20} color='gray' className='absolute right-3 bottom-4' onClick={hideEyeHandler}/>
                    )
                }
                </div>
              </div>
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                  I accept the <span className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</span>
                </label>
              </div>
            </div>

            <div className="mt-12">
              <button type="submit" className="py-4 px-8 rounded-lg text-sm font-semibold text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Create an account
              </button>
            </div>
            <Link to={"/login"}>
            <p className="text-sm text-gray-800 mt-6">Already have an account? <span className="text-blue-600 font-semibold hover:underline ml-1 cursor-context-menu">Login here</span></p>
            </Link>
          </form>

          <div className="h-full max-lg:mt-12">
            <img src="https://readymadeui.com/login-image.webp" className="w-full h-full object-cover" alt="Dining Experience" />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
