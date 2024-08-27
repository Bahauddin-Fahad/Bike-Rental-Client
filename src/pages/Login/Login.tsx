/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router-dom";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [seePassowrd, setSeePassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: { email: "kabir@example.com", password: "password123" },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.token) as TUser;

      toast.success("Successfully Logged In", { duration: 4000 });
      dispatch(setUser({ user: user, token: res.token }));
      navigate(`/dashboard`);
    } catch (error: any) {
      toast.error(error?.data?.message, { duration: 4000 });
    }
  };

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 bg-white h-screen">
      <h1 className="text-white font-vietnam-bold text-[6.27vw] hidden xs:flex justify-center items-center w-full bg-accent p-5 md:p-10">
        RideOn
      </h1>
      <div className="bg-white h-full text-accent font-satoshi text-xl font-[roboto] flex justify-center items-center px-3 py-5 md:px-10 md:py-9">
        <div className="w-full xs:w-1/2 max-w-lg space-y-4">
          <p className="font-vietnam-bold">Sign in with</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
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
                  className="input input-bordered w-full max-w-lg bg-[#F6F6F6] "
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
            </div>

            <input
              type="submit"
              className="btn btn-accent w-full text-white text-base md:text-xl normal-case"
              value={"Login"}
            />
          </form>
          <div className="flex gap-2 justify-center text-sm md:text-lg">
            <p>{"Don't have an account?"}</p>
            <Link className="text-accent font-semibold" to="/signup">
              {"Sign up"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
