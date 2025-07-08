import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { USER_API_END_POINT } from '../../../utils/constant.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../redux/authSlice'



const Signup = () => {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    });
    const { user, loading } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        // console.log(input)
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                // headers: {
                //   "Content-Type": "application/json"
                // },
                withCredentials: true
            })
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-400 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div>
                        <Label>FullName</Label>
                        <Input type="text"
                            value={input.fullName}
                            name="fullName" onChange={changeEventHandler} placeholder="Prateek banwari" />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input type="email"
                            value={input.email}
                            name="email" onChange={changeEventHandler} placeholder="prateekbanwari0@gmail.com" />
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Input type="text" value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler} placeholder="9988776655" />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input type="text" value={input.password}
                            name="password" onChange={changeEventHandler}
                            placeholder="Password" />
                    </div>
                    <div className='flex items-center justify-between '>
                        <RadioGroup className={"flex items-center gap-4 my-5 "}>
                            <div className='flex items-center space-x-2'>
                                <Input type="radio" name="role" value={"student"} checked={input.role === "student"} onChange={changeEventHandler} className={"cursor-pointer"} />
                                <Label htmlFor="r1">Student</Label>

                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input type="radio" name="role" value={"recruiter"} checked={input.role === "recruiter"} onChange={changeEventHandler} className={"cursor-pointer"} />
                                <Label htmlFor="r2">Recruiter</Label>

                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2 mx-2'>
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file" onChange={changeFileHandler} className={"cursor-pointer"} />
                        </div>
                    </div>
                    {
                        loading ? <Button className='w-full my-4'><Loader2 className='w-full animate-spin' />Please wait</Button> : <Button type="submit" className='w-full my-4 cursor-pointer bg-gray-800 text-white'>Signup</Button>
                    }
                    <span className='text-sm'>already have an account? <Link to={"/login"} className='text-blue-600 text-sm'>Login</Link></span>
                </form>
            </div>
        </div>

    )
}

export default Signup



