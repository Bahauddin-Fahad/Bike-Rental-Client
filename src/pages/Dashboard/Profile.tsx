import useUserDetails from "../../customHooks/useUserDetails";
import ViewProfile from "../../components/profile/ViewProfile";
import UpdateProfile from "../../components/profile/UpdateProfile";

const Profile = () => {
  const { loadedUser } = useUserDetails();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 p-10">
      <ViewProfile loadedUser={loadedUser} />
      <UpdateProfile loadedUser={loadedUser} />
    </div>
  );
};

export default Profile;
