//Dependencies
import {createContext, useState, useEffect} from 'react';
//Constants
import {URLS, API_KEY, RESULTS_LIMIT} from '../constants'

export const AppContext = createContext();

export default function AppProvider({children}){
    const [gifList, setGifList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [queryInput, setQueryInput] = useState('');

    useEffect(()=>{
      if (gifList.length === 0 && queryInput.length>0){
          let getGifs = async()=>{
            try{
              let fetchedData = await fetch(`${URLS.searchEndPoint}?api_key=${API_KEY}&q=${queryInput}&limit=${RESULTS_LIMIT}&offset=0&rating=g&lang=en`);
              let response = await fetchedData.json();
              let itemList = response.data;
              setGifList(itemList);
              }catch(err){
                setErrorMessage("Whoops! We got an error while bringing your gifs. Try again.")
              }finally{
                //Clean up
              }
            }   
          getGifs();
        }
        
      }, [queryInput, gifList]);

    return(
        <AppContext.Provider value={{gifList, setGifList, errorMessage, queryInput, setQueryInput}}>
            {children}
        </AppContext.Provider>
    );
}
