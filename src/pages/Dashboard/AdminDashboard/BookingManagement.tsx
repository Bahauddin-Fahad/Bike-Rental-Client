import { useState } from "react";
import { useGetAllBookingsQuery } from "../../../redux/features/booking/bookingApi";
import Loading from "../../../components/ui/Loading";
import { TBooking } from "../../../types";
import moment from "moment";
import CostCalculateModal from "../../../components/modals/CostCalculateModal";
import NoDataFound from "../../../components/ui/NoDataFound";

type TBookingState = TBooking | object | null;

const BookingManagement = () => {
  const [bookingToCalculate, setBookingToCalculate] = useState<TBookingState>();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  const queryObj = {
    page: currentPage,
    limit: dataPerPage,
  };

  const { data, isLoading, refetch } = useGetAllBookingsQuery(queryObj);
  // const [calculateTotalCost, { isLoading }] = useCalculateTotalCostMutation();

  const bookings = data?.data?.result as TBooking[];
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
    <div className="py-10 h-screen overflow-y-auto">
      <div
        className="h-[200px] flex flex-col justify-center items-center"
        data-aos="zoom-in"
      >
        <p className="text-4xl text-center font-bold my-3 space-x-5 uppercase">
          <span className="font-normal tracking-wide text-black dark:text-[#bdbdbd9e]">
            All
          </span>
          <span className="text-accent">Bookings</span>
        </p>
      </div>

      <div className="overflow-x-auto m-5 font-satoshi">
        {bookings?.length > 0 ? (
          <table className="table table-sm">
            {/* head */}
            <thead className="text-primary dark:text-white text-lg">
              <tr>
                <th>No.</th>

                <th>User</th>
                <th>Bike</th>
                <th>Star Time</th>
                <th>Return Time</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings &&
                bookings?.map((booking, index) => (
                  <tr key={index} className="rounded-lg">
                    <th>{index + 1 + (currentPage - 1) * dataPerPage}</th>
                    <td className="">{booking?.user?.name}</td>
                    <td className="">{booking?.bike?.name}</td>
                    <td className="">
                      {moment(booking?.startTime).format("DD/MM/YYYY hh:mm")}
                    </td>
                    <td className="">
                      {booking?.returnTime
                        ? moment(booking?.returnTime).format("DD/MM/YYYY hh:mm")
                        : "Not Returned Yet"}
                    </td>
                    <td className="text-center">{booking?.totalCost} ৳</td>
                    <td className="uppercase">{booking?.status}</td>

                    <td>
                      <div className="flex gap-2 items-center">
                        {!booking?.totalCost && !booking?.returnTime ? (
                          <label
                            htmlFor="calculate-modal"
                            onClick={() => {
                              setBookingToCalculate(booking);
                            }}
                            className="btn btn-sm btn-warning cursor-pointer w-[100px]"
                          >
                            Calculate
                          </label>
                        ) : booking?.totalCost &&
                          booking?.returnTime &&
                          booking?.status !== "paid" ? (
                          <div className="w-[100px] text-warning text-base font-vietnam-bold">
                            Calculated
                          </div>
                        ) : (
                          booking?.totalCost &&
                          booking?.returnTime &&
                          booking?.status === "paid" && (
                            <div className="w-[100px] text-success text-base font-vietnam-bold">
                              Paid
                            </div>
                          )
                        )}
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
              className={`btn btn-md font-bold text-lg ${
                page + 1 === currentPage && "btn-accent"
              }`}
            >
              {page + 1}
            </button>
          ))}
      </div>
      {bookingToCalculate && (
        <CostCalculateModal
          bookingToCalculate={bookingToCalculate}
          setBookingToCalculate={setBookingToCalculate}
        />
      )}
    </div>
  );
};

export default BookingManagement;
