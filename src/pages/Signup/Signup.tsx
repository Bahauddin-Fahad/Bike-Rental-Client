/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { useSignUpMutation } from "../../redux/features/auth/authApi";

import toast from "react-hot-toast";
import { TErrorResponse } from "../../types";

const Signup = () => {
  const [seePassowrd, setSeePassword] = useState(false);
  const navigate = useNavigate();

  const [signUp] = useSignUpMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>();

  const onSubmit = async (data: any) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
      };
      await signUp(userInfo).unwrap();
      toast.success("Successfully Signed Up", { duration: 4000 });
      navigate("/login");
      reset();
    } catch (error: any) {
      console.log(error);
      toast.error((error as TErrorResponse)?.data?.message, { duration: 4000 });
    }
  };

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 bg-white h-screen">
      <div className="order-2 text-white font-vietnam-bold text-[6.27vw] hidden xs:flex justify-center items-center w-full bg-[#2E603C] p-5 md:p-10">
        RideOn
      </div>
      <div className="order-1 bg-white h-full text-[#2E603C] text-xl font-font-satoshi flex justify-center items-center">
        <div className="w-full xs:w-1/2 max-w-lg space-y-4">
          <p className="font-vietnam-bold">Sign up with</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div>
                <input
                  type="text"
                  placeholder={"Name"}
                  className="input input-bordered w-full max-w-lg bg-[#F6F6F6]"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.name as FieldError).message}
                    </span>
                  )}
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={"Email"}
                  className="input input-bordered w-full max-w-lg bg-[#F6F6F6]"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide A Valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.email as FieldError).message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.email as FieldError).message}
                    </span>
                  )}
                </label>
              </div>
              <div className="relative">
                <input
                  type={seePassowrd ? "text" : "password"}
                  placeholder={"Password"}
                  className="input input-bordered w-full max-w-lg bg-[#F6F6F6]"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(), setSeePassword(!seePassowrd);
                  }}
                  className="absolute right-5 top-[14px]"
                >
                  {seePassowrd ? (
                    <RiEyeCloseFill className="text-gray-500" />
                  ) : (
                    <RiEyeFill className="text-gray-500" />
                  )}
                </button>
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.password as FieldError).message}
                    </span>
                  )}
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={"Phone"}
                  className="input input-bordered w-full max-w-lg bg-[#F6F6F6]"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone is required",
                    },
                  })}
                />
                <label className="label">
                  {errors.phone?.type === "required" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.phone as FieldError).message}
                    </span>
                  )}
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={"Address"}
                  className="input input-bordered w-full max-w-lg bg-[#F6F6F6]"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address is required",
                    },
                  })}
                />
                <label className="label">
                  {errors.address?.type === "required" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.address as FieldError).message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-accent w-full text-white text-base md:text-xl normal-case"
              value={"Signup"}
            />
          </form>
          <div className="flex gap-2 justify-center text-sm md:text-lg">
            <p>Already have an account?</p>
            <Link
              className="decoration-transparent text-[#2E603C] font-semibold"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
