/** @format */

import React, { useEffect, useState } from "react"; 
import { BackBtn, CustomLoader } from "../../Components/HelpingComponent";
import HOC from "../../Layouts/HOC";
import { getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const EditProfile = () => {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUserDetail = () => {
    getApi(endPoints.auth.myProfile, {
      setResponse: setProfile,
    });
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  useEffect(() => {
    if (profile) {
      const item = profile?.data?.user;
      setFullName(item?.fullName);
      setBio(item?.bio);
      setEmail(item?.email);
    }
  }, [profile]);

  const submitHandler = (e) => {
    e.preventDefault();
    const payload = {
      fullName,
      email,
      bio,
    };
    putApi(endPoints.users.updateUserById(profile?.data?.user?._id), payload, {
      successMsg: "Updated !",
      additionalFunctions: [fetchUserDetail],
      setLoading,
    });
  };

  const openHandler = () => {
    const target = document.getElementById("file");
    target.click();
  };

  const updateProfilePicture = (file) => {
    const fd = new FormData();
    fd.append("image", file);
    putApi(endPoints.users.uploadUserPic(profile?.data?.user?._id), fd, {
      additionalFunctions: [fetchUserDetail],
      setLoading,
    });
  };

  return (
    <section>
      {loading && <CustomLoader />}
      <BackBtn />

      <section className="update-profile-section space-bg">
        <div className="update-img">
          <img src={profile?.data?.user?.image} alt="" />
          <div className="content">
            <h4> {profile?.data?.user?.fullName} </h4>
            <p className="tag">Admin</p>
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
          <div className="multiple-inputs">
            <div className="input-div">
              <p>Name</p>
              <input
                type={"text"}
                placeholder="Enter User Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="input-div">
              <p>Email Address</p>
              <input
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-div">
            <p>About</p>
            <textarea
              placeholder="Write about you."
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>
          <button className="submit-btn" type="submit">
            Update information
          </button>
        </form>
      </section>
    </section>
  );
};

export default HOC(EditProfile);
