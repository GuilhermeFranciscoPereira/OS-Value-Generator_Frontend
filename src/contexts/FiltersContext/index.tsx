import { createContext, useContext, useState } from "react";

type osProps = {
    id: number;
    employees: string;
    clientName: string;
    fullOsValue: number;
}

type FiltersContextProps = {
    FiltersHowActive: boolean;
    FiltersContent: Array<osProps>;
    toSetFiltersContent: (content: Array<osProps>) => void;
    toSetFiltersHowActive: (state: boolean) => void;
}

const FiltersContext = createContext<FiltersContextProps>({} as FiltersContextProps);

const FiltersProvider = ({children}: {children: React.ReactNode}): React.ReactNode => {
    const [FiltersHowActive, setFiltersHowActive] = useState<boolean>(false);
    const [FiltersContent, setFiltersContent] = useState<Array<osProps>>([]);

    function toSetFiltersHowActive(state: boolean) {
        setFiltersHowActive(state);
    }

    function toSetFiltersContent(content: Array<osProps>) {
        setFiltersContent(content);
        setFiltersHowActive(true);
    }
    
    return (
        <FiltersContext.Provider value={{FiltersHowActive, FiltersContent, toSetFiltersContent, toSetFiltersHowActive}}>
            {children}
        </FiltersContext.Provider>
    )
}

function useFiltersContext() {
    return useContext(FiltersContext);
}

export {FiltersProvider, useFiltersContext};