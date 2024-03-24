"use client";

import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from 'react'

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();


export const GlobalContextProvider = ({children}) =>{

    // const [state, setState] = useState("hello");
    const [forecast, setForecast] = useState({});

    const fetchForecast = async (lat, lon) => {
        try {
          const res = await axios.get(`api/weather?lat=28.64&lon=77.21`);
    
          setForecast(res.data);
        //   console.log(res.data);
        } catch (error) {
          console.log("Error fetching forecast data: ", error.message);
        }
      };

    useEffect(()=>{
        fetchForecast();
    },[]);

    return (
        <GlobalContext.Provider value={{
            forecast,
        }}>
            <GlobalContextUpdate.Provider value="heyYo">
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () =>useContext(GlobalContext);
export const useGlobalContextUpdate = () =>useContext(GlobalContextUpdate);
