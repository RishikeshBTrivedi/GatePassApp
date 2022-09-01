import logo from './logo.svg';
import './App.css';
import {React , useState} from "react"
import NavBar from './NavBar';
function Login() {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(true)
  const handleSubmit = async (event) =>{
    event.preventDefault()
    const response = await fetch("http://localhost:5000/login" , {
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const data = await response.json()
    if(data.user){
        localStorage.setItem("token",data.user)
      alert("Login Successful")
      window.location.href = "/GenerateOutpass"
    //   browserHistory.puch("/GenerateOutpass")
      //if student has successfully loggedin then send to default outpass generation page
      
      
    }else{
      alert("Invalid Login ID or Password")
    }
  }
  return (
    <div className='frontPage'>
      <NavBar/>
      <h1>MUJ Outpass Login</h1>
      
      <form>
        <input className='inpUsername' type = "text" placeholder = "Enter Username" value = {username} onChange={(event) => {
          setUsername(event.target.value)
        }}/>
        <br/>
        <span>
        <input className='inpPassword' type = {show?"password":"text"} placeholder = "Enter Password" value ={password} onChange={(event) => {
          setPassword(event.target.value)
        }}></input>
        
        <button className='showBtn' onClick={(e) =>{
          e.preventDefault()
          setShow(!show)
        }}>show</button>
        </span>
        
        <br/>
        <button className = "submitBtn" type = "submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default Login;