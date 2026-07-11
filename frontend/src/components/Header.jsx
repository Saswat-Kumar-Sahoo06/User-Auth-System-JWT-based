import React from 'react'
import { SiAuthelia } from "react-icons/si";
import { NavLink } from 'react-router-dom';
import Login from '../pages/Login';

const Header = () => {
  return (
    <>
      <nav className='w-full flex justify-between p-5 items-center bg-gray-800/30'>
        <div className='flex gap-2 sm:gap-4  items-center mt-1'>
          <SiAuthelia className='text-2xl text-[#5831b8] md:text-4xl' />
          <div>
            <span className='text-xl md:text-4xl'>Secure</span><span className='text-md md:text-3xl text-[#5831b8]'>Gate</span>
          </div>
        </div>

        <ul className='text-xs md:text-xl md:gap-9 flex gap-2'>
            <li className='list-none'>
              <NavLink to='/welcome/login'>Login</NavLink>
            </li>
            <li className='list-none'>
              <NavLink to='/welcome/register'>Register</NavLink>
            </li>
            <li className='list-none'>
              <NavLink to='/'>Home</NavLink>
            </li>
        </ul>
      </nav>
      
    </>
  )
}

export default Header