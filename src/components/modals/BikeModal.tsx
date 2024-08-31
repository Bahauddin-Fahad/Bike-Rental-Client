/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError, FieldValues, useForm } from "react-hook-form";
import {
  useAddBikeMutation,
  useUpdateBikeMutation,
} from "../../redux/features/bike/bikeApi";
import { TBike, TErrorResponse } from "../../types";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import Loading from "../ui/Loading";

const BikeModal = ({ bike, setBike, setModalType }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bikeImgFile, setBikeImgFile] = useState<File | null>(null);
  const [bikeImgTempURL, setBikeImgTempURL] = useState<string | null>(
    bike.image || null
  );
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

  useEffect(() => {
    if (!bikeImgFile) return;
    const imgTempURL = URL.createObjectURL(bikeImgFile);
    setBikeImgTempURL(imgTempURL);
    return () => {
      return URL.revokeObjectURL(imgTempURL);
    };
  }, [bikeImgFile]);

  const onSubmit = async (data: any) => {
    const details = {
      name: data?.name,
      description: data?.description,
      pricePerHour: Number(data?.pricePerHour),
      brand: data?.brand,
      model: data?.model,
      year: Number(data?.year),
      cc: Number(data?.cc),
    };

    const formdata = new FormData();
    if (bikeImgFile) {
      formdata.append("file", bikeImgFile);
    } else {
      console.error("Profile image file is not set.");
    }

    const imageURL = await axios
      .post(`https://vip.bharatcalendars.in:3002/api/upload`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => data.data.files[0].url);
    const image = imageURL || bike?.image;

    Object.keys(bike).length <= 0
      ? await handleAddBike({ ...details, image })
      : await handleEditBike({ ...details, image });
  };
  const handleAddBike = async (details: Partial<TBike>) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBike = async (details: Partial<TBike>) => {
    const options = {
      id: bike?._id,
      data: details,
    };
    try {
      setIsLoading(true);
      const editBikeResponse = await updateBike(options).unwrap();

      if (editBikeResponse?.statusCode === 200) {
        toast.success("Bike Edited Successfully", {
          duration: 4000,
        });
        setModalType("");
        setBike({});
      }
    } catch (error) {
      toast.error((error as TErrorResponse)?.data?.message, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <Loading />;
  }
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
            className="grid grid-cols-12 gap-x-5 gap-y-2"
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
            <div className="form-control w-full col-span-12 mb-2 lg:mb-5">
              <label className="label font-semibold">
                <span className="label-text text-primary">Upload Image</span>
              </label>
              <div className="">
                {bikeImgTempURL ? (
                  <div className="relative w-fit">
                    <img
                      src={bikeImgTempURL ? bikeImgTempURL : bike?.image}
                      alt=" "
                      className="w-[100px] h-[75px] rounded-[10px] object-cover relative"
                    />
                    <RxCrossCircled
                      onClick={() => setBikeImgTempURL(null)}
                      className="absolute -top-2 -right-2 cursor-pointer text-red-600 font-bold w-6 h-6"
                    />
                  </div>
                ) : (
                  <label className="cursor-pointer bg-secondary w-[100px] h-[75px] rounded-[10px] flex flex-col justify-center items-center gap-1">
                    <MdOutlineAddPhotoAlternate className="text-black h-7 w-7" />
                    <p className="text-xs text-black">Add Photo</p>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setBikeImgFile(e.target.files?.[0] as File);
                      }}
                    />
                  </label>
                )}
              </div>
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
