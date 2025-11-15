import React from "react";
import { Link } from "react-router-dom";
import pb from "../../assets/pb.jpg";

const Banner = () => {
  return (
    <div
      className="
        w-full h-auto banner_section flex items-center justify-center mb-10 
        md:py-0 py-14 relative overflow-hidden
      "
      style={{
        background: "linear-gradient(135deg, #79A085 0%, #5f7f6b 100%)",
      }}
    >
      {/* Elegant Transparent Leaf Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fh260/background/20221112/pngtree-minimal-green-watercolor-leaves-background-image_1503709.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="lg:container mx-auto px-6 pt-0 relative z-10">
        <div className="md:flex flex-col lg:flex-row items-center justify-between gap-10 space-y-10 md:space-y-0">

          {/* Text Section */}
          <div className="text-white w-full max-w-[800px]">
            <h4 className="text-lg font-semibold mb-2 tracking-wide uppercase opacity-90">
              Featured Event Story
            </h4>

            <h3 className="text-5xl font-bold leading-tight mb-4">
              Transform Your <span className="text-amber-300">Moments</span>
              <br /> Into Unforgettable <span className="text-amber-300">Events</span>
            </h3>

            {/* Elegant bullet list */}
            <ul className="mb-6 text-white/90 text-lg space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-300"></span>
                Book trusted event planners in minutes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-300"></span>
                Real-time updates for smooth coordination
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-300"></span>
                Perfect for weddings, parties & corporate events
              </li>
            </ul>

            <Link
              to="/blog"
              className="
                inline-block bg-white text-purple-600 px-8 py-3 rounded-xl 
                font-semibold shadow hover:bg-purple-100 transition
              "
            >
              Explore Ideas
            </Link>
          </div>

          {/* Image Card Section */}
          <div
            className="
              max-w-xs w-full p-2 rounded-2xl pt-6 relative 
            "
          >
            {/* Soft Gold Glow */}
            <div className="absolute inset-0 rounded-2xl blur-xl opacity-30 bg-amber-300"></div>

            <img
              src={pb}
              alt="Banner"
              className="
                w-full h-auto object-cover rounded-xl shadow-2xl 
                border-[6px] border-white/50
              "
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
