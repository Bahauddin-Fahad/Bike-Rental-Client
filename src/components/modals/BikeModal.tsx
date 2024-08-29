/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError, FieldValues, useForm } from "react-hook-form";
import {
  useAddBikeMutation,
  useUpdateBikeMutation,
} from "../../redux/features/bike/bikeApi";
import { TBike, TErrorResponse } from "../../types";
import toast from "react-hot-toast";

const BikeModal = ({ bike, setBike, setModalType }: any) => {
  const [addBike] = useAddBikeMutation();
  const [updateBike] = useUpdateBikeMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      name: bike?.name,
      image: bike?.image,
      description: bike?.description,
      pricePerHour: Number(bike?.pricePerHour),
      brand: bike?.brand,
      model: bike?.model,
      year: bike?.year,
      cc: bike?.cc,
    },
  });

  const onSubmit = async (data: any) => {
    const details = {
      name: data?.name,
      image: data?.image,
      description: data?.description,
      pricePerHour: Number(data?.pricePerHour),
      brand: data?.brand,
      model: data?.model,
      year: Number(data?.year),
      cc: Number(data?.cc),
    };

    Object.keys(bike).length <= 0
      ? handleAddBike(details)
      : handleEditBike(details);
  };
  const handleAddBike = async (details: Partial<TBike>) => {
    console.log(details);
    try {
      const addBikeResponse = await addBike(details).unwrap();
      if (addBikeResponse?.statusCode === 200) {
        toast.success("Bike Added Successfully", {
          duration: 4000,
        });
        setModalType("");
        setBike({});
      }
    } catch (error) {
      toast.error((error as TErrorResponse)?.data?.message, { duration: 4000 });
    }
  };

  const handleEditBike = async (details: Partial<TBike>) => {
    const options = {
      id: bike?._id,
      data: details,
    };
    try {
      const editBikeResponse = await updateBike(options).unwrap();
      console.log(editBikeResponse);
      if (editBikeResponse?.statusCode === 200) {
        toast.success("Bike Edited Successfully", {
          duration: 4000,
        });
        setModalType("");
        setBike({});
      }
    } catch (error) {
      toast.error((error as TErrorResponse)?.data?.message, { duration: 4000 });
    }
  };

  return (
    <div>
      <input type="checkbox" id="bike-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-4xl !important space-y-4">
          <h3 className="font-bold text-lg text-left text-primary">{`${
            Object.keys(bike).length <= 0 ? "Add" : "Edit"
          } Bike`}</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-x-5"
          >
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold">Name *</span>
              </label>
              <input
                placeholder={bike?.name || `Name of the Bike`}
                defaultValue={bike?.name && bike?.name}
                type="text"
                className="input input-bordered bg-secondary text-primary"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
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
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold">
                  Price per Hour *
                </span>
              </label>
              <input
                placeholder={bike?.pricePerHour || `Price per Hour`}
                defaultValue={bike?.pricePerHour && bike?.pricePerHour}
                type="number"
                min={0}
                className="input input-bordered bg-secondary text-primary"
                {...register("pricePerHour", {
                  required: {
                    value: true,
                    message: "Price per Hour is required",
                  },
                })}
              />
              <label className="label">
                {errors.pricePerHour?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.pricePerHour as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12">
              <label className="label">
                <span className="label-text font-semibold">Description *</span>
              </label>
              <textarea
                placeholder={"Description"}
                defaultValue={bike?.description && bike?.description}
                className="textarea textarea-bordered bg-secondary text-primary h-24"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
              />
              <label className="label">
                {errors.description?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.description as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold">Brand *</span>
              </label>
              <input
                placeholder={bike?.brand || `Brand`}
                defaultValue={bike?.brand && bike?.brand}
                type="text"
                className="input input-bordered bg-secondary text-primary"
                {...register("brand", {
                  required: {
                    value: true,
                    message: "Brand is required",
                  },
                })}
              />
              <label className="label">
                {errors.brand?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.brand as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold">Model *</span>
              </label>
              <input
                placeholder={bike?.model || `Mode`}
                defaultValue={bike?.model && bike?.model}
                type="text"
                className="input input-bordered bg-secondary text-primary"
                {...register("model", {
                  required: {
                    value: true,
                    message: "Model is required",
                  },
                })}
              />
              <label className="label">
                {errors.model?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.model as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold">Year *</span>
              </label>
              <input
                placeholder={bike?.year || `Year`}
                defaultValue={bike?.year && bike?.year}
                type="number"
                min={0}
                className="input input-bordered bg-secondary text-primary"
                {...register("year", {
                  required: {
                    value: true,
                    message: "Year is required",
                  },
                })}
              />
              <label className="label">
                {errors.year?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.year as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold">CC *</span>
              </label>
              <input
                placeholder={bike?.cc || `CC`}
                defaultValue={bike?.cc && bike?.cc}
                type="number"
                min={0}
                className="input input-bordered bg-secondary text-primary"
                {...register("cc", {
                  required: {
                    value: true,
                    message: "CC is required",
                  },
                })}
              />
              <label className="label">
                {errors.cc?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.cc as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12">
              <label className="label">
                <span className="label-text font-semibold">Image *</span>
              </label>
              <input
                placeholder={bike?.image || `Image`}
                defaultValue={bike?.image && bike?.image}
                type="text"
                className="input input-bordered bg-secondary text-primary"
                {...register("image", {
                  required: {
                    value: true,
                    message: "Image is required",
                  },
                })}
              />
              <label className="label">
                {errors.image?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.image as FieldError).message}
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
                setBike({});
              }}
              htmlFor="bike-modal"
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

export default BikeModal;
