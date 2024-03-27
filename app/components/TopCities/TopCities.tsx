"use client"

import { useGlobalContextUpdate } from '@/app/context/globalContext';
import defaultStates from '@/app/utils/defaultCountries';
import React from 'react'

const TopCities = () => {
    const { setActiveCityCoords } = useGlobalContextUpdate();

    const getClickedCoords = (lat: number, lon: number) => {
        setActiveCityCoords([lat, lon]);
    }


    return (
        <div className="top-cities states flex flex-1 flex-col gap-3">
            <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
            </h2>
            <div className="flex flex-col gap-4">
                {defaultStates.slice(1, 6).map((state, index) => {
                    return (
                        <div key={index} onClick={() => { getClickedCoords(state.lat, state.lon) }} className="border rounded-lg cursor-pointer dark:hover:bg-accent dark:bg-dark-grey shadow-sm dark:shadow-none">
                            <p className="px-6 py-4">{state.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TopCities
