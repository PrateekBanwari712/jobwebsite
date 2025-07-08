import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '../../utils/constant.js'
import { setSingleCompany } from '../../redux/companySlice.js'


const useGetCompanyById = (companyId) => {
    
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany = async() => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {withCredentials: true});
                console.log(response.data.company)
                if(response.data.success){
                    dispatch(setSingleCompany(response.data.company))
                }
            } catch (error) {
                log(error)
                toast(error.response.data.message)
            }
        }
        fetchSingleCompany();
    },[])

}

export default useGetCompanyById