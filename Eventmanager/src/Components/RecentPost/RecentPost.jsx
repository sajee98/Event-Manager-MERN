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
    <div className="w-full flex items-center justify-center bg-white pb-[80px]">
      <div className="lg:container mx-auto">
        <div className="flex items-center justify-between gap-10">
          <SectionHeader
            title={"Our Recent Posts"}
            style={"flex items-center justify-start"}
          />
          {!view && (
            <Link to="/planner">
              <button
                className="text-base text-white bg-purple-800 py-4 px-11 rounded-xl cursor-pointer font-bold capitalize"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                View All
              </button>
            </Link>
          )}
        </div>

        <div className="md:flex items-center justify-between gap-12 mt-8 md:space-y-0 space-y-8">
          <div className="max-w-[712px] min-h-[456px]  h-auto w-full">
            <img
              src="https://static.malabargoldanddiamonds.com/media/boiimages/bg/thumbs/1628165340tamil_b.jpg"
              alt=""
              className="max-w-[712px] min-h-[456px]  h-full w-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <div className="min-w-[478px] w-full bg-white rounded-2xl p-5 shadow">
              <div className="flex items-center justify-between gap-2 mb-6">
                <h5 className="text-base text-primary-dark-gray font-bold font-roboto uppercase">
                  Customer Reviews
                </h5>
                <span
                  style={{ fontFamily: "Roboto, sans-serif" }}
                  className="text-sm text-secondary-dark-gray font-roboto font-semibold capitalize"
                >
                  28 June 2025
                </span>
              </div>
              <h3 className="text-3xl text-gray-800 font-raleway font-bold mb-5">
                sLorem ipsum dolor sit amet consectetur adipisicing reiciendis.
                Adipisci ullam asperiores
              </h3>
              <p
                style={{ fontFamily: "Roboto, sans-serif" }}
                className="text-base text-gray-600 font-roboto font-normal mb-6"
              >
                Lorem ipsum dolor sit amet consequatur possimus enim, animi, ad
                autem at tempore, totam obcaecati exercitationem quam quia
                incidunt iste? Tempora, molestias corporis Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Repudiandae reiciendis qui
                blanditiis consequatur possimus enim, animi, ad autem at
                tempore, totam obcaecati exercitationem quam quia incidunt iste?
                Tempora, molestias corporis.
              </p>
              {/* <Link
                to="/planner"
                className="text-base text-gray-800 font-raleway font-bold capitalize px-10 py-4 bg-white rounded-2xl border border-violet-500 inline-block"
              >
                Read More
              </Link> */}
            </div>
          </div>
        </div>

        {/* blog wrapper */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {filteringPosts?.map((post) => (
            <Card key={post._id || post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
