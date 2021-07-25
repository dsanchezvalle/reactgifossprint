//Dependencies
import {createContext, useState, useEffect} from 'react';
//Constants
import {URLS, API_KEY, RESULTS_LIMIT} from '../constants'

export const AppContext = createContext();

export default function AppProvider({children}){
    const [gifList, setGifList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    console.log(errorMessage)
    useEffect(()=>{
        if (gifList.length === 0){
          let getGifs = async()=>{
            try{
              let fetchedData = await fetch(`${URLS.searchEndPoint}?api_key=${API_KEY}&q=dog&limit=${RESULTS_LIMIT}&offset=0&rating=g&lang=en`);
              let response = await fetchedData.json();
              let itemList = response.data;
              console.log(itemList[0].images);
              setGifList(itemList);
              }catch(err){
                setErrorMessage("Whoops! We got an error while bringing your gifs. Try again.")
              }finally{
                //Clean up
              } 
          }
          getGifs();
        }
        
      }, [gifList]);

    return(
        <AppContext.Provider value={{gifList, errorMessage}}>
            {children}
        </AppContext.Provider>
    );
}
