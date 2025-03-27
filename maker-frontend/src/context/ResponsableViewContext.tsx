import {createContext, ReactNode, useContext, useState} from 'react';
import {VueResponsable} from "../interface/Interface.ts";

interface ViewResponsableType {
    vue: VueResponsable;
    setVue: (vue: VueResponsable) => void;
}

const ViewResponsableContext = createContext<ViewResponsableType | undefined>(undefined);

export const ViewResponsableProvider = ({children}: { children: ReactNode }) => {
    const [vue, setVue] = useState(VueResponsable.PERSONNEL);

    return (
        <ViewResponsableContext.Provider value={{vue, setVue}}>
            {children}
        </ViewResponsableContext.Provider>
    );
};

export const useViewResponsable = () => {
    const context = useContext(ViewResponsableContext);
    if (context === undefined) {
        throw new Error('useViewResponsable must be used within a ViewResponsableProvider');
    }
    return context;
}