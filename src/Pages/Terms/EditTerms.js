/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  BackBtn,
  CustomLoader,
  SectionHeading,
} from "../../Components/HelpingComponent";
import HOC from "../../Layouts/HOC";
import { useParams } from "react-router-dom";
import { getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const EditTerms = () => {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const payload = {
    content,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.terms.edit(id), payload, {
      successMsg: "Updated !",
      setLoading,
      additionalFunctions: [fetchHandler],
    });
  };

  const fetchHandler = useCallback(() => {
    getApi(endPoints.terms.getById(id), {
      setResponse,
      setLoading,
    });
  }, [id]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  useEffect(() => {
    if (response) {
      setContent(response?.data?.content);
    }
  }, [response]);

  return (
    <div>
      {loading && <CustomLoader />}
      <div
        className="flexbox-container"
        style={{ gap: "10px", alignItems: "center" }}
      >
        <BackBtn />
        <SectionHeading title={"Terms & Condition"} />
      </div>

      <section className="update-profile-section space-bg">
        <p className="table-heading mb-5">Edit terms and condition</p>
        <form onSubmit={submitHandler}>
          <div className="input-div">
            <p>Description</p>
            <textarea
              required
              placeholder="Write description Here."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className="submit-btn" type="submit">
            Update
          </button>
        </form>
      </section>
    </div>
  );
};

export default HOC(EditTerms);
