import React, { useState } from "react";
import "./Header.css";
import { BiSearch } from "react-icons/bi";
import { RiSettingsLine } from "react-icons/ri";
import { TbMessages } from "react-icons/tb";
import { HiOutlineMoon, HiOutlineLogout } from "react-icons/hi";
/*not working darkmode */
const Header = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  const changeTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <header className={darkTheme ? "dark" : ""}>
      <div className="search-bar">
        <input type="text" placeholder="search..." />
        <BiSearch className="icon" />
      </div>

      <div className="tools">
    
        <TbMessages className="icon" />

        <HiOutlineMoon className="icon" onClick={changeTheme} />
        <RiSettingsLine className="icon" />
        <HiOutlineLogout className="icon" />

        <div className="divider"></div>

        <div className="user">
          <img src="https://bootstrapious.com/i/snippets/sn-team/teacher-2.jpg" alt="profile-img" className="profile-img" />
        </div>
      </div>
    </header>
  );
};

export default Header;
