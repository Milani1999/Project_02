import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineFund,
  AiOutlineFileImage,
} from "react-icons/ai";
import {
  RiCalendarCheckFill,
  RiCalendar2Line,
  RiMoonLine,
  RiMoneyDollarCircleLine,
  RiMessage2Line,
} from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { Button, notification } from "antd";
import Logo from "../../../assets/ImageResources/uni2.png";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      className: "custom-class",
      style: {
        width: 600,
      },
    });
  };

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);

  let LoggedIn = false;

  if (userInfo) {
    LoggedIn = true;
  }

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">
              <Link to="/">
                <img src={Logo} alt="img"></img>
              </Link>
            </span>
          </h2>
        </div>
        <div className="divider"></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "users",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Users",
              children: [
                {
                  key: "EditTeacher",
                  icon: <AiOutlineUser className="fs-4" />,
                  label: "Teacher",
                },

                {
                  key: "EditStudent",
                  icon: <AiOutlineUser className="fs-4" />,
                  label: "Student",
                },
              ],
            },
            {
              key: "Attendence",
              icon: <FaClipboardList className="fs-4" />,
              label: "Attendance",
              children: [
                {
                  key: "Attendence",
                  icon: <AiOutlineUser className="fs-4" />,
                  label: "Dashboard",
                },

                {
                  key: "StudentAttendance",
                  icon: <AiOutlineUser className="fs-4" />,
                  label: "Student",
                },

                {
                  key: "StaffAttendance",
                  icon: <AiOutlineUser className="fs-4" />,
                  label: "Staff",
                },
              ],
            },

            {
              key: "Timetable",
              icon: <RiCalendarCheckFill className="fs-4" />,
              label: "Timetable",
              children: [
                {
                  key: "Subject",
                  icon: <RiCalendarCheckFill className="fs-4" />,
                  label: "Subjects",
                },
                {
                  key: "Timetable",
                  icon: <RiCalendarCheckFill className="fs-4" />,
                  label: "Timetable",
                },
              ],
            },
            {
              key: "Events",
              icon: <RiCalendar2Line className="fs-4" />,
              label: "Events",
              children: [
                {
                  key: "calender",
                  icon: <RiCalendarCheckFill className="fs-4" />,
                  label: "Event Calendar",
                },
                {
                  key: "News",
                  icon: <RiCalendarCheckFill className="fs-4" />,
                  label: "News and Events",
                },
              ],
            },
            {
              key: "EditGallery",
              icon: <AiOutlineFileImage className="fs-4" />,
              label: "Gallery",
            },
            {
              key: "Notices",
              icon: <FaClipboardList className="fs-4" />,
              label: "Notices",
            },
            {
              key: "payments",
              icon: <RiMoneyDollarCircleLine className="fs-4" />,
              label: "Payments",
            },
            {
              key: "Support",
              icon: <RiMessage2Line className="fs-4" />,
              label: "Support",
            },
            {
              key: "LeavingCertificate",
              icon: <RiMessage2Line className="fs-4" />,
              label: "Leaving",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              {" "}
              <RiMoonLine className="fs-4" />
            </div>
            <div className="position-relative">
              {contextHolder}
              <Button type="primary" onClick={openNotification}>
                <span className="badge bg-warning rounded-circle p-2 position-absolute">
                  3
                </span>

                <IoIosNotifications className="fs-4" />
              </Button>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                {LoggedIn && (
                  <img
                    width={35}
                    height={35}
                    src={user.picture}
                    alt="profile"
                  />
                )}
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {LoggedIn && <h5 className="mb-0">{user.role}</h5>}
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={() => {
                      localStorage.removeItem("userInfo");
                      navigate("/Login");
                      window.location.reload();
                    }}
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
            <></>
          </div>
        </Header>
        <Content
          style={{
            margin: "2px 16px",
            padding: "2px 24px",
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />

          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
