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
import { deleteApi, getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { debouncedSetQuery } from "../../utils/utils";

const Report = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const removeUserHandler = (id) => {
    deleteApi(endPoints.users.removeUser(id), {
      additionalFunctions: [fetchHandler],
      successMsg: "Removed !",
      setLoading,
    });
  };

  const fetchHandler = useCallback(() => {
    getApi(
      endPoints.users.allUser({ page, isVerified: true, search: query }),
      {
        setResponse: setData,
        setLoading,
      }
    );
  }, [query, page]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const updateUserStatus = (data) => {
    const payload = {
      isVerified: !data?.isVerified,
    };

    putApi(endPoints.users.updateStatus(data?._id), payload, {
      additionalFunctions: [fetchHandler],
      successMsg: "Success !",
      setLoading,
    });
  };

  const thead = [
    "User No",
    "User ID",
    "Phone",
    "Emails",
    "Block User",
    "Actions",
  ];

  const tbody = data?.data?.docs?.map((i, index) => [
    `#${index + 1}`,
    i?.fullName,
    i?.mobileNumber,
    i?.email,
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
    <section>
      <SectionHeading title={"Report"} />
      <div className="table-layout mt-3">
        <div className="filter-section">
          <p className="table-heading">Reported users</p>
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
          className="mt-4 mb-4"
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

export default HOC(Report);
