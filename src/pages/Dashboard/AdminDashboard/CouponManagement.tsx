import { useEffect, useState } from "react";
import { TCoupon } from "../../../types";
import Loading from "../../../components/ui/Loading";
import NoDataFound from "../../../components/ui/NoDataFound";
import { useGetAllCouponsQuery } from "../../../redux/features/coupon/couponApi";
import moment from "moment";
import CouponModal from "../../../components/modals/CouponModal";
import DeleteCouponModal from "../../../components/modals/DeleteCouponModal";

type TCouponState = TCoupon | object | null;

const CouponManagement = () => {
  const [coupon, setCoupon] = useState<TCouponState>({});
  const [couponToDelete, setCouponToDelete] = useState<TCouponState>(null);
  const [modalType, setModalType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dataPerPage = 10;
  const queryObj = {
    page: currentPage,
    limit: dataPerPage,
  };

  const { data, isLoading, refetch } = useGetAllCouponsQuery(queryObj);

  const coupons: TCoupon[] = data?.data?.result;
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
          <span className="text-accent">Coupons</span>
        </p>
      </div>
      <div className="flex justify-end">
        <label
          htmlFor="coupon-modal"
          onClick={() => {
            setModalType("add");
            setCoupon({});
          }}
          className="btn btn-accent bg-accent text-white font-bold border-none"
        >
          Add Coupon
        </label>
      </div>

      <div className="overflow-x-auto m-5 font-satoshi">
        {coupons?.length > 0 ? (
          <table className="table table-sm">
            {/* head */}
            <thead className="text-black dark:text-white text-lg">
              <tr className="text-center">
                <th>No.</th>
                <th>Code</th>
                <th>Discount</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons &&
                coupons?.map((coupon, index) => (
                  <tr key={index} className="rounded-lg text-center">
                    <th>{index + 1 + (currentPage - 1) * dataPerPage}</th>
                    <td>{coupon?.code}</td>
                    <td>{coupon?.discount}%</td>

                    <td className="">
                      {moment(coupon?.createdAt).format("DD/MM/YYYY hh:mm")}
                    </td>
                    <td className="">
                      {moment(coupon?.updatedAt).format("DD/MM/YYYY hh:mm")}
                    </td>

                    <td>
                      <div className="flex gap-2 items-center justify-end">
                        <label
                          htmlFor="coupon-modal"
                          onClick={() => {
                            setModalType("edit");
                            setCoupon(coupon);
                          }}
                          className="btn btn-sm btn-accent cursor-pointer"
                        >
                          Edit
                        </label>

                        <label
                          htmlFor="delete-coupon-modal"
                          onClick={() => {
                            setCouponToDelete(coupon);
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
        (modalType === "edit" &&
          coupon &&
          Object.keys(coupon)?.length > 0)) && (
        <CouponModal
          coupon={coupon}
          setCoupon={setCoupon}
          setModalType={setModalType}
        />
      )}

      {couponToDelete && (
        <DeleteCouponModal
          couponToDelete={couponToDelete}
          setCouponToDelete={setCouponToDelete}
        />
      )}
    </div>
  );
};

export default CouponManagement;
