import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, admin, setAdmin, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken("");
    setAdmin(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Company Logo" />
      <p 
        className="login-condition" 
        onClick={token && admin ? logout : () => navigate("/")}
      >
        {token && admin ? "Logout" : "Login"}
      </p>
      <img className="profile" src={assets.profile_image} alt="Profile" />
    </div>
  );
};

Navbar.propTypes = {
  assets: PropTypes.shape({
    logo: PropTypes.string.isRequired,
    profile_image: PropTypes.string.isRequired,
  }),
};

export default Navbar;
