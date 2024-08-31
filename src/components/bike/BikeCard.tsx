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
    <div className="card bg-secondary dark:bg-primary shadow-md border dark:border-black dark:shadow-black rounded-xl h-full w-10/12 xs:w-full mx-auto">
      <figure className="m-4">
        <img
          src={bike.image}
          alt="bike"
          className="md:h-48 w-auto object-contain hover:scale-110 duration-500 rounded-lg"
        />
      </figure>
      <div className="card-body px-4 py-2">
        <h2 className="card-title text-lg">{bike?.name}</h2>

        <p>Brand: {bike?.brand}</p>
        <div className="card-actions justify-end items-end my-2">
          <button
            onClick={() => navigate(`/bikes/${bike._id}`)}
            className="btn bg-accent text-white w-full font-bold hover:scale-105 duration-500 font-vietnam-bold hover:bg-accent border-0"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
