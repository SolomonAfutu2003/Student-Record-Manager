import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from '../components/SideNav'

const SRMLayOut = () => {
    return (
        <div className='flex min-h-screen'>
            <div className='w-64 flex-shrink-0 border-r border-black'>
                <SideNav />
            </div>
            <main className='w-full'>
                <Outlet />
            </main>
        </div>
    )
}

export default SRMLayOut