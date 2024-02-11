import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    // TODO: store in local 
    currentUser: null, // FOR SOME REASON THIS IS ALWAYS GOING TO BE UNDEFINED AHHHHHHHH
    permissionLevel: null,
    accessLevel: 0

}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{ permissionLevel: state.permissionLevel, currentUser: state.currentUser, accessLevel: state.accessLevel, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}