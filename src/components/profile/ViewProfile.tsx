import { TLoadedUser } from "../../types";
import { BsFillPersonFill, BsTelephoneFill } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";

type Tprops = {
  loadedUser: TLoadedUser;
};
const ViewProfile = ({ loadedUser }: Tprops) => {
  return (
    <div
      data-aos="fade-right"
      data-aos-duration="500"
      className="md:max-w-md w-full mx-auto"
    >
      <div className="card h-full border-2 w-full max-w-lg shadow-2xl bg-secondary dark:bg-primary mx-auto">
        <h2 className="text-2xl text-center underline mt-8 font-vietnam-bold">
          My Profile
        </h2>
        <div className="flex justify-center mt-8">
          <div className="flex justify-center items-center w-36 h-36 bg-accent rounded-full ring-white ring-2 shadow-xl">
            <img
              className="rounded-full w-32 h-32 object-cover"
              src={
                loadedUser?.image ||
                "https://i.ibb.co/pvmWXsv/male-placeholder-image.jpg"
              }
              alt=""
            />
          </div>
        </div>
        <div className="card-body flex flex-col justify-between">
          <div className="font-semibold w-full text-left">
            <p className="text-xl flex items-center gap-2 font-satoshi">
              <BsFillPersonFill className=" text-[#2AE277]" /> :
              <span className=""> {loadedUser?.name}</span>
            </p>
          </div>
          <div className="font-semibold w-full text-left">
            <p className="text-xl flex items-center gap-2 font-satoshi">
              <MdEmail className=" text-[#2AE277]" /> :
              <span className=""> {loadedUser?.email}</span>
            </p>
          </div>
          <div className="font-semibold w-full text-left">
            <p className="text-xl flex items-center gap-2 font-satoshi">
              <BsTelephoneFill className=" text-[#2AE277]" /> :{" "}
              <span className=""> {loadedUser?.phone}</span>
            </p>
          </div>
          <div className="font-semibold w-full text-left">
            <p className="text-xl flex items-center gap-2 font-satoshi">
              <MdLocationPin className=" text-[#2AE277]" /> :
              <span className=""> {loadedUser?.address}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
