import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../contexts/userContext';

const UpdatePassword = () => {
    const navigate = useNavigate()
    const user = useContext(userContext)
    const [userInfo, setUserInfo] = useState({
        oldPassword: "",
        newPassword: ""
    })

    const [checkOldPassword, setCheckOldPassword] = useState(true)
    const [checkNewPassword, setCheckNewPassword] = useState(true)
    const [checkSubmit, setCheckSubmit] = useState(true)
    const [checkUser, setCheckUser] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({
            ...prev,
            [name]: value
        }))

        if (name === 'oldPassword') {
            setCheckOldPassword(value.length >= 8)
        }

        if (name === 'newPassword') {
            setCheckNewPassword(value.length >= 8)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (checkOldPassword === false || checkNewPassword === false) {
                setCheckSubmit(false)
                return
            }
            setCheckSubmit(true)

            const response = await axios.patch('http://localhost:8000/api/v1/user/changePassword', userInfo,
                {
                    withCredentials: true,
                })
            if (response.data.success === true) {
                setCheckUser(true)
                alert("password changed successfully...")
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
          text-xl'>Current Password:</span>
                        <br></br>
                        <input
                            type='password'
                            name='oldPassword'
                            value={userInfo.oldPassword}
                            placeholder='enter current password...'
                            className='border-2 p-2 rounded-sm w-[100%] md:min-w-[60%] md:p-4 bg-amber-50 text-black'
                            onChange={handleChange}
                        />
                    </label>
                    {
                        !checkOldPassword && <p className='text-red-600 text-xs'>password must be atleast of 8 characters</p>
                    }
                    <label><span className='md
          text-xl'>New Password:</span>
                        <br></br>
                        <input
                            type='password'
                            name='newPassword'
                            value={userInfo.newPassword}
                            placeholder='enter new password...'
                            className='border-2 p-2 rounded-sm w-[100%] md:min-w-[60%] md:p-4 bg-amber-50 text-black'
                            onChange={handleChange}
                        />
                    </label>
                    {
                        !checkNewPassword && <p className='text-red-600 text-xs'>password must be atleast of 8 characters</p>
                    }

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

export default UpdatePassword