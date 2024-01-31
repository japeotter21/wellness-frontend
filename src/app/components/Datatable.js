"use client"
import React, { useState, useEffect } from 'react'

export default function Datatable({data, columns}) {
    
    return (
        <div className='w-full my-4 bg-slate-500'>
            <table className='shadow-sm w-full'>
                <thead className='border-b-[1px] bg-slate-600'>
                    {columns.map((header,id)=>
                        <th key={id}
                         className='font-normal'
                        >{header}</th>
                    )}
                </thead>
                <tbody className='text-center divide-y'>
                    {data.map((row,id)=>
                        <tr>
                            {columns.map((header,id)=>
                                <td key={id}
                                    className='py-1'
                                >{(header === 'time' || header === 'drankAt') && row[header] !== null && row[header] !== undefined ? row[header].split('T')[0] : row[header]}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}