import { TBike } from "../../types";
import { useGetBikesQuery } from "../../redux/features/bike/bikeApi";
import Loading from "../../components/ui/Loading";
import BikeCard from "../../components/bike/BikeCard";
import { useState } from "react";
import { getBrandNames } from "../../assets/jsons/brand";

const AllBikes = () => {
  const brandNames = getBrandNames();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dataPerPage = 8;

  const queryObj = {
    searchTerm: searchTerm,
    brand: brand,
    page: currentPage,
    limit: dataPerPage,
    isAvailable: true,
  };

  const { data, isLoading, refetch } = useGetBikesQuery(queryObj);
  const bikes: TBike[] = data?.data?.result;
  const meta = data?.data?.meta;
  const totalPagesArray = [...Array(meta?.totalPage).keys()];

  const handleCurrentPage = async (page: number) => {
    await setCurrentPage(page + 1);
    await refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col space-y-5 lg:space-y-10 overflow-y-auto h-screen py-5 xl:py-10 px-5 xl:px-10">
      <div
        className="h-[200px] flex flex-col justify-center items-center"
        data-aos="zoom-in"
      >
        <p className="text-4xl text-center font-bold my-3 space-x-5 uppercase">
          <span className="font-normal tracking-wide text-back dark:text-[#bdbdbd9e]">
            Explore Our
          </span>
          <span className="text-accent">Premium Bikes</span>
        </p>
      </div>
      <div className="flex p-5 justify-center gap-5">
        <input
          type="text"
          placeholder="Search Bike or Model"
          className="input input-bordered w-5/12 max-w-lg text-primary"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered max-w-md bg-accent"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value={""}>All</option>
          {brandNames.map((brand, i) => (
            <option key={i}>{brand}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-4 gap-10">
        {bikes?.map((bike: TBike, index: number) => (
          <div key={index}>
            <BikeCard bike={bike} />
          </div>
        ))}
      </div>
      <div className="space-x-3 mt-4 flex justify-center">
        {totalPagesArray?.length > 1 &&
          totalPagesArray.map((page, index) => (
            <button
              key={index}
              onClick={() => handleCurrentPage(page)}
              className={`btn btn-sm font-bold text-lg ${
                page + 1 === currentPage && "btn-accent"
              }`}
            >
              {page + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default AllBikes;
