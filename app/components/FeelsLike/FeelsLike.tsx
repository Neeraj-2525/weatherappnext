"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { thermometer } from '@/app/utils/icons'
import { kelvinToCelcius } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const FeelsLike = () => {
  const { forecast } = useGlobalContext();
  const { main } = forecast;
  const feelsLike = main?.feels_like;
  const minTemp = main?.temp_min;
  const maxTemp = main?.temp_max;
  // console.log(main)

  // const feels_like=20; const temp_min=20; const temp_max = 25;

  if (!forecast || !main) {
    return <Skeleton className="h-[12rem] w-full" />;
  }


  const feelsLikeText = (feelsLike: number, minTemp: number, maxTemp: number) => {
    const avgTemp = (minTemp + maxTemp) / 2;
    if (feelsLike < avgTemp - 2) {
      return "Feels significantly colder than the actual temperature."
    }
    else if (feelsLike > avgTemp - 2 && feelsLike <= avgTemp + 2) {
      return "Feels close to the actual temperature";
    }
    else if (feelsLike > avgTemp + 2) {
      return "Feels significantly warmer than the actual temperature";
    }
    else {
      return "Temperature feeling is typical for this range";
    }
  }

  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-1 md:col-span-1 xl:col-span-1'>
      <div className="top ">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Feels LIke
        </h2>

        <p className='pt-4 text-2xl'>
          {kelvinToCelcius(feelsLike)} °C
        </p>
      </div>

      <p className='text-sm text-ellipsis overflow-x-hidden'>
        {feelsLikeText(feelsLike, minTemp, maxTemp)}
      </p>
    </div>
  )
}

export default FeelsLike
