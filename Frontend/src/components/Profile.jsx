import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'


// const skills = ["HTML", "CSS", "JAVASCRIPT", "REACT"]
const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const {user} = useSelector(store=>store.auth)
    const isResume = user?.profile?.resume ? true : false;
    return (
        <div>
            <Navbar />
            <div className='max-w-5xl mx-auto bg-white border border-gray-500 rounded-2xl my-5 p-8'>
                <div className='flex justify-between relative'>
                    <div className=' flex items-center gap-4 '>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv50yB6-yPBiL9NlSqkbvcTX17A6j0lhlIIw&s' />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                        <Button className={'text-right absolute right-[10px] top-[20px] border-black text-purple-900 shadow-2xl'} variant={'outline'} onClick={()=>setOpen(true)}><Pen /></Button>

                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5 font-medium'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? (user?.profile?.skills.map((item, index) => <Badge className={'border border-gray-400 '} key={index}>{item}</Badge>)) : (
                                <span>
                                    No skills
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 ">
                    <Label className=' text-md font-bold'>
                        Resume
                    </Label>
                    {
                        isResume ? <a className='text-blue-500 w-full hover:underline cursor-pointer' target="_blank" href={user?.profile?.resume}>Resume </a> : "NA"
                        
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile