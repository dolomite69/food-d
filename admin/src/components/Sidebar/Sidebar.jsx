import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = () => {
  const navItems = [
    { to: "/add", icon: assets.add_icon, label: "Add Items", alt: "Add Icon" },
    { to: "/list", icon: assets.order_icon, label: "List Items", alt: "List Icon" },
    { to: "/orders", icon: assets.order_icon, label: "Orders", alt: "Order Icon" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-options">
        {navItems.map((item, index) => (
          <NavLink to={item.to} className="sidebar-option" key={index}>
            <img src={item.icon} alt={item.alt} />
            <p>{item.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  assets: PropTypes.shape({
    add_icon: PropTypes.string.isRequired,
    list_icon: PropTypes.string.isRequired,
    order_icon: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
