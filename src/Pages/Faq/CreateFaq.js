/** @format */

import React, { useState } from "react";
import HOC from "../../Layouts/HOC";
import {
  BackBtn,
  CustomLoader,
  SectionHeading,
} from "../../Components/HelpingComponent";
import { postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const CreateFaq = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    question,
    answer,
    userType: "ADMIN",
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.faq.create, payload, {
      successMsg: "Created !",
      setLoading,
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
        <SectionHeading title={"FAQ"} />
      </div>

      <section className="update-profile-section space-bg">
        <p className="table-heading mb-5">Create new</p>
        <form onSubmit={submitHandler}>
          <div className="input-div">
            <p>Question</p>
            <input
              type={"text"}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <p>Answer</p>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
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

export default HOC(CreateFaq);
