import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../../redux/jobSlice.js'
import { toast } from 'sonner'
import { JOB_API_END_POINT } from '../../utils/constant.js'


const useGetAllAdminJobs = () => {
    
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAllAdminJobs = async() => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {withCredentials: true})
                if(response.data.success){
                    console.log(response)
                    dispatch(setAllAdminJobs(response.data.jobs))
                }
            } catch (error) {
                log(error)
                toast(error.response.data.message)
            }
        }
        fetchAllAdminJobs();
    },[])

}

export default useGetAllAdminJobs