/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError, FieldValues, useForm } from "react-hook-form";
import { useCreateRentalMutation } from "../../redux/features/rental/rentalApi";
import toast from "react-hot-toast";
import { TErrorResponse } from "../../types";

const RentalModal = ({ bikeDetails, setModalType }: any) => {
  const [createRental] = useCreateRentalMutation();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const handleCreateRental = async (data: any) => {
    const details = { bike: bikeDetails?._id, startTime: data?.startTime };
    try {
      const response = await createRental(details).unwrap();

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
      <input type="checkbox" id="rental-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-lg !important space-y-4">
          <h3 className="font-bold text-lg xl:text-xl text-center text-primary">{`Would You Like to Book ${bikeDetails?.name}?`}</h3>
          <form onSubmit={handleSubmit(handleCreateRental)} className="">
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
                {errors.startTime?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.startTime as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="flex gap-2 justify-end">
              <input
                type="submit"
                value="Submit"
                disabled={!isValid}
                className="btn btn-md btn-accent font-bold"
              />
              <label
                onClick={() => {
                  setModalType("");
                }}
                htmlFor="rental-modal"
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

export default RentalModal;
