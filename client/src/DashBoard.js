import React from 'react'

const DashBoard = () => {
  return (
    <div className='main-dashboard'>
        <ul className='dashboard'>
            <a href='/showOutpass' className='dashboard-elements'>Pending</a>
            <a href='/showOutpass/acceptedByParent' className='dashboard-elements'>Accepted By Parent</a>
            <a href='/showOutpass/declinedByParent' className='dashboard-elements'>Declined By Parent</a>
        </ul>
    </div>
  )
}

export default DashBoard