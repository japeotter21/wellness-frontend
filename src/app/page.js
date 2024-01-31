"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function Home() {
    const [caffeine, setCaffeine] = useState(0)
    const [water, setWater] = useState('')
    const [sleep, setSleep] = useState(0)
    const [wakeUp, setWakeUp] = useState('')
    const [quality, setQuality] = useState(0)
    const [drinks, setDrinks] = useState(0)
    const [drankAt, setDrankAt] = useState('')
    const [mood, setMood] = useState("S")
    const [focus, setFocus] = useState(1)
    const [screenTime, setScreenTime] = useState(0)
    const cModal = typeof document !== 'undefined' && document.getElementById("caffeinemodal")
    const sModal = typeof document !== 'undefined' && document.getElementById("sleepmodal")
    const wModal = typeof document !== 'undefined' && document.getElementById("watermodal")
    const aModal = typeof document !== 'undefined' && document.getElementById("alcoholmodal")
    const mModal = typeof document !== 'undefined' && document.getElementById("moodmodal")
    const fModal = typeof document !== 'undefined' && document.getElementById("focusmodal")
    const tModal = typeof document !== 'undefined' && document.getElementById("screentimemodal")

    const moodEnum = [
        {
            value: "S",
            name: "Sleepy"
        },
        {
            value: "T",
            name: "Tired"
        },
        {
            value: "W",
            name: "Awake"
        },
        {
            value: "A",
            name: "Alert"
        }
    ]

    function PostCaf() {
        const postObj = {
            mg: parseInt(caffeine)
        }
        axios.post('http://127.0.0.1:8000/caffeine/', postObj)
        .then(res => {
            console.log(res.data)
            setCaffeine(0)
            CloseModal(cModal)
        })
    }

    function PostWater() {
        const postObj = {
            oz: parseInt(water)
        }
        axios.post('http://127.0.0.1:8000/water/', postObj)
        .then(res => {
            console.log(res.data)
            setWater(0)
            CloseModal(wModal)
        })
    }
    

    function PostAlcohol() {
        const postObj = {
            drinks: parseInt(drinks),
            drankAt: new Date(drankAt).toISOString()
        }
        axios.post('http://127.0.0.1:8000/alcohol/', postObj)
        .then(res => {
            console.log(res.data)
            setDrinks(0)
            setDrankAt('')
            CloseModal(aModal)
        })
    }
    
    function PostMood() {
        const postObj = {
            mood: mood
        }
        axios.post('http://127.0.0.1:8000/mood/', postObj)
        .then(res => {
            console.log(res.data)
            setMood('')
            CloseModal(mModal)
        })
    }
        
    function PostFocus() {
        const postObj = {
            focus: parseInt(focus)
        }
        axios.post('http://127.0.0.1:8000/focus/', postObj)
        .then(res => {
            console.log(res.data)
            setFocus(1)
            CloseModal(fModal)
        })
    }
            
    function PostScreenTime() {
        const postObj = {
            hours: parseFloat(screenTime)
        }
        axios.post('http://127.0.0.1:8000/screentime/', postObj)
        .then(res => {
            console.log(res.data)
            setScreenTime(0)
            CloseModal(tModal)
        })
    }

    function PostSleep() {
        const postObj = {
            hours: parseFloat(sleep),
            quality: parseInt(quality),
            awake: new Date(wakeUp).toISOString()
        }
        axios.post('http://127.0.0.1:8000/sleep/', postObj)
        .then(res => {
            console.log(res.data)
            setSleep(0)
            setQuality(0)
            setWakeUp('')
            CloseModal(sModal)
        })
    }

    function CloseModal(obj) {
        obj.close()
        setCaffeine(0)
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-4 xl:p-24 pt-24 bg-gradient-radial from-slate-700 to-slate-500 text-white font-sans">
            <div className='grid grid-cols-2 xl:w-1/2 w-11/12'>
                <button className='flex flex-col items-center bg-gradient-radial from-orange-500 to-amber-400 rounded-tl-md px-6 py-12'
                    onClick={()=>sModal.showModal()}
                >
                    <p>Zzz.png</p>
                    <p className='font-light text-sm'>Sleep</p>
                </button>
                <button className='flex flex-col items-center bg-gradient-radial from-blue-500 to-blue-400 rounded-tr-md px-6 py-12'
                    onClick={()=>cModal.showModal()}
                >
                    <p>Coffee.png</p>
                    <p className='font-light text-sm'>Caffeine</p>
                </button>
                <button className='flex flex-col items-center bg-gradient-radial from-purple-500 to-purple-400 px-6 py-12'>
                    <p>Weights.png</p>
                    <p className='font-light text-sm'>Exercise</p>
                </button>
                <button className='flex flex-col items-center bg-gradient-radial from-green-500 to-emerald-400 px-6 py-12'
                    onClick={()=>mModal.showModal()}
                >
                    <p>Face.png</p>
                    <p className='font-light text-sm'>Mood</p>
                </button>
                <button className='flex flex-col items-center bg-gradient-radial from-sky-500 to-sky-400 px-6 py-12'
                    onClick={()=>wModal.showModal()}
                >
                    <p>glass.png</p>
                    <p className='font-light text-sm'>Water</p>
                </button>
                <button className='flex flex-col items-center bg-gradient-radial from-pink-500 to-pink-400 px-6 py-12'
                    onClick={()=>fModal.showModal()}
                >
                    <p>Glasses.png</p>
                    <p className='font-light text-sm'>Focus</p>
                </button>
                <button className='flex flex-col items-center bg-gradient-radial from-red-500 to-red-400 rounded-bl-md px-6 py-12'
                    onClick={()=>aModal.showModal()}
                >
                    <p>Bottle.png</p>
                    <p className='font-light text-sm'>Alcohol</p>
                </button>
                <button className='flex flex-col items-center bg-gradient-radial from-gray-500 to-gray-400 rounded-br-md px-6 py-12'
                    onClick={()=>tModal.showModal()}
                >
                    <p>Phone.png</p>
                    <p className='font-light text-sm'>Screen Time</p>
                </button>
            </div>
            <div className='xl:w-1/2 w-11/12 text-center'>
                <Link href="/tracking">
                    <p className='rounded-full px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 shadow-md'>Stats</p>
                </Link>
            </div>
            <dialog id="caffeinemodal">
                <div className='p-4 flex flex-col gap-4'>
                    <h3 className='text-lg'>Caffeine Consumed:</h3>
                    <div>
                        <p className='text-sm text-neutral-500'>mg:</p>
                        <input type="number" className='border px-3 py-2 rounded-md' value={caffeine}
                            onChange={(e)=>setCaffeine(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <button onClick={()=>CloseModal(cModal)}>Close</button>
                        <button onClick={PostCaf}>Submit</button>
                    </div>
                </div>
            </dialog>
            <dialog id="watermodal">
                <div className='p-4 flex flex-col gap-4'>
                    <h3 className='text-lg'>Water Consumed:</h3>
                    <div>
                        <p className='text-sm text-neutral-500'>oz:</p>
                        <input type="number" className='border px-3 py-2 rounded-md' value={water}
                            onChange={(e)=>setWater(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <button onClick={()=>CloseModal(wModal)}>Close</button>
                        <button onClick={PostWater}>Submit</button>
                    </div>
                </div>
            </dialog>
            <dialog id="sleepmodal">
                <div className='p-4 flex flex-col gap-4'>
                    <h3 className='text-lg'>Sleep:</h3>
                    <div>
                        <p className='text-sm text-neutral-500'>Hours</p>
                        <input type="number" step={0.25} className='border px-3 py-2 rounded-md' value={sleep}
                            onChange={(e)=>setSleep(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='text-sm text-neutral-500'>Woke up at:</p>
                    <input type="time" className='border px-3 py-2 rounded-md w-full' value={wakeUp}
                        onChange={(e)=>setWakeUp(e.target.value)}
                    />
                    </div>
                    <div>
                        <p className='text-sm text-neutral-500'>Quality (1: worst - 5: best)</p>
                        <select type="number" className='border px-3 py-2 rounded-md w-full' value={quality}
                            onChange={(e)=>setQuality(e.target.value)}
                        >
                            {[1,2,3,4,5].map((item,id)=>
                                <option value={item} key={id}>{item}</option>
                            )}
                        </select>
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <button onClick={()=>CloseModal(sModal)}>Close</button>
                        <button onClick={PostSleep}>Submit</button>
                    </div>
                </div>
            </dialog>
            <dialog id="alcoholmodal">
                <div className='p-4 flex flex-col gap-4'>
                    <h3 className='text-lg'>Alcohol:</h3>
                    <div>
                        <p className='text-sm text-neutral-500'>Drinks</p>
                        <input type="number" className='border px-3 py-2 rounded-md' value={drinks}
                            onChange={(e)=>setDrinks(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='text-sm text-neutral-500'>Drank at:</p>
                    <input type="datetime-local" className='border px-3 py-2 rounded-md w-full' value={drankAt}
                        onChange={(e)=>setDrankAt(e.target.value)}
                    />
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <button onClick={()=>CloseModal(aModal)}>Close</button>
                        <button onClick={PostAlcohol}>Submit</button>
                    </div>
                </div>
            </dialog>
            <dialog id="moodmodal">
                <div className='p-4 flex flex-col gap-4'>
                    <h3 className='text-lg'>Mood:</h3>
                    <div>
                        <select type="number" className='border px-3 py-2 rounded-md w-full' value={mood}
                            onChange={(e)=>setMood(e.target.value)}
                        >
                            {moodEnum.map((item,id)=>
                                <option value={item.value} key={id}>{item.name}</option>
                            )}
                        </select>
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <button onClick={()=>CloseModal(mModal)}>Close</button>
                        <button onClick={PostMood}>Submit</button>
                    </div>
                </div>
            </dialog>
            <dialog id="focusmodal">
                <div className='p-4 flex flex-col gap-4'>
                    <h3 className='text-lg'>Focus:</h3>
                    <div>
                        <p className='text-sm text-neutral-500'>Quality (1: worst - 5: best)</p>
                        <select type="number" className='border px-3 py-2 rounded-md w-full' value={focus}
                            onChange={(e)=>setFocus(e.target.value)}
                        >
                            {[1,2,3,4,5].map((item,id)=>
                                <option value={item} key={id}>{item}</option>
                            )}
                        </select>
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <button onClick={()=>CloseModal(fModal)}>Close</button>
                        <button onClick={PostFocus}>Submit</button>
                    </div>
                </div>
            </dialog>
            <dialog id="screentimemodal">
                <div className='p-4 flex flex-col gap-4'>
                    <h3 className='text-lg'>Screen Time:</h3>
                    <div>
                        <p className='text-sm text-neutral-500'>Hours</p>
                        <input type="number" step={0.25} className='border px-3 py-2 rounded-md' value={screenTime}
                            onChange={(e)=>setScreenTime(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <button onClick={()=>CloseModal(tModal)}>Close</button>
                        <button onClick={PostScreenTime}>Submit</button>
                    </div>
                </div>
            </dialog>
        </main>
    )
}
