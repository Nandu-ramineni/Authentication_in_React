import React, { useState } from 'react'
import  { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {Link, useNavigate} from 'react-router-dom';
import { HiOutlineMail } from "react-icons/hi";import { PiPassword } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
const Signup = () => {
    const [issignedIn,setisSignedIn]=useState()
    const [data,setData]=useState({
        username:'',
        email:'',
        password:''
    })
    const {username,email,password}={...data}
    const navigate=useNavigate()
    const changeHandler =e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler= async(e)=>{
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth,email,password)
            .then((usercredential)=>{
                const user=usercredential.user
                console.log(user)
                navigate('/login')
                setisSignedIn(true)
            })
        } catch (error) {
            console.log(error)
        }
    }
    if (issignedIn){
        return;
    }
    return (
        <div className='flex justify-center items-center m-auto mt-[10rem]'>
            <form onSubmit={submitHandler}  className="w-full max-w-md text-lg items-center block justify-center px-4 py-4 my-5">
                <h3 className='flex justify-center gap-2 items-center text-center text-2xl text-black'>Signup</h3>
                <div className="mb-4">
                    <label htmlFor="username" className="flex  items-center gap-1 text-sm font-medium text-black"><CiUser /> Username</label>
                    <input type="text" name='username'value={username} required placeholder='Username' onChange={changeHandler} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"/>
                </div >
                <div className="mb-4">
                    <label htmlFor="email" className="flex  items-center gap-1 text-sm font-medium text-black"><HiOutlineMail /> Email</label>
                    <input type="email" name="email" value={email} placeholder='Email id' required onChange={changeHandler} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"/>
                </div >
                <div className="mb-4">
                    <label htmlFor="password" className="flex  items-center gap-1 text-sm font-medium text-black"><PiPassword /> Password</label>
                    <input type="password" name="password" value={password} placeholder='Password' required onChange={changeHandler} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="mb-4 flex justify-center m-auto">
                    <button type="submit" className='text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Signup</button>
                </div>
                <p className='text-black text-sm font-light'>Already have an Account? {''} <Link to='/login' className='underline'>Login</Link></p>
            </form>
        </div>
    )
}

export default Signup
