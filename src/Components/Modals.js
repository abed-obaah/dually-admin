/** @format */
import { Offcanvas, Modal, Button } from "react-bootstrap";
import { verticalLogo } from "../assest";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "../constant/constant";
import { useEffect, useState } from "react";
import { getApi, postApi, putApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { ClipLoader } from "react-spinners";
import { LogoutHandler } from "../utils/utils";

const MobileBar = ({ show, handleClose }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getApi(endPoints.auth.myProfile, {
      setResponse: setProfile,
    });
  }, []);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <section className="sidebar" style={{ width: "100%" }}>
          <div className="logo-container">
            <img src={verticalLogo} alt="" />
          </div>

          <div className="links">
            {sidebarLinks.map((i, index) => (
              <div
                className={`item ${pathname === i.link ? "active" : ""}`}
                onClick={() => { navigate(i.link); handleClose(); }}
                key={index}
              >
                <i className={i.icon}></i>

                <p> {i.title} </p>
              </div>
            ))}
          </div>

          <div className="admin-detail">
            <div
              className="profile"
              onClick={() => navigate("/update-profile")}
            >
              <img src={profile?.data?.user?.image} alt="" />
              <div>
                <p className="name"> {profile?.data?.user?.fullName} </p>
                <p className="admin-badge">Admin</p>
              </div>
            </div>

            <div className="log-out" onClick={() => LogoutHandler(navigate)}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <p>Log out</p>
            </div>
          </div>
        </section>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const EditNotification = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="my-modal">
        <div className="head">
          <p className="title">Edit notification</p>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <section className="update-profile-section space-bg">
          <form>
            <div className="input-div">
              <p>Title</p>
              <input type={"text"} />
            </div>
            <div className="input-div">
              <p>Content</p>
              <textarea />
            </div>
            <div className="input-div">
              <p>Status</p>
              <select>
                <option>Read</option>
                <option>Unread</option>
              </select>
            </div>
            <button className="submit-btn">Update</button>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

