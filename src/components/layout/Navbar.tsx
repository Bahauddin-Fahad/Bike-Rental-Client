/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";

type TButtonName = "about" | "dashboard" | string;

const Navbar = ({ toggleTheme }: any) => {
  const params = useLocation().pathname;
  const [buttonName, setButtonName] = useState<TButtonName>(params.slice(1));
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    setButtonName(params.slice(1));
  }, [params]);

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Logged out successfully", { duration: 4000 });
  };

  return (
    <div className="custom-padding navbar bg-white dark:bg-primary font-semibold h-14 xl:h-28 sticky top-0 z-20 text-black dark:text-white shadow-md">
      <div className="navbar-start xl:relative">
        <Link to={"/"} className="xl:text-2xl space-x-2">
          <span className="text-[#27ae60] font-semibold">RideOn</span>
          <span>Rentals</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex font-vietnam">
        <ul className="flex gap-10 text-[16px]">
          <li
            className={`font-bold ${
              buttonName === "about"
                ? "text-[#27ae60]"
                : "hover:scale-110 duration-300"
            }`}
            onClick={() => setButtonName("about")}
          >
            <Link to={"/about"}>ABOUT US</Link>
          </li>
          <li
            className={`font-bold ${
              buttonName === "dashboard"
                ? "text-[#27ae60]"
                : "hover:scale-110 duration-300"
            }`}
            onClick={() => setButtonName("dashboard")}
          >
            <Link to={"/dashboard"}>DASHBOARD</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end xl:space-x-4">
        {user ? (
          <button
            onClick={handleLogOut}
            className="w-[80px] h-[25px] xl:w-[120px] xl:h-[40px] bg-accent text-white text-[8px] xl:text-[16px] rounded-sm xl:rounded-[5px] font-vietnam-bold"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="font-vietnam-bold"
          >
            Login
          </button>
        )}

        <input
          onChange={toggleTheme}
          type="checkbox"
          className="toggle toggle-xs xs:toggle-sm md:toggle-md toggle-accent hidden sm:block"
          checked={localStorage.getItem("theme") === "light" ? false : true}
        />
        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <GiHamburgerMenu className="text-accent text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-52 p-2 shadow text-black"
          >
            <li
              className={`font-semibold ${
                buttonName === "about" && "text-[#27ae60]"
              }`}
            >
              <Link to={"/about"}>ABOUT US</Link>
            </li>
            <li
              className={`font-semibold ${
                buttonName === "dashboard" && "text-[#27ae60]"
              }`}
            >
              <Link to={"/dashboard"}>DASHBOARD</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
