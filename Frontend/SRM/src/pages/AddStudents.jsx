import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import api from '../lib/axios'

const AddStudents = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState(0)
    const [grade, setGrade] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name.trim() || !email || !age || !grade) {
            toast.error("fill the input")
            return
        }

        setLoading(true)

        try {
            await api.post("/students", {
                name,
                email,
                age,
                grade
            })
            toast.success("Student added")
            navigate("/")
        } catch (error) {
            console.log("Error", error)

            if (error.response.status === 429) {
                toast.error("Slow down")
            } else {
                toast.error("Failed to add student")
            }
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='bg-base-100 rounded-lg shadow-md p-4 space-y-2'>
                <h1>Add Student</h1>
                <form onSubmit={handleSubmit} action="" className="space-y-4">
                    <div className=' w-full'>
                        <input className='input' type="text" name="" id="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className=' w-full'>
                        <input className='input' type="email" name="" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className=' w-full'>
                        <input className='input' type="number" name="" id="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className=' w-full'>
                        <input className='input' type="text" name="" id="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
                    </div>
                    <div className='flex justify-end'>
                        <button className='btn' disabled={loading}>{loading ? "Creating" : "Add Student"}</button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default AddStudents