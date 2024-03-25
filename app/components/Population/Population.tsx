"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { people } from '@/app/utils/icons';
import { formatNum } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const Population = () => {
  const { fiveDayData } = useGlobalContext();

  const { city, list } = fiveDayData;
  // const population = city.population;

  if (!fiveDayData || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-1 md:col-span-1 xl:col-span-1'>
      <div className="top ">
        <h2 className="flex items-center gap-2 font-medium">
          {people} Population
        </h2>

        <p className='pt-4 text-2xl'>
          {formatNum(city.population)}
        </p>
      </div>

      <p className='text-sm text-ellipsis overflow-x-hidden '>Latest UN population data for {city.name}</p>
    </div>
  )
}

export default Population
