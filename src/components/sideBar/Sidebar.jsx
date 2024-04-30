import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import UserCard from "../UserCard/UserCard";

function App() {
  const [users, setUsers] = useState([]);
  const [usersWithImage, setUsersWithImage] = useState([]);
  const [usersWithoutImage, setUsersWithoutImage] = useState([]);
  const [images, setImages] = useState([]); // Image data

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
        console.log(users)

        // Filter users with and without images
        const usersWithImg = res.data.filter(user => user.profileImage && user.profileImage.data !== '');
        const usersWithoutImg = res.data.filter(user => !user.profileImage || !user.profileImage.data);

        // Set users with and without images
        setUsersWithImage(usersWithImg);
        setUsersWithoutImage(usersWithoutImg);

        // Set image data
        const imageData = usersWithImg.map(user => `data:image/png;base64,${user.profileImage.data}`);
        setImages(imageData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>Contributors</h1>
      <div className="user-list">
        {usersWithImage.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>

      <div>
        {usersWithoutImage.map((user, index) => (
        <Link key={index} to={`/?user=${user.username}`} className="link">
          <div key={user._id}>{user.username}</div>
        </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
