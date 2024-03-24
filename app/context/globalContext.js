"use client";

import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from 'react'

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();


export const GlobalContextProvider = ({children}) =>{

    // const [state, setState] = useState("hello");
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});


    const fetchForecast = async (lat, lon) => {
        try {
          const res = await axios.get(`api/weather`);
    
          setForecast(res.data);
        //   console.log(res.data);
        } catch (error) {
          console.log("Error fetching forecast data: ", error.message);
        }
      };


    const fetchAirQual = async () => {
        try {
          const res = await axios.get(`api/pollution`);
    
          setAirQuality(res.data);
        //   console.log(res.data);
        } catch (error) {
          console.log("Error fetching air quality data: ", error.message);
        }
      };

    useEffect(()=>{
        fetchForecast();
        fetchAirQual();
    },[]);

    return (
        <GlobalContext.Provider value={{
            forecast,
            airQuality,
        }}>
            <GlobalContextUpdate.Provider value="heyYo">
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () =>useContext(GlobalContext);
export const useGlobalContextUpdate = () =>useContext(GlobalContextUpdate);
