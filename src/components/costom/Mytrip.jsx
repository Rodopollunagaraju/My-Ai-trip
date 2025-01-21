import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../services/fireBase';
import Mytripdetails from './Mytripdetails';

export default function Mytrip() {
    const [data, setData] = useState([]);

    const getMytrip = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user?.email) return;

            const q = query(collection(db, 'tripdetails'), where('User', '==', user.email));
            const querySnapshot = await getDocs(q);

            setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error("Error fetching trips: ", error);
        }
    };

    useEffect(() => {
        getMytrip();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Trips</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.length > 0 ? (
                    data.map((trip, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-lg bg-white">
                            <Mytripdetails trip={trip} />
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No trips found.</p>
                )}
            </div>
        </div>
    );
}
