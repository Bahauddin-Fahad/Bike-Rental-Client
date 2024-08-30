import "./Home.css";
import Slider from "react-slick";
import { getBannerImages } from "../../assets/jsons/banner";
import { TBanner } from "../../types";
import { useState } from "react";
import SearchedBike from "../../components/bike/SearchedBike";
const Banner = () => {
  const [searchBike, setSearchBike] = useState("");
  const banners = getBannerImages();
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative">
      <div className="slider-container">
        <Slider {...settings}>
          {banners &&
            banners?.map((banner: TBanner, index: number) => (
              <div key={index}>
                <img
                  src={banner?.bannerImage}
                  alt="Banner"
                  className="mx-auto cursor-pointer w-full h-[500px] object-cover"
                />
              </div>
            ))}
        </Slider>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 gap-5">
        <div className="relative space-y-4 xl:space-y-[30px] flex flex-col items-center max-w-lg text-center mx-auto">
          <h1 className="font-vietnam text-[20px] xl:text-[50px] tracking-tight leading-[25px] xl:leading-[48px] text-white">
            Find Your <span className="text-accent">Perfect Ride</span>
          </h1>
          <p className="font-shatoshi text-xs xl:text-base 2xl:text-xl text-justify text-white">
            Browse through our extensive selection of bikes and discover the
            ideal ride for your next adventure. Whether you're commuting,
            exploring, or just enjoying the open road, we have the perfect bike
            for you.
          </p>
          <div className="w-full">
            <input
              type="text"
              placeholder="Search for a bike..."
              className="input input-bordered w-full max-w-lg bg-[#F6F6F6] text-black"
              onChange={(e) => setSearchBike(e.target.value)}
            />
            <div className="absolute top-full left-0 right-0 z-10">
              {searchBike && <SearchedBike searchBike={searchBike} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
