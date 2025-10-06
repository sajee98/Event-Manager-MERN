import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const VendorDetails = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/vendors/${id}`);
        setVendor(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load vendor details.");
        setLoading(false);
      }
    };
    fetchVendor();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading vendor details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!vendor) return <p className="text-center mt-10 text-gray-500">Vendor not found.</p>;

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Main Card Section */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-stretch gap-6">
        {/* Left Image */}
        <div className="flex-shrink-0 w-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img
            src={vendor.image || "/placeholder.jpg"}
            alt={vendor.vendorName}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right Card */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm text-indigo-600 font-bold uppercase tracking-wide">{vendor.category}</h5>
            <span className="text-xs text-gray-400 font-semibold">{vendor.phoneNo || "No Phone"}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-1">{vendor.vendorName}</h2>
          <h3 className="text-md font-semibold text-gray-700 mb-4">{vendor.aboutUs || "Address not available"}</h3>

          <p className="text-gray-600 text-sm mb-2"><strong>Email:</strong> {vendor.email || "Not available"}</p>
          <p className="text-gray-600 text-sm mb-4"><strong>Phone:</strong> {vendor.phoneNo || "Not available"}</p>
<Link
            to="/blog"
            className="inline-block px-6 py-2 w-35 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-all"
          >
            Back to Blogs
          </Link>
        </div>
      </div>

      {/* Gallery Section */}
      {vendor.images && vendor.images.length > 0 && (
        <div className="max-w-4xl w-full mt-10">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {vendor.images.map((img, index) => (
              <div
                key={index}
                className="w-full h-40 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={`http://localhost:3000/uploads/${img}`}
                  alt={`Vendor gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDetails;
