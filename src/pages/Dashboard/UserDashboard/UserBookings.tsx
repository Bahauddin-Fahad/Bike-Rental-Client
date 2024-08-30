import { useState } from "react";
import { useGetUserBookingsQuery } from "../../../redux/features/booking/bookingApi";
import Loading from "../../../components/ui/Loading";
import { TBooking } from "../../../types";
import moment from "moment";
import { useLocation } from "react-router-dom";
import PayBookingModal from "../../../components/modals/PayBookingModal";
import NoDataFound from "../../../components/ui/NoDataFound";

type TBookingState = TBooking | object | null;

const UserBookings = () => {
  const [bookingToPay, setBookingToPay] = useState<TBookingState>();
  const pathname = useLocation().pathname;
  const routeName = pathname.split("/").reverse()[0];
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  const queryObj = {
    status: routeName === "paid" ? "paid" : "booked",
    page: currentPage,
    limit: dataPerPage,
  };

  const { data, isLoading, refetch } = useGetUserBookingsQuery(queryObj);

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
            {routeName}
          </span>
          <span className="text-accent">Booking</span>
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
                <th className="text-center">Price/hr</th>
                <th>Start Time</th>
                <th>Return Time</th>
                <th className="text-center">Total Cost</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings &&
                bookings?.map((booking, index) => (
                  <tr key={index} className="rounded-lg">
                    <th>{index + 1 + (currentPage - 1) * dataPerPage}</th>
                    <td className="">{booking?.user?.name}</td>
                    <td className="">{booking?.bike?.name}</td>
                    <td className="text-center">
                      {booking?.bike?.pricePerHour} ৳
                    </td>
                    <td className="">
                      {moment(booking?.startTime).format("DD/MM/YYYY hh:mm")}
                    </td>
                    <td className="">
                      {booking?.returnTime
                        ? moment(booking?.returnTime).format("DD/MM/YYYY hh:mm")
                        : "Not Returned Yet"}
                    </td>
                    <td className="text-center">{booking?.totalCost} ৳</td>
                    <td className={`uppercase `}>
                      <div
                        className={`text-center font-bold ${
                          booking?.status === "booked"
                            ? "text-warning"
                            : booking?.status === "paid" && "text-accent"
                        }`}
                      >
                        {booking?.status}
                      </div>
                    </td>

                    <td>
                      <div className="flex gap-2 items-center text-center justify-center">
                        {!booking?.totalCost &&
                        !booking?.returnTime &&
                        booking?.status === "booked" ? (
                          <div className="w-[100px] bg-warning text-xs font-vietnam-bold rounded-md p-1 text-white">
                            Yet to Return
                          </div>
                        ) : booking?.totalCost &&
                          booking?.returnTime &&
                          booking?.status === "booked" ? (
                          <label
                            htmlFor="pay-booking-modal"
                            onClick={() => {
                              setBookingToPay(booking);
                            }}
                            className="btn btn-sm btn-error cursor-pointer w-[80px]"
                          >
                            Pay
                          </label>
                        ) : (
                          booking?.totalCost &&
                          booking?.returnTime &&
                          booking?.status === "paid" && (
                            <div className="w-[100px] bg-success text-xs font-vietnam-bold rounded-md p-1 text-white">
                              Payment Completed
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
      {bookingToPay && (
        <PayBookingModal
          bookingToPay={bookingToPay}
          setBookingToPay={setBookingToPay}
        />
      )}
    </div>
  );
};

export default UserBookings;
