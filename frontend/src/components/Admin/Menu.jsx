import React, { useEffect } from 'react';
import './Menu.css';


import { FaDelicious, FaUserAlt, FaClipboard, FaClipboardList, FaChartLine, FaMoneyCheckAlt, FaCalendarAlt, FaClipboardCheck, FaWhmcs, FaSignOutAlt } from "react-icons/fa";
export default function Menu() {
  useEffect(() => {
    const mainMenuLi = document.getElementById('mainMenu').querySelectorAll('li');
    
    //Active page function---------
    function changeActive() {
      mainMenuLi.forEach(n => n.classList.remove('active'));
      this.classList.add('active');
    }

    mainMenuLi.forEach(n => n.addEventListener('click', changeActive));
    
   
    return () => {
      mainMenuLi.forEach(n => n.removeEventListener('click', changeActive));
    };
  }, []);
//-------------------------------
  return (
    <div>
      <menu>
      <img src="images/universal.jpg" alt="logo" />

        <ul id="mainMenu">
          <Icon icon={<FaDelicious />} />
          <Icon icon={<FaUserAlt />} />
          <Icon icon={<FaClipboard />} />
          <Icon icon={<FaClipboardList />} />
          <Icon icon={<FaChartLine />} />
          <Icon icon={<FaMoneyCheckAlt />} />
          <Icon icon={<FaCalendarAlt />} />
          <Icon icon={<FaClipboardCheck />} />
        </ul>
        <ul className='lastMenu'>
          <Icon icon={<FaWhmcs />} />
          <Icon icon={<FaSignOutAlt />} />
        </ul>
      </menu>
    </div>
  );
}

const Icon = ({ icon }) => (
  <li>
    <a href='#'>{icon}</a>
  </li>
);
