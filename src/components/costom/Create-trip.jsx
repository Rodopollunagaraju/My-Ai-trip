import React, { useState } from "react";
import { Input } from "../ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "../constants/option";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { chatSession } from "../services/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from  "../../components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/fireBase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


function Create() {
  const [formData, setForm] = useState({});
  const [error, setError] = useState(""); // To store validation messages
  const [isDisabled, setIsDisabled] = useState(false); // Button should be active initially
  const [display,setdisplay]=useState(false);
  const [loading,isloading]=useState(false)
  const route=useNavigate()

  const handleForm = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to validate the form when clicking the button
  const handleGenerate = async() => {
    
    if (!formData.location || formData.location.trim().length < 3) {
      setError("Please enter a valid destination.");
      return;
    }
    if (!formData.noOfdays || formData.noOfdays > 5) {
      setError("Trip duration cannot exceed 5 days.");
      return;
    }
    if (!formData.budget) {
      setError("Please select a budget.");

      return;
    }
    if (!formData.list) {
      setError("Please select who you are traveling with.");

      return;
    }
    const user=localStorage.getItem('user')
    if(!user) {
    setdisplay(true)
    return
    }
    isloading(true)

    
    setError(""); // Clear error if everything is valid
    console.log(formData)
    const FORM_DATA=AI_PROMPT
    .replace('{location}',formData?.location)
    .replace('{totaldays}',formData?.noOfdays)
    .replace('{traveler}',formData?.list)
    .replace('{budget}',formData?.budget)
    console.log(FORM_DATA)
    const result=await chatSession.sendMessage(FORM_DATA)
    console.log(result?.response)
    isloading(false)
    console.log(result?.response?.text())
    saveTrip(result?.response?.text())
    
  };
  const login=useGoogleLogin({
    onSuccess:(CodeResp)=>getToken(CodeResp),
    onError:(error)=>console.log(error)

})
const getToken=async (tokeninfo)=>{
  await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,{
    headers:{
      Authorization:`Bearer ${tokeninfo?.access_token}`,
      Accept:'Application/json'
    }
  }).then((res)=>{
    localStorage.setItem('user',JSON.stringify(res.data))
    setdisplay(false)
  })
}
const saveTrip=async(Tripdata)=>{
  isloading(true)
  const ID=Date.now().toString()
  const user=JSON.parse(localStorage.getItem('user'))
  try{ await setDoc(doc(db,'tripdetails',ID),{
    tripreq:formData,
    Tripai:JSON.parse(Tripdata),
    User:user?.email,
    id:ID   
   })}
    catch(error){
      console.error("error is come")
    }
   
      isloading(false)
      route('/viewtrip/'+ID)
}

  return (
    <div className="sm:px-5 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🏝️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      {/* Destination Input */}
      <div className="mt-10">
        <h5 className="text-xl font-medium my-3">What is your destination of choice?</h5>
        <Input type="text" onChange={(e) => handleForm("location", e.target.value)} placeholder="Ex: Hyderabad" />
      </div>

      {/* Number of Days Input */}
      <div className="mt-10">
        <h5 className="text-xl font-medium my-3">How many days are you planning your trip?</h5>
        <Input type="number" onChange={(e) => handleForm("noOfdays", e.target.value)} placeholder="Ex: 3" />
      </div>

      {/* Budget Selection */}
      <div className="mt-10">
        <h5 className="text-xl font-medium my-3">What is your budget?</h5>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleForm("budget", item.title)}
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg
                ${formData?.budget === item.title ? "border-black shadow-lg" : ""}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <h2 className="text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Companions Selection */}
      <div className="mt-10">
        <h5 className="text-xl font-medium my-3">Who do you plan on traveling with?</h5>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleForm("list", item.people)}
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg
                ${formData?.list === item.people ? "border-black shadow-lg" : ""}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <h2 className="text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Error Message - Shows only after clicking the button */}
      {error && (
        <Alert className="mt-5">
  
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <div className="my-4 justify-end flex">
        <Button disabled={loading} onClick={handleGenerate}
         >
          {loading ? <AiOutlineLoading3Quarters className='animate-spin h-7 w-7' /> : ' Generate Trip'}
         
        </Button>
      </div>
      <Dialog open={display}>
  
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
     <img src="/logo.svg" alt="" />
     <h2 className="mt-3 font-bold text-lg">Sign in with google</h2>
     <p className="mt-3 font-black text-xl">sign in to app with google authentication </p>
     <Button className='mt-3 w-full' onClick={login}><FcGoogle/>Sign In</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  );
}

export default Create;
