import React from 'react'
import {useTable} from "react-table"
import {useState} from "react"
import axios from "axios"
const Table = (props) => {
  const url = "http://localhost:5000/submitOutpass"
    const [from, setfrom] = useState(new Date());
    const [to, setto] = useState(new Date())
    const [days, setdays] = useState(0)
    // const [name, setname] = useState("")
    // const [regno, setregno] = useState(0)
    // const [block, setblock] = useState("")
    // const [room, setroom] = useState()
    const [destination, setdestination] = useState("")
    const [reason, setreason] = useState("")
    const [Outpassdata, setdata] = useState({
      name:"",
      regno:0,
      block:"",
      room:0,
      destination:"",
      days:0,
      from:"",
      to:"",
      reason:""
    })
    console.log("Props = "+props)
    const outpassSubmit = async(e) => { 
      // console.log("Outpass Submitted")
      // setname(props.user)
      // setregno(props.regno)
      // setblock(props.block)
      // setroom(props.room)
      // e.preventDefault()
      // const fromData = {"name":props.user , "regno":props.regno , "block":props.block , "room":props.room , "destination":destination , "days":days , "from":from ,"to":to , "reason":reason}
      // console.log("Form Data -> "+JSON.parse(fromData))
      setdata({name:props.user , regno:props.regno , block:props.block , room:props.room , destination:destination , days:days , from:from  ,to:to , reason:reason})
      console.log(Outpassdata)
      const res = await fetch("http://localhost:5000/submitOutpass" , {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name:props.user,
          regno:props.regno,
          block:props.block,
          room:props.room,
          destination:destination,
          days:days,
          from:from,
          to:to,
          reason:reason,
          status:"Not Approved"
        })
        
      })
      const data = await res.json()
      console.log(data)
      console.log("Changing Location.....")
      window.location.herf = "/studentStatus"
      console.log("Location Changed.....")
      // axios.post(url, Outpassdata)
    }
  return (
    <div className='table'>
        {/* <label>Name</label> */}
        
        <input type="text" className='outpassInput' value = {props.user}></input>
        {/* <label>Registration Number</label> */}
        <input type="text" className='outpassInput' value = {props.regno}></input>
        
        <input type = "text" className='outpassInput' value = {props.block}></input>
        <input type = "text" className='outpassInput' value = {props.room}></input>
        <input type = "text" className='outpassInput' placeholder='Destination' value={destination} onChange = {(e) =>{
          setdestination(e.target.value)
        }}></input>
        <input type = "text" className='outpassInput' placeholder='Number of Days' value={days} onChange = {(e) =>{
          setdays(e.target.value)
        }}></input>
        <input type = "text" className='outpassInput' placeholder='Reason' value={reason} onChange={(e) => {
          setreason(e.target.value)
        }}></input>
        <input type = "date" className='outpassInput' placeholder='From' value={from} onChange={(e) => {
            setfrom(e.target.value)
            const diffTime = Math.abs(from - to);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));   
            console.log(diffDays) 
            // setdays(diffDays)
        }}></input>
        <input type = "date" className='outpassInput' placeholder='To'value={to} onChange={(e) => {
            setto(e.target.value)
            const diffTime = Math.abs(from - to);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffDays)   
            // setdays(diffDays)
        }}></input>
        <br/>
        <button type = "reset" className='submitBtn'onClick={outpassSubmit}>Submit</button>
        <button type = "button" className='submitBtn'onClick={ () =>{
            window.location = "/studentStatus"
            console.log("Location Changed By Show Status Button")
            return false;
        }}>Show Status</button>
    </div>
  )
}

export default Table