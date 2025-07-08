import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const navigate = useNavigate();
    const { companies, searchCompanyByText } = useSelector(store => store.company);

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);



    useEffect(() => {
        const filteredjob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filteredjob);
    }, [allAdminJobs, searchJobByText])


    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={'text-right'}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAdminJobs?.length <= 0 ? <span>You haven't registered any company yet.</span> : (
                            <>
                                {
                                    filterJobs?.map((job) => (
                                        <tr key={job._id}>


                                            <TableCell>
                                                {job?.title}
                                            </TableCell>
                                            <TableCell>
                                                {job?.description}
                                            </TableCell>
                                            <TableCell>
                                                {job?.createdAt.split("T")[0]}
                                            </TableCell>
                                            <TableCell>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <MoreHorizontal />
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-32">
                                                        <div
                                                            onClick={() => navigate(`/admin/companies/${job?._id}`)}
                                                            className='flex items-center gap-2 w-fit cursor-pointer '>
                                                            <Edit2
                                                                className='w-4' />
                                                            <span>Edit</span>
                                                        </div>
                                                        <div
                                                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                         className='flex items-center w-fit gap-2 cursor-pointer mt-2 '>
                                                            <Eye className='w-4 '/>
                                                            <span>
                                                            Applicants
                                                            </span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </tr>
                                    )
                                    )
                                }
                            </>
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable