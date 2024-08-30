import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <div className='py-5 px-10 bg-[#13bc2f47]'>
            <Link href={'/'}>
                <h1 className=' font-semibold text-center uppercase'>Profit Share Calculator</h1>
            </Link>
        </div>
    )
}

export default Navbar