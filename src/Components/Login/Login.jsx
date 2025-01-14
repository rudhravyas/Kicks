import React, {useState , useEffect} from 'react'
import { Link , useNavigate} from "react-router-dom";
import {getAuth,signInWithEmailAndPassword, GoogleAuthProvider , signInWithPopup, onAuthStateChanged} from "firebase/auth";
import {app} from '../../firebase.js';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const Login = () => {
    
    const navigate = useNavigate();
    const[user,setUser]= useState('null');
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
               setUser(user)
            }else{
                setUser(null);
            }
        })
    },[])

    if(user == null){

    const loginUser = () =>{
        signInWithEmailAndPassword(auth,email,password).then(() => navigate('/')).catch((err) => alert(err))
    }

    const googleSignIn = () =>{
        signInWithPopup(auth,googleProvider).then(() => navigate('/')).catch((err) => alert(err));
    }
        return (
            <section className='bg-gray-50 min-h-screen flex items-center justify-center '>
                <div className='bg-gray-100 flex shadow-xl rounded-2xl max-w-3xl py-6 px-5 items-center'>
                    <div className='sm:w-3/2 px-8 md:px-16'>
                        <h2 className='font-bold text-3xl  text-[#3736BF]'>Login</h2>
                        <p className='text-sm mt-4  text-gray-600'>Already a member, easily Log In</p>

                        <div className="flex flex-col gap-4">
                            <input className="p-2 mt-8 rounded-xl border" onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" placeholder="Email" required/>
                            <div className="relative">
                                <input className="p-2 rounded-xl border w-full" onChange={(e) => setPassword(e.target.value)} value={password}  type= 'password' name="password" placeholder="Password" required/>
                               
                            </div>
                            <button onClick={loginUser} class="bg-[#3736BF] rounded-xl text-white py-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02]  
                        ease-in-out transform">Login</button>
                        </div>

                        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm">OR</p>
                            <hr className="border-gray-400" />
                        </div>

                        <div className='mt-6 flex flex-col gap-y-4'>
                            <button onClick={googleSignIn}
                                className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02]  
                        ease-in-out transform py-2  rounded-xl text-gray-700 font-semibold text-md border-2 border-[#3736BF] border-opacity-50 '>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335" />
                                    <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853" />
                                    <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2" />
                                    <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05" />
                                </svg>
                                Sign in with Google
                            </button>
                        </div>

                        <div className="mt-12 text-sm flex justify-between items-center text-gray-600">
                            <p>Don't have an account? </p>
                            <Link exact to="/SignUp">
                                <button className="py-2 px-4 font-semibold text-[#3736BF] shadow-md bg-white border rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05]  
                        ease-in-out transform">Sign Up</button>
                            </Link>
                        </div>

                    </div>
                    <div className='sm:block hidden w-1/2 p-2'>
                        {/* <img src={loginImg}
                            className=" rounded-2xl shadow-lg mx-auto"
                            alt=""
                        /> */}
                    </div>

                </div>
            </section>
        )

    }else{
        return (
        navigate('/user'))
    }

    
    }