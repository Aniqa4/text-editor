import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <div className='py-5 px-10 bg-[#13bc2f47] flex items-center justify-between'>
            <Link href={'/'}><h1 className='text-3xl font-semibold'>Text Editor</h1></Link>
            <ul className='flex gap-10'>
                <li>Write Blogs</li>
                <li>My Blogs</li>
            </ul>
        </div>
    )
}

export default Navbar