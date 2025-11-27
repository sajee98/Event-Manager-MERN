import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewVendors = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendorLoading, setVendorLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  // UI filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/vendor/${id}`);
        setBlog(response.data);
      } catch {
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (!blog?.status) return;
    const fetchVendors = async () => {
      setVendorLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/post/category/${blog.status}`);
        setVendors(res.data || []);
      } catch {
        setVendors([]);
      } finally {
        setVendorLoading(false);
      }
    };
    fetchVendors();
  }, [blog]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  const brands = [
    "Photography",
    "Catering",
    "Decoration",
    "Sounds",
    "Hall",
    "Makeup",
    "Car Rental",
    "Invitation Cards",
    "Lighting",
  ];

  // --- client-side filtering logic ---
  const filteredVendors = vendors.filter((v) => {
    // search: match title or shortDes
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      const inTitle = (v.eventName || "").toLowerCase().includes(q);
      const inShort = (v.shortDes || "").toLowerCase().includes(q);
      if (!inTitle && !inShort) return false;
    }

    // price range (assumes vendor.price numeric; if not present, keep it)
    const price = Number(v.price ?? 0);
    if (minPrice !== "" && !Number.isNaN(Number(minPrice)) && price < Number(minPrice)) return false;
    if (maxPrice !== "" && !Number.isNaN(Number(maxPrice)) && price > Number(maxPrice)) return false;

    // selected brands
    if (selectedBrands.length > 0) {
      // assume vendor.category contains the brand/service name
      const cat = (v.category || v.service || "").toLowerCase();
      const matches = selectedBrands.some((b) => cat.includes(b.toLowerCase()));
      if (!matches) return false;
    }

    return true;
  });

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrands([]);
  };

  // skeleton card component
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white p-4 rounded-2xl shadow-sm">
      <div className="h-44 bg-gray-200 rounded-lg mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/5 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-4/5 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mt-4" />
    </div>
  );

  return (
    <div className="w-full bg-white pb-24 px-4 md:px-6">
      {/* Hero header */}
      <div className="lg:container mx-auto mt-6">
        <div className="rounded-2xl p-2 bg-gradient-to-r from-amber-100 via-white to-amber-50 shadow-md flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {blog.status}
            </h1>
            <p className="mt-1 text-gray-700">
              Discover trusted vendors and event planners curated for <span className="font-semibold">{blog.status}</span>. Use filters to narrow results.
            </p>
          </div>

          <div className="flex items-center gap-3">
              <img
              src="https://static.vecteezy.com/system/resources/previews/035/566/363/non_2x/event-tent-logo-design-concept-illustration-symbol-icon-vector.jpg"
              alt="React Logo"
              className="w-24 h-18 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="lg:container mx-auto flex flex-col md:flex-row gap-6 mt-6">
        {/* Filter Sidebar */}
        {(showFilter || window.innerWidth >= 768) && (
        <aside
  className="w-full md:w-60 p-6 rounded-xl shadow-lg flex-shrink-0 h-fit sticky top-6 space-y-6 border border-gray-200 bg-white"
  style={{
    backgroundImage: "url('/bg-pattern.png')", // optional: subtle decorative pattern
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }}
>
  {/* Search */}
  <div>
    <h2 className="text-sm font-semibold text-gray-800 mb-2">Search</h2>
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      type="text"
      placeholder="Search vendors or keywords..."
      className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
    />
  </div>

  {/* Price Range */}
  <div>
    <h2 className="text-sm font-semibold text-gray-800 mb-2">Price Range</h2>
    <div className="flex gap-2">
      <input
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        type="number"
        placeholder="Min"
        className="w-1/2 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
      <input
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        type="number"
        placeholder="Max"
        className="w-1/2 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
    </div>
  </div>

  {/* Services */}
  <div>
    <h2 className="text-sm font-semibold text-gray-800 mb-2">Services</h2>
    <div className="flex flex-wrap gap-2">
      {brands.map((brand) => {
        const active = selectedBrands.includes(brand);
        return (
          <button
            key={brand}
            onClick={() => toggleBrand(brand)}
            className={`px-3 py-1 text-sm rounded-full border font-medium ${active ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-amber-50"}`}
          >
            {brand}
          </button>
        );
      })}
    </div>
  </div>

  {/* Reset / Apply */}
  <div className="flex gap-3 mt-2">
    <button
      onClick={resetFilters}
      className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-md font-semibold hover:bg-gray-200 transition"
    >
      Reset
    </button>
    <button
      onClick={() => {}}
      className="px-4 py-2 text-sm bg-amber-400 text-white rounded-md font-semibold hover:bg-amber-500 transition"
    >
      Apply
    </button>
  </div>

  <div className="text-xs text-gray-500 mt-2">
    Tip: Combine keywords + service to narrow results quickly.
  </div>
