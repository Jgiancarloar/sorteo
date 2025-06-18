import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='p-5'>
            <div className='flex flex-col gap-5'>
                <Link to='/rifa'>
                    Rifa
                </Link>
                <Link to='raspaygana'>
                    Raspa y Gana
                </Link>
            </div>
        </div>
    )
}

export default Home