/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionHeading } from "../../Components/HelpingComponent";
import TableLayout from "../../Components/TableLayout";
import HOC from "../../Layouts/HOC";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const Notification = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const removeNotifications = (id) => {
    deleteApi(endPoints.notifications.remove(id), {
      setLoading,
      additionalFunctions: [fetchHandler],
      successMsg: "Removed !",
    });
  };

  const fetchHandler = () => {
    getApi(endPoints.notifications.getAll, {
      setResponse: setData,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const thead = ["Sno", "Recipient", "Title", "Content", "Status", "Actions"];

  const filteredData = status
    ? data?.data?.filter(
        (i) => i?.status?.toLowerCase() === status?.toLowerCase()
      )
    : data?.data;

  const tbody = filteredData?.map((i, index) => [
    `#${index + 1}`,
    i?.recipient?.fullName?.length > 0 ? i?.recipient?.fullName : i?.email,
    i?.title,
    i?.content,
    i?.status === "unread" ? (
      <span className="unread-status">Unread</span>
    ) : (
      <span className="read-status">Read</span>
    ),
    <div className="table-actions">
      <i
        className="fa-regular fa-trash-can"
        onClick={() => removeNotifications(i?._id)}
      ></i>
      <i className="fa-solid fa-share"></i>
    </div>,
  ]);

  return (
    <section className="notification-page">
      <SectionHeading title={"Notification"} />

      <div className="table-layout mt-3">
        <div className="filter-section">
          <p className="table-heading"></p>{" "}
          <div className="content">
            <button
              className="create-btn"
              onClick={() => navigate("/create-notification")}
            >
              Add Notification
            </button>
            <select onChange={(e) => setStatus(e.target.value)}>
              <option value="">All</option>
              <option value="read">Read</option>
              <option value="unread">Unread</option>
            </select>
          </div>
        </div>
        <TableLayout
          thead={thead}
          tbody={tbody}
          loading={loading}
          className="mt-5 mb-5"
        />
      </div>
    </section>
  );
};

export default HOC(Notification);
