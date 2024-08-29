import { useState } from "react";
import Loading from "../../../components/ui/Loading";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../redux/features/users/userApi";
import { TLoadedUser } from "../../../types";
import toast from "react-hot-toast";
import DeleteUserModal from "../../../components/modals/DeleteUserModal";
type TUserState = TLoadedUser | null;

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState<TUserState>(null);
  const dataPerPage = 10;

  const queryObj = {
    isDeleted: false,
    page: currentPage,
    limit: dataPerPage,
  };

  const [updateUser] = useUpdateUserRoleMutation();
  const { data, isLoading, refetch } = useGetAllUsersQuery(queryObj);

  const users = data?.data?.result as TLoadedUser[];
  const meta = data?.data?.meta;
  const totalPagesArray = [...Array(meta?.totalPage).keys()];

  const handleCurrentPage = async (page: number) => {
    await setCurrentPage(page + 1);
    await refetch();
  };

  const handleMakeUser = async (id: string) => {
    const options = {
      id,
      data: { role: "user" },
    };

    await toast.promise(updateUser(options).unwrap(), {
      loading: "Updating user role...",
      success: (res) => {
        if (res.success) {
          console.log(res);

          return "User Role updated successfully";
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to update role",
    });
  };
  const handleMakeAdmin = async (id: string) => {
    const options = {
      id,
      data: { role: "admin" },
    };

    await toast.promise(updateUser(options).unwrap(), {
      loading: "Updating user role...",
      success: (res) => {
        if (res.success) {
          return "User role updated successfully";
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to update role",
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="text-white">
      <div
        className="h-[200px] flex flex-col justify-center items-center"
        data-aos="zoom-in"
      >
        <p className="text-4xl text-center font-bold my-3 space-x-5 uppercase">
          <span className="font-normal tracking-wide text-[#bdbdbd9e]">
            All
          </span>
          <span className="text-accent">Users</span>
        </p>
      </div>
      <div className="flex justify-between p-5">
        {/* <label
            htmlFor="product-modal"
            onClick={() => {
              setModalType("add");
              setProduct({});
            }}
            className="btn btn-accent font-bold"
          >
            Add product
          </label> */}
      </div>
      <div className="overflow-x-auto m-5 overflow-y-auto max-h-screen">
        <table className="table table-sm">
          {/* head */}
          <thead className="text-white text-lg">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user, index) => (
                <tr key={index} className="rounded-lg">
                  <th>{index + 1 + (currentPage - 1) * dataPerPage}</th>

                  <td className="font-semibold">
                    <img
                      src={
                        user?.image ||
                        "https://i.ibb.co/pvmWXsv/male-placeholder-image.jpg"
                      }
                      alt="user"
                      className="size-10 rounded-md"
                    />
                  </td>
                  <td className="font-semibold">{user?.name}</td>
                  <td className="font-semibold">{user?.email}</td>
                  <td className="font-semibold">{user?.phone}</td>
                  <td className="font-semibold">{user?.role.toUpperCase()}</td>

                  <td className="font-semibold">
                    <div className="flex gap-2 items-center">
                      {user?.role != "admin" ? (
                        <label
                          onClick={() => {
                            handleMakeAdmin(user._id);
                          }}
                          className="btn btn-sm btn-accent cursor-pointer w-[125px]"
                        >
                          Make Admin
                        </label>
                      ) : (
                        <label
                          onClick={() => {
                            handleMakeUser(user._id);
                          }}
                          className="btn btn-sm btn-warning cursor-pointer w-[125px]"
                        >
                          Remove Admin
                        </label>
                      )}

                      <label
                        htmlFor="delete-user-modal"
                        onClick={() => {
                          setUserToDelete(user);
                        }}
                        className="btn btn-sm btn-error cursor-pointer"
                      >
                        Delete
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="space-x-3 mt-4 flex justify-center">
        {totalPagesArray?.length > 1 &&
          totalPagesArray.map((page, index) => (
            <button
              key={index}
              onClick={() => handleCurrentPage(page)}
              className={`btn btn-md font-bold text-lg ${
                page + 1 === currentPage && "btn-accent"
              }`}
            >
              {page + 1}
            </button>
          ))}
      </div>
      {/* {(modalType === "add" ||
      (modalType === "edit" &&
        product &&
        Object.keys(product)?.length > 0)) && (
      <ProductModal
        product={product}
        setProduct={setProduct}
        setModalType={setModalType}
      />
    )} */}

      {userToDelete && (
        <DeleteUserModal
          userToDelete={userToDelete}
          setUserToDelete={setUserToDelete}
        />
      )}
    </div>
  );
};

export default UserList;
