"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { eye } from '@/app/utils/icons'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Visibility = () => {
  const { forecast } = useGlobalContext();
  const { visibility } = forecast;


  if (!forecast || !visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }


  const getVisibilityText = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000)
    if(visibilityInKm >2 ){
        return "Excellent: Clear and vast view."
    } else if(visibilityInKm > 5){
        return "Good: Easily navigable."
    }
     else if(visibilityInKm > 2 ){
        return "Moderate: Some limitations."
    
    } else if(visibilityInKm <= 2 ){
        return "Poor: Unclear."
    } else{
        return "Unavailable: Visibility data not available."
    }
}

  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-1 md:col-span-1 xl:col-span-1'>
      <div className="top ">
        <h2 className="flex items-center gap-2 font-medium">
          {eye} Visibility
        </h2>

        <p className='pt-4 text-2xl'>
            {Math.round(visibility / 1000)} km
        </p>
      </div>

      <p className='text-sm text-ellipsis overflow-x-hidden'>
        {getVisibilityText(visibility)}
      </p>
    </div>
  )
}

export default Visibility
