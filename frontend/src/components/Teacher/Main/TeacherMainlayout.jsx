import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineFund,
} from "react-icons/ai";
import { RiCalendarCheckFill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
// import { notification } from "antd";
import Logo from "../../../assets/ImageResources/uni2.png";

const { Header, Sider, Content } = Layout;
const TeacherMainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  // const [api] = notification.useNotification();

  // const openNotification = () => {
  //   api.open({
  //     message: "Notification Title",
  //     description:
  //       "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
  //     className: "custom-class",
  //     style: {
  //       width: 600,
  //     },
  //   });
  // };

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);

  let LoggedIn = false;

  if (userInfo) {
    LoggedIn = true;
  }

  const handleSignOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/Login");
  };

  return (
    <Layout>
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
              key: "Profile",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Profile",
            },
            {
              key: "TAttendence",
              icon: <FaClipboardList className="fs-4" />,
              label: "Attendence",
            },

            {
              key: "TTimetable",
              icon: <RiCalendarCheckFill className="fs-4" />,
              label: "Timetable",
            },
            {
              key: "VStudents",
              icon: <AiOutlineUser className="fs-4" />,
              label: "View Students",
            },

            {
              key: "TMarks",
              icon: <AiOutlineFund className="fs-4" />,
              label: "Marks",
              children: [
                {
                  key: "TMarks",
                  icon: <AiOutlineFund className="fs-4" />,
                  label: "Add, Edit Marks",
                },
                {
                  key: "TClassMarks",
                  icon: <AiOutlineFund className="fs-4" />,
                  label: "Classwise Marks",
                },
                {
                  key: "Performance",
                  icon: <AiOutlineFund className="fs-4" />,
                  label: "Performance",
                },
              ],
            },
            {
              key: "notice",
              icon: <AiOutlineFund className="fs-4" />,
              label: "Notices",
              children: [
                {
                  key: "TNotices",
                  icon: <FaClipboardList className="fs-4" />,
                  label: "Notices",
                },
                {
                  key: "SendNotices",
                  icon: <FaClipboardList className="fs-4" />,
                  label: "Send Notices",
                },
              ],
            },
            {
              key: "TCalendar",
              icon: <RiCalendarCheckFill className="fs-4" />,
              label: "Event Calendar",
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
            {/* <div className="position-relative">
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
            </div> */}

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
                {LoggedIn && <h5 className="mb-0">{user.name}</h5>}{" "}
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="change-password"
                  >
                    Change Password{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={handleSignOut}
                    to="/login"
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
export default TeacherMainLayout;
