import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useGetAllUsersQuery } from "../redux/features/users/userApi";

const useUserDetails = () => {
  const user = useAppSelector(useCurrentUser);

  const { data, isLoading } = useGetAllUsersQuery({
    email: user?.email,
  });
  const loadedUser = data?.[0];
  if (!user) {
    return { loadedUser: null };
  }

  return { loadedUser, isLoading };
};

export default useUserDetails;
