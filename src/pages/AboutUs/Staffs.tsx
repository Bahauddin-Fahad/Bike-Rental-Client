import Slider from "react-slick";

import { getStaffs } from "../../assets/jsons/staffs";

const Staffs = () => {
  const staffs = getStaffs();

  const settings = {
    fade: true,
    dots: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    swipeToSlide: false,
    arrows: false,
    swipe: false,
  };

  return (
    <div className="space-y-5">
      <div className="max-w-lg mx-auto">
        <h1 className="font-vietnam-bold text-[#2E603C] text-[20px] xl:text-[40px] 2xl:text-[55px] text-center tracking-tight ">
          Our <span className="text-accent">Staffs</span>
        </h1>
      </div>
      <div className={`glass bg-secondary dark:bg-primary py-5`}>
        <div className={`mx-auto`}>
          <Slider {...settings} className="mx-auto">
            {staffs.map((staff, i) => (
              <div className={`px-3 slide flex-row`} key={i}>
                <img
                  className="block object-contain h-[50vh] lg:h-[80vh] mx-auto lg:mx-0"
                  src={staff.image}
                  alt=""
                />
                <div className="space-y-5 max-w-sm">
                  <div className="h-[4px] w-[70px] bg-[#2E603C] mx-0 -mb-3 rounded-full" />
                  <h6 className={`uppercase tracking-[5px] text-xs lg:text-sm`}>
                    RideOne Rentals Staffs
                  </h6>

                  <h5 className="font-semibold lg:text-2xl">{staff.name}</h5>
                  <h4 className={`font-medium text-xs lg:text-base`}>
                    Profession
                    <br />
                    <span className="font-bold text-sm lg:text-lg">
                      {staff.profession}
                    </span>
                  </h4>
                  <p className="text-[10px] lg:text-sm pr-2 overflow-auto">
                    {staff.details.slice(0, 200)}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Staffs;
