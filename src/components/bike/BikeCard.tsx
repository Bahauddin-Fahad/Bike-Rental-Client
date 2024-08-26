import { useNavigate } from "react-router-dom";
import { TBike } from "../../types";
// import { PhotoProvider, PhotoView } from "react-photo-view";
// import RatingInput from "./RatingInput";

type Props = {
  bike: TBike;
};
const BikeCard = ({ bike }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      data-aos="zoom-in"
      className="card bg-secondary dark:bg-primary shadow-md border dark:border-black dark:shadow-black rounded-2xl h-full"
    >
      <figure className="rounded-lg mb-3 m-7">
        {/* <PhotoProvider>
          <PhotoView src={product.image}> */}
        <img
          src={bike.image}
          alt="Post"
          className="w-full object-contain hover:scale-110 duration-500"
        />
        {/* </PhotoView>
        </PhotoProvider> */}
      </figure>
      <div className="card-body px-5">
        <h2 className="card-title">{bike?.name}</h2>

        <p>Brand: {bike?.brand}</p>
        <div className="card-actions justify-end items-end mt-5">
          <button
            onClick={() => navigate(`/bikes/${bike._id}`)}
            className="btn bg-[#27ae60] text-white w-full font-bold hover:scale-105 duration-500 font-vietnam-bold hover:bg-[#27ae60] border-0"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
