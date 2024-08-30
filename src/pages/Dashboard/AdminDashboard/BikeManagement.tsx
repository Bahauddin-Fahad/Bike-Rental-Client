import { useEffect, useState } from "react";
import { TBike } from "../../../types";
import { useGetBikesQuery } from "../../../redux/features/bike/bikeApi";
import Loading from "../../../components/ui/Loading";
import BikeModal from "../../../components/modals/BikeModal";
import DeleteBikeModal from "../../../components/modals/DeleteBikeModal";
import { getBrandNames } from "../../../assets/jsons/brand";
import NoDataFound from "../../../components/ui/NoDataFound";

type TBikeState = TBike | object | null;

const BikeManagement = () => {
  const brandNames = getBrandNames();
  const [bike, setBike] = useState<TBikeState>({});
  const [bikeToDelete, setBikeToDelete] = useState<TBikeState>(null);
  const [modalType, setModalType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dataPerPage = 10;
  const queryObj = {
    searchTerm: searchTerm,
    brand: brand,
    page: currentPage,
    limit: dataPerPage,
  };

  const { data, isLoading, refetch } = useGetBikesQuery(queryObj);

  const bikes: TBike[] = data?.data?.result;
  const meta = data?.data?.meta;
  const totalPagesArray = [...Array(meta?.totalPage).keys()];

  const handleCurrentPage = async (page: number) => {
    await setCurrentPage(page + 1);
    await refetch();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-2 lg:py-10 h-screen overflow-y-auto">
      <div
        className="h-[100px] lg:h-[200px] flex flex-col justify-center items-center"
        data-aos="zoom-in"
      >
        <p className="text-4xl text-center font-bold my-3 space-x-5 uppercase">
          <span className="font-normal tracking-wide text-back dark:text-[#bdbdbd9e]">
            Manage
          </span>
          <span className="text-accent">Bikes</span>
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 p-5 justify-between">
        <div className="flex flex-col lg:flex-row gap-3 w-full order-2 lg:order-1">
          <input
            type="text"
            placeholder="Search Bike or Model"
            className="input input-bordered w-full lg:w-5/12 max-w-lg text-primary"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered max-w-md bg-accent text-white"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value={""}>All</option>
            {brandNames.map((brand, i) => (
              <option key={i}>{brand}</option>
            ))}
          </select>
        </div>
        <label
          htmlFor="bike-modal"
          onClick={() => {
            setModalType("add");
            setBike({});
          }}
          className="btn btn-accent bg-accent text-white font-bold order-1 lg:order-2 border-none"
        >
          Add Bike
        </label>
      </div>

      <div className="overflow-x-auto m-5 font-satoshi">
        {bikes?.length > 0 ? (
          <table className="table table-sm">
            {/* head */}
            <thead className="text-black dark:text-white text-lg">
              <tr>
                <th>No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price/hr</th>
                <th>Model</th>
                <th>Brand</th>
                <th>isAvailable</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bikes &&
                bikes?.map((bike, index) => (
                  <tr key={index} className="rounded-lg">
                    <th>{index + 1 + (currentPage - 1) * dataPerPage}</th>
                    <td>
                      <div className="w-20 p-2 rounded-md glass bg-black cursor-pointer">
                        <img src={bike.image} alt="Post" className="" />
                      </div>
                    </td>
                    <td className="">{bike?.name}</td>
                    <td className="">{bike?.pricePerHour}</td>
                    <td className="">{bike?.model}</td>
                    <td className="">{bike?.brand}</td>
                    <td className="">
                      {bike?.isAvailable ? (
                        <div className="bg-success p-1 w-6/12 rounded-md text-center text-white">
                          True
                        </div>
                      ) : (
                        <div className="bg-error p-1 w-6/12 rounded-md text-center text-white">
                          False
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2 items-center">
                        <label
                          htmlFor="bike-modal"
                          onClick={() => {
                            setModalType("edit");
                            setBike(bike);
                          }}
                          className="btn btn-sm btn-accent cursor-pointer"
                        >
                          Edit
                        </label>

                        <label
                          htmlFor="delete-modal"
                          onClick={() => {
                            setBikeToDelete(bike);
                          }}
                          className="btn btn-sm btn-error cursor-pointer"
                        >
                          Delete
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <NoDataFound />
        )}
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
      {(modalType === "add" ||
        (modalType === "edit" && bike && Object.keys(bike)?.length > 0)) && (
        <BikeModal bike={bike} setBike={setBike} setModalType={setModalType} />
      )}

      {bikeToDelete && (
        <DeleteBikeModal
          bikeToDelete={bikeToDelete}
          setBikeToDelete={setBikeToDelete}
        />
      )}
    </div>
  );
};

export default BikeManagement;
