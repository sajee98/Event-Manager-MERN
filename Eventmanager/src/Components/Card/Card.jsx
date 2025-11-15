import { Link } from "react-router-dom";

export default function Card({ post }) {
  return (
    <div className="space-y-3 bg-white p-3 rounded-xl shadow-md max-w-[320px]">
      {/* Image */}
      <div className="w-full max-h-[200px] h-full overflow-hidden rounded-lg">
        <img
          src={post?.image || "/placeholder.jpg"}
          className="w-full h-[200px] object-cover"
          alt={post?.title || "Post Image"}
        />
      </div>

      {/* Status & Date */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-gray-800 font-bold leading-tight">
        {post?.title || "Untitled"}
      </h3>
        
        <span className="text-xs text-secondary-dark-gray font-medium capitalize">
          {post?.date ? new Date(post.date).toLocaleDateString() : "No date"}
        </span>
      </div>

      {/* Title */}
      <h5 className="text-sm text-primary-dark-gray font-semibold uppercase">
          {post?.status || "Draft"}
        </h5>

      {/* Read More */}
      <div className="pt-2">
        <Link
        to={`/details/${post?._id}`}
        className="text-base text-violet-800 font-bold hover:underline"
      >
        Read More
      </Link>
      </div>
    </div>
  );
}
