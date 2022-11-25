import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

export default function mainHook() {
    const mainContext = useContext(MainContext);
    if (!mainContext) {
        throw new Error("mainHook must be used inside a MainContext Provider");
    };
    return mainContext;
};