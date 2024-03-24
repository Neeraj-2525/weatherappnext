"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { clearSky, cloudy, drizzleIcon, rain, snow, thunderstorm } from '@/app/utils/icons';
import { kelvinToCelcius } from '@/app/utils/misc';
import React from 'react'

const Temperature = () => {
    const { forecast } = useGlobalContext();
    const { main, timezone, name, weather } = forecast;

    // console.log(kelvinToCelcius(main.temp));

    if (!forecast || !weather)
        return <div>Loading...</div>

    const temp = kelvinToCelcius(main?.temp);
    const minTemp = kelvinToCelcius(main?.minTemp);
    const maxTemp = kelvinToCelcius(main?.maxTemp);
    

    //state
    const [localTime, setLocalTime] = React.useState<string>("");
    const [currentDay, setCurrentDay] = React.useState<string>("");

    const {main: weatherMain, description} = weather[0];

    const getIcon = ()=>{
        switch(weatherMain){
            case "Drizzle":
                return drizzleIcon;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Clouds":
                return cloudy;
            case "Thunderstorm":
                return thunderstorm;
            default:
                return clearSky;
        }
    }

    return (
        <div className='pt-6 pb-5 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <p className="flex justify-between items-center">
                <span className="font-medium">{currentDay}</span>
                <span className="font-medium">{localTime}</span>
            </p>
        </div>
    )
}

export default Temperature
