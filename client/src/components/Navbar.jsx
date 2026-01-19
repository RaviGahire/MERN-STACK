import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <>
            <nav className='bg-gray-800 text-white py-4  flex justify-between items-center px-10'>
                <h1>Navbar</h1>
                <ul className='flex gap-5'>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/about'}>About</NavLink></li>
                </ul>
                <div className="">
                    <Link className='' to={'/login'}>Login</Link>
                </div>
            </nav>



        </>
    )
}
