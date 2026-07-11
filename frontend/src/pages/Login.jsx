import React, { useContext, useState } from 'react'
import axios from 'axios'
import { userContext } from '../contexts/userContext';
import { SiGnuprivacyguard } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import loginSecure from '../assets/login_secure.svg'


const Login = () => {
  const navigate = useNavigate()
  const user = useContext(userContext)

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  })


  const [checkPassword, setCheckPassword] = useState(true)
  const [checkSubmit, setCheckSubmit] = useState(true)

  const [checkUser, setCheckUser] = useState(true)

  const handleChange = (e) => {

    const { name, value, type, files } = e.target

    setUserInfo((prev) => ({
      ...prev,
      [name]: value
    }))

    if (name === 'password') {
      setCheckPassword(value.length >= 8)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (checkPassword === false) {
        setCheckSubmit(false)
        return
      }
      setCheckSubmit(true)

      const response = await axios.post('http://localhost:8000/api/v1/user/login', userInfo, {
        withCredentials: true
      })

      if (response.data.success === true) {
        setCheckUser(true)
        user.setExtraDetails((prev) => ({
          ...prev,
          lastLogin: [...prev.lastLogin, new Date().toISOString()],
          loginCount: prev.loginCount + 1
        }));
        user.setUserDetails(response.data.data)
        setTimeout(() => {
          navigate('/welcome/dashboard')
        }, 500)
      }

    } catch (error) {
      setCheckUser(false)
      console.log(error.response?.data?.message || 'something went wrong');

    }
  }

  return (
    <div className='min-h-[70%] w-full p-2 flex flex-col'>

      <div className='flex flex-col gap-2 md:p-8  '>
        <SiGnuprivacyguard className='text-[#5831b8] font-bold text-xl md:text-5xl' />
        <h1 className='text-3xl md:text-7xl'>Welcome back | <span className='text-[#5831b8] font-bold'>Sign In</span></h1>
        <p className='text-gray-400 text-sm md:text-xl'>please sign in to your account </p>
      </div>

      <div className='w-full p-2 flex flex-col items-center md:flex-row justify-between '>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-5 w-full md:w-[50%] p-3'
        >


          <label><span className='md
          text-xl'><span className='text-red-600'>*</span>Email:</span>
            <br></br>
            <input
              type='email'
              name='email'
              value={userInfo.email}
              placeholder='enter email...'
              className='border-2 p-2 rounded-sm w-[100%] md:min-w-[40%] md:min-w-[60%] md:p-4 bg-amber-50 text-black'
              onChange={handleChange}
            />
          </label>

          <label><span className='md
          text-xl'><span className='text-red-600'>*</span>Password:</span>
            <br></br>
            <input
              type='password'
              name='password'
              value={userInfo.password}
              placeholder='enter password...'
              className='border-2 p-2 rounded-sm w-[100%] md:min-w-[40%] md:min-w-[60%] md:p-4 bg-amber-50 text-black'
              onChange={handleChange}
            />
          </label>
          {
            !checkPassword && <p className='text-red-600 text-xs'>password must be atleast 8 characters</p>
          }

          <div className='flex justify-center'>
            <button
              type='submit'
              className='border-2 w-[50%] p-2 text-[#5831b8] font-bold text-xl hover:cursor-pointer'
            >Sign In</button>
          </div>
          <div>
            {
              !checkUser && <p className='text-md text-red-500 text-center'>User doesn't exists OR invalid user cridentials</p>
            }
          </div>

        </form>

        <img
          src={loginSecure}
          className='md:max-w-[40%] max-w-[50%] mt-5'
        />
      </div>

    </div>

  )
}

export default Login