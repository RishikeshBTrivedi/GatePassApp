import React from 'react'
import DashBoard from './DashBoard'
import {useState , useEffect} from "react"
const AcceptedByParent = () => {
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
        const req = await fetch("http://localhost:5000/GenerateOutpassRecords_Accepted" , {
            headers:{
                "x-access-token":localStorage.getItem("token_parent"),
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
    async function changeOutpassStatus(e,newStatus){
        const res = await fetch("http://localhost:5000/changeOutpassClass" , {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          _id:e.target.id,
          status:newStatus
        })
        
      })
      console.log("Status Updated to: "+e.target.newStatus)
    }
    useEffect(() => {
        const token = localStorage.getItem("token_parent")
        if(token){
            // const user = jwt.decode(token)
            const user = token
            // userName=user
            if(!user){
                localStorage.removeItem("token_parent")
                window.location.href = "/"
            }else{
                //if the user exists then we will generate outpass
                populateOutpassRecords();
                changeOutpassStatus();
            }
        }
    },[])
  if(dataOutpass.length !== 0){
  return (
    <div>
        <h1 className="outpass-heading">Accepted Data for {dataOutpass[0].name} ({dataOutpass[0].regno})</h1>
        <DashBoard/>
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
            <button id = {outpass._id} newStatus = "Approved By Parent" className="outpass-approve" onClick={(e) =>{
                e.preventDefault();
                setoutpassClass("Approved By Parent")
                console.log(e.target.id+e.target.newStatus)
                const newStatus = "Approved by Parent"
                changeOutpassStatus(e,newStatus)
                // outpass.status=outpassClass
            }}>Accept </button>
            <button className="outpass-not-approve" newStatus = "Declined by Parent" id = {outpass._id} onClick = {(e) => {
                e.preventDefault();
               setoutpassClass("Declined by Parent")
               console.log(e)
               console.log(e.target.id+e.target.newStatus)
               const newStatus = "Declined by Parent"
               changeOutpassStatus(e,newStatus)
            //    outpass.status=outpassClass
            }}> Decline</button>
            </div>
            // return <h1 className='outpass-heading'>No Data Found</h1>
        ))}
    </div>
  
  )
  }
  else return(
      <div>
          <h1 className="outpass-heading">No Accepted Outpass</h1>
        <DashBoard/>
      </div>
  )
}
export default AcceptedByParent