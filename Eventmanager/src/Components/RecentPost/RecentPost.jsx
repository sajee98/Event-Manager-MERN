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
      const response = await axios.get("http://localhost:3000/api/vendor");
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
       <div className="flex flex-col md:flex-row bg-amber-200 items-start  md:items-center md:pl-3 justify-between gap-4 md:gap-10 w-full rounded-2xl p-4 shadow-md mt-1">
  <SectionHeader
    title={"Categories"}
    style={"w-full md:w-auto flex items-start md:items-center"} // let header take full width on small
  />
  <div className="flex flex-wrap gap-3">
    {["Wedding", "Birthday", "Corporate", "Anniversary", "Festival", "Concert"].map((category) => (
      <button
        key={category}
        className="px-4 py-2 bg-white text-gray-800 rounded-full shadow hover:bg-purple-100 transition text-sm font-medium"
      > 
        {category}
      </button>
    ))}
  </div>
 
</div>


      

        {/* blog wrapper */}
        <div className="grid md:grid-cols-4 gap-4 mt-10">
          {filteringPosts?.map((vendor) => (
            <Card key={vendor._id || vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
