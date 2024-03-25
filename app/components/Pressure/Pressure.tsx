"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import {  gauge } from '@/app/utils/icons'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Pressure = () => {
  const { forecast } = useGlobalContext();
  const { main } = forecast;
  const pressure = main?.pressure;


  if (!forecast || !pressure) {
    return <Skeleton className="h-[12rem] w-full" />;
  }


  const getPressureText = (pressure: number) => {
    if(pressure < 1000 ){
        return "Very low pressure."
    } else if(pressure >= 1000 && pressure < 1015){
        return "Low pressure: Expected weather changes"
    }
     else if(pressure >= 1015 && pressure < 1025 ){
        return "Normal pressure: Expect weather changes"
    
    } else if(pressure >= 1025 && pressure<1040 ){
        return "High pressure: Expect weaher changes"
    } else if(pressure >= 1040 ){
        return "Very high pressure: Expect weather changes"
    } else{
        return "Unavailable: Pressure data not available."
    }
}

  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-1 md:col-span-1 xl:col-span-1'>
      <div className="top ">
        <h2 className="flex items-center gap-2 font-medium">
          {gauge} Pressure
        </h2>

        <p className='pt-4 text-2xl'>
            {/* converted hPa to atm */}
            {Math.round(pressure/1013.25)} atm  
            
        </p>
      </div>

      <p className='text-sm text-ellipsis overflow-x-hidden'>
        {getPressureText(pressure)}
      </p>
    </div>
  )
}

export default Pressure
