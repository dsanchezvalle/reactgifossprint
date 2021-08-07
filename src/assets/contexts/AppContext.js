//Dependencies
import {createContext, useState} from 'react';

//Context creation
export const AppContext = createContext();

export default function AppProvider({children}){
    //States and Variables
    const [gifList, setGifList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [queryInput, setQueryInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resultsLimit, setResultsLimit] = useState('12');

    return(
        <AppContext.Provider value={{
          gifList, 
          setGifList, 
          errorMessage, 
          setErrorMessage, 
          queryInput, 
          setQueryInput,
          isLoading,
          setIsLoading,
          resultsLimit, 
          setResultsLimit
        }}
        >
            {children}
        </AppContext.Provider>
    );
}
