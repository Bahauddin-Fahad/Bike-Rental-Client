/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { toggleTheme } from "../../redux/features/theme/themeSlice";

type TButtonName = "about" | "dashboard" | string;

const Navbar = () => {
  const params = useLocation().pathname;
  const [buttonName, setButtonName] = useState<TButtonName>(params.slice(1));
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state!.theme!.theme as string);

  useEffect(() => {
    setButtonName(params.slice(1));
  }, [params]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Logged out successfully", { duration: 4000 });
  };

  return (
    <div className="custom-padding navbar bg-white dark:bg-primary font-semibold h-14 xl:h-28 sticky top-0 z-20 text-black dark:text-white shadow-md">
      <div className="navbar-start xl:relative">
        <Link to={"/"} className="xl:text-2xl space-x-2">
          <span className="text-accent font-semibold">RideOn</span>
          <span>Rentals</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex font-vietnam">
        <ul className="flex gap-10 text-[16px]">
          <li
            className={`font-bold ${
              buttonName === "about"
                ? "text-accent"
                : "hover:scale-110 duration-300"
            }`}
            onClick={() => setButtonName("about")}
          >
            <Link to={"/about"}>ABOUT US</Link>
          </li>
          {user?.role && (
            <li
              className={`font-bold ${
                buttonName === "dashboard"
                  ? "text-accent"
                  : "hover:scale-110 duration-300"
              }`}
              onClick={() => setButtonName("dashboard")}
            >
              <Link to={"/dashboard"}>DASHBOARD</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end xl:space-x-4 flex items-center gap-2">
        {user ? (
          <button
            onClick={handleLogOut}
            className="w-[80px] h-[25px] xl:w-[120px] xl:h-[40px] bg-[#2E603C] text-white text-[8px] xl:text-[16px] rounded-sm xl:rounded-[5px] font-vietnam-bold m-0"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="font-vietnam-bold text-accent"
          >
            Login
          </button>
        )}
        <input
          onChange={handleToggleTheme}
          type="checkbox"
          className="toggle toggle-xs xs:toggle-sm md:toggle-md toggle-accent "
          checked={theme === "light" ? false : true}
        />
        <div className="dropdown dropdown-end dropdown-bottom">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost p-0 lg:hidden"
          >
            <GiHamburgerMenu className="text-[#2E603C] text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-xs dropdown-content bg-white dark:bg-primary z-[1] mt-3 w-52 p-2 shadow text-black dark:text-white"
          >
            <li
              className={`font-semibold ${
                buttonName === "about" && "text-accent"
              }`}
            >
              <Link to={"/about"}>ABOUT US</Link>
            </li>
            {user?.role && (
              <li
                className={`font-semibold ${
                  buttonName === "dashboard" && "text-accent"
                }`}
              >
                <Link to={"/dashboard"}>DASHBOARD</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
