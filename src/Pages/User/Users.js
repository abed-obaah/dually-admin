/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  CustomPagination,
  SectionHeading,
} from "../../Components/HelpingComponent";
import TableLayout from "../../Components/TableLayout";
import HOC from "../../Layouts/HOC";
import { Form } from "react-bootstrap";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { DashboardCard } from "../../Components/Cards/AllCards";
import { deleteApi, getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { debouncedSetQuery } from "../../utils/utils";

const Users = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState({});
  const [isVerified, setIsVerified] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bg, setBg] = useState("#e5ecf6");

  const removeUserHandler = (id) => {
    deleteApi(endPoints.users.removeUser(id), {
      additionalFunctions: [fetchCounts, fetchHandler],
      successMsg: "Removed !",
      setLoading,
    });
  };

  const updateUserStatus = (data) => {
    const payload = {
      isVerified: !data?.isVerified,
    };

    putApi(endPoints.users.updateStatus(data?._id), payload, {
      additionalFunctions: [fetchCounts, fetchHandler],
      successMsg: "Success !",
      setLoading,
    });
  };

  const fetchHandler = useCallback(() => {
    getApi(endPoints.users.allUser({ page, search: query, isVerified }), {
      setResponse: setData,
      setLoading,
    });
  }, [page, query, isVerified]);

  const fetchCounts = () => {
    getApi(endPoints.dashboard.userCount, {
      setResponse: setCount,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  useEffect(() => {
    fetchCounts();
  }, []);

  const thead = [
    "User No",
    "User ID",
    "Phone",
    "Emails",
    "Joined Date",
    "Active",
    "Block User",
    "Actions",
  ];

  const tbody = data?.data?.docs?.map((i, index) => [
    `#${index + 1}`,
    i?.fullName,
    i?.mobileNumber,
    i?.email,
    i?.createdAt?.slice(0, 10),
    !i?.isVerified ? (
      <span className="active-status">
        <span className="active-bg"></span>
        Active
      </span>
    ) : (
      <span className="active-status">
        <span className="not-active-bg"></span>
        Inactive
      </span>
    ),
    <Form.Check
      type="switch"
      id="custom-switch"
      checked={i?.isVerified}
      onChange={() => updateUserStatus(i)}
    />,
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <Link to={`/users/${i?._id}`} style={{ color: "#161D6F" }}>
                View User
              </Link>
            ),
            key: "0",
          },
          {
            label: (
              <Link to={`/edit-user/${i?._id}`} style={{ color: "#161D6F" }}>
                Edit User
              </Link>
            ),
            key: "1",
          },
          {
            label: (
              <span
                style={{ color: "#B8001F" }}
                onClick={() => removeUserHandler(i?._id)}
              >
                Delete User
              </span>
            ),
            key: "2",
          },
        ],
      }}
      trigger={["click"]}
    >
      <i className="fa-solid fa-ellipsis" style={{ cursor: "pointer" }}></i>
    </Dropdown>,
  ]);

  return (
    <section className="user-page">
      <SectionHeading title={"Users"} className="mb-3" />
      <div className="flexbox-container">
        <DashboardCard
          title={"Total Users"}
          count={count?.data?.users}
          isUp={true}
          onClickEvent={() => {
            setIsVerified(null);
            setBg("#e5ecf6");
          }}
        />
        <DashboardCard
          title={"Active Users"}
          count={count?.data?.activeUser}
          isUp={true}
          bg={"#D0FFE0"}
          onClickEvent={() => {
            setIsVerified(false);
            setBg("#D0FFE0");
          }}
        />
        <DashboardCard
          title={"Inactive Users"}
          count={count?.data?.inactiveUser}
          isUp={false}
          bg={"#E6E6E6"}
          onClickEvent={() => {
            setIsVerified(true);
            setBg("#E6E6E6");
          }}
        />
      </div>

      <div
        className="table-layout mt-3"
        style={{ backgroundColor: bg, border: `1px solid ${bg}` }}
      >
        <div className="filter-section">
          <p className="table-heading">List of users</p>
          <div className="content">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search User"
                onChange={(e) => debouncedSetQuery(e.target.value, setQuery)}
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>

        <TableLayout
          thead={thead}
          tbody={tbody}
          loading={loading}
          className="mt-4 mb-5 user-table"
        />
      </div>

      <CustomPagination
        currentPage={page}
        setCurrentPage={setPage}
        hasNextPage={data?.data?.hasNextPage}
        hasPrevPage={data?.data?.hasPrevPage}
      />
    </section>
  );
};

export default HOC(Users);
