import { useParams } from "react-router-dom";
import { TBike } from "../../types";
import { useGetSingleBikeQuery } from "../../redux/features/bike/bikeApi";
import { useEffect, useState } from "react";
import BookingModal from "../../components/modals/bookingModal";
import CompareBikeModal from "../../components/modals/CompareBikeModal";

const BikeDetails = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [bikesToCompare, setBikesToCompare] = useState<TBike[]>([]);
  const [modalType, setModalType] = useState<string>("");
  const { id } = useParams();
  const { data } = useGetSingleBikeQuery(id);
  const bikeDetails: TBike = data?.data;

  return (
    <div className="custom-margin mx-auto py-10">
      <div
        className="h-[100px] lg:h-[200px] flex flex-col justify-center items-center"
        data-aos="zoom-in"
      >
        <p className="text-4xl text-center font-bold my-3 space-x-5 uppercase">
          <span className="font-normal tracking-wide dark:text-[#bdbdbd9e]">
            {bikeDetails?.name.split(" ")[0]}
          </span>
          <span className="text-accent">
            {bikeDetails?.name.split(" ").slice(1).join(" ")}
          </span>
        </p>
      </div>
      <div className="card shadow-xl mt-3 lg:mt-6 bg-secondary dark:bg-primary p-5 lg:p-10 space-y-5 lg:space-y-10 max-w-4xl mx-auto">
        <div className="relative glass bg-[#272727]">
          <div className="max-w-xl mx-auto h-[200px] sm:h-[250px] md:h-[365px] cursor-pointer">
            <img
              src={bikeDetails?.image}
              alt="Post"
              className="h-[200px] sm:h-[250px] md:h-[365px] mx-auto object-contain xs:object-cover"
            />
          </div>
        </div>
        <div className="card-body p-0 lg:space-y-2">
          <h2 className="text-base xs:text-2xl font-semibold">
            {bikeDetails?.name}
          </h2>
          <h2 className="text-base xs:text-2xl font-semibold">
            Price/hr: {bikeDetails?.pricePerHour} ৳
          </h2>
          <div>
            <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
              Description
            </span>
            <p className="text-xs xs:text-base sm:text-xl">
              {bikeDetails?.description}
            </p>
          </div>
          <div className="flex justify-between mt-3 lg:mt-10">
            <div>
              <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                CC
              </span>
              <p className="text-xs xs:text-base sm:text-xl">
                {bikeDetails?.cc}
              </p>
            </div>
            <div>
              <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                Year
              </span>
              <p className="text-xs xs:text-base sm:text-xl">
                {bikeDetails?.year}
              </p>
            </div>
            <div>
              <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                Model
              </span>
              <p className="text-xs xs:text-base sm:text-xl">
                {bikeDetails?.model}
              </p>
            </div>
            <div>
              <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                Brand
              </span>
              <p className="text-xs xs:text-base sm:text-xl">
                {bikeDetails?.brand}
              </p>
            </div>
            <div>
              <span className="text-[10px] xs:text-xs sm:text-lg text-[#8A8A8A]">
                Available
              </span>
              <p className="text-xs xs:text-base sm:text-xl">
                {bikeDetails?.isAvailable.toString()}
              </p>
            </div>
          </div>
        </div>
        <div className="card-actions flex justify-end">
          <label
            htmlFor="booking-modal"
            onClick={() => {
              setModalType("book");
            }}
            className={`btn h-[20px] sm:h-[50px] rounded-lg text-xs lg:text-sm xs:text-base font-semibold font-vietnam-bold border-none ${
              bikeDetails?.isAvailable
                ? "hover:scale-105 duration-500 bg-accent hover:bg-accent text-white"
                : "bg-secondary text-primary cursor-not-allowed opacity-30"
            }`}
          >
            {bikeDetails?.isAvailable ? "Book Now" : "Unavailable"}
          </label>
          <label
            htmlFor="compare-modal"
            onClick={() => {
              setBikesToCompare([...bikesToCompare, bikeDetails]);
            }}
            className={`btn h-[20px] sm:h-[50px] rounded-lg text-xs lg:text-sm xs:text-base font-semibold font-vietnam-bold hover:scale-105 duration-500 bg-neutral hover:bg-neutral text-white border-none`}
          >
            Compare
          </label>
        </div>
      </div>
      {modalType && bikeDetails?.isAvailable && (
        <BookingModal bikeDetails={bikeDetails} setModalType={setModalType} />
      )}
      {bikesToCompare?.length > 0 && (
        <CompareBikeModal
          bikesToCompare={bikesToCompare}
          setBikesToCompare={setBikesToCompare}
        />
      )}
    </div>
  );
};

export default BikeDetails;
