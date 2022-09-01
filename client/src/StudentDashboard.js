import React from 'react'

const StudentDashboard = () => {
  return (
    <div className='main-dashboard'>
        <ul className='dashboard'>
            <a href='/GenerateOutpass' className='dashboard-elements'>Generate Outpass</a>
            <a href='/studentStatus' className='dashboard-elements'>Pending</a>
            <a href='/studentStatus/acceptedByParent' className='dashboard-elements'>Accepted By Parent</a>
            <a href='/studentStatus/declinedByParent' className='dashboard-elements'>Declined By Parent</a>
        </ul>
    </div>
  )
}

export default StudentDashboard