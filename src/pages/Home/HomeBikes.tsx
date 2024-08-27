import { TBike } from "../../types";

import Loading from "../../components/ui/Loading";
import BikeCard from "../../components/bike/BikeCard";
import { useGetBikesQuery } from "../../redux/features/bike/bikeApi";

const HomeBikes = () => {
  const queryObj = { isAvailable: true };

  const { data: bikeData, isLoading } = useGetBikesQuery(queryObj);
  const bikes: TBike[] = bikeData?.data?.result;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="custom-padding flex flex-col space-y-5 lg:space-y-10">
      <div className="max-w-lg mx-auto">
        <h1 className="font-vietnam text-accent text-[20px] xl:text-[40px] 2xl:text-[55px] text-center tracking-tight ">
          Explore Our <span className="text-[#27ae60]">Premium Bikes</span> for
          Every Adventure
        </h1>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {bikes?.map((bike: TBike, index: number) => (
          <div key={index}>
            <BikeCard bike={bike} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBikes;
