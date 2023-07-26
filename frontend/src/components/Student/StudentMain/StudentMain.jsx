import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineFund,
} from "react-icons/ai";
import {
  RiCalendarCheckFill,
  RiCalendar2Line,
  RiMoonLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

import "./StudentMain.css";
import { Button, notification } from "antd";

const { Header, Sider, Content } = Layout;
const StudentMain = () => {
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

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">
              <img src="" alt="img"></img>
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
              key: "ProfilePage",
              icon: <AiOutlineUser className="fs-4" />,
              label: "View Profile",
            },
            {
              key: "Attendence",
              icon: <FaClipboardList className="fs-4" />,
              label: "View Attendence",
            },
            {
              key: "Notice",
              icon: <RiCalendarCheckFill className="fs-4" />,
              label: "View Notice",
            },
            {
                key: "Marks",
                icon: <RiCalendarCheckFill className="fs-4" />,
                label: "View Marks",
              },
            {
              key: "TimeTableStd",
              icon: <RiCalendarCheckFill className="fs-4" />,
              label: "View Timetable",
                 children: [
                {
                  key: "MondayTT",
                  icon: <AiOutlineUser className="fs-4" />,
                  label: "Monday",
                },

                {
                  key: "TuesdayTT",
                  icon: <AiOutlineUser className="fs-4" />,
                  label: "Tuesday",
                },

                {
                    key: "WednesdayTT",
                    icon: <AiOutlineUser className="fs-4" />,
                    label: "Wednesday",
                  },

                  {
                    key: "ThursdayTT",
                    icon: <AiOutlineUser className="fs-4" />,
                    label: "Thursday",
                  },

                  {
                    key: "FridayTT",
                    icon: <AiOutlineUser className="fs-4" />,
                    label: "Friday",
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
              ],
            },
            {
              key: "payments",
              icon: <RiMoneyDollarCircleLine className="fs-4" />,
              label: "Payment Handling",
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
                <img
                  width={35}
                  height={35}
                  src="https://bootstrapious.com/i/snippets/sn-team/teacher-2.jpg"
                  alt="profile"
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">User name</h5>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
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
export default StudentMain;