/** @format */

import React, { useState } from "react";
import {
  BackBtn,
  CustomLoader,
  SectionHeading,
} from "../../Components/HelpingComponent";
import HOC from "../../Layouts/HOC";
import { postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { useNavigate } from "react-router-dom";

const CreatePolicy = () => {
  const navigate = useNavigate();
  const [header, setHeader] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    header,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.policy.create, payload, {
      successMsg: "Success !",
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
        <SectionHeading title={"Privacy Policy"} />
      </div>

      <section className="update-profile-section space-bg">
        <p className="table-heading mb-2">Create new privacy policy</p>
        <form onSubmit={submitHandler}>
          <div className="input-div">
            <textarea
              placeholder="Write here..."
              onChange={(e) => setHeader(e.target.value)}
              value={header}
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

export default HOC(CreatePolicy);
