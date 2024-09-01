/* eslint-disable @typescript-eslint/no-explicit-any */

import toast from "react-hot-toast";
import { usePayRentalCostMutation } from "../../redux/features/rental/rentalApi";
import { TErrorResponse, TCoupon } from "../../types";
import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";

import { useState } from "react";
import { useGetSingleCouponQuery } from "../../redux/features/coupon/couponApi";
import Loading from "../ui/Loading";

const PayRentalModal = ({ rentalToPay, setRentalToPay }: any) => {
  const [payRental, { isLoading }] = usePayRentalCostMutation();
  const { code } = useAppSelector((state) => state.coupon as TCoupon);
  const [couponCode, setCouponCode] = useState<string>("");
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: { code },
  });

  const { data } = useGetSingleCouponQuery(couponCode, { skip: !couponCode });
  const retrievedCoupon = data?.data;

  const totalCost = Number(rentalToPay.totalCost);
  const advancePaid = Number(rentalToPay.advancePaid);
  const discount = retrievedCoupon
    ? Math.round((totalCost * retrievedCoupon?.discount) / 100)
    : 0;
  const remainingCost = Math.round(totalCost - discount - advancePaid);

  const handleCouponCheck = (data: Partial<TCoupon>) => {
    setCouponCode(data.code as string);
  };
  const handlePayRental = async () => {
    try {
      const options = {
        id: rentalToPay?._id,
        data: {
          discount: retrievedCoupon?.discount ? retrievedCoupon?.discount : 0,
        },
      };
      const response = await payRental(options).unwrap();
      if (response?.statusCode === 200) {
        toast.success(response?.message, { duration: 3000 });
        window.location.href = response.data.payment_url;
      }
    } catch (error) {
      console.log(error);
      toast.error((error as TErrorResponse)?.data?.message);
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <input type="checkbox" id="pay-rental-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-xs lg:max-w-lg !important space-y-6">
          <h3 className="font-bold text-lg xl:text-xl text-center text-primary">{`Would You Like to Pay for ${rentalToPay?.bike?.name}?`}</h3>
          <div className="space-y-5">
            <div className="text-primary font-satoshi-bold flex flex-col justify-center w-full lg:w-6/12 mx-auto">
              <div className="flex justify-between">
                <p className="w-8/12">Total Cost:</p>
                <span>{totalCost} ৳</span>
              </div>
              <div className="flex justify-between">
                <p className="w-8/12">Advance Paid:</p>
                <span className="text-error">- {advancePaid} ৳</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <p className="w-8/12">Discount:</p>
                  <span className="text-error">- {discount} ৳</span>
                </div>
              )}
              <div className="divider divider-primary dark:divider-secondary m-0" />
              <div className="flex justify-between">
                <p className="w-8/12">Need to Pay:</p>
                <span className=""> {remainingCost} ৳</span>
              </div>
            </div>
            <div className="space-y-2">
              <form
                onSubmit={handleSubmit(handleCouponCheck)}
                className="flex items-end justify-between gap-2"
              >
                <div className="form-control w-9/12">
                  <label className="label">
                    <p className="label-text font-semibold">
                      Enter Your Coupon
                    </p>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered bg-secondary text-primary"
                    defaultValue={code && code}
                    {...register("code", {
                      required: {
                        value: true,
                        message: "Code is required",
                      },
                    })}
                  />
                </div>

                <input
                  type="submit"
                  value="Enter"
                  disabled={retrievedCoupon}
                  className="btn btn-neutral w-3/12"
                />
              </form>
              {!retrievedCoupon && couponCode && (
                <p className="text-error text-xs"> Coupon is not Valid</p>
              )}
              {retrievedCoupon && (
                <p className="text-accent font-bold">
                  Your Discount is: {retrievedCoupon?.discount}%
                </p>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <input
                onClick={handlePayRental}
                type="button"
                value="Pay"
                className="btn btn-md btn-accent font-bold"
              />
              <label
                onClick={() => {
                  setRentalToPay(null);
                  setCouponCode("");
                }}
                htmlFor="pay-rental-modal"
                className="btn btn-md font-bold"
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayRentalModal;
