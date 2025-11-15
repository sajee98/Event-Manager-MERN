import Banner from "../../Components/Banner/Banner";
import Intro from "../../Components/Intro/Intro";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import RecentPost from "../../Components/RecentPost/RecentPost";

const Home = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20221104/pngtree-greenery-wedding-background-watercolor-and-gold-leaves-image_1470327.jpg')",
      }}
    >
      <Banner />
      <Intro />
      <RecentPost />
      <NewsLetter />
    </div>
  );
};


export default Home;