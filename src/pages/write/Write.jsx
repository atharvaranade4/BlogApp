import axios from "axios";
import "./write.css";
import { useState, useContext } from "react"
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const {user} = useContext(Context)

  // console.log(file)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image.");
      return;
    }
    
    const formData = new FormData();
    console.log("Title:", title);
    console.log("Desc:", desc);
    console.log("User:", user);
    
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("username", user.username);
    formData.append("blogImage", file);

    console.log("FORMDATA", Object.fromEntries(formData.entries()));

    try {
      const res = await axios.post("api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  
  return (
    <div className="write">
      { file && 
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />
      }
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input 
            id="fileInput" 
            type="file" 
            style={{ display: "none" }} 
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={ e => setTitle(e.target.value) }
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={ e => setDesc(e.target.value) }
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}