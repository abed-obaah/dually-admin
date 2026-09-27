/** @format */

import React, { useEffect, useState } from "react";
import { BackBtn, SectionHeading } from "../../Components/HelpingComponent";
import HOC from "../../Layouts/HOC";
import { useParams } from "react-router-dom";
import { getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { ClipLoader } from "react-spinners";

const EditPolicy = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [header, setheader] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    header,
  };

  useEffect(() => {
    getApi(endPoints.policy.getbyId(id), {
      setResponse: setData,
    });
  }, [id]);

  useEffect(() => {
    if (data) {
      setheader(data?.data?.header);
    }
  }, [data]);

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.policy.edit(id), payload, {
      setLoading,
    });
  };

  return (
    <div>
      <div
        className="flexbox-container"
        style={{ gap: "10px", alignItems: "center" }}
      >
        <BackBtn />
        <SectionHeading title={"Privacy policy"} />
      </div>

      <section className="update-profile-section space-bg">
        <p className="table-heading mb-3">Edit privacy policy</p>
        <form onSubmit={submitHandler}>
          <div className="input-div">
            <textarea
              placeholder="Write here..."
              value={header}
              onChange={(e) => setheader(e.target.value)}
            />
          </div>
          <button className="submit-btn" type="submit">
            {loading ? <ClipLoader color="#fff" /> : "Update"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default HOC(EditPolicy);
