import { useState } from "react";
import { useGetAllbookingsQuery } from "../../../redux/features/booking/bookingApi";
import Loading from "../../../components/ui/Loading";
import { TBooking } from "../../../types";
import moment from "moment";
import { useLocation } from "react-router-dom";

const BookingList = () => {
  const pathname = useLocation().pathname;
  const routeName = pathname.split("/").reverse()[0];

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  const queryObj = {
    status: routeName === "unpaid" ? "booked" : "paid",
    page: currentPage,
    limit: dataPerPage,
  };

  const { data, isLoading, refetch } = useGetAllbookingsQuery(queryObj);
  console.log(data);

  const bookings = data?.result as TBooking[];
  const meta = data?.meta;
  const totalPagesArray = [...Array(meta?.totalPage).keys()];

  const handleCurrentPage = async (page: number) => {
    await setCurrentPage(page + 1);

    await refetch();
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="text-white">
      <div
        className="h-[200px] flex flex-col justify-center items-center"
        data-aos="zoom-in"
      >
        <p className="text-4xl text-center font-bold my-3 space-x-5 uppercase">
          <span className="font-normal tracking-wide text-[#bdbdbd9e]">
            {routeName}
          </span>
          <span className="text-accent">Booking</span>
        </p>
      </div>
      <div className="flex justify-between p-5">
        {/* <label
          htmlFor="product-modal"
          onClick={() => {
            setModalType("add");
            setProduct({});
          }}
          className="btn btn-accent font-bold"
        >
          Add product
        </label> */}
      </div>
      <div className="overflow-x-auto m-5 ">
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

                  <td className="font-semibold">{booking?.user?.name}</td>
                  <td className="font-semibold">{booking?.bike?.name}</td>
                  <td className="font-semibold">
                    {moment(booking?.startTime).format("DD/MM/YYYY")}
                  </td>
                  <td className="font-semibold">
                    {!booking?.returnTime && "Not Returned Yet"}
                  </td>
                  <td className="font-semibold">{booking?.totalCost}</td>
                  <td className="font-semibold">{booking?.status}</td>

                  <td>
                    <div className="flex gap-2 items-center">
                      <label
                        htmlFor="product-modal"
                        onClick={() => {
                          // setModalType("edit");
                          // setProduct(booking);
                        }}
                        className="btn btn-sm btn-success cursor-pointer"
                      >
                        Edit
                      </label>

                      <label
                        htmlFor="delete-modal"
                        onClick={() => {
                          // setDeleteProduct(booking);
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
      {/* {(modalType === "add" ||
    (modalType === "edit" &&
      product &&
      Object.keys(product)?.length > 0)) && (
    <ProductModal
      product={product}
      setProduct={setProduct}
      setModalType={setModalType}
    />
  )}

  {deleteProduct && (
    <DeleteModal
      deleteProductDetails={deleteProduct}
      setDeleteProductDetails={setDeleteProduct}
    />
  )} */}
    </div>
  );
};

export default BookingList;
