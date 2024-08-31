/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError, FieldValues, useForm } from "react-hook-form";
import { useCalculateTotalCostMutation } from "../../redux/features/rental/rentalApi";
import toast from "react-hot-toast";

const CostCalculateModal = ({
  rentalToCalculate,
  setRentalToCalculate,
}: any) => {
  const [calculateTotalCost] = useCalculateTotalCostMutation();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      returnTime: new Date(),
    },
  });

  const handleCalculateCost = async (details: any) => {
    const options = {
      id: rentalToCalculate?._id,
      data: { returnTime: details?.returnTime },
    };

    await toast.promise(calculateTotalCost(options).unwrap(), {
      loading: "Calculating Cost...",
      success: (res) => {
        if (res.success) {
          setRentalToCalculate(null);
          return "Cost Calculated successfully";
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to Calculate Cost",
    });
  };

  return (
    <div>
      <input type="checkbox" id="calculate-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-lg !important space-y-4">
          <h3 className="font-bold text-lg xl:text-xl text-center text-primary">{`Would You Like to Calculate the Cost?`}</h3>
          <form onSubmit={handleSubmit(handleCalculateCost)} className="">
            <div className="form-control max-w-xs mx-auto">
              <label className="label">
                <span className="label-text font-semibold">Return Time *</span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered bg-secondary text-primary"
                {...register("returnTime", {
                  required: {
                    value: true,
                    message: "Return Time is required",
                  },
                })}
              />
              <label className="label">
                {errors.returnTime?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.returnTime as FieldError).message}
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
                htmlFor="calculate-modal"
                onClick={() => {
                  setRentalToCalculate(null);
                }}
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

export default CostCalculateModal;
