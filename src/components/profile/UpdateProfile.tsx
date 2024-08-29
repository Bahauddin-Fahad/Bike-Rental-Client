/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, useForm } from "react-hook-form";
import { TErrorResponse, TLoadedUser } from "../../types";
import { useUpdateUserMutation } from "../../redux/features/users/userApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
type Tprops = {
  loadedUser: TLoadedUser;
};

const UpdateProfile = ({ loadedUser }: Tprops) => {
  const [updateUser] = useUpdateUserMutation();
  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      name: loadedUser?.name,
      phone: loadedUser?.phone,
      address: loadedUser?.address,
      image: loadedUser?.image,
    },
  });

  useEffect(() => {
    if (loadedUser) {
      reset({
        name: loadedUser?.name,
        phone: loadedUser?.phone,
        address: loadedUser?.address,
        image: loadedUser?.image,
      });
    }
  }, [loadedUser, reset]);
  const onSubmit = async (data: any) => {
    const name = data.name;
    const phone = data.phone;
    const address = data.address;
    const image = data.image
      ? data.image
      : "https://i.ibb.co/pvmWXsv/male-placeholder-image.jpg";
    const userInfo = { name, phone, image, address };

    try {
      const res = await updateUser(userInfo);

      toast.success(res?.data?.message, { duration: 4000 });
    } catch (error) {
      toast.error((error as TErrorResponse)?.data?.message, { duration: 4000 });
    }
  };
  return (
    <div
      data-aos="fade-left"
      data-aos-duration="500"
      className="max-w-md w-full "
    >
      <form
        className="form card h-full w-full max-w-lg shadow-2xl glass pb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mx-6">
          <h2 className="text-2xl font-bold underline mt-8 text-center">
            Update Profile
          </h2>

          <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text text-primary dark:text-secondary">
                  Name
                </span>
              </label>
              <input
                className="input input-bordered font-semibold text-primary"
                placeholder={"Your Name"}
                {...register("name")}
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text text-primary dark:text-secondary">
                  Email
                </span>
              </label>
              <input
                className="input input-bordered font-semibold text-primary"
                placeholder={loadedUser?.email || ""}
                readOnly
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text text-primary dark:text-secondary">
                Address
              </span>
            </label>
            <input
              className="input input-bordered font-semibold text-primary"
              placeholder="Your Address"
              {...register("address")}
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text text-primary dark:text-secondary">
                Phone
              </span>
            </label>
            <input
              className="input input-bordered font-semibold text-primary"
              placeholder="Phone"
              type="text"
              {...register("phone")}
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text text-primary dark:text-secondary">
                Image URL
              </span>
            </label>
            <input
              className="input input-bordered font-semibold text-primary"
              placeholder="Image URL here"
              type="text"
              {...register("image")}
            />
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-accent bg-[#2AE277] text-primary"
              disabled={!isValid}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
