import React from 'react'
import loginSecure from '../assets/login_secure.svg'
import advancedProtection from '../assets/protection.svg'
import accountManagement from '../assets/account.svg'
import fileUpload from '../assets/fileUpload.svg'

const Welcome = () => {
  return (
    <>
      <div className='text-center p-3'>
        <div className='mb-5'>
          <h1 className='text-2xl md:text-5xl md:mt-9'><span className='text-[#5831b8]'>Secure</span> <span> Authentication</span><span className='text-[#5831b8]'> for</span> <span>Modern</span><span className='text-[#5831b8]'> Applications</span></h1>
          <p className='text-gray-400 text-xl md:mt-4'>Register, login, manage your profile, upload files securely, and protect user accounts with industry-standard security practices.</p>
        </div>

        <div className='mt-10 flex flex-col gap-8 justify-center items-center'>
          <div className='flex items-center p-2 gap-2 md:gap-20'>
            <img
              src={loginSecure}
              className='max-w-24 md:max-w-50 pointer-events-none'
            />
            <div className='flex flex-col gap-4'>
              <h1 className='text-xl md:text-4xl'>Secure Login</h1>
              <p className='text-gray-400 text-xs md:text-2xl'>Access your account safely with encrypted credentials and secure session management.</p>
            </div>
          </div>
          <div className='flex items-center p-2 gap-4 md:gap-20'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-xl md:text-4xl'>Advanced Protection</h1>
              <p className='text-gray-400 text-xs md:text-2xl'>JWT authentication, refresh token rotation, password hashing, and protected routes.</p>
            </div>
            <img
              src={advancedProtection}
              className='max-w-38 md:max-w-65 pointer-events-none'
            />
          </div>
          <div className='flex items-center p-2 gap-4 md:gap-20'>
            <img
              src={accountManagement}
              className='max-w-30 md:max-w-58 pointer-events-none'
            />
            <div className='flex flex-col gap-4'>
              <h1 className='text-xl md:text-4xl'>Account Management</h1>
              <p className='text-gray-400 text-xs md:text-2xl'>Update profile details, change passwords, and manage your account with ease.</p>
            </div>
          </div>
          <div className='flex items-center p-2 gap-4 md:gap-20'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-xl md:text-4xl'>Secure File Uploads</h1>
              <p className='text-gray-400 text-xs md:text-2xl'>Upload and manage profile images and files securely through cloud storage integration.</p>
            </div>
            <img
              src={fileUpload}
              className='max-w-35 md:max-w-60 pointer-events-none'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome