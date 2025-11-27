import { Link } from "react-router-dom";

export default function Card({ vendor }) {
  return (
    <div className="space-y-3 bg-white p-3 rounded-xl shadow-md max-w-[320px]">
      {/* Image */}
      <div className="w-full max-h-[200px] h-full group overflow-hidden rounded-lg">
      <img
    src={vendor?.image || "/placeholder.jpg"}
    alt={vendor?.title || "Vendor Image"}
    className="
      w-full h-[200px] object-cover
      transition-all duration-700 ease-out
      group-hover:scale-110
    "
  />
      </div>

      {/* Status & Date */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-gray-800 font-bold leading-tight">
        {vendor?.title || "Untitled"}
      </h3>
        
        <span className="text-xs text-secondary-dark-gray font-medium capitalize">
          {vendor?.date ? new Date(vendor.date).toLocaleDateString() : "No date"}
        </span>
      </div>

      {/* Title */}
      <h5 className="text-sm text-primary-dark-gray font-semibold uppercase">
          {vendor?.status || "Draft"}
        </h5>

      {/* Read More */}
      <div className="pt-2">
        <Link
        to={`/details/${vendor?._id}`}
        className="text-base text-violet-800 font-bold hover:underline"
      >
        Read More
      </Link>
      </div>
    </div>
  );
}
