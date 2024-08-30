/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetBikesQuery } from "../../redux/features/bike/bikeApi";
import { TBike } from "../../types";

const CompareBikeModal = ({ bikesToCompare, setBikesToCompare }: any) => {
  const queryObj = {
    isAvailable: true,
  };
  const { data } = useGetBikesQuery(queryObj);
  const Allbikes: TBike[] = data?.data?.result;
  console.log(bikesToCompare);

  return (
    <div>
      <input type="checkbox" id="compare-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl !important space-y-4 text-accent bg-white">
          <label htmlFor="compare-modal">
            <button
              onClick={() => {
                setBikesToCompare([]);
              }}
              className="size-8 bg-primary btn-circle absolute right-3 md:right-10 top-5 md:top-7 text-white hover:bg-white hover:outline hover:text-primary duration-300"
            >
              ✕
            </button>
          </label>

          <h3 className="font-bold text-3xl text-center text-primary">
            Compare your Bikes
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
            {bikesToCompare?.map((bike: TBike, index: string) => (
              <>
                <div
                  key={index}
                  className="max-w-sm rounded overflow-hidden shadow-lg glass hover:shadow-xl flex flex-col transition-shadow duration-300 bg-secondary h-full text-primary"
                >
                  <div className="p-4">
                    <img
                      src={bike?.image}
                      alt="bike"
                      className="mx-auto object-contain xs:object-cover"
                    />
                  </div>

                  <div className="flex flex-col flex-grow px-6 py-4">
                    <div className="font-bold text-xl mb-2">{bike?.name}</div>
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-bold text-sm">
                        Price/hr: {bike?.pricePerHour} ৳
                      </span>
                      <span className="text-gray-900 font-bold text-sm">
                        Brand: {bike?.brand}
                      </span>
                      <span className="text-gray-900 font-bold text-sm">
                        Model: {bike?.model}
                      </span>
                      <span className="text-gray-900 font-bold text-sm">
                        CC: {bike?.cc}
                      </span>
                      <span className="text-gray-900 font-bold text-sm">
                        Year: {bike?.year}
                      </span>
                    </div>
                  </div>
                </div>
                {bikesToCompare.length <= 1 && (
                  <div className="">
                    <p className="text-center text-primary font-bold font-satoshi text-xl mb-3">
                      Select Another Bike
                    </p>
                    <div
                      id="searched-item-div"
                      className="flex flex-col gap-y-2 overflow-y-scroll h-96"
                    >
                      {Allbikes?.map((bike, index) => (
                        <div
                          onClick={() => {
                            setBikesToCompare([...bikesToCompare, bike]);
                          }}
                          key={index}
                          className="flex items-center gap-2 bg-accent p-3 rounded-lg cursor-pointer"
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
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBikeModal;
