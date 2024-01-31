"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Datatable from '../components/Datatable'

export default function Home() {
    const [allData, setAllData] = useState([])

    useEffect(()=>{
        axios.all(['http://127.0.0.1:8000/sleep','http://127.0.0.1:8000/caffeine','http://127.0.0.1:8000/water','http://127.0.0.1:8000/alcohol','http://127.0.0.1:8000/mood','http://127.0.0.1:8000/focus','http://127.0.0.1:8000/screentime'].map(url=>axios.get(url)))
        .then(axios.spread((slp, caf, wat, alc, mood, focus, screen)=>{
            const slpField = slp.data
            const cafField = caf.data
            const watField = wat.data
            const alcField = alc.data
            const mField = mood.data
            const fField = focus.data
            const stField = screen.data
            setAllData([
                slpField,
                cafField,
                watField,
                alcField,
                mField, 
                fField,
                stField
            ])
        }))
    },[])

    return (
        <main className="flex min-h-screen flex-col items-center gap-4 xl:p-24 pt-12 bg-gradient-radial from-slate-700 to-slate-500 text-white font-sans">
            <div className='w-11/12 break-words py-8'>
                {allData.map((dataset,id)=>{
                    let columns = []
                    dataset[0] ? columns = Object.keys(dataset[0]) : columns = []
                    return (
                        <Datatable data={dataset} columns={columns} />
                    )
                })}                    
            </div>
            <div className='xl:w-1/2 w-11/12 text-center'>
            <   Link href="/">
                    <p className='rounded-full px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 shadow-md'>Back to Home</p>
                </Link>
            </div>
        </main>
    )
}
