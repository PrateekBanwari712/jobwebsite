import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'
import { Button } from './ui/button'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../../utils/constant.js'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '../../redux/jobSlice.js'
import { toast } from 'sonner'
import Navbar from './shared/Navbar'


const JobDescription = () => {
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const params = useParams();
    const jobId = params.id;
   const isInitiallyApplied=singleJob?.application?.some(application=>application.applicant ===user?._id) || false;
   const [ isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const response = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { withCredentials: true }
            )

            if (response.data.success) {
                setIsApplied(true)
                const updateSingleJob = {...singleJob, application:[...singleJob.application, {applicant: user?._id}]};
                dispatch(setSingleJob(updateSingleJob))    
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast(error.response.data.message);

        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                console.log(response.data.job)
                if (response.data.success) {
                    dispatch(setSingleJob(response.data.job))
                    setIsApplied(response.data.job.application.some(application=> application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob();

    }, [jobId, dispatch, user?._id])
    return (
        <>
        <Navbar/>
        
        <div className='max-w-5xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div>
                        <Badge className={'text-blue-700 font-bold'} variant={Ghost}>{singleJob?.position} Position</Badge>
                        <Badge className={'text-red-600 font-bold'} variant={Ghost}>{singleJob?.jobType}n</Badge>
                        <Badge className={'text-indigo-600 font-bold'} variant={Ghost}> {singleJob?.salary} LPA</Badge>

                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}>{isApplied ? "Already Applied" : "Apply Now"}</Button>
            </div>
            <h1 className=' border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.description}</h1>
            <div>
                <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} years</span></h1>
                <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>{singleJob?.application.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
        </>
    )
}

export default JobDescription