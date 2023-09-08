import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../UserContext.js";

export default function Logout() {
  const { unsetUser, setUser } = useContext(UserContext);

  useEffect(() => {
    // Clears the local storage token
    unsetUser();

    // Clears the token from the global user state
    setUser({
      id: null,
      isAdmin: null,
    });
  }, [unsetUser, setUser]);

  return <Navigate to="/login" />;
}
