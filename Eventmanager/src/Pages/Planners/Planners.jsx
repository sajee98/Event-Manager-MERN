import { Link } from "react-router";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import axios from "axios";

const Planners = () => {
  const [posts, setPosts] = useState([]); // plural name for array
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts');
      setPosts(response.data);  // set the posts fetched
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
  const filteringPosts = view ? posts : posts.slice(0, 3);

  if (loading) {
    return <p className="text-center mt-10">Loading posts...</p>;
  }
  return (
    <div className="w-full flex items-center justify-center bg-white pb-[80px]">
      <div className="lg:container mx-auto">
        <div className="flex items-center justify-between gap-10">
          {/* sectionHeader */}
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 mt-3 relative">
            Event Planners
            <span className="block w-40 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mt-2"></span>
          </h1>
        </div>

        <div className="md:flex items-center justify-between gap-12 mt-8 md:space-y-0 space-y-8">
          {/* recent post left wrapper  */}
          <div className="max-w-[712px] min-h-[456px] h-full w-full">
            <img
              src="/technology_image.jpg"
              alt=""
              className="max-w-[712px] min-h-[456px] h-full w-full object-cover rounded-2xl"
            />
          </div>
          {/* recent post right wrapper  */}
          <div>
            <div className="min-w-[478px] w-full bg-white rounded-2xl p-5 shadow">
              <div className="flex items-center justify-between gap-2 mb-6">
                <h5 className="text-base text-primary-dark-gray font-bold font-roboto uppercase">
                  Development
                </h5>
                <span
                  style={{ fontFamily: "Roboto, sans-serif" }}
                  className="text-sm text-secondary-dark-gray font-roboto font-semibold capitalize"
                >
                  28 June 2025
                </span>
              </div>
              <h3 className="text-3xl text-gray-800 font-raleway font-bold mb-5">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing reiciendis.
                Adipisci ullam asperiores
              </h3>
              <p
                style={{ fontFamily: "Roboto, sans-serif" }}
                className="text-base text-gray-600 font-roboto font-normal mb-6"
              >
                {" "}
                Lorem ipsum dolor sit amet consequatur possimus enim, animi, ad
                autem at tempore, totam obcaecati exercitationem quam quia
                incidunt iste? Tempora, molestias corporis Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Repudiandae reiciendis qui
                blanditiis consequatur possimus enim, animi, ad autem at
                tempore, totam obcaecati exercitationem quam quia incidunt iste?
                Tempora, molestias corporis.
              </p>
              <Link
                to="/blog"
                className="text-base text-gray-800 font-raleway  font-bold capitalize px-10 py-4 bg-white rounded-2xl border boreder-voilet-500 inline-block"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>

         <div className="grid md:grid-cols-3 gap-8 mt-10">
                  {filteringPosts?.map((post) => (
                    <Card key={post._id || post.id} post={post} />
                  ))}
                </div>
      </div>
    </div>
  );
};

export default Planners;
