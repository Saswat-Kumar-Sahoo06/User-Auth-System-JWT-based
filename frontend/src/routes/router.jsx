import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from '../Layout'
import Register from '../pages/Register'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Welcome from '../pages/Welcome'
import UpdateDetails from '../pages/UpdateDetails'
import UpdatePassword from '../pages/UpdatePassword'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Landing />} />
            <Route path='/welcome' element={<Layout />}>
                <Route path='' element={<Welcome />} />
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route path='dashboard' element={<Dashboard />}>
                    <Route path='update_details' element={<UpdateDetails />} />
                    <Route path='update_password' element={<UpdatePassword />} />
                </Route>
            </Route>
        </>

    )
)

export { router }