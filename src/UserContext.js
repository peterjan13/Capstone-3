import React from "react";

// 1. Initializing the context
const UserContext = React.createContext();

// 2. Exporting the provider from the context
export const UserProvider = UserContext.Provider;

// 3 Exporting the entire context
export default UserContext;
