import React from 'react';
import { Link } from 'react-router-dom';

function Hotelinfo({trip}) {
    return (
        <div>
            <h2 className='font-bold text-xl '>Hotel recommendetion</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5'>
                {trip?.Tripai?.hotelOptions.map((hotel,index)=>(
                    <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel.geoCoordinates.latitude},${hotel.geoCoordinates.longitude}`} target='_blank'>
                    <div key={index} className='hover:scale-110 trasition-all cursor-pointer'>
                        <img src="/placeholderr.jpg" alt="image" className='rounded-lg'/>
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-bold text-lg'>{hotel?.hotelName}</h2>
                            <h2 className='text-medium text-gray-550'>📍{hotel?.address}</h2>
                            <h2 className='text-lg font-bold'>💰 {hotel?.price}</h2>
                            <h2 className='text-lg font-bold'>⭐ {hotel?.rating} rating</h2>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Hotelinfo;