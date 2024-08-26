import Banner from "./Banner";
import ContactUs from "./ContactUs";
import HomeBikes from "./HomeBikes";
import Testimonial from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // });
  return (
    <div className="space-y-10 xl:space-y-[120px] mb-10 xl:mb-[120px]">
      <Banner />
      <HomeBikes />
      <Testimonial />
      <ContactUs />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
