/** @format */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./Routes/routes";
import { ReactNotifications } from "react-notifications-component";

const App = () => {
  return (
    <section>
      <ReactNotifications />
      <BrowserRouter>
        <Routes>
          {routes.map((i, index) => (
            <Route key={index} path={i.path} element={i.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
