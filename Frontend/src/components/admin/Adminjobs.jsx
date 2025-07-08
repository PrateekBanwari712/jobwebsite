import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../../redux/jobSlice.js'
import { useNavigate } from 'react-router-dom'


const Adminjobs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("")
    useGetAllAdminJobs();
    
    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])
    return (
        <div>
            <Navbar />
            <div className='max-w-[6xl] mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <Input
                        onChange={(e) => setInput(e.target.value)}
                        className={'w-fit'}
                        type="text" 
                        placeholder="filter by name" />
                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        className={'bg-purple-500'}>New Jobs</Button>
                </div>
                < AdminJobsTable />
            </div>
        </div>

    )
}

export default Adminjobs