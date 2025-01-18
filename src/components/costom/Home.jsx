import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-extrabold">
            Explore the World with{" "}
            <span className="text-yellow-400">AI-Powered</span> Travel
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Let MyTrip’s smart AI plan your dream journeys, optimize routes, and
            find the best destinations tailored just for you!
          </p>
          <Link to='/create-trip'><Button className='mt-5'>Get's started</Button></Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
