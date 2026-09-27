/** @format */

import { useNavigate } from "react-router-dom";
import { graphDown, graphUp } from "../../assest";

const TicketCards = ({
  className,
  id,
  subTitle,
  by,
  createdAt,
  status,
  mainId,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`ticket-card ${className}`}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/ticket-detail/${mainId}`)}
    >
      <p className="id">#{id}</p>
      <div className="flex-cont">
        <div className="content">
          <p className="title">Sub: {subTitle}</p>
          <p className="author">By : {by} </p>
        </div>
        <div className="status">
          <p className="open-badge"> {status} </p>
          <p className="date"> {createdAt} </p>
        </div>
      </div>
    </div>
  );
};

const TrendingCard = ({ className, title, subTitle, images = [] }) => {
  return (
    <div className={`trending-photos ${className}`}>
      <div className="head">
        <p className="heading"> {title} </p>
        <select>
          <option>Today</option>
        </select>
      </div>
      <p className="sub-title"> {subTitle} </p>
      <div className="flex-container">
        {images.map((i, index) => (
          <img src={i} key={`trending${index}`} alt="" />
        ))}
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  count,
  percentage,
  isUp,
  bg,
  icon,
  color,
  onClickEvent,
}) => {
  return (
    <div
      className="dashboard-card"
      style={{ cursor: onClickEvent ? "pointer" : "default" }}
      onClick={onClickEvent}
    >
      <div className="icon-badge" style={bg ? { backgroundColor: bg } : undefined}>
        <i className={icon || "fa-solid fa-users"} style={color ? { color } : undefined}></i>
      </div>
      <div className="counts">
        <p className="sub-heading">{title}</p>
        <p className="heading">{count}</p>
      </div>
      {percentage ? (
        <div className={`up-skill ${isUp ? "up" : "down"}`}>
          <p className="count">{percentage}</p>
          {isUp ? <img src={graphUp} alt="" /> : <img src={graphDown} alt="" />}
        </div>
      ) : null}
    </div>
  );
};

export { TicketCards, TrendingCard, DashboardCard };
