/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router-dom";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "react-toastify";
import { useState } from "react";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [seePassowrd, setSeePassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>();

  const [login] = useLoginMutation();
  // Login Form Submit Function
  const onSubmit = async (data: any) => {
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      toast.success("Successfully Logged In", {
        theme: "colored",
        toastId: "login",
      });
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      navigate(`/`);
    } catch (error) {
      toast.error("Something went Wrong", { toastId: "login" });
    }
  };

  // if (loading || sending) {
  //   return <Loading />;
  // }
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 bg-white h-screen">
      <div className="text-white font-vietnam-bold text-[5.27vw] hidden xs:flex justify-center items-center w-full bg-accent p-5 md:p-10">
        RideOn
      </div>

      <div className="bg-white h-full text-accent font-satoshi text-xl font-[roboto] flex justify-center items-center px-3 py-5 md:px-10 md:py-9">
        <div className="w-full xs:w-auto max-w-lg space-y-4">
          <p>Sign in with</p>
          {/* <SocialLogin /> */}
          {/* <div className="divider">or</div> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
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
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message:
                        "Must Contain 8 Characters including 1 Uppercase & 1 Lowercase Letter",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setSeePassword(!seePassowrd)}
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
                  {errors.password?.type === "pattern" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.password as FieldError).message}
                    </span>
                  )}
                </label>
              </div>
            </div>

            {/* {signInError} */}
            <input
              type="submit"
              className="btn btn-accent w-full text-white text-base md:text-xl normal-case"
              value={"Log in"}
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
