import Banner from "./Banner";
import ContactUs from "./ContactUs";
import HomeBikes from "./HomeBikes";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div className="space-y-10 xl:space-y-[120px] mb-10 xl:mb-[120px]">
      <Banner />
      <HomeBikes />
      <Testimonial />
      <ContactUs />
    </div>
  );
};

export default Home;
