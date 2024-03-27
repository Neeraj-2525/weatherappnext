"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow, thunderstorm } from '@/app/utils/icons';
import { kelvinToCelcius, unixToWeekday } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React, { useEffect } from 'react'


const Temperature = () => {
    const { forecast, fiveDayData } = useGlobalContext();
    const { city, list } = fiveDayData;
    const { main, timezone, name, weather } = forecast;

    const dailyData = list;
    // console.log(city, dailyData?.[0]);

    // console.log(timezone);

    if (!forecast || !weather || !fiveDayData)
        return (
        <Skeleton className='pt-6 pb-5 px-4 h-[25rem]'/>
        )

    const {main: dailyDataMain} = dailyData?.[0];
    const temp = kelvinToCelcius(main?.temp);
    const minTemp = kelvinToCelcius(main?.temp_min);
    const maxTemp = kelvinToCelcius(dailyDataMain?.temp_max);

    // console.log(main);


    //state
    const [localTime, setLocalTime] = React.useState<string>("");
    const [currentDay, setCurrentDay] = React.useState<string>("");

    const { main: weatherMain, description } = weather[0];

    const getIcon = () => {
        switch (weatherMain) {
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

    // live time update
    useEffect(()=>{
        // update time every second
        const interval = setInterval(()=>{
            const localMoment = moment().utcOffset(timezone/60);
            // set custom format 12 hour format
            const formatedTime = localMoment.format("hh:mm A");
            // day of the week
            const day = localMoment.format("dddd");

            setLocalTime(formatedTime);
            setCurrentDay(day);
        },1000)
    },[])

    return (
        <div className='temperature-wrapper pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <title>Weather: {description}</title>
            <p className="flex justify-between items-center">
                <span className="font-medium">{currentDay}</span>
                <span className="font-medium">{localTime}</span>
            </p>
            <p className='pt-2 font-bold flex gap-1 items-center'>
                <span>{name}</span>
                <span>{navigation}</span>
            </p>

            <p className='py-[3.6rem] text-8xl font-bold self-center'>{temp}°</p>
            <div>
                <div>
                    <span>{getIcon()}</span>
                    <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
                </div>
                <p className='flex items-center gap-2'>
                    <span>Low: <strong>{minTemp}</strong>°C</span>
                    <span>High: <strong>{maxTemp}</strong>°C</span>
                </p>
            </div>
        </div>
    )
}



export default Temperature

