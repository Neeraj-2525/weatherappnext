"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { commandIcon } from '@/app/utils/icons'
import { Command, CommandInput, CommandList } from '@/components/ui/command'
import { useGlobalContext, useGlobalContextUpdate } from '@/app/context/globalContext'




const SearchDialog = () => {
    const { latLonList, searchInputValue } = useGlobalContext();
    const { setActiveCityCoords, handleInput } = useGlobalContextUpdate();
    const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);
    const [dialogOpen, setDialogOpen] = React.useState(false)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setDialogOpen((dialogOpen) => !dialogOpen)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])



    const getClickedCoords = (lat: number, lon: number) => {
        setActiveCityCoords([lat, lon]);
    }


    return (
        <div className='search-btn flex items-center'>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
                <DialogTrigger asChild>
                    <Button variant="outline"
                        className='border inline-flex items-center justify-center text-sm font-medium hover:dark:bg[#131313] hover:bg-slate-100 ease-in-out duration-200'>
                        <p className="text-sm text-muted-foreground">Search Here...</p>
                        <div className="command dark:bg-[#262626] bg-slate-200 py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
                            {commandIcon}
                            <span className="text-[9px]">J</span>
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className='p-0'>
                    <Command className='rounded-lg border shadow-md'>
                        <CommandInput
                            value={searchInputValue}
                            onChangeCapture={handleInput}
                            placeholder="Type a command or search..."
                        />
                        <CommandList>
                            <ul className="px-3 pb-2 ">
                                <p className="p-2 text-sm text-muted-foreground">
                                    Suggestions
                                </p>
                                {latLonList?.length === 0 || (!latLonList && <p>No Results</p>)}

                                {latLonList &&
                                    latLonList.map((item: { name: string; country: string; state: string; lat: number; lon: number; }, index: number) => {
                                        const { country, state, name } = item;
                                        return (
                                            <li
                                                key={index}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                className={`py-3 px-2 text-sm rounded-sm cursor-default ${hoveredIndex === index ? 'bg-accent' : ''}`}
                                                onClick={() => {
                                                    getClickedCoords(item.lat, item.lon);
                                                    setDialogOpen(!dialogOpen);
                                                }}
                                            >
                                                <p className="text">
                                                    {name}, {state && (state + ", ")} {country}
                                                </p>
                                            </li>
                                        )
                                    })}
                            </ul>
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SearchDialog
