import { ZapIcon } from 'lucide-react'
import React from 'react'


const RateLimiterUI = () => {
    return (
        <div className='max-w-6xl mx-auto p-4'>
            <div className=' bg-amber-100 border border-amber-300 rounded-lg px-4 py-3 shadow-sm'>
                <div className='flex items-center gap-2'>
                    <div className='p-3 rounded-full bg-red-400 flex-shrink-0'>
                        <ZapIcon size={25} />
                    </div>
                    <p className='font-bold'>Your limit has been reached!</p>
                </div>
            </div>
        </div>
    )
}

export default RateLimiterUI