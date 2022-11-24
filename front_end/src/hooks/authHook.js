import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function authHook() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("authHook must be used inside a AuthContext Provider");
    };
    return authContext;
};