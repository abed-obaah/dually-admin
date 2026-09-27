/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { BackBtn, CustomLoader } from "../../Components/HelpingComponent";
import HOC from "../../Layouts/HOC";
import { useParams } from "react-router-dom";
import { getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { ClipLoader } from "react-spinners";

const EditUserProfile = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserDetail = useCallback(() => {
    getApi(endPoints.users.getUserById(id), {
      setResponse: setUserDetails,
    });
  }, [id]);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  useEffect(() => {
    if (userDetails) {
      const item = userDetails?.data?.user;
      setFullName(item?.fullName);
      setMobileNumber(item?.mobileNumber);
      setEmail(item?.email);
      setBio(item?.bio);
    }
  }, [userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
    const payload = {
      fullName,
      mobileNumber,
      email,
      bio,
    };
    putApi(endPoints.users.updateUserById(id), payload, {
      successMsg: "Updated !",
      additionalFunctions: [fetchUserDetail],
      setLoading: setSubmitLoading,
    });
  };

  const openHandler = () => {
    const target = document.getElementById("file");
    target.click();
  };

  const updateProfilePicture = (file) => {
    const fd = new FormData();
    fd.append("image", file);
    putApi(endPoints.users.uploadUserPic(id), fd, {
      additionalFunctions: [fetchUserDetail],
      setLoading,
    });
  };

  return (
    <section className="edit-user-page">
      {loading && <CustomLoader />}
      <BackBtn />

      <section className="update-profile-section space-bg">
        <div className="update-img">
          <img src={userDetails?.data?.user?.image} alt="" />
          <div className="content">
            <h4> {userDetails?.data?.user?.fullName} </h4>
            <p className="tag">
              {userDetails?.data?.user?.friends?.[0]?.users?.length} Friends
            </p>
            <button className="update" onClick={() => openHandler()}>
              <i className="fa-solid fa-pen"></i>
              Update Image
            </button>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => updateProfilePicture(e.target.files[0])}
            />
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <div className="input-div">
            <p>Name</p>
            <input
              type={"text"}
              placeholder="Enter User Name"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="multiple-inputs">
            <div className="input-div">
              <p>Email</p>
              <input
                type={"email"}
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-div">
              <p>Phone No</p>
              <input
                type={"tel"}
                value={mobileNumber}
                required
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="input-div">
            <p>About</p>
            <textarea
              placeholder="Write about you."
              value={bio}
              required
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button className="submit-btn" type="submit">
            {submitLoading ? <ClipLoader color="#fff" /> : "Update information"}
          </button>
        </form>
      </section>
    </section>
  );
};

export default HOC(EditUserProfile);
