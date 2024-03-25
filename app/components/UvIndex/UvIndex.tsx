"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { sun } from '@/app/utils/icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import { UvProgress } from '../UvProgress/UvProgress';

const UvIndex = () => {
    const {uvData} = useGlobalContext();
    if (!uvData || !uvData.daily) {
        return <Skeleton className='w-full h-[12rem]' />
    }

    const {daily} = uvData;
    const {uv_index_clear_sky_max, uv_index_max} = daily;

    const uvIndexMax = uv_index_max[0].toFixed(0);
    // console.log(uvIndexMax);
    const uvIndexCategory = (uvIndex: number) => {
        if(uvIndex <=2 ){
            return {
                text: "Low",
                description: "No protection needed.",
            }
        } else if(uvIndex <=5 ){
            return {
                text: "Moderate",
                description: "Stay in shade near midday.",
            }
        }
         else if(uvIndex <=7 ){
            return {
                text: "High",
                description: "Wear a hat and sunglasses.",
            }
        
        } else if(uvIndex <=10 ){
            return {
                text: "Very High",
                description: "Apply sunscreen SPF 50+ every 5 hours.",
            }
        } else{
            return {
                text: "Extreme",
                description: "Try to be inside the house."
            }
        }
    }

    const marginLeftPercentage = (uvIndexMax/14) * 100;
    
    
  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-1 md:col-span-1 xl:col-span-1'>

            <div className="top">
                <h2 className="flex items-center gap-2 font-medium">
                    {sun} UV Index
                </h2>
                <p className='pt-4 text-2xl'>
                    {uvIndexMax}
                <span className='text-sm'>
                    ({uvIndexCategory(uvIndexMax).text})
                </span>
                </p>
                <UvProgress 
                    max={14}
                    value={marginLeftPercentage}
                    className='progress'
                />
            </div>
            <p className='text-sm'>{uvIndexCategory(uvIndexMax).description}</p>
        </div>
  )
}

export default UvIndex
