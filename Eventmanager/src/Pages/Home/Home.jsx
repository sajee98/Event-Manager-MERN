import Banner from "../../Components/Banner/Banner";
import Intro from "../../Components/Intro/Intro";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import RecentPost from "../../Components/RecentPost/RecentPost";

const Home = () => {
  return (
   
   <div>
     <div>
      <Banner> </Banner>
    </div>
     <div>
      <Intro />
    </div>
    <div>
      <RecentPost />
    </div> 
    <div>
      <NewsLetter />
    </div>
   </div>
  );
}

export default Home;