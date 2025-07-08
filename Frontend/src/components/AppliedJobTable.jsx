import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job)
  return (
    <div>
      <Table>
        <TableCaption>& list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className=''>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <=0 ? <span>You haven't applied for any job</span>
              :
              allAppliedJobs.map((appliedJob) => {
                return (
                  <TableRow key={appliedJob._id}>
                    <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{appliedJob?.job?.title}</TableCell>
                    <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                    <TableCell> <Badge className={`'border w-8' ${appliedJob?.status === "accepted" ? "bg-green-500" : "bg-red-500"} ${appliedJob?.status === "pending" && "bg-gray-300"}`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
                  </TableRow>
                )
              })
          }
                </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
