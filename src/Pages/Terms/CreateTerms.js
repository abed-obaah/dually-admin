/** @format */

import React, { useState } from "react";
import {
  BackBtn,
  CustomLoader,
  SectionHeading,
} from "../../Components/HelpingComponent";
import HOC from "../../Layouts/HOC";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const CreateTerms = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    content,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.terms.create, payload, {
      successMsg: "Created !",
      setLoading,
      additionalFunctions: [() => navigate(-1)],
    });
  };

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
        <p className="table-heading mb-5">Create new terms and condition</p>
        <form onSubmit={submitHandler}>
          <div className="input-div">
            <p>Discription</p>
            <textarea
              placeholder="Write description Here."
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <button className="submit-btn" type="submit">
            Create
          </button>
        </form>
      </section>
    </div>
  );
};

export default HOC(CreateTerms);
