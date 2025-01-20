import React from 'react';
import { useState } from 'react';
import { Button } from '../ui/button';
import logo from '../../../public/logo.svg'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { googleLogout ,useGoogleLogin} from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader
  } from  "../../components/ui/dialog";
  import { FcGoogle } from "react-icons/fc";
  import axios from "axios";

function Header(props) {
     const [display,setdisplay]=useState(false);
    const route=useNavigate()
    const user=JSON.parse(localStorage.getItem('user'));
    const logout=()=>{
       googleLogout()
       localStorage.clear()
       route('/')

    }
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

    return (
        <div className='p-3 shadow-sm flex justify-between items-center px-2'>
                <img src={logo} alt="" />
                {user ? 
                <div className='flex items-center gap-5'>
                    <Button variant="outline" className='rounded-lg'>My-trip</Button>
                   
                    <Popover>
                        <PopoverTrigger> <img src={user?.picture} alt=""  className='h-[35px] w-[35px] rounded-full'/></PopoverTrigger>
                        <PopoverContent>
                            <h2 className='w-auto text-xl  mt-2'>{user?.name}</h2>
                            <h2 className='items-center text-xl  mt-4'>{user?.email}</h2>
                            <Button className='mt-3' onClick={logout}>Log out</Button>
                        </PopoverContent>
                    </Popover>

                </div>
            :  <div>
                <Button onClick={()=>{
                    if(!user) {
                        setdisplay(true)
                        return
                        }
                        isloading(true)
                }}>Sign up</Button>
            </div>}
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

export default Header;