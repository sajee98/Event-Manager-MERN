import { Link } from "react-router";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import axios from "axios";

const Planners = () => {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts");
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteringPosts = view ? posts : posts.slice(0, 12);

  if (loading) {
    return <p className="text-center mt-10">Loading posts...</p>;
  }

  return (
   <div
  className="w-full flex items-center justify-center bg-white pb-[80px]
  bg-[url('https://img.freepik.com/free-vector/background-leaf-pattern-design-template_483537-2317.jpg?semt=ais_incoming&w=740&q=80')]
  bg-no-repeat bg-cover bg-center"
>
      <div className="lg:container mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between gap-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 mt-3 relative">
            Event Planners
            <span className="block w-40 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mt-2"></span>
          </h1>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-10">
          {filteringPosts?.map((post) => (
            <Card key={post._id || post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planners;
