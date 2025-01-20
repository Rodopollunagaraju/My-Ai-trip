import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { Button } from '../ui/button';

export default function Dayplans({ trip }) {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-bold text-3xl text-gray-900 mb-5 text-center">Trip Plans</h2>

        {/* Grid Layout for Places */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white shadow-lg rounded-lg p-6">
          {trip?.Tripai?.itinerary?.placesToVisit?.map((place, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              {/* Image */}
              <img 
                src="/day.jpg" 
                alt="Place" 
                className="rounded-lg w-full h-40 object-cover shadow-md"
              />

              {/* Place Details */}
              <div className="flex flex-col gap-3 text-gray-700 w-full mt-4">
                <h2 className="font-bold text-xl text-gray-900">{place?.name}</h2>
                <p className="text-sm">{place?.details}</p>
                <p className="text-sm font-medium">🎟️ Ticket Price: <span className="text-gray-900">{place?.ticketPricing}</span></p>
                <p className="text-sm font-medium">⭐ {place?.rating} Rating</p>

                {/* Google Maps Button */}
                {place?.name && (
                  <a 
                    href={`https://www.google.com/maps?q=${place.name}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-center"
                  >
                    <Button className="mt-2 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                      <FiMapPin /> View on Maps
                    </Button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
