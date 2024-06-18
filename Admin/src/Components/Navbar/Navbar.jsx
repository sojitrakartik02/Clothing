import React from 'react'
import './Navbar.css'
import navProfile from '../../assets/nav-profile.svg'
import nav_logo from '../../assets/nav-logo.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={nav_logo} alt="" className="nav-logo" />
        <img src={navProfile} className='navProfile' />
    </div>
  )
}

export default Navbar
