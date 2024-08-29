import { useNavigate } from "react-router-dom";
import { useGetBikesQuery } from "../../redux/features/bike/bikeApi";
import Loading from "../ui/Loading";
import { TBike } from "../../types";

const SearchedBike = ({ searchBike }: { searchBike: string }) => {
  const queryObj = {
    isAvailable: true,
    searchTerm: searchBike,
  };
  const navigate = useNavigate();
  const { data: bikesData, isLoading } = useGetBikesQuery(queryObj);
  const bikes: TBike[] = bikesData?.data?.result;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-secondary w-full shadow-xl mt-2 p-2 relative">
      {bikes?.length > 0 ? (
        <div
          id="searched-item-div"
          className="flex flex-col gap-y-2 overflow-y-scroll h-56 sm:h-80"
        >
          {bikes?.map((bike, index) => (
            <div
              onClick={() => {
                navigate(`/bikes/${bike?._id}`);
              }}
              key={index}
              className="flex items-center gap-2 bg-[#27ae60] p-3 rounded-lg cursor-pointer"
            >
              <img
                src={bike.image}
                alt="items"
                className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-lg"
              />
              <div className="text-[8px] xs:text-sm font-vietnam-bold text-white">
                <p className="font-semibold text-xs xs:text-sm">
                  {bike?.name.length >= 25
                    ? bike?.name.slice(0, 25) + "..."
                    : bike?.name}
                </p>
                <p className="font-satoshi font-medium flex items-center gap-[2px] xs:gap-2">
                  <span className="text-[10px] xs:text-xs">
                    Price/hr: {bike?.pricePerHour} ৳
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-48 sm:h-52 flex justify-center items-center">
          <p className="text-center font-satoshi xs:text-md lg:text-2xl w-full text-black">
            No bike found for {searchBike}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchedBike;
