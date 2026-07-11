import React, { useState } from 'react'
import axios from 'axios'
import { SiGnuprivacyguard } from "react-icons/si";
import signUpImage from '../assets/signUp.svg'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    contactNo: "",
    gender: "",
    dateOfBirth: "",
    photo: null
  })

  const [checkFullName, setCheckFullName] = useState(true)
  const [checkPassword, setCheckPassword] = useState(true)
  const [checkContactNo, setCheckContactNo] = useState(true)
  const [checkSubmit, setCheckSubmit] = useState(true)

  const [checkUser, setCheckUser] = useState(true)

  const handleChange = (e) => {

    const { name, value, type, files } = e.target


    setUserInfo((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }))

    if (name === 'fullName') {
      setCheckFullName(value.length >= 4)
    }

    if (name === 'password') {
      setCheckPassword(value.length >= 8)
    }

    if (name === 'contactNo') {
      setCheckContactNo(value.length == 10)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (checkContactNo === false || checkFullName === false || checkPassword === false) {
        setCheckSubmit(false)
        return
      }
      setCheckSubmit(true)

      const formData = new FormData()
      formData.append("fullName", userInfo.fullName)
      formData.append("email", userInfo.email)
      formData.append("password", userInfo.password)
      formData.append("contactNo", userInfo.contactNo)
      formData.append("gender", userInfo.gender)
      formData.append("dateOfBirth", userInfo.dateOfBirth)
      formData.append("photo", userInfo.photo)

      const response = await axios.post('http://localhost:8000/api/v1/user/register', formData)
      if (response.data.success === true) {
        setCheckUser(true)
        setTimeout(() => {
          navigate('/welcome/login')
        }, 500)
      }

    } catch (error) {
      setCheckUser(false)
      console.log(error.response?.data?.message || 'something went wrong');

    }
  }

  return (
    <div className='min-h-[70%] w-full p-2 flex flex-col gap-7'>

      <div className='flex flex-col gap-2 mt-3 md:p-8  '>
        <SiGnuprivacyguard className='text-[#5831b8] font-bold text-xl md:text-5xl' />
        <h1 className='text-3xl md:text-7xl'>Create account</h1>
        <p className='text-gray-400 text-sm md:text-xl'>Join us! Please fill in the details to get started</p>
      </div>

      <div className='w-full p-2 flex flex-col items-center md:flex-row justify-between md:p-5'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-5 w-full md:w-[50%] p-3'
        >
          <label><span className='md
          text-xl'><span className='text-red-600'>*</span>Full name:</span>
            <br></br>
            <input
              type='text'
              name='fullName'
              value={userInfo.fullName}
              placeholder='enter full name...'
              className='border-2 p-2 rounded-sm w-[100%] md:min-w-[60%] md:p-4 bg-amber-50 text-black'
              onChange={handleChange}
            />
          </label>
          {
            !checkFullName && <p className='text-red-600 text-xs'>fullname must be atleast 3 characters</p>
          }


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

          <div><span className='md
          text-xl'><span className='text-red-600'>*</span>Gender:</span>
            <br></br>
            <div className='flex flex-row gap-2 ml-4 text-sm'>

              <label>
                <input
                  type='radio'
                  name='gender'
                  value="Male"
                  checked={userInfo.gender === 'Male'}
                  onChange={handleChange}
                /><span>Male</span>
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value="Female"
                  checked={userInfo.gender === 'Female'}
                  onChange={handleChange}
                /><span>Female</span>
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value="Other"
                  checked={userInfo.gender === 'Other'}
                  onChange={handleChange}
                /><span>Other</span>
              </label>
            </div>
          </div>

          <label><span className='md
          text-xl'><span className='text-red-600'>*</span>Contact No:</span>
            <br></br>
            <input
              type='text'
              name='contactNo'
              value={userInfo.contactNo}
              placeholder='enter contactNo...'
              className='border-2 p-2 rounded-sm w-[100%] md:min-w-[40%] md:min-w-[60%] md:p-4 bg-amber-50 text-black'
              onChange={handleChange}
            />
          </label>
          {
            !checkContactNo && <p className='text-red-600 text-xs'>enter a valid contact number</p>
          }

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

          <label><span className='md
          text-xl'>DOB</span><span className='text-xs text-gray-400'> (date of birth):</span>
            <br></br>
            <input
              type='date'
              name='dateOfBirth'
              value={userInfo.dateOfBirth}
              className='border-2 p-2 rounded-sm w-[100%] md:min-w-[40%] md:min-w-[60%] md:p-4 bg-amber-50 text-black hover:cursor-pointer'
              max={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </label>

          <label><span className='md
          text-xl '>Profile photo:</span>
            <br></br>
            <div className='border-2 p-1 rounded-xs'>
              <input
                type='file'
                name='photo'
                className='border-2 border-gray-700 p-2 bg-gray-700 w-[30%] shadow-2xl text-xs md:min-w-30 md:min-w-[40%] md:p-4 hover:cursor-pointer rounded-xs'
                onChange={handleChange}
              />
            </div>
          </label>

          <div className='flex justify-center flex-col justify-center items-center'>
            <button
              type='submit'
              className='border-2 w-[50%] p-2 text-[#5831b8] font-bold text-xl hover:cursor-pointer'
            >Sign Up</button>
            {
              !checkSubmit && <p className='text-red-600 text-xs text-center mt-2'>please fill details as required...</p>
            }
          </div>
          <div>
            {
              !checkUser && <p className='text-md text-red-500 text-center'>User already existed OR fill details correctly</p>
            }
          </div>

        </form>

        <img
          src={signUpImage}
          className='md:max-w-[40%] hidden md:block'
        />
      </div>
    </div>

  )
}

export default Register