import Hotelinfo from '@/components/costom/Hotelinfo'
import Infosection from '@/components/costom/Infosection'
import { db } from '@/components/services/fireBase'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Index() {
    const [trip,setdata]=useState([])
    const {tripid} = useParams()
    useEffect(()=>{
       tripid&& gettripdata()
    },[tripid])
    const gettripdata=async()=>{
        const docref=doc(db,'tripdetails',tripid)
        const docsnap= await getDoc(docref)
        if(docsnap.exists()){
            setdata(docsnap.data())
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <Infosection trip={trip} />
      <Hotelinfo trip={trip}/>
    </div>
  )
}
