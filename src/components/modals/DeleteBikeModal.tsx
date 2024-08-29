/* eslint-disable @typescript-eslint/no-explicit-any */

import toast from "react-hot-toast";
import { useDeleteBikeMutation } from "../../redux/features/bike/bikeApi";
import Loading from "../ui/Loading";

const DeleteBikeModal = ({ bikeToDelete, setBikeToDelete }: any) => {
  console.log(bikeToDelete);

  const [deleteBike, { isLoading }] = useDeleteBikeMutation();
  const handleDeleteBike = async (id: string) => {
    await toast.promise(deleteBike(id).unwrap(), {
      loading: "Deleting Bike...",
      success: (res) => {
        if (res.success) {
          console.log(res);

          return "Bike deleted successfully";
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to Delete Bike",
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-primary">{`Are you sure You Want to Delete ${bikeToDelete?.name}`}</h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteBike(bikeToDelete?._id)}
              className="btn btn-sm btn-outline btn-error"
            >
              Confirm
            </button>
            <label
              onClick={() => setBikeToDelete(null)}
              htmlFor="delete-modal"
              className="btn btn-sm"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBikeModal;
