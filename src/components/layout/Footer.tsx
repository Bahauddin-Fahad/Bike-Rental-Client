import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="footer p-4 sm:p-8 md:px-16 bg-primary text-white text-xs sm:text-base grid grid-cols-12">
      <div className="my-auto col-span-12 sm:col-span-3">
        <Link to={"/"} className="text-2xl space-x-2">
          <span className="text-[#27ae60]">RideOn</span>
          <span>Rentals</span>
        </Link>
        <p className="text-center sm:text-start">
          An ultimate destination for high-quality bike rentals, catering to
          riders of all levels.
        </p>
      </div>
      <div className="mx-auto col-span-6 sm:col-span-3">
        <span className="footer-title">Company</span>
        <Link to="/about" className="link link-hover">
          About Us
        </Link>
        <Link to="/about" className="link link-hover">
          Contact Us
        </Link>
      </div>
      <div className="mx-auto col-span-6 sm:col-span-3">
        <span className="footer-title">Legal</span>
        <Link to="/" className="link link-hover">
          Terms Of Use
        </Link>

        <Link to="/" className="link link-hover">
          Privacy Policy
        </Link>
        <Link to="/" className="link link-hover">
          Cookie Policy
        </Link>
      </div>

      <div className="w-full col-span-12 sm:col-span-3 flex flex-col items-center sm:items-start">
        <span className="footer-title">Follow US</span>
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            <FaFacebook className="text-2xl text-[#0165E1] hover:scale-125 duration-300" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            <FaTwitter className="text-2xl text-[#1DA1F2] hover:scale-125 duration-300" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            <BsInstagram className="text-2xl text-[#C13584] hover:scale-125 duration-300" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            <FaYoutube className="text-3xl text-[#c4302b] hover:scale-125 duration-300" />
          </a>
        </div>

        <p className="text-base text-body-color dark:text-dark-6">
          &copy; RideOn Rentals
        </p>
      </div>
    </footer>
  );
};

export default Footer;
