import React from 'react'
import { Button } from '../ui/button'
import { IoSend } from "react-icons/io5";

export default function Infosection({ trip }) {
  return (
    <div className="p-4 md:p-6">
      {/* Image Section */}
      <img 
        src="/main.jpg" 
        alt="Trip" 
        className="h-[400px] w-full object-cover rounded-xl"
      />

      {/* Info Section */}
      <div className="mt-6 md:flex md:justify-between md:items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl text-gray-900 dark:text-white">
            {trip?.tripreq?.location}
          </h2>

          <div className="flex flex-wrap gap-3">
            {/* Dynamic Info Tags */}
            <h2 className="bg-gray-200 p-1 px-3 rounded-full text-gray-600">
              📅 {trip?.tripreq?.noOfdays} {trip?.tripreq?.noOfdays === 1 ? 'day' : 'days'}
            </h2>
            <h2 className="bg-gray-200 p-1 px-3 rounded-full text-gray-600">
              💰 {trip?.tripreq?.budget} budget
            </h2>
            <h2 className="bg-gray-200 p-1 px-3 rounded-full text-gray-600">
              👨‍👩‍👦 {trip?.tripreq?.list} people
            </h2>
          </div>
        </div>

        {/* Button Section */}
        <Button className="mt-4 md:mt-0">
          <IoSend />
        </Button>
      </div>
    </div>
  );
}
