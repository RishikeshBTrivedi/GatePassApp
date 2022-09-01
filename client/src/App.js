import React from 'react'
import { BrowserRouter, Route, Routes , Switch} from "react-router-dom";
import Login from './Login';
import GenerateOutpass from './GenerateOutpass';
import { UserContext } from './UserContext';
import ParentLogin from './ParentLogin';
import ShowOutpass from './ShowOutpass';
import AcceptedByParent from './AcceptedByParent';
import DeclinedByParent from './DeclinedByParent';
import ShowStudentStatus from "./ShowStudentStatus"
import ShowStudentAccepted from "./ShowStudentAccepted"
import ShowStudentDeclined from "./ShowStudentDeclined"
const App = () => {
  return (
    <BrowserRouter>
    <div className='App'>
      <Routes>
        
            <Route path="/" element={<Login/>} />
            <Route path="/GenerateOutpass" element={<GenerateOutpass/>} />
            <Route path="/parentLogin" element = {<ParentLogin/>}/>
            <Route path = "/showOutpass" element = {<ShowOutpass/>}/>
            <Route path="/showOutpass/acceptedByParent" element = {<AcceptedByParent/>}/>
            <Route path = "/showOutpass/declinedByParent" element = {<DeclinedByParent/>}/>
            <Route path = "/studentStatus" element = {<ShowStudentStatus/>}/>
            <Route path="/studentStatus/acceptedByParent" element = {<ShowStudentAccepted/>}/>
            <Route path = "/studentStatus/declinedByParent" element = {<ShowStudentDeclined/>}/>
      </Routes>
      
    </div>
    </BrowserRouter>
  )
}

export default App