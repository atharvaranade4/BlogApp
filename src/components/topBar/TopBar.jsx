import { Link } from "react-router-dom";
import "./topbar.css";
import { Context } from '../../context/Context'
import { useContext, useEffect, useState } from 'react'
import axios from "axios";

export default function Topbar() {
  const { user, dispatch } = useContext(Context)
  const [image, setImage] = useState("")

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        try {
          const res = await axios.get("/api/users/" + user._id)
          setImage(res.data.profileImage ? `data:${res.data.profileImage.contentType};base64,${res.data.profileImage.data}` : "");
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      getUser();
    }
  }, [user])

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li>
          {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={image}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
