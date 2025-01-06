import React, {useState} from 'react'
import { Link , useNavigate} from "react-router-dom";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import {app} from '../../firebase.js';

const auth = getAuth(app);

export const SignUp = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate =  useNavigate();
  
    const signUpUser = ()=>{
        createUserWithEmailAndPassword(auth,email,password).then(
            ()=>navigate('/')
        );
    }
    
    return (
        <section className='bg-gray-50 min-h-screen flex items-center justify-center'>
            <div className='bg-gray-100 flex shadow-xl rounded-2xl max-w-3xl py-6 px-5 items-center'>
                <div className='sm:w-3/2 px-8 md:px-16'>
                    <h2 className='font-bold text-3xl  text-[#3736BF]'>Sign Up</h2>
                    <p className='text-sm mt-4  text-gray-600'>Create an account!</p>

                    <div className="flex flex-col gap-4">
                        <input className="p-2 mt-8 rounded-xl border"  type="text" name="name" placeholder="Name" required />
                        <input className="p-2 rounded-xl border" onChange={(e)=> setEmail(e.target.value)} value={email} type="email" name="email" placeholder="Email" required />
                        <div className="relative">
                                <input className="p-2 rounded-xl border w-full" onChange={(e)=> setPassword(e.target.value)} value={password} type='password' name="password" placeholder="Password" required />
                        </div>
                        <button onClick={signUpUser} className="bg-[#3736BF] rounded-xl text-white py-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02]  
                        ease-in-out transform">Sign Up</button>
                    </div>

                    <div className="mt-12 text-sm flex justify-between items-center text-gray-600">
                        <p>Already have an account? </p>
                        <Link exact to="/login">
                            <button className="py-2 px-4 font-semibold text-[#3736BF] shadow-md bg-white border rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05]  
                        ease-in-out transform">Log In</button>
                        </Link>
                    </div>

                </div>
                <div className='sm:block hidden w-1/2 p-2'>
                   
                </div>
            </div>
        </section>
    )
}