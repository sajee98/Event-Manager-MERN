import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full h-auto bg-violet-500 h-full banner_section flex items-center justify-center mb-10 md:py-0 py-14 ">
      <div className="lg:container mx-auto px-6 pt-0">
        <div className="md:flex flex-col lg:flex-row items-center justify-between gap-8 space-y-8 md:space-y-0">
          
          {/* Text Section */}
          <div className="text-white w-full max-w-[800px]">
            <h4 className="text-lg font-semibold mb-2">Featured Post</h4>
            <h3 className="text-5xl font-bold leading-tight mb-4">
              How AI <br /> Changes the Future
            </h3>
            <p className="mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <Link
              to="/blog"
              className="inline-block bg-white text-purple-600 px-6 py-2 rounded-md font-semibold hover:bg-purple-100 transition"
            >
              Read More
            </Link>
            <Link
              to="/vendor"
              className="inline-block bg-white text-purple-600 px-6 py-2 rounded-md font-semibold hover:bg-purple-100 transition"
            >
              Register
            </Link>
          </div>

          {/* Image Card Section */}
         <div className="max-w-xs w-full p-2 rounded-2xl pt-6">
  <img
    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    alt="Banner"
    className="w-full h-auto object-cover rounded-xl shadow-2xl" 
  />
</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
