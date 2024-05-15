import React from 'react'
import TestForm from './testfromhook'
import SelectForm from './selectform2'


const Pageall = () => {
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl'>
            </h1>
            <TestForm />
            <SelectForm />
        </div>
    )
}

export default Pageall