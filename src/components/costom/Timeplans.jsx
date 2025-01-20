import React from 'react';
import { FaMapMarkerAlt } from "react-icons/fa"; // Importing location icon

export default function Dayplans({ trip }) {
  // Get the days dynamically from the trip object, or default to an empty array
  const days = trip?.Tripai?.dailyTravelPlan ? Object.keys(trip?.Tripai?.dailyTravelPlan) : [];

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-bold text-3xl text-gray-900 dark:text-white mb-5 text-center">Day-wise Plan</h2>

        {days.map((day, index) => {
          const currentDay = trip?.Tripai?.dailyTravelPlan?.[day];

          // Dynamically get the time slots available for the current day
          const timeSlots = Object.keys(currentDay || {}).filter(key => key !== 'theme');

          return (
            <div key={index} className="mb-10">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-4 border-b pb-2">
                {day.toUpperCase()} - {currentDay?.theme}
              </h3>

              {/* Grid Layout for the activities of the day */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {timeSlots.map((timeSlot, idx) => {
                  const activity = currentDay[timeSlot];

                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4"
                    >
                      {/* Dynamic Image from Unsplash or Placeholder */}
                      <img
                        src={activity?.image || "/travel.jpg"}  // Use dynamic or fallback image
                        alt={activity?.activity}
                        className="rounded-lg w-full h-40 object-cover shadow-md"
                      />

                      {/* Activity Details */}
                      <div className="flex flex-col gap-3 text-gray-700 dark:text-gray-300 w-full">
                        <h2 className="font-bold text-xl text-gray-900 dark:text-white">{activity?.activity}</h2>
                        <p className="text-sm">{activity?.details}</p>
                        <p className="text-sm font-medium">
                          🕒 Time: <span className="text-gray-900 dark:text-gray-200">{activity?.time}</span>
                        </p>

                        {/* Google Maps Button */}
                        {activity?.latitude && activity?.longitude && (
                          <a
                            href={`https://www.google.com/maps?q=${activity.latitude},${activity.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <FaMapMarkerAlt /> View on Google Maps
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
