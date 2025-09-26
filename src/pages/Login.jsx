import React from 'react'

export default function Login() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
            <h2 className='card-title'>Login</h2>
            <input type="text" placeholder='Username' className='input input-bordered w-full mb-3' />
            <input type="text" placeholder='Password ' className='input input-bordered w-full mb-3' />
            <button className='bt btn-primary w-full'>Login</button>
        </div>

        </div>



    </div>
  )
}
