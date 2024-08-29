/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError, FieldValues, useForm } from "react-hook-form";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";
import toast from "react-hot-toast";
import { TErrorResponse } from "../../types";

const BookingModal = ({ bikeDetails, setModalType }: any) => {
  const [createBooking] = useCreateBookingMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onSubmit = async (data: any) => {
    const details = { bike: bikeDetails?._id, startTime: data?.startTime };

    // Object.keys(product).length <= 0
    //   ? handleCreateBooking(details)
    //   : handleUpdateBooking(details);
    handleCreateBooking(details);
  };
  const handleCreateBooking = async (details: any) => {
    try {
      const response = await createBooking(details).unwrap();

      if (response?.statusCode === 200) {
        toast.success(response?.message, { duration: 3000 });
        window.location.href = response.data.payment_url;
      }
    } catch (error) {
      console.log(error);
      toast.error((error as TErrorResponse)?.data?.message);
    }
  };
  //   if (addedData?.status === 200) {
  //     toast.success("Product Added Successfully", {
  //       theme: "colored",
  //       toastId: "added",
  //     });
  //     setModalType("");
  //     setProduct({});
  //   }

  const handleUpdateBooking = (details: any) => {
    // const options = {
    //   id: product?._id,
    //   data: details,
    // };
    // updateProduct(options);
  };
  //   if (updatedData?.status === 200) {
  //     toast.success("Product Updated Successfully", {
  //       theme: "colored",
  //       toastId: "updated",
  //     });
  //     setModalType("");
  //     setProduct({});
  //   }

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-lg !important space-y-4">
          <h3 className="font-bold text-lg xl:text-xl text-center text-primary">{`Would You Like to Book ${bikeDetails?.name}?`}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="form-control max-w-xs mx-auto">
              <label className="label">
                <span className="label-text font-semibold">Start Time *</span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered bg-secondary text-primary"
                {...register("startTime", {
                  required: {
                    value: true,
                    message: "Start Time is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.name as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="flex gap-2 justify-end">
              <input
                type="submit"
                value="Submit"
                className="btn btn-md btn-accent font-bold"
              />
              <label
                onClick={() => {
                  setModalType("");
                }}
                htmlFor="booking-modal"
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

export default BookingModal;
