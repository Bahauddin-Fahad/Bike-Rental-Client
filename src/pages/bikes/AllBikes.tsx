import { TBike } from "../../types";
import { useGetBikesQuery } from "../../redux/features/bike/bikeApi";
import Loading from "../../components/ui/Loading";
import BikeCard from "../../components/bike/BikeCard";

const AllBikes = () => {
  const queryObj = {
    isAvailable: true,
    // sort: selectedSort,
    // searchTerm: searchTerm,
    // categories: checkedState,
    // priceRange: {
    //   minPrice: minValue,
    //   maxPrice: maxValue,
    // },
    // page: currentPage,
    // limit: dataPerPage,
  };

  const { data: bikeData, isLoading } = useGetBikesQuery(queryObj);
  const bikes: TBike[] = bikeData?.data?.result;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="custom-padding flex flex-col space-y-5 lg:space-y-10 overflow-y-auto  h-screen">
      <div
        className="h-[200px] flex flex-col justify-center items-center"
        data-aos="zoom-in"
      >
        <p className="text-4xl text-center font-bold my-3 space-x-5 uppercase">
          <span className="font-normal tracking-wide dark:text-[#bdbdbd9e]">
            Explore Our
          </span>
          <span className="text-[#27ae60]">Premium Bikes</span>
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-10">
        {bikes?.map((bike: TBike, index: number) => (
          <div key={index}>
            <BikeCard bike={bike} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBikes;
