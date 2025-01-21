import React from 'react';
import { Link } from 'react-router-dom';

export default function Mytripdetails({ trip }) {
  return (
    <Link to={'/viewtrip/'+trip?.id}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <img src="/main.jpg" alt="Trip" className="w-full h-48 object-cover" />

      {/* Trip Details */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{trip?.tripreq?.location}</h2>
        <p className="text-gray-600 mt-2">
          <span className="font-medium">{trip?.tripreq?.list}</span> traveling for 
          <span className="font-medium"> {trip?.tripreq?.noOfdays} days</span> with 
          <span className="font-medium"> {trip?.tripreq?.budget}</span> budget.
        </p>
      </div>
    </div>
    </Link>
  );
}
