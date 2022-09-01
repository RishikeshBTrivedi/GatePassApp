import React from 'react'
import StudentDashboard from './StudentDashboard'
import {useState , useEffect} from "react"
const ShowStudentDeclined = () => {
    const [outpassClass, setoutpassClass] = useState("")
    const [status, setstatus] = useState("")
    const [dataOutpass, setdata] = useState([{
        name:"",
        regno:0,
        block:"",
        room:0,
        destination:"",
        days:0,
        from:"",
        to:"",
        reason:""
    }])
    // const [dataOutpass, setdata] = useState({})
    async function populateOutpassRecords() {
        const req = await fetch("http://localhost:5000/StudentOutpassRecords_Accepted" , {
            headers:{
                "x-access-token":localStorage.getItem("token"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        // const data = await req.json()
        const data = await req.json()
        if(data.status === 'ok'){
            console.log("Data = "+(data))
        
            setdata(data.data)
            
            console.log("rbt -> "+(JSON.stringify(data.data[0].name)))
            console.log("rbt -> "+(JSON.stringify(data.data[3].status)))
            console.log("acbd"+dataOutpass)
            
        }else{
            alert(data.error)
        }
        // setdata(data)
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            // const user = jwt.decode(token)
            const user = token
            // userName=user
            if(!user){
                localStorage.removeItem("token")
                window.location.href = "/"
            }else{
                //if the user exists then we will generate outpass
                populateOutpassRecords();
        
            }
        }
    },[])
    if(dataOutpass.length !== 0){

    
  return (
    <div>
        <h1 className="outpass-heading">Declined Outpass for {dataOutpass[0].name} ({dataOutpass[0].regno})</h1>
        <StudentDashboard/>
        {dataOutpass.map((outpass) => (
            // if (outpass.status == "Approved by Parent")
            // return
            <div className="default">
            <p className='outpass-data'>Destination: {outpass.destination}</p>
            <p className='outpass-data'>Number of days: {outpass.days}</p>
            <p className='outpass-data'>From: {outpass.from}</p>
            <p className='outpass-data'>To: {outpass.to}</p>
            <p className='outpass-data'>Reason: {outpass.reason}</p>
            <p className="outpass-data">Status: {outpass.status}</p>
            
            </div>
            // return <h1 className='outpass-heading'>No Data Found</h1>
        ))}
    </div>
    
  )}
  else return(
      <div>
          <h1 className="outpass-heading">No Declined Outpass</h1>
        <StudentDashboard/>
      </div>
  )
}
export default ShowStudentDeclined