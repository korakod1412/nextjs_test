import React from 'react'
import TestForm from './testfromhook'
import SelectForm from './selectform2'
import Modalfrom from './modalfrom'
import { Modal } from 'antd'


const Pageall = () => {
    return (
        <div className='flex flex-col gap-4'>
            <Modalfrom />
            <SelectForm />
        </div>
    )
}

export default Pageall