"use client";

import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from 'react'

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();


export const GlobalContextProvider = ({children}) =>{

    // const [state, setState] = useState("hello");
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [fiveDayData, setFiveDayData] = useState({});
    const [latLon, setLatLon] = useState([]);
    const [uvData, setUvData] = useState({});


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

    const fetchFiveDayData = async () => {
      try {
        const res = await axios.get(`/api/fiveDayForecast`);
  

        setFiveDayData(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log("Error fetching daily data: ", error.message);
      }
    }

    const fetchLatLon = async () =>{
      try {
        const res = await axios.get(`api/latLonConvert`);
  

        setLatLon(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log("Error fetching lat and lon: ", error.message);
      }
    }

    const fetchUvData = async () =>{
      try {
        const res = await axios.get(`api/uvIndex`);
  

        setUvData(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log("Error fetching lat and lon: ", error.message);
      }
    }

    useEffect(()=>{
        fetchForecast();
        fetchAirQual();
        fetchFiveDayData();
        fetchLatLon();
        fetchUvData();
      },[]);

      // console.log(fiveDayData);

      
    return (
        <GlobalContext.Provider value={{
            forecast,
            airQuality,
            fiveDayData,
            latLon,
            uvData,
        }}>
            <GlobalContextUpdate.Provider value="heyYo">
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () =>useContext(GlobalContext);
export const useGlobalContextUpdate = () =>useContext(GlobalContextUpdate);
