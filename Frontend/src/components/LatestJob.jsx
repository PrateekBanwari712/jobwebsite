import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'




const LatestJob = () => {
    const {allJobs} = useSelector(store => store.job)
   
    return (
        <div className='max-w-6xl mx-auto my-20'>
            <h1 className='text-4xl font-bold my-2'><span className='text-purple-600 text-center'>Latest & Top</span> Job Openings</h1>

            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No jobs avaliable</span> : allJobs?.slice(0,6).map((job) => (
                        <LatestJobCards key={job?.id} job={job}/>
                    ))
                }
            </div>
        </div>
    )
}

export default LatestJob