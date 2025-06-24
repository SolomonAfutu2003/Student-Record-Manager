import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { LoaderCircle } from 'lucide-react'

const StudentDetail = () => {
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await api.get(`/students/${id}`)
                console.log(res.data)
                setStudent(res.data)
            } catch (error) {
                console.log("Error from fetching student data", error)
                toast.error("failed to get student")
            } finally {
                setLoading(false)
            }
        }

        fetchStudent()
    }, [id])

    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <LoaderCircle className='animate-spin' size={30} />
            </div>
        )
    }

    const handleSave = async () => {
        if (!student.name.trim() || !student.email.trim() || !student.age.trim() || !student.grade.trim()) {
            toast.error("fill the inputs")
            return
        }
        setSaving(true)

        try {
            await api.put(`/students/${id}`, student)
            navigate("/")
            toast.success("Updated")

        } catch (error) {
            console.log("Error from updating student data", error)
            toast.error("failed to update student")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/students/${id}`)
            toast.success(("Removed"))
            navigate("/")
        } catch (error) {
            console.error("Error in deleting", error)
            toast.error("Couldn't delete")
        }
    }

    console.log({ student })
    return (
        <div>
            <div className="space-y-4">
                <div className=' w-full'>
                    <input className='input' type="text" name="" id="Name" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} />
                </div>

                <div className=' w-full'>
                    <input className='input' type="email" name="" id="Email" value={student.email} onChange={(e) => setStudent({ ...student, email: e.target.value })} />
                </div>
                <div className=' w-full'>
                    <input className='input' type="number" name="" id="Age" value={student.age} onChange={(e) => setStudent({ ...student, age: e.target.value })} />
                </div>
                <div className=' w-full'>
                    <input className='input' type="text" name="" id="Grade" value={student.grade} onChange={(e) => setStudent({ ...student, grade: e.target.value })} />
                </div>
                <div className='flex justify-end gap-3'>
                    <button onClick={handleSave} className='btn' disabled={saving}>{saving ? "Saving" : "Save update"}</button>
                    <button onClick={handleDelete} className='btn'>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default StudentDetail