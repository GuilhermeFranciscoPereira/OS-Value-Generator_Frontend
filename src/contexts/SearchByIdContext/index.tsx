import { createContext, useContext, useState } from "react";

type ContentOsProps = {
    id: number;
    employees: string;
    clientName: string;
    fullOsValue: number;
    degreeOfRisk: number;
    materialsValue: number;
    fullKM: number;
    workedTime: number;
    employeesValue: number;
    dateAndHourOfCreationOS: string
}

type SearchByIdContextProps = {
    SearchByIdContent: Array<ContentOsProps>;
    toSetSearchByIdContent: (content: Array<ContentOsProps>) => void;
}

const SearchByIdContext = createContext<SearchByIdContextProps>({} as SearchByIdContextProps);

const SearchByIdProvider = ({children}: {children: React.ReactNode}): React.ReactNode => {
    const [SearchByIdContent, setSearchByIdContent] = useState<Array<ContentOsProps>>([]);

    function toSetSearchByIdContent(content: Array<ContentOsProps>) {
        setSearchByIdContent(content);
    }
    
    return (
        <SearchByIdContext.Provider value={{SearchByIdContent, toSetSearchByIdContent}}>
            {children}
        </SearchByIdContext.Provider>
    )
}

function useSearchByIdContext() {
    return useContext(SearchByIdContext);
}

export {SearchByIdProvider, useSearchByIdContext};