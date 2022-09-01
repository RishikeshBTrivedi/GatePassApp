import React from 'react'

const NavBar = () => {
  return (
    <div className='navbar'>
        
        <a className = "navbar-element" href="/" onClick={() => {
            window.location.href("/")
        }}>Student Login</a>
        <a className = "navbar-element" href="/parentLogin" onClick={() => {
            window.location.href("/parentLogin")
        }}>Parent Login</a>
        
    </div>
  )
}

export default NavBar