/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CustomLoader,
  SectionHeading,
} from "../../Components/HelpingComponent";
import HOC from "../../Layouts/HOC";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const Terms = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchHandler = () => {
    getApi(endPoints.terms.getAll, {
      setLoading,
      setResponse,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const removeHandler = (id) => {
    deleteApi(endPoints.terms.remove(id), {
      setLoading,
      successMsg: "Removed !",
      additionalFunctions: [fetchHandler],
    });
  };

  return (
    <section>
      {loading && <CustomLoader />}
      <SectionHeading title={"Terms & Condition"} />
      <div className="terms-condition-container table-layout mt-3">
        <div className="filter-section">
          <p className="table-heading"></p>
          <div className="content">
            {!response?.data?.[0]?.content && (
              <button
                className="create-btn"
                onClick={() => navigate("/create-terms")}
              >
                Create new terms
              </button>
            )}

            {response?.data?.[0]?.content && (
              <div className="table-actions">
                <i
                  className="fa-solid fa-pen"
                  onClick={() =>
                    navigate(`/edit-terms/${response?.data?.[0]?._id}`)
                  }
                ></i>
                <i
                  className="fa-regular fa-trash-can"
                  onClick={() => removeHandler(response?.data?.[0]?._id)}
                ></i>
              </div>
            )}
          </div>
        </div>

        <div className="value-container">
          <p className="value">{response?.data?.[0]?.content}</p>
        </div>
      </div>
    </section>
  );
};

export default HOC(Terms);
