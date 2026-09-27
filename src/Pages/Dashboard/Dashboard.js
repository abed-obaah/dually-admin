/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { DashboardCard, TicketCards } from "../../Components/Cards/AllCards";
import TableLayout from "../../Components/TableLayout";
import HOC from "../../Layouts/HOC";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { Link } from "react-router-dom";
import { Imagepreview } from "../../Components/Modals";


const showMsg = (data) => {
  const text = data?.slice()?.reverse()?.[0]?.message;
  if (text?.length > 30) {
    return `${text?.substring(0, 30)}...`;
  } else {
    return text;
  }
};

const Dashboard = () => {
  const [count, setCount] = useState({});
  const [blockedUser, setBlockedUser] = useState({});
  const [tickets, setTickets] = useState({});
  const [trendingPhotos, setTrendingPhotos] = useState({});
  const [photosFilter, setPhotosFilter] = useState("");
  const [trendingVideo, setTrendingVideo] = useState({});
  const [videoFilter, setVideoFilter] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getTrendingPhotos = useCallback(() => {
    getApi(endPoints.trending.photos(photosFilter), {
      setResponse: setTrendingPhotos,
    });
  }, [photosFilter]);

  const getTrendingVideo = useCallback(() => {
    getApi(endPoints.trending.photos(videoFilter), {
      setResponse: setTrendingVideo,
    });
  }, [videoFilter]);

  const fetchHandler = () => {
    getApi(endPoints.users.allUser({ isVerified: true, limit: 50 }), {
      setResponse: setBlockedUser,
    });
  };

  const fetchCounts = () => {
    getApi(endPoints.dashboard.userCount, {
      setResponse: setCount,
    });
  };

  const fetchTickets = () => {
    getApi(endPoints.Queries.getAll, {
      setResponse: setTickets,
    });
  };

  useEffect(() => {
    fetchCounts();
    fetchHandler();
    fetchTickets();
  }, []);

  useEffect(() => {
    getTrendingPhotos();
  }, [getTrendingPhotos]);

  useEffect(() => {
    getTrendingVideo();
  }, [getTrendingVideo]);

  const allTrendingImagePost = trendingPhotos?.data?.filter((i) => i?.image);
  const allTrendingVideoPost = trendingVideo?.data?.filter((i) => i?.video);
  const blockedUserHead = ["Sr.No", "User", "Mobile Number", "Email address"];
  const blockedUserData = blockedUser?.data?.docs
    ?.slice()
    ?.reverse()
    ?.slice(0, 5)
    ?.map((i, index) => [
      `#${index + 1}`,
      <Link to={`/users/${i?._id}`}>{i?.fullName}</Link>,
      i?.mobileNumber,
      i?.email,
    ]);

  const ticketData = tickets?.data
    ?.slice()
    ?.reverse()
    ?.slice(0, 5)
    ?.map((i) => ({
      id: i?._id?.slice(-4),
      by: i?.fullName,
      subTitle: showMsg(i?.messages),
      createdAt: i?.createdAt?.slice(0, 10),
      status: i?.status,
      mainId: i?._id,
    }));

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setShowModal(true);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedImage;
    link.download = "trending-photo.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <>
      <Imagepreview
        show={showModal}
        onHide={() => setShowModal(false)}
        handleDownload={handleDownload}
        selectedImage={selectedImage}
      />
      <section className="dashboard">
        <div className="flexbox-container">
          <DashboardCard
            title={"Total Users"}
            count={count?.data?.users}
            icon={"fa-solid fa-users"}
            bg={"#EFF4FB"}
            color={"#4318ff"}
          />
          <DashboardCard
            title={"Active Users"}
            count={count?.data?.activeUser}
            icon={"fa-solid fa-user-check"}
            bg={"#D0FFE0"}
            color={"#05cd99"}
          />
          <DashboardCard
            title={"Inactive Users"}
            count={count?.data?.inactiveUser}
            icon={"fa-solid fa-user-clock"}
            bg={"#EAECF2"}
            color={"#707eae"}
          />
          <DashboardCard
            title={"Blocked/Reported Users"}
            count={count?.data?.blockedUser}
            icon={"fa-solid fa-user-slash"}
            bg={"#FFD0D1"}
            color={"#ee5d50"}
          />
        </div>

        <div
          className="flexbox-container mt-4"
          style={{ alignItems: "flex-start" }}
        >
          <div
            className="space-bg highly-blocked-user-table"
            style={{ maxWidth: "100%" }}
          >
            <p className="table-heading">Highly blocked user </p>
            <TableLayout
              thead={blockedUserHead}
              tbody={blockedUserData}
              className={"mt-4"}
            />
          </div>

          <div
            className="space-bg tickets-container"
            style={{ maxWidth: "100%" }}
          >
            <p className="heading">Recent Tickets</p>
            <p className="sub-heading mt-2 mb-2">
              This will show the newest tickets raised
            </p>

            {ticketData?.map((i, index) => (
              <TicketCards
                className={`${index + 1 !== 1 ? "mt-3" : ""}`}
                key={`ticket${index}`}
                id={i?.id}
                subTitle={i?.subTitle}
                by={i?.by}
                createdAt={i?.createdAt}
                status={i?.status}
                mainId={i?.mainId}
              />
            ))}
          </div>
        </div>

        <div className="flexbox-container mt-4">
          <div
            className={`trending-photos space-bg`}
            style={{ maxWidth: "100%" }}
          >
            <div className="head">
              <p className="heading"> Trending photos </p>
              <select onChange={(e) => setPhotosFilter(e.target.value)}>
                <option value="">All</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
            {photosFilter && (
              <p className="sub-title"> Trending photos of {photosFilter} </p>
            )}
            <div className="flex-container">
              {allTrendingImagePost?.map((i, index) => (
                <img
                  src={i?.image}
                  key={`trending${index}`}
                  alt="thumbnail not found"
                  style={{ height: "278px", objectPosition: "top", cursor: "pointer" }}
                  onClick={() => handleImageClick(i?.image)}
                />
              ))}

            </div>
          </div>

          <div
            className={`trending-photos space-bg`}
            style={{ maxWidth: "100%" }}
          >
            <div className="head">
              <p className="heading"> Trending videos </p>
              <select onChange={(e) => setVideoFilter(e.target.value)}>
                <option value="">All</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
            {videoFilter && (
              <p className="sub-title"> Trending videos of {videoFilter} </p>
            )}
            <div className="flex-container">
              {allTrendingVideoPost?.map((i, index) => (
                <a href={i?.video} target="_blank" rel="noreferrer">
                  <img
                    src={i?.thumbnail}
                    key={`video${index}`}
                    alt={"thumbnail not found"}
                    style={{
                      height: "278px",
                      objectPosition: "top",
                      width: "156px",
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(Dashboard);
