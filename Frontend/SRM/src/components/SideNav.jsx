import React from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, UserPlusIcon } from "lucide-react"


const SideNav = () => {
    return (
        <header className='min-h-screen p-4'>
            <div className='flex flex-col gap-3'>
                <h1>Students Records</h1>
                <div className='flex flex-col gap-2'>
                    <Link to="/" className='flex items-center'><HomeIcon size={20} /> <span>Home</span></Link>
                    <Link to="/add-students" className='flex items-center'><UserPlusIcon size={20} />Add Students</Link>
                </div>
            </div>
        </header>
    )
}

export default SideNav