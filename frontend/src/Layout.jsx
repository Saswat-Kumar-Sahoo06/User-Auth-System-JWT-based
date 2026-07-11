import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen '>
      <div>
        <Header />
        <hr className='button border-0 h-px bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent'></hr>
      </div>
      <Outlet />
    </div>
  )
}

export default Layout