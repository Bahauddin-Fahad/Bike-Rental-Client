/* eslint-disable @typescript-eslint/no-explicit-any */

import toast from "react-hot-toast";
import { useDeleteUserMutation } from "../../redux/features/users/userApi";
import Loading from "../ui/Loading";

const DeleteUserModal = ({ userToDelete, setUserToDelete }: any) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDeleteUser = async (id: string) => {
    const options = {
      id,
      data: { isDeleted: true },
    };
    await toast.promise(deleteUser(options).unwrap(), {
      loading: "Deleting User...",
      success: (res) => {
        if (res.success) {
          console.log(res);

          return "User deleted successfully";
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to delete the user",
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <input type="checkbox" id="delete-user-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-primary">{`Are you sure You Want to Delete ${userToDelete?.name}?`}</h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteUser(userToDelete._id)}
              className="btn btn-sm btn-outline btn-error"
            >
              Confirm
            </button>
            <label
              onClick={() => setUserToDelete(null)}
              htmlFor="delete-user-modal"
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

export default DeleteUserModal;
