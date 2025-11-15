import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendorLoading, setVendorLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
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
        const res = await axios.get(
          `http://localhost:3000/api/vendors/category/${blog.status}`
        );
        setVendors(res.data);
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

  const brands = ["2nd Day","A Question Or","AIDO","Alice & You","American Apparet","American Vintage","AQ AQ"];

  return (
    <div className="w-full bg-white pb-20 px-4 md:px-0">
      {/* Toggle button for mobile */}
      <div className="flex justify-end md:hidden mt-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md font-semibold"
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="lg:container mx-auto flex flex-col md:flex-row gap-6 mt-6">
        {/* Filter Sidebar */}
        {(showFilter || window.innerWidth >= 768) && (
          <div className="w-full md:w-60 p-4 md:p-6 bg-white shadow-md rounded-xl flex-shrink-0 h-fit sticky top-6 space-y-6">
            {/* Search */}
            <div>
              <h2 className="text-sm font-bold mb-2">Search</h2>
              <input
                type="text"
                placeholder="Search vendors..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Price */}
            <div>
              <h2 className="text-sm font-bold mb-2">Price Range</h2>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="$0"
                  className="w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="$1000"
                  className="w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
            </div>

            {/* Brands */}
            <div>
              <h2 className="text-sm font-bold mb-2">Brand</h2>
              <div className="flex flex-wrap md:flex-col gap-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset */}
            <div className="flex gap-3 mt-4 flex-wrap">
              <button className="flex-1 px-4 py-2 border text-sm border-gray-300 rounded-md font-semibold hover:bg-gray-100 transition">
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Vendor Section */}
        <div className="flex-1">
          {/* Blog Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 mt-4 relative">
            {blog.status}
            <span className="block w-18 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mt-2"></span>
          </h1>

          {vendorLoading ? (
            <p className="text-center mt-6">Loading vendors...</p>
          ) : vendors.length > 0 ? (
            <div className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                {vendors.map((vendor) => (
                  <div key={vendor._id} className="space-y-4 bg-white p-4 rounded-2xl shadow-md">
                    <div className="w-full h-64 sm:h-72 md:h-60 overflow-hidden rounded-2xl">
                      <img
                        src={vendor.image || "/placeholder.jpg"}
                        alt={vendor.vendorName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
                      {vendor.vendorName}
                      <h5 className="text-sm md:text-base text-gray-400">{vendor.category || "Vendor"}</h5>
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">
                      {vendor.aboutUs ? vendor.aboutUs.slice(0, 100) + "..." : "No address available."}
                    </p>
                    <Link
                      to={`/vendorDetails/${vendor._id}`}
                      className="text-sm md:text-lg text-violet-800 font-bold capitalize hover:underline"
                    >
                      View Vendor
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center mt-10">No vendors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