const EditSupport = ({ show, handleClose, isEdit, fetchHandler, id }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [website1, setWebsite1] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [prevData, setPrevData] = useState({});

  const payload = {
    mobileNumber,
    email,
    address,
    website,
    website1,
    desc,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const additionalFunctions = [handleClose, fetchHandler];

    if (isEdit) {
      putApi(endPoints.help.edit(id), payload, {
        successMsg: "Updated !",
        additionalFunctions,
        setLoading,
      });
    } else {
      postApi(endPoints.help.create, payload, {
        successMsg: "Success !",
        additionalFunctions,
        setLoading,
      });
    }
  };

  useEffect(() => {
    if (show && id && isEdit) {
      getApi(endPoints.help.getById(id), {
        setResponse: setPrevData,
      });
    }
  }, [show, id, isEdit]);

  useEffect(() => {
    if (isEdit && prevData && show) {
      const item = prevData?.data;
      setMobileNumber(item?.mobileNumber);
      setEmail(item?.email);
      setAddress(item?.address);
      setWebsite(item?.website);
      setWebsite1(item?.website1);
      setDesc(item?.desc);
    } else {
      setAddress("");
      setMobileNumber("");
      setEmail("");
      setWebsite("");
      setWebsite1("");
      setDesc("");
    }
  }, [isEdit, prevData, show]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="my-modal edit-help-support-mod">
        <div className="head">
          <p className="title">
            {" "}
            {isEdit ? "Edit help & support" : "Add new"}{" "}
          </p>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <section className="update-profile-section space-bg">
          <form onSubmit={submitHandler}>
            <div className="flexbox-container">
              <div className="input-div">
                <p>Mobile No</p>
                <input
                  type={"tel"}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  value={mobileNumber}
                />
              </div>
              <div className="input-div">
                <p>Email</p>
                <input
                  type={"email"}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="input-div">
                <p>Address</p>
                <input
                  type={"text"}
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>

              <div className="input-div">
                <p>Website</p>
                <input
                  type={"text"}
                  onChange={(e) => setWebsite(e.target.value)}
                  value={website}
                />
              </div>

              <div className="input-div">
                <p>Another Website</p>
                <input
                  type={"text"}
                  onChange={(e) => setWebsite1(e.target.value)}
                  value={website1}
                />
              </div>
            </div>
            <div className="input-div">
              <p>Description</p>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </div>

            <button className="submit-btn">
              {loading ? (
                <ClipLoader color="#fff" />
              ) : isEdit ? (
                "Update"
              ) : (
                "Create new"
              )}
            </button>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

const ViewSupport = ({ show, handleClose, id }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (show && id) {
      getApi(endPoints.help.getById(id), {
        setResponse: setData,
      });
    }
  }, [id, show]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="my-modal edit-help-support-mod">
        <div className="head">
          <p className="title"></p>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <section className="update-profile-section space-bg">
          <form>
            <div className="flexbox-container">
              <div className="input-div">
                <p>Mobile No</p>
                <p className="default-value">{data?.data?.mobileNumber}</p>
              </div>
              <div className="input-div">
                <p>Email</p>
                <p className="default-value">{data?.data?.email}</p>{" "}
              </div>
              <div className="input-div">
                <p>Address</p>
                <p className="default-value">{data?.data?.address}</p>
              </div>
              <div className="input-div">
                <p>Website</p>
                <p className="default-value">{data?.data?.website}</p>
              </div>
              <div className="input-div">
                <p>Another Website</p>
                <p className="default-value">{data?.data?.website1}</p>
              </div>
            </div>
            <div className="input-div">
              <p>Description</p>{" "}
              <p className="default-value">{data?.data?.desc}</p>
            </div>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

const EditFaq = ({ show, handleClose, id, fetchHandler }) => {
  const [response, setResponse] = useState({});
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && id) {
      getApi(endPoints.faq.getbyId(id), {
        setResponse,
      });
    }
  }, [show, id]);

  useEffect(() => {
    if (response) {
      setQuestion(response?.data?.question);
      setAnswer(response?.data?.answer);
    }
  }, [response]);

  const payload = {
    answer,
    question,
    userType: "ADMIN",
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.faq.edit(id), payload, {
      setLoading,
      additionalFunctions: [handleClose, fetchHandler],
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="my-modal edit-help-support-mod">
        <div className="head">
          <p className="title">Edit FAQ</p>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <section className="update-profile-section space-bg">
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

            <button className="submit-btn">
              {loading ? <ClipLoader color="#fff" /> : "Update"}
            </button>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

const ViewFaq = ({ show, handleClose, id }) => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (show && id) {
      getApi(endPoints.faq.getbyId(id), {
        setResponse,
      });
    }
  }, [show, id]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="my-modal edit-help-support-mod">
        <div className="head">
          <p className="title">FAQ</p>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <section className="update-profile-section space-bg">
          <form>
            <div className="input-div">
              <p>Question</p>
              <input
                type={"text"}
                defaultValue={response?.data?.question}
                disabled
              />
            </div>

            <div className="input-div">
              <p>Answer</p>
              <textarea defaultValue={response?.data?.answer} disabled />
            </div>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

const QueryReply = ({ show, handleClose, fetchHandler, data, contactId }) => {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    contactId,
    reply,
    messageId: data?._id,
  };
  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.Queries.sendResponse, payload, {
      successMsg: "Success !",
      setLoading,
      additionalFunctions: [handleClose, fetchHandler],
    });
  };

  console.log(data);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="my-modal edit-help-support-mod">
        <div className="head">
          <p className="title">Give Response</p>
          <i className="fa-solid fa-xmark" onClick={handleClose}></i>
        </div>
        <section className="update-profile-section space-bg">
          <form onSubmit={submitHandler}>
            <div className="input-div">
              <p>Query</p>
              <textarea disabled defaultValue={data?.message} />
            </div>
            <div className="input-div">
              <p>Your Response</p>
              <textarea
                required
                placeholder="Write here"
                onChange={(e) => setReply(e.target.value)}
                value={reply}
              />
            </div>

            <button className="submit-btn" type="submit">
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
            </button>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};


const Imagepreview = ({ show, onHide, handleDownload, selectedImage }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Image Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="image-preview-container">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="preview"
              className="image-preview"
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDownload}>
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export {
  MobileBar,
  EditNotification,
  EditSupport,
  EditFaq,
  ViewSupport,
  QueryReply,
  ViewFaq,
  Imagepreview
};
