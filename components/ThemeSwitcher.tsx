"use client";
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';


const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[])

    if (!mounted) return null;
  return (
    <Tabs defaultValue={theme}>
        <TabsList className='border rounded-xl dark:border-neutral-800 dark:bg-[#030303]'>
            <TabsTrigger value='light' onClick={(e) => setTheme("light")}>
                <SunIcon className='h-[1.2rem] w-[1.2rem]'/>
            </TabsTrigger>
            <TabsTrigger value='dark' onClick={(e) => setTheme("dark")}>
                <MoonIcon className='h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0'/>
            </TabsTrigger>
        </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher