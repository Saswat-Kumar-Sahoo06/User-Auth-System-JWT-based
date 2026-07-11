import React from 'react'
import AuthImage from '../assets/authentication.svg'
import { SiAuthelia } from "react-icons/si";
import { FaLock } from "react-icons/fa";
import { PiSecurityCamera } from "react-icons/pi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Landing = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className='min-h-screen w-full flex flex-col justify-between'>
                <div className='flex gap-2 sm:gap-4  items-center ml-4 mt-4'>
                    <SiAuthelia className='text-3xl text-[#5831b8]' />
                    <div>
                        <span className='text-2xl md:text-4xl'>Secure</span><span className='text-xl md:text-3xl text-[#5831b8]'>Gate</span>
                    </div>
                </div>

                <div className='md:p-5 md:mb-5'>
                    <div className='mt-10 flex flex-col p-5'>
                        <h1 className='text-4xl ml-4 md:text-6xl md:pl-5'>Secure. Simple. Seamless.</h1>
                        <p className='ml-4 mt-1 text-gray-400 md:p-5 md:text-3xl'>Modern authentication for modern applications.</p>
                    </div>

                    <div className='flex flex-col md:flex-row md:gap-4 md:mt-6 md:justify-between 2xl:mt-9 2xl:mb-9'>

                        <div className='flex flex-col items-center justify-center gap-2 m-7 md:gap-5 2xl:gap-15'>
                            <div className='flex gap-3 items-center p-2 md:gap-7'>
                                <PiSecurityCamera className='text-5xl md:text-8xl text-[#5831b8]' />
                                <div className='flex flex-col gap-1 md:gap-3'>
                                    <p className='text-sm md:text-3xl lg:text-5xl'>Secure by default</p>
                                    <p className='text-xs text-gray-400 lg:text-xl'>Enterprise-grade security for your peace of mind</p>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center p-2 md:gap-7'>
                                <AiOutlineUsergroupAdd className='text-5xl md:text-8xl text-[#5831b8]' />
                                <div className='flex flex-col gap-1 md:gap-3'>
                                    <p className='text-sm md:text-3xl lg:text-5xl'>Easy to use</p>
                                    <p className='text-xs text-gray-400 lg:text-xl'>Simple and intuitive user experience for everyone</p>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center p-2 md:gap-7'>
                                <TbBuildingSkyscraper className='text-5xl md:text-8xl text-[#5831b8]' />
                                <div className='flex flex-col gap-1 md:gap-3'>
                                    <p className='text-sm md:text-3xl lg:text-5xl'>Built for developers</p>
                                    <p className='text-xs text-gray-400 lg:text-xl'>Powerful APIs and SDKs to accelerate your build</p>
                                </div>
                            </div>


                        </div>

                        <div className='flex justify-center mt-2 p-2'>
                            <img
                                src={AuthImage}
                                className='max-w-60 md:min-w-90 lg:min-w-130 2xl:min-w-160 pointer-events-none'
                            />
                        </div>
                    </div>
                    <hr className='button border-0 h-px bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent'></hr>
                </div>



                <div className='flex justify-center mt-8 mb-4'>
                    <button
                        className='p-2 bg-[#5831b8] rounded-xl md:text-2xl md:min-w-30 md:p-2 2xl:text-4xl 2xl:p-4 hover:cursor-pointer border-1'
                        onClick={() => {
                            setTimeout(() => {
                                navigate('/welcome')
                            }, 500)
                        }}
                    >Get Started</button>
                </div>

                <div className='text-center p-2 mb-0'>
                    <p className='text-gray-400 text-xs lg:text-xl 2xl:text-xl'>developed by Saswat @2026</p>
                </div>

            </div>
        </>
    )
}

export default Landing