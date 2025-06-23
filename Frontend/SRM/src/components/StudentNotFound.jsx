import React from 'react'
import { Link } from 'react-router-dom'


const StudentNotFound = () => {
    return (
        <div>
            <h1>Add a Student</h1>
           <Link className='btn' to="/add-students">Add Student</Link>

        </div>
    )
}

export default StudentNotFound