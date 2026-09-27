/** @format */

import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const HOC = (ChildComponent) => {
  return (props) => (
    <section className="layout-wrapper">
      <Sidebar />
      <div className="layout-content">
        <Navbar />
        <div className="child-component-wrapper">
          <ChildComponent {...props} />
        </div>
      </div>
    </section>
  );
};

export default HOC;
