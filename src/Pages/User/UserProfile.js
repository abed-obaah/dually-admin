/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  BackBtn,
  CustomPagination,
  Skeleton,
} from "../../Components/HelpingComponent";
import HOC from "../../Layouts/HOC";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState({});
  const [type, setType] = useState("photos");
  const [photosFilter, setPhotosFilter] = useState("");
  const [page, setPage] = useState(1);

  const removePostHandler = (id) => {
    deleteApi(endPoints.posts.removePost(id), {
      setLoading,
      additionalFunctions: [fetchData, fetchPosts],
      successMsg: "Success !",
    });
  };

  const fetchData = useCallback(() => {
    getApi(endPoints.users.getUserById(id), {
      setResponse: setData,
      setLoading,
    });
  }, [id]);

  const fetchPosts = useCallback(() => {
    getApi(
      endPoints.posts.getPostByUserId({
        id,
        type: photosFilter,
        page,
      }),
      {
        setResponse: setPosts,
      }
    );
  }, [id, photosFilter, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const allImagePosts = posts?.data?.filter((i) => i?.image);
  const allVideoPosts = posts?.data?.filter((i) => i?.video);

  useEffect(() => {
    setPage(1);
  }, [type]);

  return (
    <section className="user-profile-page">
      <BackBtn />
      <div className="user-profile-section">
        <div className="edit-section">
          <div className="edit-icon">
            <Link to={`/edit-user/${id}`}>
              <i className="fa-solid fa-pen"></i>
            </Link>
          </div>
          <div className="img-container">
            <img src={data?.data?.user?.image} alt="" />
          </div>
          <p className="heading mt-2 mb-2">
            {loading ? (
              <Skeleton
                width="140px"
                height="20px"
                style={{ margin: "6px auto" }}
              />
            ) : (
              data?.data?.user?.fullName
            )}
          </p>
          <ul>
            <li>
              {data?.data?.user?.friends?.length || 0}{" "}
              {data?.data?.user?.friends?.length > 1 ? "Friends" : "Friend"}{" "}
            </li>
            <li>
              {" "}
              {type === "photos"
                ? allImagePosts?.length
                : allVideoPosts?.length}{" "}
              Posts
            </li>
          </ul>

          <p className="sub-heading mt-2 mb-1">
            {loading ? (
              <Skeleton
                width="180px"
                height="14px"
                style={{ margin: "6px auto" }}
              />
            ) : (
              data?.data?.user?.email
            )}
          </p>
          <p className="sub-heading mb-2">
            {loading ? (
              <Skeleton
                width="120px"
                height="14px"
                style={{ margin: "0 auto 6px" }}
              />
            ) : (
              data?.data?.user?.mobileNumber
            )}
          </p>

          <button
            className="request-btn"
            onClick={() => navigate(`/users/friend-requests/${id}`)}
          >
            View Friends & Requests
          </button>
          <div className="btn-container">
            <button
              onClick={() => setType("photos")}
              className={`photo ${type === "photos" ? "active" : ""}`}
              type="button"
            >
              Photo
            </button>
            <button
              onClick={() => setType("video")}
              className={`video ${type === "video" ? "active" : ""}`}
              type="button"
            >
              Video
            </button>
          </div>
        </div>
        <div className="remaining">
          <div className="filter-section">
            <select
              onChange={(e) => setPhotosFilter(e.target.value)}
              value={photosFilter}
            >
              <option value="">Filter</option>
              <option value="mostRecent">Most recent</option>
              <option value="mostLike">Most likes</option>
              <option value="mostSaved">Most saved</option>
              <option value="mostShare">Most shared</option>
            </select>
          </div>

          <div className="flexbox-container mt-4">
            {type === "photos"
              ? allImagePosts?.map((i, index) => (
                  <div className="photos-collection" key={`photos${index}`}>
                    <img src={i?.image} alt="thumbnail not found" />{" "}
                    <div className="actions">
                      <div className="icon">
                        <a href={i?.image} target="_blank" rel="noreferrer">
                          <i className="fa-solid fa-eye"></i>
                        </a>
                        <i
                          className="fa-solid fa-trash-can"
                          onClick={() => removePostHandler(i?._id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))
              : allVideoPosts?.map((i, index) => (
                  <div className="photos-collection" key={`video${index}`}>
                    <img src={i?.thumbnail} alt=" thumbnail not found" />

                    <div className="actions">
                      <div className="icon">
                        <a href={i?.video} target="_blank" rel="noreferrer">
                          <i className="fa-solid fa-eye"></i>
                        </a>
                        <i
                          className="fa-solid fa-trash-can"
                          onClick={() => removePostHandler(i?._id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <CustomPagination
            currentPage={page}
            setCurrentPage={setPage}
            hasNextPage={posts?.hasNextPage}
            hasPrevPage={posts?.hasPrevPage}
          />
        </div>
      </div>
    </section>
  );
};

export default HOC(UserProfile);
