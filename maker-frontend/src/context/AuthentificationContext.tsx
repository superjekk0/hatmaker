import {createContext, useState, ReactNode} from 'react';
import {isTokenExpired, isTokenPresent, removeToken} from "../interface/Connexion.ts";

interface AuthentificatedType {
    isAuthentificated: boolean;
    setIsAuthentificated: (isAuthenticated: boolean) => void;
}

export const AuthentificatedContext = createContext<AuthentificatedType>({
    isAuthentificated: isTokenPresent() && !isTokenExpired(),
    setIsAuthentificated: () => {
    }
});

export const AuthentificatedProvider = ({children}: { children: ReactNode }) => {
    const [isAuthentificated, setIsAuthentificated] = useState(isTokenPresent() && !isTokenExpired());

    if (isTokenPresent() && isTokenExpired()) {
        removeToken()
    }

    return (
        <AuthentificatedContext.Provider value={{isAuthentificated, setIsAuthentificated}}>
            {children}
        </AuthentificatedContext.Provider>
    );
};