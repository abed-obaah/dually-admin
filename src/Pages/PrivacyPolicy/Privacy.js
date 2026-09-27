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

const Privacy = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchHandler = () => {
    getApi(endPoints.policy.get, {
      setResponse: setData,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const removeHandler = () => {
    deleteApi(endPoints.policy.remove(data?.data?.[0]?._id), {
      setLoading,
      additionalFunctions: [fetchHandler],
    });
  };

  return (
    <section>
      {loading && <CustomLoader />}
      <SectionHeading title={"Privacy Policy"} />
      <div className="terms-condition-container table-layout mt-3">
        <div className="filter-section">
          <p className="table-heading"></p>
          <div className="content">
            {!data?.data?.[0]?._id && (
              <button
                className="create-btn"
                onClick={() => navigate("/create-policy")}
              >
                Create new policy
              </button>
            )}

            {data?.data?.[0]?._id && (
              <div className="table-actions">
                <i
                  className="fa-solid fa-pen"
                  onClick={() =>
                    navigate(`/edit-policy/${data?.data?.[0]?._id}`)
                  }
                ></i>
                <i
                  className="fa-regular fa-trash-can"
                  onClick={() => removeHandler()}
                ></i>
              </div>
            )}
          </div>
        </div>

        <div className="value-container">
          <p className="value">{data?.data?.[0]?.header}</p>
        </div>
      </div>
    </section>
  );
};

export default HOC(Privacy);
