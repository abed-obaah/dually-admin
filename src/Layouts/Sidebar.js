/** @format */

import React, { useEffect, useState } from "react";
import { verticalLogo } from "../assest";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "../constant/constant";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { LogoutHandler } from "../utils/utils";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getApi(endPoints.auth.myProfile, {
      setResponse: setProfile,
    });
  }, []);

  return (
    <section className="sidebar hide-layout">
      <div className="logo-container">
        <img src={verticalLogo} alt="" />
      </div>

      <div className="links">
        {sidebarLinks.map((i, index) => (
          <div
            className={`item ${pathname === i.link ? "active" : ""}`}
            onClick={() => navigate(i.link)}
            key={index}
          >
            <i className={i.icon}></i>
            <p> {i.title} </p>
          </div>
        ))}
      </div>

      <div className="admin-detail">
        <div className="admin-card" onClick={() => navigate("/update-profile")}>
          <div className="admin-card-avatar">
            {profile?.data?.user?.image ? (
              <img src={profile?.data?.user?.image} alt="" />
            ) : (
              <i className="fa-solid fa-user"></i>
            )}
          </div>
          <div className="admin-card-body">
            <p className="name">
              {profile?.data?.user?.fullName ||
                profile?.data?.user?.email ||
                "Admin"}
            </p>
            {profile?.data?.user?.fullName && profile?.data?.user?.email && (
              <p className="email">{profile?.data?.user?.email}</p>
            )}
            <span className="admin-badge">Admin</span>

            <button
              type="button"
              className="log-out"
              onClick={(e) => {
                e.stopPropagation();
                LogoutHandler(navigate);
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
