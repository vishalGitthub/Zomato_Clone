import UserContext from "./UserContext.js";
import useUserData from "../customhooks/useUserData";

const UserContextProvider = ({ children }) => {
  const { user, userType, updateUser, updateUserType } = useUserData();

  return (
    <UserContext.Provider value={{ user, userType, updateUser, updateUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
