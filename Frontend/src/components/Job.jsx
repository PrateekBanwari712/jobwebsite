
import { Badge } from "@/components/ui/badge"
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useNavigate } from 'react-router-dom'
import { Bookmark } from "lucide-react"


const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-100 '>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-600'>{job?.createdAt === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} `}days ago</p>
        <Badge variant={'outline'} className={' rounded-full'} size={'icons'}><Bookmark /></Badge>
      </div>
      <div className='flex items-center gap-2 my-2 '>
        <Badge className={'p-6 '} variant={'outline'} size={'icons'}> <Avatar>
          <AvatarImage src={job?.company?.logo} className='h-[20px]' />
        </Avatar>
        </Badge>
        <div>
          <h1>{job?.company?.name}</h1>
          <p>{job?.company?.location}</p>
        </div>

      </div>
      <div>
        <h1 className='font-bold text-lg my-2 '>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}.</p>
      </div>
      <div className='flex items-center gap-2 mt-4 '>
        <Badge className={'text-blue-700 font-bold border'} variant={'ghost'}>{job?.position} positions</Badge>
        <Badge className={'text-red-700 font-bold'} variant={'ghost'}>{job?.jobType}</Badge>
        <Badge className={'text-purple-700 font-bold'} variant={'ghost'}>{job?.salary} LPA</Badge>

      </div>

      <div className='flex item-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} className={'ml-4 mr-4 cursor-pointer '} variant={'outline'}>Details</Button>
        <Button className={'bg-purple-600 text-white cursor-pointer '} variant={'outline'}>Save for later</Button>
      </div>

    </div>

  )
}

export default Job