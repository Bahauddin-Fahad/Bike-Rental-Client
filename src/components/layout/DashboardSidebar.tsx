import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineLogout, MdOutlineElectricBike } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiCoins, PiHandCoinsDuotone } from "react-icons/pi";
import { TbLayoutSidebarLeftExpandFilled, TbCoinTaka } from "react-icons/tb";
import { FaMotorcycle, FaChevronDown, FaUsersCog } from "react-icons/fa";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import useUserDetails from "../../customHooks/useUserDetails";
import Loading from "../ui/Loading";
import { useState } from "react";
type TButtonName = string;

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [buttonName, setButtonName] = useState<TButtonName>(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { loadedUser, isLoading } = useUserDetails();

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Logged out successfully", { duration: 3000 });
    navigate("/");
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div
        id="view"
        className="flex flex-row drawer lg:drawer-open z-10"
        x-data="{ sidenav: true }"
      >
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col items-start">
          <label
            htmlFor="dashboard-drawer"
            className="btn drawer-button lg:hidden"
          >
            <TbLayoutSidebarLeftExpandFilled className="size-6" />
          </label>
        </div>
        <div
          id="sidebar"
          className="drawer-side h-full max-h-screen overflow-y-scroll"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
            height: "100vh" /* Ensure full viewport height */,
            overflowY: "auto" /* Enable scrolling */,
          }}
          x-show="sidenav"
        >
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-52 md:w-72 min-h-full bg-secondary dark:bg-primary">
            <div className="space-y-6">
              <div className="mb-5">
                <Link to={"/"} className="xl:text-2xl space-x-2">
                  <span className="text-accent font-semibold">RideOn</span>
                  <span>Rentals</span>
                </Link>
              </div>

              <div id="profile" className="space-y-3">
                <img
                  src={
                    loadedUser?.image ||
                    "https://i.ibb.co/pvmWXsv/male-placeholder-image.jpg"
                  }
                  alt="Avatar user"
                  className="w-10 h-10 md:w-20 md:h-20 rounded-full mx-auto object-cover object-top"
                />
                <div>
                  <h2 className="font-bold md:text-lg text-center font-vietnam-bold">
                    Welcome{" "}
                    <span className="text-accent">{loadedUser?.name}</span>
                  </h2>
                </div>
              </div>
              <div id="menu" className="flex flex-col">
                <div className="divider divider-primary dark:divider-secondary"></div>
                <div className="space-y-2">
                  {loadedUser?.role === "admin" ? (
                    <>
                      <li
                        className={`rounded-md ${
                          buttonName === "/dashboard/admin/users"
                            ? "bg-accent"
                            : ""
                        }`}
                      >
                        <Link
                          onClick={() =>
                            setButtonName("/dashboard/admin/users")
                          }
                          to="/dashboard/admin/users"
                          className={`text-sm font-medium flex gap-3 item-center p-2 hover:bg-accent text-primary dark:text-white`}
                        >
                          <FaUsersCog className="text-xl" />
                          <span className="">User Management</span>
                        </Link>
                      </li>
                      <li
                        className={`rounded-md ${
                          buttonName === "/dashboard/admin/bikes"
                            ? "bg-accent"
                            : ""
                        }`}
                      >
                        <Link
                          onClick={() =>
                            setButtonName("/dashboard/admin/bikes")
                          }
                          to="/dashboard/admin/bikes"
                          className={`text-sm font-medium flex gap-3 item-center p-2 hover:bg-accent text-primary dark:text-white`}
                        >
                          <MdOutlineElectricBike className="text-xl" />
                          <span className="">Bike Management</span>
                        </Link>
                      </li>
                      <li
                        className={`rounded-md ${
                          buttonName === "/dashboard/admin/rentals"
                            ? "bg-accent"
                            : ""
                        }`}
                      >
                        <Link
                          onClick={() =>
                            setButtonName("/dashboard/admin/rentals")
                          }
                          to="/dashboard/admin/rentals"
                          className={`text-sm font-medium flex gap-3 item-center p-2 hover:bg-accent text-primary dark:text-white`}
                        >
                          <TbCoinTaka className="text-xl" />
                          <span className="">Rental Management</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className={`rounded-md ${
                          buttonName === "/dashboard/user/bikes"
                            ? "bg-accent"
                            : ""
                        }`}
                      >
                        <Link
                          onClick={() => setButtonName("/dashboard/user/bikes")}
                          to="/dashboard/user/bikes"
                          className={`text-sm font-medium flex gap-3 item-center p-2 hover:bg-accent text-primary dark:text-white`}
                        >
                          <FaMotorcycle className="text-xl mr-1" />
                          <span className="">All Bikes</span>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={toggleDropdown}
                          className={`text-sm font-medium flex items-center justify-between p-2 hover:bg-accent text-primary dark:text-white`}
                        >
                          <div className="flex gap-3 item-center items-center">
                            <TbCoinTaka className="text-xl" />
                            <span className="">Rental Management</span>
                          </div>
                          <FaChevronDown
                            className={`text-sm transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </li>
                      {isOpen && (
                        <>
                          <li
                            className={`rounded-md ${
                              buttonName === "/dashboard/user/rentals/unpaid"
                                ? "bg-accent"
                                : ""
                            }`}
                          >
                            <Link
                              onClick={() =>
                                setButtonName("/dashboard/user/rentals/unpaid")
                              }
                              to="/dashboard/user/rentals/unpaid"
                              className={`text-sm font-medium flex gap-3 item-center p-2 hover:bg-accent text-primary dark:text-white`}
                            >
                              <PiHandCoinsDuotone className="text-xl" />
                              <span className="">Unpaid Rentals</span>
                            </Link>
                          </li>
                          <li
                            className={`rounded-md ${
                              buttonName === "/dashboard/user/rentals/paid"
                                ? "bg-accent"
                                : ""
                            }`}
                          >
                            <Link
                              onClick={() =>
                                setButtonName("/dashboard/user/rentals/paid")
                              }
                              to="/dashboard/user/rentals/paid"
                              className={`text-sm font-medium flex gap-3 item-center p-2 hover:bg-accent text-primary dark:text-white`}
                            >
                              <PiCoins className="text-xl" />
                              <span className="">Paid Rentals</span>
                            </Link>
                          </li>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="divider divider-primary dark:divider-secondary"></div>
                <div className="space-y-2">
                  <li
                    className={`rounded-md ${
                      buttonName === "/dashboard" ? "bg-accent" : ""
                    }`}
                  >
                    <Link
                      onClick={() => setButtonName("/dashboard")}
                      to="/dashboard"
                      className={`text-sm font-medium flex gap-3 item-center p-2 hover:bg-accent text-primary dark:text-white`}
                    >
                      <CgProfile className="text-xl" />
                      <span className="">Profile</span>
                    </Link>
                  </li>
                  <li className="">
                    <a
                      onClick={handleLogOut}
                      className={`text-sm font-medium flex gap-3 item-center p-2 hover:bg-accent text-primary dark:text-white`}
                    >
                      <MdOutlineLogout className="text-lg" />{" "}
                      <span className="">Logout</span>
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
