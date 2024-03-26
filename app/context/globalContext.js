"use client";

import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from 'react'
import defaultStates from "../utils/defaultCountries";
import {debounce} from "lodash"


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();


export const GlobalContextProvider = ({children}) =>{

    // const [state, setState] = useState("hello");
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [fiveDayData, setFiveDayData] = useState({});
    const [latLonList, setLatLonList] = useState(defaultStates);
    const [uvData, setUvData] = useState({});
    const [searchInputValue, setSearchInputValue] = useState("");
    const [activeCityCoords, setActiveCityCoords] = useState([28.5744778, 77.1963144]);


    const fetchForecast = async (lat, lon) => {
        try {
          const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
    
          setForecast(res.data);
        //   console.log(res.data);
        } catch (error) {
          console.log("Error fetching forecast data: ", error.message);
        }
      };


    const fetchAirQual = async (lat, lon) => {
        try {
          const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
    
          setAirQuality(res.data);
        //   console.log(res.data);
        } catch (error) {
          console.log("Error fetching air quality data: ", error.message);
        }
      };

    const fetchFiveDayData = async (lat, lon) => {
      try {
        const res = await axios.get(`/api/fiveDayForecast?lat=${lat}&lon=${lon}`);
  

        setFiveDayData(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log("Error fetching daily data: ", error.message);
      }
    }
    

    const fetchLatLonList = async (search) =>{
      try {
        const res = await axios.get(`api/latLonConvert?search=${search}`);
        
        setLatLonList(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log("Error fetching lat and lon: ", error.message);
      }
    }

    const fetchUvData = async (lat, lon) =>{
      try {
        const res = await axios.get(`api/uvIndex?lat=${lat}&lon=${lon}`);
  

        setUvData(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log("Error fetching uv data: ", error.message);
      }
    }

    const handleInput = (e) => {
      setSearchInputValue(e.target.value);
  
      if (e.target.value === "") {
        setLatLonList(defaultStates);
      }
    };
    

    // debounce feature
    useEffect(()=>{
      const debouncedFetch = debounce((search)=>{
        fetchLatLonList(search);
      }, 500);

      if(searchInputValue){
        debouncedFetch(searchInputValue);
      }
      
      //cleanup
      return ()=> debouncedFetch.cancel();
    },[searchInputValue])


    useEffect(()=>{
        fetchForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchAirQual(activeCityCoords[0], activeCityCoords[1]);
        fetchFiveDayData(activeCityCoords[0], activeCityCoords[1]);
        fetchUvData(activeCityCoords[0], activeCityCoords[1]);
        fetchLatLonList(searchInputValue);
      },[activeCityCoords]);

      // console.log(fiveDayData);

      
    return (
        <GlobalContext.Provider value={{
            forecast,
            airQuality,
            fiveDayData,
            latLonList,
            uvData,
            searchInputValue,
            handleInput,
            setActiveCityCoords,
        }}>
            <GlobalContextUpdate.Provider value={{setActiveCityCoords, handleInput,}}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () =>useContext(GlobalContext);
export const useGlobalContextUpdate = () =>useContext(GlobalContextUpdate);
