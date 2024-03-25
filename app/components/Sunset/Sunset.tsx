"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { sunset } from '@/app/utils/icons';
import { unixToTime } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const Sunset = () => {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
        return <Skeleton className='w-full h-[12rem]' />
    }

    // console.log(forecast);

    const timezone = forecast?.timezone;
    const sunsetTime = unixToTime(forecast?.sys?.sunset, timezone);
    const sunriseTime = unixToTime(forecast?.sys?.sunrise, timezone);

    // console.log(sunsetTime, sunriseTime)



    return (
        <div className='sunset pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-1 md:col-span-1 xl:col-span-1'>

            <div className="top">
                <h2 className="flex items-center gap-2 font-medium">
                    {sunset}Sunset
                </h2>
                <p className='pt-4 text-2xl'>
                    {sunsetTime}
                </p>
            </div>
            <p>Sunrise: {sunriseTime}</p>
        </div>
    )
}

export default Sunset
