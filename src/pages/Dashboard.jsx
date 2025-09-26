import React from 'react'
import { Link } from 'react-router-dom'
export default function Dashboard() {
  return (
    <div className='p-8'>
        <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
        <Link to="/chat/home">Go to chat Room</Link>

    </div>
  )
}
