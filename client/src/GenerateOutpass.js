import React , {useEffect , useState , useContext} from 'react'
import { UserContext } from './UserContext'
import Table from './Table'
// import jwt from "jsonwebtoken"
const GenerateOutpass = () => {
    const [userName, setuserName] = useState("")
    const [regno, setregno] = useState(0)
    const [block, setblock] = useState("")
    const [room, setroom] = useState(0)
    async function populateOutpass() {
        const req = await fetch("http://localhost:5000/GenerateOutpass" , {
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
            setuserName(data.name);
            setregno (data.regno)
            setblock(data.block)
            setroom(data.room)
            
        }else{
            alert(data.error)
        }
        
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
                populateOutpass();
            }
        }
    })
  return (
    <div>
        <h1 className='outpassTitle' >Generate Outpass </h1>
        {/* <h2>{msg}</h2> */}
        <Table user = {userName} regno = {regno} block = {block} room = {room}/>
    </div>
  )
}

export default GenerateOutpass