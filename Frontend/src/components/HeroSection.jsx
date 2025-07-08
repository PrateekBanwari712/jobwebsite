import { Search } from 'lucide-react'
import { Button } from './ui/button'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '../../redux/jobSlice'

const HeroSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [query, setQuery] = useState("")

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col justify-center gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-500 font-medium'>Best Job Hunt Website</span>
                <h1 className='text-5xl font-bold '>Search, Apply &
                    <br />
                    Get Your
                    <span className='text-purple-600'> Dream Jobs</span></h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum </p>
            </div>
            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full item-center gap-4 mx-auto'>
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    className='outline-none border-none w-full ' type="text" placeholder="find your dream jobs" />
                <Button
                    onClick={searchJobHandler}
                    className={'rounded-r-full bg-purple-600'}>
                    <Search className='h-5 w-5' />
                </Button>
            </div>


        </div>
    )
}

export default HeroSection