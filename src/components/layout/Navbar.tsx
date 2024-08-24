import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
type TButtonName =
  | "all-products"
  | "manage-products"
  | "cart"
  | "about"
  | string;

const Navbar = () => {
  const params = useLocation().pathname;
  const [buttonName, setButtonName] = useState<TButtonName>(params.slice(1));

  useEffect(() => {
    setButtonName(params.slice(1));
  }, [params]);

  return (
    <div className="navbar bg-secondary  font-semibold h-24 shadow-lg shadow-black sticky top-0 z-20">
      <div className="navbar-start">
        <Link
          to={"/"}
          className="btn btn-ghost text-2xl text-white"
          onClick={() => setButtonName("")}
        >
          <span>Los Blancos</span>
          <span className="text-accent">Sports</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-5 text-lg text-white">
          <li
            className={`pb-2 ${
              buttonName === "all-products"
                ? "border-b-2 border-b-accent"
                : "hover:scale-110 duration-300"
            }`}
          >
            <Link
              to={"/all-products"}
              onClick={() => setButtonName("all-products")}
            >
              All Products
            </Link>
          </li>
          <li
            className={`pb-2 ${
              buttonName === "manage-products"
                ? "border-b-2 border-b-accent"
                : "hover:scale-110 duration-300"
            }`}
          >
            <Link
              to={"/manage-products"}
              onClick={() => setButtonName("manage-products")}
            >
              Manage Products
            </Link>
          </li>
          <li
            className={`pb-2 ${
              buttonName === "cart"
                ? "border-b-2 border-b-accent"
                : "hover:scale-110 duration-300"
            }`}
          >
            <Link to={"/cart"} onClick={() => setButtonName("cart")}>
              Cart
            </Link>
          </li>
          <li
            className={`pb-2 ${
              buttonName === "about"
                ? "border-b-2 border-b-accent"
                : "hover:scale-110 duration-300"
            }`}
          >
            <Link to={"/about"} onClick={() => setButtonName("about")}>
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <GiHamburgerMenu className="text-accent text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-52 p-2 shadow"
          >
            <li
              className={`py-1 rounded-md ${
                buttonName === "all-products" && "bg-accent"
              }`}
            >
              <Link
                to={"/all-products"}
                onClick={() => setButtonName("all-products")}
              >
                All Products
              </Link>
            </li>
            <li
              className={`py-1 rounded-md ${
                buttonName === "manage-products" && "bg-accent"
              }`}
            >
              <Link
                to={"/manage-products"}
                onClick={() => setButtonName("manage-products")}
              >
                Manage Products
              </Link>
            </li>
            <li
              className={`py-1 rounded-md ${
                buttonName === "cart" && "bg-accent"
              }`}
            >
              <Link to={"/cart"} onClick={() => setButtonName("cart")}>
                Cart
              </Link>
            </li>
            <li
              className={`py-1 rounded-md ${
                buttonName === "about" && "bg-accent"
              }`}
            >
              <Link to={"/about"} onClick={() => setButtonName("about")}>
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
