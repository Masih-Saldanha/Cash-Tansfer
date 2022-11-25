import { createContext, useState } from "react";

export const MainContext = createContext();

export function MainProvider({ children }) {
    const [balance, setBalance] = useState(0);
    const [history, setHistory] = useState([]);

    return (
        <MainContext.Provider value={{
            balance,
            setBalance,
            history,
            setHistory,
        }}>{children}</MainContext.Provider>
    );
}