/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import SocialLogin from "./SocialLogin";

import { FieldValues, useForm } from "react-hook-form";

// import { toast } from "react-toastify";
// import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
// import Loading from "../Shared/Loading";

const Login = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  const { register, handleSubmit } = useForm<FieldValues>();

  let signInError;
  if (signInError) {
    signInError = (
      <p className="text-[red] my-2 text-base font-[inter] font-semibold">
        User is not registered, please Sign up to register
      </p>
    );
  }

  // Login Form Submit Function
  const onSubmit = async () => {
    // setLoading(true);
    // const email = data.email;
    // const password = data.password;
    // const userInfo = { email, password };
    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // };
    // await axios
    //   .post(`${process.env.REACT_APP_ENDPOINT}/user/signin`, userInfo, config)
    //   .then((data) => {
    //     if (data.status === 200) {
    //       ReactGA.event({
    //         category: "Login",
    //         action: "Click",
    //         label: "Login Button Clicked",
    //       });
    //       if (data.data.image) {
    //         localStorage.setItem("user-image", data?.data?.image);
    //       }
    //       localStorage.setItem("user-id", data?.data?.id);
    //       localStorage.setItem("token", data?.data?.token);
    //       localStorage.setItem("user-planType", data?.data?.planType);
    //       navigate("/");
    //       toast.success(`Successfully Logged in as ${email || user?.email}`, {
    //         theme: "colored",
    //         toastId: "login",
    //       });
    //     }
    //   })
    //   .finally(() => setLoading(false));
  };

  // if (loading || sending) {
  //   return <Loading />;
  // }
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 bg-white h-full">
      <div className="text-white font-[inter] italic text-[5.27vw] hidden xs:flex justify-center items-center h-[calc(100vh-70px)] w-full bg-black p-5 md:p-10">
        VIPWare
      </div>
      {/* <div className="m-auto hidden lg:block">
    <img src={Logo} alt="logo" className="h-12" />
  </div> */}
      <div className="bg-white h-full text-black text-xl font-[roboto] flex justify-center items-center px-3 py-5 md:px-10 md:py-9">
        <div className="w-full xs:w-auto max-w-lg space-y-4">
          <p>Sign in with</p>
          {/* <SocialLogin /> */}
          <div className="divider">or</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 md:gap-10">
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
                  // onChange={(e) => setEmail(e.target.value)}
                />
                {/* <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-[red]">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-[red]">
                      {errors.email.message}
                    </span>
                  )}
                </label> */}
              </div>
              <div className="relative">
                <input
                  // type={seePassowrd ? "text" : "password"}
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
                  // onClick={() => setSeePassword(!seePassowrd)}
                  className="absolute right-5 top-[14px]"
                >
                  {/* {seePassowrd ? (
                    <RiEyeCloseFill className="text-gray-500" />
                  ) : (
                    <RiEyeFill className="text-gray-500" />
                  )} */}
                </button>
                {/* <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-[red]">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="label-text-alt text-[red]">
                      {errors.password.message}
                    </span>
                  )}
                </label> */}
              </div>
            </div>

            {signInError}
            <input
              type="submit"
              className="btn btn-primary w-full text-white text-base md:text-xl normal-case"
              value={"Log in"}
            />
          </form>
          <div className="flex gap-2 justify-center text-sm md:text-lg">
            <p>{"Don't have an account?"}</p>
            <Link
              className="decoration-transparent text-accent font-semibold"
              to="/signup"
            >
              {"Sign up"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
