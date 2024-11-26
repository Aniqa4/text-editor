import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <div className='py-5 px-10 bg-[#13bc2f47] flex justify-around'>
            <Link href={'/'}>
                <h1 className=' font-semibold text-center uppercase'>Location</h1>
            </Link>
            <Link href={'/text-editor'}>
                <h1 className=' font-semibold text-center uppercase'>Text Editor</h1>
            </Link>
        </div>
    )
}

export default Navbar