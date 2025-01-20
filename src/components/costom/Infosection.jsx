import React from 'react'
import { Button } from '../ui/button'
import { IoSend } from "react-icons/io5";

export default function Infosection({trip}) {
  return (
    <div>
      <img src="/placeholderr.jpg" alt="" className='h-[400px] w-full object-cover rounded-xl'/>
      <div className='flex justify-between items-center'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.tripreq?.location}</h2>
        <div className='flex gap-3'>
            <h2 className='bg-gray-200 p-1 px-3 rounded-full text-gray-600 '>📅 {trip?.tripreq?.noOfdays} {trip?.tripreq?.noOfdays==1 ? 'day' :'days'}</h2>
            <h2 className='bg-gray-200 p-1 px-3 rounded-full text-gray-600 '>💰 {trip?.tripreq?.budget} budget</h2>
            <h2 className='bg-gray-200 p-1 px-3 rounded-full text-gray-600 '>👨‍👩‍👦 {trip?.tripreq?.list} people</h2>
        </div>
      </div>
      <Button><IoSend /></Button>
      </div>

    </div>
  )
}
