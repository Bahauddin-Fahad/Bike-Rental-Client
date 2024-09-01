/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, useForm } from "react-hook-form";
import { TErrorResponse, TLoadedUser } from "../../types";
import { useUpdateUserMutation } from "../../redux/features/users/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

type Tprops = {
  loadedUser: TLoadedUser;
};

const UpdateProfile = ({ loadedUser }: Tprops) => {
  const [updateUser] = useUpdateUserMutation();
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);
  const [profileImgTempURL, setProfileImgTempURL] = useState<string | null>(
    loadedUser.image!
  );

  useEffect(() => {
    if (!profileImgFile) return;
    const imgTempURL = URL.createObjectURL(profileImgFile);
    setProfileImgTempURL(imgTempURL);
    return () => {
      return URL.revokeObjectURL(imgTempURL);
    };
  }, [profileImgFile]);

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
    const formdata = new FormData();
    if (profileImgFile) {
      formdata.append("file", profileImgFile);
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

    const name = data.name;
    const phone = data.phone;
    const address = data.address;
    const image = imageURL || loadedUser?.image;
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
      className="md:max-w-md w-full mx-auto"
    >
      <form
        className="form card h-full w-full max-w-lg shadow-2xl glass pb-5 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mx-6">
          <h2 className="text-2xl underline mt-8 text-center font-vietnam-bold">
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
                Upload Image
              </span>
            </label>
            <div className="">
              {profileImgTempURL ? (
                <div className="relative w-fit">
                  <img
                    src={profileImgTempURL || loadedUser?.image}
                    alt=" "
                    className="w-[100px] h-[75px] rounded-[10px] object-cover relative"
                  />
                  <RxCrossCircled
                    onClick={() => setProfileImgTempURL(null)}
                    className="absolute -top-2 -right-2 cursor-pointer text-red-600 font-bold w-6 h-6"
                  />
                </div>
              ) : (
                <label className="cursor-pointer bg-secondary w-[100px] h-[75px] rounded-[10px] flex flex-col justify-center items-center gap-1">
                  <MdOutlineAddPhotoAlternate className="text-black h-7 w-7" />
                  <p className="text-xs text-black">Add Photo</p>

                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setProfileImgFile(e.target.files?.[0] as File);
                    }}
                  />
                </label>
              )}
            </div>
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
