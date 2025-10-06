import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all blogs once on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load blogs.");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Find blog by id
  const blog = blogs.find((b) => String(b.id || b._id) === id);

  // Fetch vendors for this blog's category/status
  useEffect(() => {
    if (blog?.status) {
      const fetchVendors = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/vendors/category/${blog.status}`
          );
          setVendors(res.data); // all vendors for this category
        } catch (err) {
          setVendors([]);
        }
      };
      fetchVendors();
    }
  }, [blog]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="w-full flex items-center justify-center bg-white pb-[80px]">
      <div className="lg:container mx-auto">
        {/* Blog Title */}
        <div className="flex items-center justify-between gap-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 mt-3 relative">
    {blog.status}
            <span className="block w-16 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mt-2"></span>
          </h1>
        </div>

        <div className="md:flex items-center justify-between gap-12 mt-8 md:space-y-0 space-y-8">
          {/* Blog main content */}
          <div className="max-w-[712px] min-h-[456px] h-full w-full">
            <img
              src={blog.image}
              alt={blog.title}
              className="max-w-[712px] min-h-[456px] h-full w-full object-cover rounded-2xl"
            />
          </div>

          <div>
            <div className="min-w-[478px] w-full bg-white rounded-2xl p-5 shadow">
              <div className="flex items-center justify-between gap-2 mb-6">
                <h5 className="text-base text-primary-dark-gray font-bold uppercase">
                  {blog.status}
                </h5>
                <span className="text-sm text-secondary-dark-gray font-semibold capitalize">
                  {blog.date}
                </span>
              </div>
              <h3 className="text-3xl text-gray-800 font-bold mb-5">
                {blog.title}
              </h3>
              <p className="text-base text-gray-600 mb-6">
                {blog.description}
              </p>

              <Link
                to="/blog"
                className="text-base text-gray-800 font-bold capitalize px-10 py-4 bg-white rounded-2xl border border-violet-500 inline-block"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

       {vendors.length > 0 && (
  <div className="mt-10">
    <h2 className="text-3xl font-bold mb-6">Vendors</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {vendors.map((vendor) => (
        <div
          key={vendor._id}
          className="space-y-5 bg-white p-4 rounded-2xl shadow-md"
        >
          {/* Vendor Image */}
          <div className="w-full max-h-[360px] h-full overflow-hidden rounded-2xl">
            <img
              src={vendor.image || "/placeholder.jpg"}
              alt={vendor.vendorName}
              className="w-full min-h-[360px] object-cover"
            />
          </div>

          {/* Status & Date (you can replace with something meaningful for vendors) */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <h5 className="text-base text-primary-dark-gray font-bold uppercase">
              {vendor.category || "Vendor"}
            </h5>
            <span className="text-sm text-secondary-dark-gray font-semibold capitalize">
              {vendor.phoneNo || "No Phone"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl text-gray-800 font-bold capitalize">
            {vendor.vendorName}
          </h3>

          {/* Short Description */}
          <p className="text-base text-gray-600">
            {vendor.aboutUs
              ? vendor.aboutUs.slice(0, 100) + "..."
              : "No address available."}
          </p>

          {/* View More */}
          <Link
            to={`/vendorDetails/${vendor._id}`}
            className="text-lg text-violet-800 font-bold capitalize hover:underline"
          >
            View Vendor
          </Link>
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default BlogDetails;
