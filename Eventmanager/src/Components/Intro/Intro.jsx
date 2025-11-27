import React from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <section
      className="w-full flex mt-10 p-4 items-center justify-center mb-10  bg-cover bg-center bg-no-repeat relative overflow-hidden"
      
    >
      {/* Soft overlay to dim the background for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/10 pointer-events-none p-8" />

      <div className="lg:container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Hero text + features */}
          <div className="relative z-10">
            {/* Decorative small top-left leaf */}
            <div className="hidden md:block absolute -left-6 -top-10 w-24 h-24 opacity-40 pointer-events-none">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0" stopColor="#79A085" stopOpacity="0.12" />
                    <stop offset="1" stopColor="#BFD4C9" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="50" fill="url(#g1)" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#043915] mb-4">
              Crafting <span className="text-amber-300">Unforgettable</span> Moments
            </h2>

            <p className="text-base md:text-lg text-gray-700 max-w-[650px] mb-6">
              We plan weddings, corporate galas and private parties with care and
              beautiful attention to detail. Book trusted planners, coordinate
              vendors, and manage timelines — all in one place.
            </p>

            <div className="flex flex-wrap gap-3 items-center mb-6">
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-[#79A085] hover:bg-[#4E675A] text-white rounded-lg font-semibold transition"
              >
                Get a Quote
              </Link>
              <Link
                to="/planner"
                className="inline-block px-6 py-3 border bg-amber-300 border-amber-200 text-[#043915] rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition"
              >
                View Services
              </Link>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#BFD4C9] via-white/40 to-[#BFD4C9] mb-6" />

            {/* Feature bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[700px]">
              <Feature
                title="Trusted Planners"
                desc="Handpicked pros for every style and budget."
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4z" fill="#79A085" />
                    <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="#4E675A" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                }
              />
              <Feature
                title="Real-time Coordination"
                desc="Live updates for vendor & guest management."
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="12" rx="2" stroke="#4E675A" strokeWidth="1.2" />
                    <path d="M8 20h8" stroke="#79A085" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                }
              />
              <Feature
                title="Custom Packages"
                desc="Tailored packages for weddings, corporate events & more."
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v6" stroke="#79A085" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="12" cy="16" r="3" stroke="#4E675A" strokeWidth="1.2" />
                  </svg>
                }
              />
              <Feature
                title="On-site Support"
                desc="Coordination team available on event day."
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" stroke="#4E675A" strokeWidth="1.2" />
                    <path d="M8 12l2.2 2.2L16 8.4" stroke="#79A085" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />
            </div>

            {/* Social proof / small stats */}
            <div className="flex items-center gap-6 mt-6">
              <div>
                <div className="text-2xl font-bold text-[#043915]">+250</div>
                <div className="text-sm text-gray-600">Events Organized</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#043915]">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right: translucent card with info + small collage */}
          <div className="relative z-10">
            <div
              className="max-w-[920px] w-full rounded-2xl p-8 shadow-lg bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://png.pngtree.com/thumb_back/fh260/background/20221104/pngtree-greenery-wedding-background-watercolor-and-gold-leaves-image_1470327.jpg')",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(4,57,21,0.55)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <h5 className="text-sm text-amber-100 font-bold uppercase tracking-wider">
                  Who We Are
                </h5>
                <span className="text-sm text-amber-200 font-semibold">28 June 2025</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Creating elegant, stress-free events with a personal touch
              </h3>

              <p className="text-sm md:text-base text-white/90 mb-6">
                From intimate weddings to large corporate galas — our planners
                bring design, logistics and warmth so you can enjoy every moment.
              </p>

              <div className="flex items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-2 bg-white text-[#4E675A] rounded-md font-semibold shadow hover:bg-white/90 transition"
                >
                  Read More
                </Link>

                <Link
                  to="/services"
                  className="px-6 py-2 border border-white/30 text-white rounded-md font-medium hover:bg-white/5 transition"
                >
                  Our Services
                </Link>
              </div>

              {/* Small collage (3 small thumbnails) */}
              <div className="mt-6 flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=60"
                  alt="collage-1"
                  className="w-20 h-14 object-cover rounded-lg border border-white/20 shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60"
                  alt="collage-2"
                  className="w-20 h-14 object-cover rounded-lg border border-white/20 shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=60"
                  alt="collage-3"
                  className="w-20 h-14 object-cover rounded-lg border border-white/20 shadow-sm"
                />
              </div>
            </div>

            {/* subtle bottom-left decorative leaf */}
            <div className="hidden lg:block absolute -left-6 bottom-0 w-28 h-28 opacity-30 pointer-events-none">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <path d="M20 90c40-60 80-40 80-40s-10 40-60 70C30 130 20 90 20 90z" fill="#BFD4C9" opacity="0.12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;

/* ---------- Small Feature component (kept inside file for simplicity) ---------- */
function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-md flex items-center justify-center bg-white/90 shadow-sm">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-[#043915]">{title}</div>
        <div className="text-sm text-gray-600">{desc}</div>
      </div>
    </div>
  );
}
