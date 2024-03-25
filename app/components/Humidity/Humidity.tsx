"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { droplets, thermometer } from '@/app/utils/icons'
import { kelvinToCelcius } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Humidity = () => {
  const { forecast } = useGlobalContext();
  const { main } = forecast;
  const humidity = main?.humidity;
//   console.log(main)

  // const feels_like=20; const temp_min=20; const temp_max = 25;

  if (!forecast || !main) {
    return <Skeleton className="h-[12rem] w-full" />;
  }


  const getHumidityText = (humidNum: number) => {
    if(humidNum < 30 ){
        return "Dry: May cause skin irritation."
    } else if(humidNum >= 30 && humidNum < 50){
        return "Comfortable: Ideal for health and comfort."
    }
     else if(humidNum >= 50 && humidNum < 70 ){
        return "Moderate: Sticky: May increase allergens."
    
    } else if(humidNum >= 70 ){
        return "High: Uncomfortable, mold growth risk."
    } else{
        return "Humidity data not available."
    }
}

  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-1 md:col-span-1 xl:col-span-1'>
      <div className="top ">
        <h2 className="flex items-center gap-2 font-medium">
          {droplets} Humidity
        </h2>

        <p className='pt-4 text-2xl'>
            {humidity}
        </p>
      </div>

      <p className='text-sm text-ellipsis overflow-x-hidden'>
        {getHumidityText(humidity)}
      </p>
    </div>
  )
}

export default Humidity
