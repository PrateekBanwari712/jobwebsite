import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '../../utils/constant.js'
import { setCompanies  } from '../../redux/companySlice.js'


const useGetAllCompanies = ( ) => {
    
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async() => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials: true})
                if(response.data.success){ 
                    dispatch(setCompanies(response.data.companies))
                }
            } catch (error) {
                log(error)
                toast(error.response.data.message)
            }
        }
        fetchCompanies();
    },[])

}

export default useGetAllCompanies