"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { calender } from '@/app/utils/icons'
import { kelvinToCelcius, unixToWeekday } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const FiveDayForecast = () => {
    const { fiveDayData } = useGlobalContext();
    const { city, list } = fiveDayData;

    if (!fiveDayData || !city || !list) {
        return <Skeleton className="h-[12rem] w-full flex-1" />;
    }

    const processData = (
        dailyData: {
            main: { temp_min: number, temp_max: number };
            dt: number;
        }[]
    ) => {
        let minTemp = Number.MAX_VALUE;
        let maxTemp = Number.MIN_VALUE;

        dailyData.forEach((
            day: {
                main: { temp_min: number, temp_max: number };
                dt: number;
            }
        ) => {
            if (day.main.temp_min < minTemp) {
                minTemp = day.main.temp_min;
            }
            if (day.main.temp_max > maxTemp) {
                maxTemp = day.main.temp_max;
            }
        });

        return {
            day: unixToWeekday(dailyData[0].dt),
            minTemp: kelvinToCelcius(minTemp),
            maxTemp: kelvinToCelcius(maxTemp),
        }
    }

    const dailyForecast = [];
    for (let i = 0; i < 40; i += 8) {
        const dailyData = list.slice(i, i + 5);
        dailyForecast.push(processData(dailyData));
    }

    // console.log(dailyForecast)

    return (
        <div className='pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div>
                <h2 className="flex items-center gap-2 font-medium">
                    {calender} This Week Forcast for {city.name}
                </h2>

                <div className="forecast-list pt-4">
                    {dailyForecast.map((day, index) => {
                        return (
                            <div
                                key={index}
                                className='daily-forecast py-4 flex flex-col justify-evenly border-b-2'>
                                <p className='text-xl min-w-[3.5rem]'>{day.day}</p>
                                <p className='text-sm flex justify-between'>
                                    <span>(low)</span>
                                    <span>(high)</span>
                                </p>

                                <div className='flex-1 flex items-center justify-between gap-4'>
                                    <p className="font-medium">{day.minTemp.toFixed(0)}°C</p>
                                    <div className="temperature-progress flex-1 w-full h-2 rounded-lg"></div>
                                    <p className="font-medium">{day.maxTemp.toFixed(0)}°C</p>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default FiveDayForecast
