import { Navigate } from "react-router-dom";

const Auth = ({ children, expectedRoles }) => {
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const isAuthorized = userInfo && expectedRoles.includes(userInfo.role);

    if (isAuthorized) {
        return children;
    } else {
        return <Navigate to="/Login" />;
    }
};

export default Auth;
