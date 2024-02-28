import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <>
    <p>Home</p>
    <UserButton afterSignOutUrl='/'/>
    </>
  )
}

export default Home