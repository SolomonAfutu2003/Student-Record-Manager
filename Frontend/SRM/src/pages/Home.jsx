import React, { useState, useEffect } from 'react'
import RateLimiterUI from '../components/RateLimiterUI'
import toast from 'react-hot-toast'
import { Trash2Icon, Edit } from 'lucide-react'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import StudentNotFound from '../components/StudentNotFound'
import { Link } from 'react-router-dom'


const Home = () => {
    const [isRateLimit, setIsRateLimit] = useState(false)
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)

    const deleteStudent = async (id) => {
        try {
            await api.delete(`/students/${id}`)
            setStudents((prev) => prev.filter(students => students._id !== id))
            toast.success(("Removed"))
        } catch (error) {
            console.error("Error in deleting", error)
            toast.error("Couldn't delete")
        }
    }

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await api.get("/students")
                console.log(res.data)
                setStudents(res.data)
                setIsRateLimit(false)
            } catch (error) {
                console.log("Error from fetching data")
                console.log(error)
                if (error.response?.status === 429) {
                    setIsRateLimit(true)
                } else {
                    toast.error("Failed to fetch the data")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchStudents()
    }, [])

    return (
        <div>
            Home
            {isRateLimit && <RateLimiterUI />}

            <div className='max-w-5xl mx-auto'>
                {loading && <div>Loading data...</div>}
                {students.length === 0 && !isRateLimit && <StudentNotFound />}
                {students.length > 0 && !isRateLimit && (
                    <div className="space-y-3">
                        {students.map((student) => (
                            <div key={student._id} >
                                <Link to={`/student-detail/${student._id}`}>
                                    <div className="flex justify-between items-center bg-base-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">

                                        <div className="font-medium">{student.name}</div>
                                        <div className="text-sm text-gray-500 space-x-4">
                                            <span>{student.email}</span>
                                            <span>Age: {student.age}</span>
                                        </div>
                                        <div>
                                            <span>Data : {formatDate(new Date(student.createdAt))}</span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <button className='btn btn-circle btn-ghost'><Edit /></button>
                                            <button className='btn btn-circle btn-ghost text-error' onClick={() => deleteStudent(student._id)}><Trash2Icon /></button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home