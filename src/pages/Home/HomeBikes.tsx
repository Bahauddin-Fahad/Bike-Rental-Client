import { useNavigate } from "react-router-dom";

import { TBike } from "../../types";
import { AiFillProduct } from "react-icons/ai";

import { useGetBikesQuery } from "../../redux/features/bikeApi";
import Loading from "../../components/ui/Loading";
import BikeCard from "../../components/bike/BikeCard";

const HomeBikes = () => {
  const navigate = useNavigate();
  const { data: bikeData, isLoading } = useGetBikesQuery({});
  const bikes: TBike[] = bikeData?.data?.result;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="custom-padding flex flex-col space-y-5 lg:space-y-10">
      <div className="flex gap-2 text-3xl lg:text-5xl text-white">
        <AiFillProduct data-aos="slide-right" className="text-accent" />
        <h1 data-aos="slide-left" className="font-semibold">
          Our Bikes
        </h1>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {bikes?.slice(0, 6)?.map((bike: TBike, index: number) => (
          <div key={index}>
            <BikeCard bike={bike} />
          </div>
        ))}
      </div>
      <button
        className="btn btn-white font-bold w-48 mx-auto"
        onClick={() => navigate("/all-products")}
      >
        See All
      </button>
    </div>
  );
};

export default HomeBikes;
