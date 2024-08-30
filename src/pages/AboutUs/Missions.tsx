import {
  FaMotorcycle,
  FaThumbsUp,
  FaUserFriends,
  FaLeaf,
} from "react-icons/fa";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { BiKey } from "react-icons/bi";

const Missions = () => {
  return (
    <div className="space-y-5">
      <div className="max-w-xl mx-auto">
        <h1 className="font-vietnam-bold text-[#2E603C] text-[20px] xl:text-[40px] 2xl:text-[55px] text-center tracking-tight ">
          Our <span className="text-accent">Mission</span> &{" "}
          <span className="text-accent">Vision</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grow-[2] w-full">
        <div className="h-[230px] border border-[#27ae60] dark:border-white flex gap-y-3 flex-col justify-center items-center bg-secondary dark:bg-transparent">
          <FaMotorcycle className="text-5xl text-accent" />
          <div className="space-y-2">
            <p className="text-center font-bold">Empower Every Ride</p>
            <p className="text-center text-sm max-w-xs">
              To provide our customers with high-quality bikes and exceptional
              service, ensuring every journey is safe, enjoyable, and memorable
            </p>
          </div>
        </div>
        <div className="h-[230px] border border-[#27ae60] dark:border-white flex gap-y-3 flex-col justify-center items-center bg-secondary dark:bg-transparent">
          <GiFullMotorcycleHelmet className="text-5xl text-accent" />
          <div className="space-y-2">
            <p className="text-center font-bold">Sustainable Mobility</p>
            <p className="text-center text-sm max-w-xs">
              To promote eco-friendly transportation by offering a diverse range
              of bikes that cater to all types of riders, encouraging a greener
              and healthier lifestyle.
            </p>
          </div>
        </div>
        <div className="h-[230px] border border-[#27ae60] dark:border-white flex gap-y-3 flex-col justify-center items-center bg-secondary dark:bg-transparent">
          <FaThumbsUp className="text-5xl text-accent" />
          <div className="space-y-2">
            <p className="text-center font-bold">Customer-Centric Service</p>
            <p className="text-center text-sm max-w-xs">
              To prioritize our customers' needs by delivering personalized
              service, expert advice, and reliable bikes for every adventure.
            </p>
          </div>
        </div>
        <div className="h-[230px] border border-[#27ae60] dark:border-white flex gap-y-3 flex-col justify-center items-center bg-secondary dark:bg-transparent">
          <FaUserFriends className="text-5xl text-accent" />
          <div className="space-y-2">
            <p className="text-center font-bold">Leader in Bike Rentals</p>
            <p className="text-center text-sm max-w-xs">
              To become the leading bike rental company known for exceptional
              service, quality bikes, and customer satisfaction.
            </p>
          </div>
        </div>
        <div className="h-[230px] border border-[#27ae60] dark:border-white flex gap-y-3 flex-col justify-center items-center bg-secondary dark:bg-transparent">
          <FaLeaf className="text-5xl text-accent" />
          <div className="space-y-2">
            <p className="text-center font-bold">Eco-Friendly Impact</p>
            <p className="text-center text-sm max-w-xs">
              To inspire a global movement towards sustainable transportation by
              offering eco-friendly bike rental options that reduce carbon
              footprints.
            </p>
          </div>
        </div>
        <div className="h-[230px] border border-[#27ae60] dark:border-white flex gap-y-3 flex-col justify-center items-center bg-secondary dark:bg-transparent">
          <BiKey className="text-5xl text-accent" />
          <div className="space-y-2">
            <p className="text-center font-bold">Top-Notch Experience</p>
            <p className="text-center text-sm max-w-xs">
              To be recognized as the go-to destination for bike rentals, where
              customers can expect top-notch bikes, seamless service, and
              unforgettable rides.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
