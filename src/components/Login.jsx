import React, { useState } from 'react'
import { signInWithEmailAndPassword,signInWithPopup } from 'firebase/auth'
import { auth,googleAuthProvider } from '../firebase'
import {Link, useNavigate} from 'react-router-dom'
import { HiOutlineMail } from "react-icons/hi";import { PiPassword } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import GoogleButton from 'react-google-button';
const Login = () => {
    const[isloggedIn,setisLoggedIn]=useState()
    const [loginError,setLoginError]=useState()
    const [data,setData]=useState({
        email:'',
        password:''
    })
    const {email,password}={...data}
    const navigate=useNavigate()
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault()
            signInWithEmailAndPassword(auth,email,password).then((usercredential)=>{
                const user=usercredential.user
                console.log(user)
                setisLoggedIn(true)
                navigate('/dashboard',user.email)
            })
        .catch ((e)=>{
            const errorMessage = e.message;
            setLoginError("Invalid credentials");
            console.error(errorMessage);
        })
        setData({
            email: "",
            password: "",
        }); 
    }
    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
            setisLoggedIn(true)
            navigate('/dashboard',user.email)
            setTimeout(window.close, 1000);
        } catch (error) {
            console.error(error);
        }
    };
    if (isloggedIn){
        return ;
    }
    return (
        <div className='flex justify-center items-center m-auto mt-[10rem]'>
            
            <form onSubmit={submitHandler} className="w-full max-w-md text-lg items-center block justify-center px-4 py-4 my-5">
                <h3 className='flex justify-center gap-2 items-center text-center text-2xl text-black'><CiUser />Login</h3>
                <div className="mb-4">
                    <label htmlFor="username" className="flex  items-center gap-1 text-sm font-medium text-black"><HiOutlineMail /> Email</label>
                    <input type="email" name='email' value={email} placeholder='username' required onChange={changeHandler} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="flex  items-center gap-1 text-sm font-medium text-black"><PiPassword />Password</label>
                    <input type="password" name='password' value={password} placeholder='password' required onChange={changeHandler} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="mb-4 flex justify-center m-auto">
                    <button type="submit" className="w-1/2 flex justify-center items-center gap-1  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-lg px-3 py-2.5 text-center me-2 mb-2">Login</button>
                </div>
                <div>
                    {loginError && <p>{loginError}</p>}
                </div>
                <div className="mb-4 flex justify-center m-auto">
                <GoogleButton onClick={handleSignInWithGoogle} className="Google rounded-md" />
                </div>
                <p className='text-black text-sm font-light'>Don't Have an account? {''} <Link to='/' className='underline'>Signup</Link></p>
            </form>
        </div>
    )
}
export default Login