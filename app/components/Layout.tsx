import React, { ReactNode } from 'react'
import Navbar from './Navbar'

interface ChildrenProps {
  children: ReactNode
}

const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='mx-auto container py-10'>
        {children}
      </div>
    </div>
  )
}

export default Layout