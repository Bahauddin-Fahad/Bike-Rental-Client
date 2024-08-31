import { FaQuoteRight } from "react-icons/fa";
import Slider from "react-slick";
import { getTestimonials } from "../../assets/jsons/testimonial";

const Testimonial = () => {
  const testimonials = getTestimonials();

  const settings = {
    speed: 500,
    className: "center",
    centerMode: true,
    centerPadding: "40px",
    infinite: true,
    slidesToShow: 3,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <div className="bg-secondary dark:bg-primary">
      <div className="py-[50px] lg:py-[120px] space-y-6 xl:space-y-[70px]">
        <div className="space-y-4 xl:space-y-[30px] flex flex-col items-center max-w-xs lg:max-w-2xl text-center mx-auto px-2">
          <h1 className="font-vietnam text-[20px] xl:text-[40px] tracking-tight leading-[25px] xl:leading-[48px]">
            Hear What Our Clients Have to Say{" "}
            <span className="text-accent">About Their Journey</span>
          </h1>
          <p className="font-shatoshi text-xs xl:text-base 2xl:text-xl">
            With our top-quality bikes and exceptional service, our clients'
            experiences speak for themselves. Discover the stories of those
            who’ve hit the road with us.
          </p>
        </div>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between space-y-2 lg:space-y-10"
            >
              <p className="flex justify-center">
                <FaQuoteRight className="text-xl lg:text-6xl text-accent" />
              </p>
              <p className="mx-5 xl:mx-10 text-justify font-satoshi text-xs lg:text-xl h-[100px] lg:h-[180px]">
                “{testimonial.review}”
              </p>
              <div>
                <h2 className="text-center font-semibold text-sm lg:text-lg">
                  {testimonial.name}
                </h2>
                <h3 className="text-center text-sm lg:text-base">
                  {testimonial.profession}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
