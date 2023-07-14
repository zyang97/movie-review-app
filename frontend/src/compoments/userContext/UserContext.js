import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [loggedinUsername, setLoggedinUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loggedin, setLoggedin] = useState(false);

    return (
        <UserContext.Provider value={{loggedinUsername, setLoggedinUsername, userId, setUserId, loggedin, setLoggedin}}>
            {children}
        </UserContext.Provider>
    )
}