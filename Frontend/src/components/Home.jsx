import React, { useEffect } from 'react'
import Navbar from './shared/Navbar.jsx'
import HeroSection from './HeroSection.jsx'
import CategoryCarousel from './categoryCarousel.jsx'
import LatestJob from './LatestJob.jsx'
import Footer from './Footer.jsx'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Home = () => {
  const navigate = useNavigate()
  const {user} = useSelector(store => store.auth);
  useGetAllJobs();
  useEffect(() => {
    if(user?.role === "recruiter"){
      navigate("/admin/companies")
    }
   },[])
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJob/>
        <Footer/>
    </div>
  )
}

export default Home