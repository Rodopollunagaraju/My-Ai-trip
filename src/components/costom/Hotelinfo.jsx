import React from 'react';
import { Link } from 'react-router-dom';

function Hotelinfo({ trip }) {
  return (
    <div className="p-4 md:p-6">
      <h2 className="font-bold text-xl">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5">
        {trip?.Tripai?.hotelOptions.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.address}`}
            target="_blank"
            key={index}
          >
            <div className="hover:scale-105 transition-all cursor-pointer rounded-lg shadow-md">
              {/* Hotel Image */}
              <img
                src="/hotel.jpg"
                alt="Hotel"
                className="w-full h-40 object-cover rounded-t-lg"
              />

              <div className="flex flex-col gap-2 p-3">
                {/* Hotel Name */}
                <h2 className="font-bold text-lg">{hotel?.hotelName}</h2>
                {/* Address */}
                <h2 className="text-medium text-gray-550">📍 {hotel?.address}</h2>
                {/* Price */}
                <h2 className="text-lg font-bold">💰 {hotel?.price}</h2>
                {/* Rating */}
                <h2 className="text-lg font-bold">⭐ {hotel?.rating} rating</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotelinfo;
