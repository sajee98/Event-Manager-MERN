import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function VendorDetails() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, src: null });
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchVendor = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/post/${id}`);
        if (mounted) setVendor(res.data);
      } catch {
        if (mounted) setError("Failed to load vendor details.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchVendor();
    return () => (mounted = false);
  }, [id]);

  if (loading)
    return <p className="text-center mt-12 text-gray-500">Loading vendor details...</p>;
  if (error)
    return <p className="text-center mt-12 text-red-500">{error}</p>;
  if (!vendor)
    return <p className="text-center mt-12 text-gray-500">Vendor not found.</p>;

  const priceFrom = vendor.priceFrom || vendor.priceRange?.from || null;
  const gallery = vendor.images?.length ? vendor.images : vendor.gallery || [];
  const formatPrice = (p) => (p ? `$${p.toLocaleString()}` : "Contact for pricing");

  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
       <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-md">
  {vendor.eventName}
</h1>

      <div className="max-w-6xl mx-auto">
     
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent p-6 flex items-end">
            <div className="text-white">
              <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-lg">
                {vendor.vendorName}
              </h1>
              <div className="mt-2 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                  <strong className="text-lg">{vendor.rating?.toFixed(1) ?? "—"}</strong>
                  <span className="text-xs opacity-80">★</span>
                  <span className="opacity-80">•</span>
                  <span className="text-xs opacity-80">{vendor.reviews?.length || 0} reviews</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"/>
                  </svg>
                  <span className="text-xs opacity-80">{vendor.category || "Event Planner"}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 items-start">

          {/* Main Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            <section className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-bold text-pink-600 mb-2 border-b pb-1 border-pink-200 inline-block">About</h2>
              <p className="text-gray-700 text-justify leading-relaxed">{vendor.aboutUs || vendor.description || "No description provided."}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: "M9 12h6M9 16h6M9 8h6", label: "Service", value: vendor.serviceType || "Full event planning" },
                  { icon: "M3 10h4l3 8 4-16 3 8h4", label: "Starting Price", value: formatPrice(priceFrom || vendor.startingPrice) },
                  { icon: "M17 20h5V10H2v10h5", label: "Location", value: vendor.location?.city || vendor.city || "—" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="p-3 rounded-lg bg-pink-50">
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      <div className="font-medium text-gray-800">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            {gallery.length > 0 && (
              <section className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox({ open: true, src: img.startsWith("http") ? img : `http://localhost:3000/uploads/${img}` })}
                      className="overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                      <img
                        src={img.startsWith("http") ? img : `http://localhost:3000/uploads/${img}`}
                        alt={`gallery-${i}`}
                        className="w-full h-28 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Packages */}
            <section className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Packages</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(vendor.packages?.length ? vendor.packages : [
                  { name: "Standard", price: priceFrom },
                  { name: "Premium", price: priceFrom ? priceFrom * 1.6 : null },
                ]).map((pkg, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-100 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500">{pkg.name}</div>
                        <div className="text-lg font-semibold">{pkg.price ? formatPrice(pkg.price) : "Custom"}</div>
                      </div>
                      <div className="text-sm text-gray-400">{pkg.duration || "per event"}</div>
                    </div>
                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
                      {(pkg.features || ["Venue coordination", "Catering support", "Decor"]).map((f, i) => <li key={i}>• {f}</li>)}
                    </ul>
                    <div className="mt-4 flex items-center gap-2">
                      <button onClick={() => setContactOpen(true)} className="px-3 py-2 rounded-full bg-pink-500 text-white text-sm hover:bg-pink-600 transition">Enquire</button>
                      <Link to={`/vendorDetails/${vendor._id}/book`} className="text-sm text-pink-600 font-medium hover:underline">Book now</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-6 z-20 bg-white/95 backdrop-blur rounded-2xl p-6 shadow-lg">
              <div className="text-sm text-gray-500">Starting from</div>
              <div className="text-3xl font-extrabold text-gray-900 mt-1">{formatPrice(priceFrom || vendor.startingPrice)}</div>
              <div className="mt-3 text-sm text-gray-600">Includes basic coordination & vendor management</div>
              <div className="mt-4 grid gap-2">
                <button onClick={() => setContactOpen(true)} className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow hover:from-pink-600 transition">Request quote</button>
                <a href={`mailto:${vendor.email || ""}`} className="block text-center px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition">Message</a>
                <a href={`tel:${vendor.phoneNo || ""}`} className="block text-center px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition">Call</a>
              </div>
              <div className="mt-4 text-xs text-gray-500">Available for: <span className="font-medium text-gray-700">{vendor.eventTypes?.join(", ") || "Weddings, Corporate, Parties"}</span></div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition text-sm">
              <div className="font-semibold mb-2">Location</div>
              <div className="h-36 w-full rounded-md bg-gray-100 grid place-items-center">Map placeholder</div>
              <div className="mt-2 text-xs text-gray-600">{vendor.address || vendor.location?.address || "Address not provided"}</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition text-sm">
              <div className="font-semibold mb-2">Follow</div>
              <div className="flex items-center gap-3">
                <a href={vendor.facebook || "#"} className="text-blue-600 text-sm hover:underline">Facebook</a>
                <a href={vendor.instagram || "#"} className="text-pink-500 text-sm hover:underline">Instagram</a>
                <a href={vendor.youtube || "#"} className="text-red-600 text-sm hover:underline">YouTube</a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setLightbox({ open: false, src: null })}>
          <img src={lightbox.src} alt="lightbox" className="max-h-[90vh] w-auto rounded-lg shadow-lg object-contain" />
        </div>
      )}

      {/* Contact Modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Request a Quote</h3>
              <button onClick={() => setContactOpen(false)} className="text-gray-500 hover:text-gray-700">Close</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("Request sent (demo)"); setContactOpen(false); }} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="name" className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" placeholder="Your name" required />
                <input name="contact" className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" placeholder="Phone or email" required />
              </div>
              <textarea name="details" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" placeholder="Message / event details" rows={4} />
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">We usually respond within 24 hours</div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setContactOpen(false)} className="px-4 py-2 rounded-md border hover:bg-gray-50 transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 transition">Send Request</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
