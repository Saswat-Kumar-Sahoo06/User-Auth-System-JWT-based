import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../contexts/userContext';

const UpdateDetails = () => {
    const navigate = useNavigate()
    const user = useContext(userContext)
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: "",
        contactNo: "",
        gender: "",
        dateOfBirth: ""
    })

    const [checkFullName, setCheckFullName] = useState(true)
    const [checkContactNo, setCheckContactNo] = useState(true)
    const [checkSubmit, setCheckSubmit] = useState(true)

    const [checkUser, setCheckUser] = useState(true)

    const handleChange = (e) => {

        const { name, value, type } = e.target


        setUserInfo((prev) => ({
            ...prev,
            [name]: value
        }))

        if (name === 'fullName') {
            setCheckFullName(value.length >= 4)
        }

        if (name === 'contactNo') {
            setCheckContactNo(value.length == 10)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (checkContactNo === false || checkFullName === false) {
                setCheckSubmit(false)
                return
            }
            setCheckSubmit(true)

            const response = await axios.patch('http://localhost:8000/api/v1/user/updateDetails', userInfo,
                {
                    withCredentials: true,
                })
            if (response.data.success === true) {
                setCheckUser(true)
                alert("details updated successfully...")
                user.setUserDetails(response.data.data);
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
        <div className='min-h-[70%] w-full p-2 flex flex-col gap-7'>
            <div className='w-full p-2 flex flex-col items-center md:flex-row justify-between md:p-5'>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-5 w-full md:w-[50%] p-3'
                >
                    <label><span className='md
          text-xl'>Full name:</span>
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
          text-xl'>Email:</span>
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
          text-xl'>Gender:</span>
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
          text-xl'>Contact No:</span>
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

                    <div className='flex justify-center flex-col justify-center items-center'>
                        <button
                            type='submit'
                            className='border-2 w-[50%] p-2 text-[#5831b8] font-bold text-xl hover:cursor-pointer'
                        >Save Changes</button>
                        {
                            !checkSubmit && <p className='text-red-600 text-xs text-center mt-2'>please fill details as required...</p>
                        }
                    </div>
                    <div>
                        {
                            !checkUser && <p className='text-md text-red-500 text-center'>fill details correctly</p>
                        }
                    </div>

                </form>
            </div>
        </div>

    )
}

export default UpdateDetails