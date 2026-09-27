/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  BackBtn,
  SectionHeading,
  Skeleton,
} from "../../Components/HelpingComponent";
import HOC from "../../Layouts/HOC";
import { useParams } from "react-router-dom";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { QueryReply } from "../../Components/Modals";

const TicketDetails = () => {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageRes, setMessageRes] = useState({});

  const fetchHandler = useCallback(() => {
    getApi(endPoints.Queries.getById(id), {
      setResponse,
      setLoading,
    });
  }, [id]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <section>
      <QueryReply
        show={open}
        handleClose={() => setOpen(false)}
        data={messageRes}
        fetchHandler={fetchHandler}
        contactId={id}
      />
      <div
        className="flexbox-container"
        style={{ gap: "10px", alignItems: "center" }}
      >
        <BackBtn />
        <SectionHeading title={"Ticket Detail"} />
      </div>

      <div className="ticket-detail mt-3">
        {loading ? (
          Array.from({ length: 7 }).map((_, i) => (
            <div className="value-container" key={`ticket-skeleton${i}`}>
              <Skeleton width="130px" height="12px" />
              <Skeleton
                width="55%"
                height="16px"
                style={{ marginTop: "8px", marginBottom: "10px" }}
              />
            </div>
          ))
        ) : (
          <>
            <div className="value-container">
              <p className="label">Ticket Id</p>
              <p className="value">#{response?.data?._id?.slice(-4)}</p>
            </div>
            <div className="value-container">
              <p className="label">Ticket Status </p>
              <p className="value"> {response?.data?.status} </p>
            </div>

            {response?.data?.messages?.map((i, index) => (
          <div
            key={index}
           className="message-box"
          >
            <div className="value-container">
              <p className="label">Message</p>
              <p className="value"> {i?.message}</p>
            </div>
            {i?.reply ? (
              <div className="value-container">
                <p className="label">Reply</p>
                <p className="value"> {i?.reply} </p>
              </div>
            ) : (
              <button
                className="reply-msg"
                onClick={() => {
                  setMessageRes(i);
                  setOpen(true);
                }}
              >
                Reply
              </button>
            )}
          </div>
        ))}

        <div className="value-container">
          <p className="label">Complained By </p>
          <p className="value"> {response?.data?.fullName} </p>
        </div>
        <div className="value-container">
          <p className="label"> Sender email address </p>
          <p className="value"> {response?.data?.email} </p>
        </div>
        <div className="value-container">
          <p className="label"> Sender mobile number </p>
          <p className="value"> {response?.data?.mobileNumber} </p>
        </div>
        <div className="value-container">
          <p className="label">Date of complaint</p>
          <p className="value"> {response?.data?.createdAt?.slice(0, 10)} </p>
        </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HOC(TicketDetails);
