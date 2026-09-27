/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { BackBtn, ReactSelect } from "../../Components/HelpingComponent";
import HOC from "../../Layouts/HOC";
import { Form } from "react-bootstrap";
import { getApi, postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { ClipLoader } from "react-spinners";

const CreateNotificatoin = () => {
  const [total, setTotal] = useState("ALL");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sendVia, setSendVia] = useState("");
  const [expireIn, setExpireIn] = useState("");
  const [allUsers, setAllUsers] = useState("");
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(false);

  let payload;

  if (total === "ALL") {
    payload = {
      total,
      sendTo: "USER",
      title,
      content,
      sendVia,
      expireIn,
    };
  } else {
    payload = {
      total,
      sendTo: "USER",
      title,
      content,
      sendVia,
      expireIn,
      _id: selectedUser?.value,
    };
  }

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.notifications.create, payload, {
      successMsg: "Created !",
      setLoading,
    });
  };

  const fetchAllUsers = useCallback(() => {
    getApi(endPoints.users.allUser({ search: query }), {
      setResponse: setAllUsers,
    });
  }, [query]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const userOptions = allUsers?.data?.docs?.map((i) => ({
    value: i?._id,
    label: i?.fullName?.length > 0 ? i?.fullName : i?.email,
  }));

  return (
    <section>
      <BackBtn />
      <section className="update-profile-section space-bg">
        <p className="table-heading">Create notification</p>
        <form onSubmit={submitHandler}>
          <div className="radio-div">
            <p>Send To</p>
            <div className="radio-btn">
              <Form.Check
                inline
                label="All"
                type="radio"
                id="all-radio"
                onChange={(e) => setTotal(e.target.value)}
                value={"ALL"}
                checked={total === "ALL"}
              />
              <Form.Check
                inline
                label="Single User"
                type="radio"
                id="signle-radio"
                onChange={(e) => setTotal(e.target.value)}
                value={"SINGLE"}
                checked={total === "SINGLE"}
              />
            </div>
          </div>

          {total === "SINGLE" && (
            <div className="input-div">
              <p>Select User</p>
              <ReactSelect
                options={userOptions}
                setValue={setSelectedUser}
                value={selectedUser}
                inputValue={setQuery}
                placeholder="Select User..."
              />
            </div>
          )}

          <div className="input-div">
            <p>Send Via</p>
            <select
              onChange={(e) => setSendVia(e.target.value)}
              value={sendVia}
              required
            >
              <option value=""> Select your preference</option>
              <option value="FCM">FCM</option>
              <option value="SMS">SMS</option>
              <option value="EMAIL">EMAIL</option>
              <option value="NOTIFICATION">NOTIFICATION</option>
            </select>
          </div>
          <div className="input-div">
            <p>Title</p>
            <input
              type={"text"}
              placeholder="Enter your title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="input-div">
            <p>Content</p>
            <textarea
              placeholder="Enter here..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div className="input-div">
            <p>Expiration Date</p>
            <input
              type={"date"}
              onChange={(e) => setExpireIn(e.target.value)}
              required
            />
          </div>
          <button className="submit-btn" type="submit">
            {loading ? <ClipLoader color="#fff" /> : "Send"}
          </button>
        </form>
      </section>
    </section>
  );
};

export default HOC(CreateNotificatoin);
