/** @format */

import React, { useEffect, useState } from "react";
import { SectionHeading } from "../../Components/HelpingComponent";
import { EditSupport, ViewSupport } from "../../Components/Modals";
import TableLayout from "../../Components/TableLayout";
import HOC from "../../Layouts/HOC";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { debouncedSetQuery } from "../../utils/utils";

const HelpSupport = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isView, setIsView] = useState(false);
  const [id, setId] = useState("");
  const [query, setQuery] = useState("");

  const fetchHandler = () => {
    getApi(endPoints.help.get, {
      setResponse: setData,
      setLoading,
    });
  };

  const removeHandler = (id) => {
    deleteApi(endPoints.help.remove(id), {
      successMsg: "Removed !",
      setLoading,
      additionalFunctions: [fetchHandler],
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const thead = ["Mobile Number", "Email", "Address", "Action"];

  const filteredData = query
    ? data?.data?.filter(
        (i) =>
          i?.email?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.mobileNumber
            ?.toString()
            ?.toLowerCase()
            .includes(query?.toLowerCase())
      )
    : data?.data;

  const tbody = filteredData?.map((i) => [
    i?.mobileNumber,
    i?.email,
    i?.address,
    <div className="table-actions">
      <i
        className="fa-solid fa-pen"
        onClick={() => {
          setIsEdit(true);
          setId(i?._id);
          setOpen(true);
        }}
      />
      <i
        className="fa-regular fa-eye"
        onClick={() => {
          setId(i?._id);
          setIsView(true);
        }}
      />
      <i
        className="fa-regular fa-trash-can"
        onClick={() => removeHandler(i?._id)}
      />
    </div>,
  ]);

  return (
    <section>
      <EditSupport
        show={open}
        handleClose={() => setOpen(false)}
        isEdit={isEdit}
        fetchHandler={fetchHandler}
        id={id}
      />
      <ViewSupport show={isView} handleClose={() => setIsView(false)} id={id} />
      <SectionHeading title={"Help & Support"} />
      <div className="table-layout mt-3">
        <div className="filter-section">
          <p className="table-heading">Contact and other details</p>
          <div className="content">
            <button
              className="create-btn"
              onClick={() => {
                setIsEdit(false);
                setOpen(true);
              }}
            >
              Add new
            </button>
            <div className="search-container">
              <input
                type="search"
                placeholder="Search number , email"
                onChange={(e) => debouncedSetQuery(e.target.value, setQuery)}
              />
              <i className="fa-solid fa-magnifying-glass" />
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
    </section>
  );
};

export default HOC(HelpSupport);
