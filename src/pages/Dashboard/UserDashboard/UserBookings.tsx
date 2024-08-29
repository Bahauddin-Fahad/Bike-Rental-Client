import { useState } from "react";
import { useGetUserBookingsQuery } from "../../../redux/features/booking/bookingApi";
import Loading from "../../../components/ui/Loading";
import { TBooking } from "../../../types";
import moment from "moment";
import { useLocation } from "react-router-dom";
import PayBookingModal from "../../../components/modals/PayBookingModal";

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
  console.log(data);

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
    <div className=" overflow-y-auto h-screen">
      <div
        className="h-[200px] flex flex-col justify-center items-center"
        data-aos="zoom-in"
      >
        <p className="text-4xl text-center font-bold my-3 space-x-5 uppercase">
          <span className="font-normal tracking-wide text-black dark:text-[#bdbdbd9e]">
            {routeName}
          </span>
          <span className="text-[#27ae60]">Booking</span>
        </p>
      </div>
      <div className="flex justify-between p-5"></div>
      <div className="overflow-x-auto m-5 font-satoshi">
        <table className="table table-sm">
          {/* head */}
          <thead className="text-white text-lg">
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
                  <td className="">{booking?.totalCost}</td>
                  <td className="uppercase">{booking?.status}</td>

                  <td>
                    <div className="flex gap-2 items-center">
                      {booking?.totalCost &&
                      booking?.returnTime &&
                      booking?.status !== "paid" ? (
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
