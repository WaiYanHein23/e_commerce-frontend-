import { Swiper, SwiperSlide } from "swiper/react";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import LatestProduct from "../components/LatestProduct";
import FeatureProduct from "../components/FeatureProduct";
import Container from "../components/Container";

const Home = () => {
  return (
    <>
      <div className="bg-green-700">
        <img src={img3} className="w-full" alt="image" />
      </div>

      <div className=" bg-green-700">
        <img src={img2} className="w-screen" alt="image" />
      </div>
      {/* latest product */}
      <LatestProduct />

      {/* feature product */}
      <FeatureProduct />
    </>
  );
};

export default Home;
