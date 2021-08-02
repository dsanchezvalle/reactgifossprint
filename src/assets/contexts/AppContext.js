//Dependencies
import {createContext, useState, useEffect} from 'react';
//Constants
import {URLS, API_KEY, RESULTS_LIMIT} from '../constants'

//Context creation
export const AppContext = createContext();

export default function AppProvider({children}){
    //States and Variables
    const [gifList, setGifList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [queryInput, setQueryInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //Effect to fetch GIFs
    useEffect(()=>{
      if (gifList.length === 0 && queryInput.length>0){
          let getGifs = async()=>{
            try{
              setIsLoading(true);
              let fetchedData = await fetch(`${URLS.searchEndPoint}?api_key=${API_KEY}&q=${queryInput}&limit=${RESULTS_LIMIT}&offset=0&rating=g&lang=en`);
              let response = await fetchedData.json();
              setIsLoading(false);
              let itemList = response.data;
              if(itemList.length>0){
                setGifList(itemList);
              } else if(itemList.length === 0){
                setErrorMessage('We did not find any coincidence. Try again :)');
              }
            }catch(err){
                console.warn(err.message)
                setErrorMessage("Whoops! We got an error while bringing your gifs. Try again.")
            }
          }   
          getGifs();
        }
        
      }, [queryInput, gifList]);

    return(
        <AppContext.Provider value={{
          gifList, 
          setGifList, 
          errorMessage, 
          setErrorMessage, 
          queryInput, 
          setQueryInput,
          isLoading
        }}
        >
            {children}
        </AppContext.Provider>
    );
}
