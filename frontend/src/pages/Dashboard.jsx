import React from 'react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../contexts/userContext';
import axios from 'axios'
import profilePhoto from '../assets/photo.jpg'
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { MdOutlineEdit } from "react-icons/md";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTransgenderAlt } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { LiaUserEditSolid } from "react-icons/lia";
import { TbLogout } from "react-icons/tb";
import { PiSignatureBold } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";







const Dashboard = () => {

  const userData = useContext(userContext)
  const navigate = useNavigate()
  const [changeImage, setChangeImage] = useState(false)

  return (
    <>
      <div className='flex flex-col h-screen md:flex-row min-h-screen gap-3 w-full p-5 box-border overflow-x-hidden'>
        <div className='w-full min-h-[70%] md:min-w-[70%] flex flex-col gap-2 p-2'>

          <div className='w-[100%] min-h-[10%]'>
            <h1 className='text-2xl md:text-3xl'>Profile</h1>
            <p className='text-xs md:text-sm text-gray-400'>Manage your personal information and account settings</p>
          </div>


          <div className='w-[100%] min-h-[30%] flex flex-row justify-around items-center p-1 gap-3 bg-[#5c2cd542] rounded-sm mt-2'>
            <img
              src={userData.userDetails.photo}
              className='h-[80%] min-w-[20%] md:min-h-[90%] md:min-w-[20%] rounded-full pointer-events-none p-1'
            />
            <div className='w-[70%] p-1 text-sm md:text-xl flex flex-col gap-2'>
              <h1 className='text-md md:text-4xl font-bold'>{userData.userDetails.fullName}</h1>
              <div className='flex flex-row items-center gap-2 md:gap-4'>
                <MdOutlineEmail />
                <p className='text-xs md:text-sm text-gray-400'>{userData.userDetails.email}</p>
              </div>
              <div className='flex flex-row items-center gap-2 md:gap-4'>
                <FiPhone />
                <p className='text-xs md:text-sm text-gray-400'>{userData.userDetails.contactNo}</p>
              </div>

            </div>
          </div>

          <div className='w-[100%] min-h-[55%] p-2 pb-4 flex flex-col gap-4 bg-[#39324b9c] rounded-sm mt-2'>

            <div className='w-full min-h-[10%] flex justify-between text-xs'>
              <div className='min-w-[70%]'>
                <h2 className='text-sm md:text-2xl'>Personal Information</h2>
                <p className='text-[60%] md:text-sm text-gray-400'>View and update your personal details</p>
              </div>
              <Link className='flex flex-row items-center min-w-[10%] gap-2 hover:cursor-pointer border-2 p-3 rounded-sm md:text-xl md:p-4 text-[#8b65ec]'
                to='/welcome/dashboard/update_details'
              >
                <MdOutlineEdit />
                <p className='text-[70%] min-w-[70%]'>Edit Details</p>
              </Link>
            </div>


            <div className='w-full min-h-[90%] p-2 flex flex-col gap-1 '>
              <div className='w-full h-[20%] flex flex-row gap-3 justify-between items-center'>
                <div className='flex flex-row gap-2 items-center text-xs md:text-xl min-w-[30%]'>
                  <FaUser />
                  <p>Full Name</p>
                </div>
                <p className='text-xs md:text-xl min-w-[69%] md:min-w-[70%] p-1 md:p-2 rounded-sm overflow-auto bg-gray-200/20 border-gray-200 text-gray-400'>{userData.userDetails.fullName}</p>
              </div>
              <div className='w-full h-[20%] flex flex-row gap-3 justify-between items-center'>
                <div className='flex flex-row gap-2 items-center text-xs md:text-xl min-w-[30%]'>
                  <MdEmail />
                  <p>Email Address</p>
                </div>
                <p className='text-xs md:text-xl min-w-[69%] md:min-w-[70%] p-1 md:p-2 rounded-sm overflow-auto bg-gray-200/20 border-gray-200 text-gray-400'>{userData.userDetails.email}</p>
              </div>
              <div className='w-full h-[20%] flex flex-row gap-3 justify-between items-center'>
                <div className='flex flex-row gap-2 items-center text-xs md:text-xl min-w-[30%]'>
                  <FaPhoneAlt />
                  <p>Phone Number</p>
                </div>
                <p className='text-xs md:text-xl min-w-[69%] md:min-w-[70%] p-1 md:p-2 rounded-sm bg-gray-200/20 border-gray-200 text-gray-400'>{userData.userDetails.contactNo}</p>
              </div>
              <div className='w-full h-[20%] flex flex-row gap-3 justify-between items-center'>
                <div className='flex flex-row gap-2 items-center text-xs md:text-xl min-w-[30%]'>
                  <FaTransgenderAlt />
                  <p>Gender</p>
                </div>
                <p className='text-xs md:text-xl min-w-[69%] md:min-w-[70%] p-1 md:p-2 rounded-sm bg-gray-200/20 border-gray-200 text-gray-400'>{userData.userDetails.gender}</p>
              </div>
              <div className='w-full h-[20%] flex flex-row gap-3 justify-between items-center'>
                <div className='flex flex-row gap-2 items-center text-xs md:text-xl min-w-[30%]'>
                  <BsFillCalendarDateFill />
                  <p>Date Of Birth</p>
                </div>
                <div className='text-xs md:text-xl min-w-[69%] md:min-w-[70%] p-1 md:p-2 rounded-sm flex flex-row justify-between bg-gray-200/20 border-gray-200 text-gray-400'>
                  <p>{userData.userDetails.dateOfBirth.split("T")[0]}</p>
                  <MdOutlineDateRange />
                </div>
              </div>
            </div>

          </div>
        </div>


        <div className='w-full min-h-[30%] md:min-w-[30%] flex flex-col gap-3 p-1'>
          <div className='w-[100%] md:min-h-[50%] flex flex-col gap-5 p-3 bg-[#271a4ccc] rounded-sm'>
            <div>
              <h1 className='text-sm md:text-2xl'>Account actions</h1>
              <p className='text-[60%] md:text-sm text-gray-400'>Manage your account settings and preferences</p>
            </div>


            <div className='flex flex-col gap-1'>
              <div
                className='flex gap-4 text-sm md:text-xl p-3 items-center w-[100%] bg-[#4c2b9f] rounded-md hover:cursor-pointer'
                onClick={() => setChangeImage(!changeImage)}
              >
                <FiCamera className={`${changeImage ? "hidden" : "block"}`} />
                <RxCross2 className={`${changeImage ? "block" : "hidden"} text-red-700 text-4xl`} />
                <p className={`${changeImage ? "hidden" : "block"}`}>Change Photo</p>
                {changeImage &&
                  <form>
                    <input
                      type='file'
                      className='bg-gray-600 w-[80%] p-2 rounded-xl hover:cursor-pointer'
                      accept=".png,.jpg,.jpeg"
                      onClick={(e) => e.stopPropagation()}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const formData = new FormData();
                        formData.append("photo", file); // "photo" must match your multer field name
                        try {
                          const response = await axios.patch('https://user-auth-backend-u9ym.onrender.com/api/v1/user/updatePhoto', formData, { withCredentials: true })
                          console.log(response.data.message)
                          if (response.data.success) {
                            userData.setUserDetails((prev) => ({
                              ...prev,
                              photo: response.data.data.updatedUser.photo
                            }))
                            setChangeImage(false)
                          }
                        }
                        catch (err) {
                          console.log('error occured while changing profile photo')
                        }
                      }}
                    />
                  </form>}
              </div>
              <Link className='flex gap-4 text-sm md:text-xl p-3 items-center w-[100%] border-2 border-[#4c2b9f] rounded-md'
                to='/welcome/dashboard/update_password'
              >
                <FiLock />
                <p>Change Password</p>
              </Link>
              <Link className='flex gap-4 text-sm md:text-xl p-3 items-center w-[100%] bg-[#4c2b9f] rounded-md '
                to='/welcome/dashboard/update_details'
              >
                <LiaUserEditSolid />
                <p>Update Details</p>
              </Link>
              <Link
                className='flex gap-4 text-sm md:text-xl p-3 items-center w-[100%] text-[#ba1c29] border-2 border-[#ba1c29] bg-[#230e10d4] rounded-md '
                onClick={async () => {
                  try {
                    const response = await axios.post('https://user-auth-backend-u9ym.onrender.com/api/v1/user/logout', null, {
                      withCredentials: true
                    })

                    if (response.data.success) {
                      localStorage.removeItem("userDetails");
                      userData.setUserDetails(null)
                      console.log('User loggedOut successfully...')
                      setTimeout(() => {
                        navigate('/welcome/login')
                      }, 600)
                    }
                  }
                  catch (err) {
                    console.log('some error occured while logout', err)
                  }
                }}
              >
                <TbLogout />
                <p>Log Out</p>
              </Link>

            </div>
          </div>


          <div className='w-[100%] md:min-h-[50%] bg-[#271a4ccc] rounded-2xl p-3 flex flex-col gap-5 rounded-sm'>
            <div className='text-sm md:text-2xl'>Account Info</div>
            <div className='flex flex-col'>
              <div className='flex flex-row justify-between p-2 text-sm md:text-xl'>
                <div className='flex flex-row gap-2 items-center'>
                  <MdOutlineDateRange className='text-xl md:text-3xl text-[#dfd548]' />
                  <p>Member Since</p>
                </div>
                <div>{userData?.extraDetails?.lastLogin?.length > 0 &&
                  userData?.userDetails?.createdAt
                  ? userData.userDetails.createdAt.split("T")[0]
                  : ""}</div>
              </div>
              <div className='flex flex-row justify-between p-2 text-sm md:text-xl'>
                <div className='flex flex-row gap-2 items-center'>
                  <PiSignatureBold className='text-xl md:text-3xl text-[#dfd548]' />
                  <p>Last login</p>
                </div>
                <div>{userData.extraDetails.lastLogin.length == 1 ? userData.extraDetails.lastLogin[userData.extraDetails.lastLogin.length - 1] : userData.extraDetails.lastLogin[userData.extraDetails.lastLogin.length - 2]}</div>
              </div>
              <div className='flex flex-row justify-between p-2 text-sm md:text-xl'>
                <div className='flex flex-row gap-2 items-center'>
                  <GiProgression className='text-xl md:text-3xl text-[#dfd548]' />
                  <p>Login Count</p>
                </div>
                <div>{userData.extraDetails.loginCount}</div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Dashboard