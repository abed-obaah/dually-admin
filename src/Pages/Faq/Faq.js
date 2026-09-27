/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionHeading } from "../../Components/HelpingComponent";
import { EditFaq, ViewFaq } from "../../Components/Modals";
import TableLayout from "../../Components/TableLayout";
import HOC from "../../Layouts/HOC";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const showMsg = (data) => {
  if (data?.length > 30) {
    return `${data?.substring(0, 30)}...`;
  } else {
    return data;
  }
};

const Faq = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);

  const removeHandler = (id) => {
    deleteApi(endPoints.faq.remove(id), {
      setLoading,
      additionalFunctions: [fetchHandler],
    });
  };

  const fetchHandler = () => {
    getApi(endPoints.faq.getAll, {
      setResponse,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const thead = ["Sno", "Question", "Answer", "Created at", ""];

  const tbody = response?.data?.map((i, index) => [
    `#${index + 1}`,
    showMsg(i?.question),
    showMsg(i?.answer),
    i?.createdAt?.slice(0, 10),
    <div className="table-actions">
      <i
        className="fa-solid fa-pen"
        onClick={() => {
          setId(i?._id);
          setOpen(true);
        }}
      ></i>
      <i
        className="fa-solid fa-eye"
        onClick={() => {
          setId(i?._id);
          setShow(true);
        }}
      ></i>
      <i
        className="fa-regular fa-trash-can"
        onClick={() => removeHandler(i?._id)}
      ></i>
    </div>,
  ]);
  return (
    <section>
      <EditFaq
        show={open}
        handleClose={() => setOpen(false)}
        id={id}
        fetchHandler={fetchHandler}
      />
      <ViewFaq
        show={show}
        handleClose={() => setShow(false)}
        id={id}
      />
      <SectionHeading title={"FAQ"} />
      <div className="table-layout mt-3 mb-3">
        <div className="filter-section">
          <p className="table-heading"></p>
          <div className="content">
            <button
              className="create-btn"
              onClick={() => navigate("/create-faq")}
            >
              Create new FAQ
            </button>
          </div>
        </div>

        <TableLayout
          thead={thead}
          tbody={tbody}
          loading={loading}
          className=" mt-3 mb-3"
        />
      </div>
    </section>
  );
};

export default HOC(Faq);
