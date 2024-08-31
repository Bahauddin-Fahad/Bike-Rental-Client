/* eslint-disable @typescript-eslint/no-explicit-any */

import toast from "react-hot-toast";
import Loading from "../ui/Loading";
import { useDeleteCouponMutation } from "../../redux/features/coupon/couponApi";

const DeleteCouponModal = ({ couponToDelete, setCouponToDelete }: any) => {
  const [deleteCoupon, { isLoading }] = useDeleteCouponMutation();

  const handleDeleteCoupon = async (id: string) => {
    await toast.promise(deleteCoupon(id).unwrap(), {
      loading: "Deleting Coupon...",
      success: (res) => {
        if (res.success) {
          return "Coupon deleted successfully";
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to Delete Coupon",
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <input
        type="checkbox"
        id="delete-coupon-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-primary">{`Are you sure You Want to Delete ${couponToDelete?.code} ?`}</h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteCoupon(couponToDelete?._id)}
              className="btn btn-sm btn-outline btn-error"
            >
              Confirm
            </button>
            <label
              onClick={() => setCouponToDelete(null)}
              htmlFor="delete-coupon-modal"
              className="btn btn-sm"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCouponModal;
