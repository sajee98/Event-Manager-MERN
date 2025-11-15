import { Link } from "react-router-dom"; // <-- fix this import
import SectionHeader from "../../../SectionHeader/SectionHeader";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import axios from "axios";

const RecentPost = () => {
  const [posts, setPosts] = useState([]); // plural name for array
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts");
      setPosts(response.data); // set the posts fetched
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Use posts from API, show all or slice first 3 depending on `view`
  const filteringPosts = view ? posts : posts.slice(0, 6);

  if (loading) {
    return <p className="text-center mt-10">Loading posts...</p>;
  }

  return (
    <div className="w-full flex items-center justify-center  bg-white pb-10 bg-[url('https://img.freepik.com/free-vector/background-leaf-pattern-design-template_483537-2317.jpg?semt=ais_incoming&w=740&q=80')]
  bg-no-repeat bg-cover bg-center">
      <div className="lg:container mx-auto">
       <div className="flex flex-col md:flex-row items-start  md:items-center md:pl-3 justify-between gap-4 md:gap-10 w-full">
  <SectionHeader
    title={"Categories"}
    style={"w-full md:w-auto flex items-start md:items-center"} // let header take full width on small
  />

  {!view && (
    <Link to="/planner" className="w-full md:w-auto">
      <button
        className="block w-full md:inline-block text-sm md:text-base text-white bg-purple-800 py-2 px-6 md:py-4 md:px-11 rounded-xl cursor-pointer font-bold capitalize text-center"
        style={{ fontFamily: "Roboto, sans-serif" }}
        aria-label="View all posts"
      >
        View All
      </button>
    </Link>
  )}
</div>


      

        {/* blog wrapper */}
        <div className="grid md:grid-cols-4 gap-4 mt-10">
          {filteringPosts?.map((post) => (
            <Card key={post._id || post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
