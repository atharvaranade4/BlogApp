import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.css"; // Import UserCard CSS file

const UserCard = ({ user }) => (
  <Link to={`/?user=${user.username}`} className="user-card-link"> {/* Link to user profile */}
    <div className="user-card">
      <b>{user.username}</b>
      <img src={`data:image/png;base64,${user.profileImage.data}`} alt="profile" />
    </div>
  </Link>
);

export default UserCard;