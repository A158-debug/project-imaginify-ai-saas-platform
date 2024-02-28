import React from 'react'
import SideBar from '@/components/shared/Sidebar';

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='auth'>
        <SideBar/>
        {/* MobileView */}
        <div className="root-container">
            <div className="wrapper">
                {children}
            </div>
        </div>
    </main>
  )
}

export default AuthLayout;