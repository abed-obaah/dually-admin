/** @format */

import React, { useEffect, useState } from "react";
import { SectionHeading } from "../../Components/HelpingComponent";
import TableLayout from "../../Components/TableLayout";
import HOC from "../../Layouts/HOC";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { debouncedSetQuery } from "../../utils/utils";

const showMsg = (data) => {
  const text = data?.slice()?.reverse()?.[0]?.message;
  if (text?.length > 30) {
    return `${text?.substring(0, 30)}...`;
  } else {
    return text;
  }
};

const Query = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const removeHandler = (id) => {
    deleteApi(endPoints.Queries.delete(id), {
      successMsg: "Removed !",
      setLoading,
      additionalFunctions: [fetchHandler],
    });
  };

  const fetchHandler = () => {
    getApi(endPoints.Queries.getAll, {
      setResponse: setData,
      setLoading,
    });
  };

  const filteredData = query
    ? data?.data?.filter(
        (i) =>
          i?.fullName?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.email?.toLowerCase().includes(query?.toLowerCase())
      )
    : data?.data;

  useEffect(() => {
    fetchHandler();
  }, []);

  const thead = [
    "Query Id",
    "Send by",
    "Email",
    "Reason",
    "Created date",
    "Status",
    "Actions",
  ];

  const tbody = filteredData?.map((i) => [
    i?._id?.slice(-4),
    i?.fullName,
    i?.email,
    showMsg(i?.messages),
    i?.createdAt?.slice(0, 10),
    i?.status,
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <Link
                to={`/ticket-detail/${i?._id}`}
                style={{ color: "#161D6F" }}
              >
                View Details
              </Link>
            ),
            key: "0",
          },
          {
            label: (
              <span
                style={{ color: "#B8001F" }}
                onClick={() => removeHandler(i?._id)}
              >
                Delete
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
      <SectionHeading title={"Query"} />
      <div className="table-layout mt-5 mb-5">
        <div className="filter-section">
          <p className="table-heading">Query</p>
          <div className="content">
            <div
              className="search-container"
              style={{
                backgroundColor: "#E9E9EA",
                border: "1px solid #E9E9EA",
              }}
            >
              <input
                type="search"
                placeholder="Search number,emails..."
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
          className="mt-4 mb-3"
        />
      </div>
    </section>
  );
};

export default HOC(Query);
