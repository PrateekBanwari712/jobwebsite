import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../../../utils/constant.js'
import { setUser } from '../../../redux/authSlice.js'

const Navbar = () => {
    // const [user, setUser] = useState(false);
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        }
    }
    return (
        <div className='Navbar bg-white'>           
            
            <div className='flex items-center justify-between mx-auto max-w-6xl h-16'>
                
                <Link to={"/"}><div><h1 className='text-2xl font-bold '>Job<span className='text-red-600'>Website</span></h1>
                </div>
                </Link>
                <div className='flex items-center gap-12'>
                    <ul className='flex gap-5 font-medium items-center'>
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <Link to={"/admin/companies"}><li>companies</li></Link>
                                    <Link to={"/admin/jobs"}><li>Jobs</li></Link>

                                </>
                            ) : (
                                <>
                                    <Link to={"/"}><li>Home</li></Link>
                                    <Link to={"/jobs"}><li>Jobs</li></Link>
                                    <Link to={"/browse"}><li>Browse</li></Link>
                                </>
                            )
                        }



                    </ul>

                    {(!user) ? (
                        <div className='flex item center gap-2'>
                            <Link to={"/login"}>
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to={"/signup"}>
                                <Button className={"bg-purple-500 hover:bg-purple-800"}>Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger ><Avatar className={"cursor-pointer"}>
                                <AvatarImage src={user?.profile?.profilePhoto} />
                            </Avatar></PopoverTrigger>
                            <PopoverContent className='border border-black rounded-xl bg-purple-300 p-2'>
                                <div className='flex gap-2 space-y-2'>
                                    <Avatar className={"cursor-pointer"}>
                                        <AvatarImage src={user?.profile?.profilePhoto}/>
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullName}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio} </p>
                                    </div>
                                </div>
                                <div className='flex flex-col text-gray-800' >
                                    {
                                        user && user.role === "student" &&
                                        (<div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 /><Link to={'/profile'}>
                                                <Button className={'cursor-pointer'} variant={"link"}>View Profile</Button ></Link></div>)}

                                    <div onClick={logoutHandler} className='flex w-fit items-center gap-2 cursor-pointer'><LogOut /> <Button variant={"link"} className={'cursor-pointer'}>Logout</Button></div>


                                </div>
                            </PopoverContent>
                        </Popover>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