</aside>

        )}

        {/* Vendor Section */}
        <main className="flex-1">
          {/* vendor count + quick chips */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredVendors.length}</span> of <span className="text-gray-700">{vendors.length}</span> vendors
              </div>

              {/* quick active chips */}
              {selectedBrands.slice(0, 3).map((b) => (
                <span key={b} className="px-3 py-1 text-xs bg-amber-100 rounded-full text-amber-800 font-semibold">
                  {b}
                </span>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vendors..."
                className="px-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

          {vendorLoading ? (
            // skeleton grid
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredVendors.length > 0 ? (
           <div className="mt-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredVendors.map((vendor) => {
      const rating = Math.max(0, Math.min(5, Math.round(vendor.rating || 0)));
      return (
        <div
          key={vendor._id}
          className="relative bg-white p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 pb-16"
        >
          {/* Image */}
          <div className="group w-full h-48 sm:h-52 md:h-44 lg:h-48 overflow-hidden rounded-xl">
            <img
              src={vendor.logo ? `http://localhost:3000/uploads/${vendor.logo}` : "/placeholder.jpg"}
              alt={vendor.eventName || "Vendor image"}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Price Tag */}
            {vendor.price && (
              <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-lg text-sm font-semibold shadow">
                ${vendor.price}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-3 text-lg font-semibold text-gray-900 capitalize tracking-tight">
            {vendor.eventName || "Untitled Vendor"}
          </h3>

          {/* Meta Chips */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {vendor.category && <span className="text-xs px-2 py-1 bg-amber-100 rounded-full text-amber-800">{vendor.category}</span>}
            {vendor.location && <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-700">{vendor.location}</span>}
          </div>

          {/* Short Description */}
          <p className="text-sm text-gray-600 mt-3 text-justify leading-relaxed min-h-[48px]">
            {vendor.shortDes ? vendor.shortDes.slice(0, 120) + (vendor.shortDes.length > 120 ? "..." : "") : "No information available."}
          </p>

          {/* Rating - Bottom Left */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
            <span className="text-yellow-500 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>★</span>
              ))}
            </span>
            <span className="text-xs font-medium text-gray-700">({rating})</span>
          </div>

          {/* View Vendor & Contact - Bottom Right */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <Link
              to={`/vendorDetails/${vendor._id}`}
              className="text-sm font-semibold text-violet-700 hover:text-violet-900 underline underline-offset-4 transition"
            >
              View Vendor
            </Link>

            {vendor.phone && (
              <a
                href={`tel:${vendor.phone}`}
                className="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-600 text-white shadow hover:bg-violet-700 transition"
                title="Call"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l2 7 4-2 5 5 2-2v4H3z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      );
    })}
  </div>
</div>

          ) : (
            // empty state with CTA
            <div className="mt-10 text-center">
              <div className="mx-auto max-w-xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No vendors match your filters</h3>
                <p className="text-gray-600 mb-6">Try clearing filters or expanding your price range. We curate the best event planners for you.</p>
                <div className="flex items-center justify-center gap-3">
                  <button onClick={resetFilters} className="px-4 py-2 bg-violet-700 text-white rounded-lg font-semibold hover:bg-violet-800 transition">Clear filters</button>
                  <Link to="/vendors" className="px-4 py-2 border rounded-lg">Browse all vendors</Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewVendors;
