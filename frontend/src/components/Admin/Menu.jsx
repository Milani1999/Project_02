import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Link } from "react-router-dom";


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

  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

   

  return (
    <div>
      <menu>
      <Link to="/Home"><img src="images/universal.jpg" alt="sidebarlogo" /></Link>
      
      <p className='sidep'>Universal International <br></br>College</p>
      <hr className="sidebar-divider" />
      <ul id="mainMenu">
          <Icon
            icon={<FaDelicious />}
            title="Dashboard"
            active={activeTab === 'Icon 1'}
            onClick={() => handleTabClick('Dashboard')}
            
          />
          <Icon
            icon={<FaUserAlt />}
            title="User"
            active={activeTab === 'Icon 2'}
            onClick={() => handleTabClick('User')}
          />
          <Icon
            icon={<FaClipboard />}
            title="Attendence"
            active={activeTab === 'Icon 3'}
            onClick={() => handleTabClick('Attendence')}
          />
          <Icon
            icon={<FaClipboardList />}
            title="Curriculum"
            active={activeTab === 'Icon 4'}
            onClick={() => handleTabClick('Curriculum')}
          />
          <Icon
            icon={<FaChartLine />}
            title="Performance"
            active={activeTab === 'Icon 5'}
            onClick={() => handleTabClick('Performance')}
          />
          <Icon
            icon={<FaMoneyCheckAlt />}
            title="Payments"
            active={activeTab === 'Icon 6'}
            onClick={() => handleTabClick('Payments')}
          />
          <Icon
            icon={<FaCalendarAlt />}
            title="Event Calender"
            active={activeTab === 'Icon 7'}
            onClick={() => handleTabClick('Event Calender')}
          />
          <Icon
            icon={<FaClipboardCheck />}
            title="Notice"
            active={activeTab === 'Icon 8'}
            onClick={() => handleTabClick('Notice')}
          />
       
          <Icon
            icon={<FaWhmcs />}
            title="Settings"
            active={activeTab === 'Icon 9'}
            onClick={() => handleTabClick('Settings')}
          />
          <Icon
            icon={<FaSignOutAlt />}
            title="Logout"
            active={activeTab === 'Icon 10'}
            onClick={() => handleTabClick('Logout')}
          
          />
        </ul>
      

      </menu>
  
    </div>
  );
}
const Icon = ({ icon, title, active, onClick, }) => (
  <li className={active ? 'active' : ''}>
    <a href='#' onClick={onClick}>
      {icon}
      <span className="tab-title">{title}</span>
    </a>
  </li>
);