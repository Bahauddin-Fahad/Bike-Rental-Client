/* eslint-disable @typescript-eslint/no-explicit-any */

import toast from "react-hot-toast";
import { usePayBookingCostMutation } from "../../redux/features/booking/bookingApi";
import { TErrorResponse, TPrize } from "../../types";
import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import { getCoupons } from "../../assets/jsons/coupon";

const PayBookingModal = ({ bookingToPay, setBookingToPay }: any) => {
  const [payBooking] = usePayBookingCostMutation();
  const { code } = useAppSelector((state) => state.coupon as TPrize);
  const coupons: TPrize[] = getCoupons();
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: { code },
  });

  const handlePayBooking = async (couponData: any) => {
    const isCouponExist = coupons.find(
      (coupon) => coupon.code === couponData?.code
    );

    if (!isCouponExist) {
      toast.error("Coupon doesnt exist", { duration: 4000 });
    }

    try {
      const options = {
        id: bookingToPay?._id,
        data: { discount: isCouponExist ? isCouponExist?.discount : 0 },
      };

      const response = await payBooking(options).unwrap();

      if (response?.statusCode === 200) {
        toast.success(response?.message, { duration: 3000 });
        window.location.href = response.data.payment_url;
      }
    } catch (error) {
      console.log(error);
      toast.error((error as TErrorResponse)?.data?.message);
    }
  };

  return (
    <div>
      <input type="checkbox" id="pay-booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-lg !important space-y-6">
          <h3 className="font-bold text-lg xl:text-xl text-center text-primary">{`Would You Like to Pay for ${bookingToPay?.bike?.name}?`}</h3>
          <form onSubmit={handleSubmit(handlePayBooking)} className="space-y-5">
            <div className="form-control  w-full">
              <label className="label">
                <p className="label-text font-semibold">
                  Your Coupon{" "}
                  <span className="text-xs">(you can pay without coupon)</span>
                </p>
              </label>
              <input
                type="text"
                className="input input-bordered bg-secondary text-primary"
                {...register("code")}
                defaultValue={code && code}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <input
                type="submit"
                value="Pay"
                className="btn btn-md btn-accent font-bold"
              />
              <label
                onClick={() => {
                  setBookingToPay(null);
                }}
                htmlFor="pay-booking-modal"
                className="btn btn-md font-bold"
              >
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PayBookingModal;
