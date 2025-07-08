import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../../redux/jobSlice.js'
import { toast } from 'sonner'
import { JOB_API_END_POINT } from '../../utils/constant.js'


const useGetAllJobs = () => {
    
    const dispatch = useDispatch();

    const {searchedQuery} = useSelector(store => store.job);
    useEffect(()=>{
        const fetchAllJobs = async() => {
            try {
                const response = await axios.get(searchedQuery 
    ? `${JOB_API_END_POINT}/get?keyword=${searchedQuery}` 
    : `${JOB_API_END_POINT}/get`, {withCredentials: true})
                if(response.data.success){
                    dispatch(setAllJobs(response.data.job))
                }
            } catch (error) {
                log(error)
                toast(error.response.data.message)
            }
        }
        fetchAllJobs();
    },[])

}

export default useGetAllJobs