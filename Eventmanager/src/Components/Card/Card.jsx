import { Link } from "react-router-dom";

export default function Card({ post }) {
  return (
    <div className="space-y-5 bg-white p-4 rounded-2xl shadow-md">
      {/* Image */}
      <div className="w-full max-h-[360px] h-full overflow-hidden rounded-2xl">
        <img
          src={post?.image || "/placeholder.jpg"}
          className="w-full min-h-[360px] object-cover"
          alt={post?.title || "Post Image"}
        />
      </div>

      {/* Status & Date */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <h5 className="text-base text-primary-dark-gray font-bold uppercase">
          {post?.status || "Draft"}
        </h5>
        <span className="text-sm text-secondary-dark-gray font-semibold capitalize">
          {post?.date ? new Date(post.date).toLocaleDateString() : "No date"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl text-gray-800 font-bold capitalize">
        {post?.title || "Untitled"}
      </h3>

      {/* Short Description */}
      <p className="text-base text-gray-600">
        {post?.description
          ? post.description.slice(0, 100) + "..."
          : "No description available."}
      </p>

      {/* Read More */}
      <Link
        to={`/details/${post?._id}`}
        className="text-lg text-violet-800 font-bold capitalize hover:underline"
      >
        Read More
      </Link>
    </div>
  );
}
