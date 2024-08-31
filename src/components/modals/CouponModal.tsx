/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError, FieldValues, useForm } from "react-hook-form";
import { TCoupon, TErrorResponse } from "../../types";
import toast from "react-hot-toast";
import {
  useAddCouponMutation,
  useUpdateCouponMutation,
} from "../../redux/features/coupon/couponApi";

const CouponModal = ({ coupon, setCoupon, setModalType }: any) => {
  const [addCoupon] = useAddCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      code: coupon?.code,
      discount: coupon?.discount,
    },
  });

  const onSubmit = async (data: any) => {
    const details = {
      code: data?.code,
      discount: Number(data?.discount),
    };

    Object.keys(coupon).length <= 0
      ? handleAddCoupon(details)
      : handleEditCoupon(details);
  };
  const handleAddCoupon = async (details: Partial<TCoupon>) => {
    try {
      const addCouponResponse = await addCoupon(details).unwrap();

      if (addCouponResponse?.statusCode === 200) {
        toast.success("Coupon Added Successfully", {
          duration: 4000,
        });
        setModalType("");
        setCoupon({});
      }
    } catch (error) {
      toast.error((error as TErrorResponse)?.data?.message, { duration: 4000 });
    }
  };

  const handleEditCoupon = async (details: Partial<TCoupon>) => {
    const options = {
      id: coupon?._id,
      data: details,
    };
    try {
      const editCouponResponse = await updateCoupon(options).unwrap();

      if (editCouponResponse?.statusCode === 200) {
        toast.success("Coupon Edited Successfully", {
          duration: 4000,
        });
        setModalType("");
        setCoupon({});
      }
    } catch (error) {
      toast.error((error as TErrorResponse)?.data?.message, { duration: 4000 });
    }
  };

  return (
    <div>
      <input type="checkbox" id="coupon-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-lg !important space-y-4">
          <h3 className="font-bold text-lg text-left text-primary">{`${
            Object.keys(coupon).length <= 0 ? "Add" : "Edit"
          } Coupon`}</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-1"
          >
            <div className="form-control w-full col-span-12">
              <label className="label">
                <span className="label-text font-semibold">Code *</span>
              </label>
              <input
                placeholder={coupon?.code || `Coupon Code`}
                defaultValue={coupon?.code && coupon?.code}
                type="text"
                className="input input-bordered bg-secondary text-primary"
                {...register("code", {
                  required: {
                    value: true,
                    message: "Code is required",
                  },
                })}
              />
              <label className="label">
                {errors.code?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-xs">
                    {(errors.code as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12">
              <label className="label">
                <span className="label-text font-semibold">Discount *</span>
              </label>
              <input
                placeholder={coupon?.discount || `Coupon Discount`}
                defaultValue={coupon?.discount && coupon?.discount}
                type="number"
                min={0}
                className="input input-bordered bg-secondary text-primary"
                {...register("discount", {
                  required: {
                    value: true,
                    message: "Discount is required",
                  },
                })}
              />
              <label className="label">
                {errors.discount?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-xs">
                    {(errors.discount as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <input
              type="submit"
              value="Submit"
              className="btn btn-md btn-accent w-full font-bold col-span-6"
            />
            <label
              onClick={() => {
                setModalType("");
                setCoupon({});
              }}
              htmlFor="coupon-modal"
              className="btn btn-md w-full font-bold col-span-6"
            >
              Cancel
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
