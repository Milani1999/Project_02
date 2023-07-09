
import Dashboard from "../Adminpages/Dashboard";
import Header from "../Header/Header";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import "./Main.css";

const Main = () => {
  return(

<div className="main">

<Header/>

<Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
</div>


  );
    
    
 
  
};

export default Main;