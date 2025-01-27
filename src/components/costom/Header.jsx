import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import logo from "../../../public/logo.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../../components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header(props) {
  const [display, setdisplay] = useState(false);
  const route = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    googleLogout();
    localStorage.clear();
    route("/");
  };
  const login = useGoogleLogin({
    onSuccess: (CodeResp) => getToken(CodeResp),
    onError: (error) => console.log(error),
  });
  const getToken = async (tokeninfo) => {
    await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokeninfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setdisplay(false);
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-2">
      <img src={logo} alt="" />
      {user ? (
        <div className="flex items-center gap-5">
          <Link to="/create-trip">
            <Button variant="outline" className="rounded-lg">
              Create trip plan
            </Button>
          </Link>
          <Link to="/mytrip">
            <Button variant="outline" className="rounded-lg">
              My-trip
            </Button>
          </Link>

          <Popover>
            <PopoverTrigger>
              <img
                src={user?.picture}
                alt="User Avatar"
                className="h-9 w-9 rounded-full border-2 border-gray-300 hover:border-blue-500 transition duration-300"
              />
            </PopoverTrigger>
            <PopoverContent className="p-4 bg-white shadow-lg rounded-lg w-56 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.name}
              </h2>
              <h2 className="text-sm text-gray-500 mt-1">{user?.email}</h2>
              <Button
                className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
                onClick={logout}
              >
                Log out
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              if (!user) {
                setdisplay(true);
                return;
              }
              isloading(true);
            }}
          >
            Sign up
          </Button>
        </div>
      )}
      <Dialog open={display}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="mt-3 font-bold text-lg">Sign in with google</h2>
              <p className="mt-3 font-black text-xl">
                sign in to app with google authentication{" "}
              </p>
              <Button className="mt-3 w-full" onClick={login}>
                <FcGoogle />
                Sign In
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
