import { useEffect, useState } from 'react'
import './singlePost.css'
import axios from "axios"
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

export default function SinglePost() {
  const location = useLocation()

  // Get post _id
  const path = location.pathname.split("/")[2]
  console.log(path)
  const [post, setPost] = useState({})

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path)
      setPost(res.data)
    }
    getPost()
  }, [path])

  // USING FETCH instead of AXIOS
  
  //   useEffect(() => {    
  //     let url = `http://localhost:5000/api/posts/${path}`
  //     console.log(url)
  //     fetch(url) 
  //     .then(response => response.json())
  //     .then(data => {
  //       setPost(data)
  //     })
  //     .catch((error) =>{
  //     console.log(error)
  //     })
  // }, [path])

  return (    
    <div className='singlePost'>
      <div className="singlePostWrapper">
        { post.photo && (
          <img 
          className='singlePostImg'
          src = {post.photo}
          alt=""
          />
        )}
        <h1 className="singlePostTitle">
          {post.title}
        </h1>
        <div className="singlePostEdit">
          <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
          <i className="singlePostIcon fa-solid fa-trash"></i>
        </div>
        <div className="singlePostInfo">
          <span className='singlePostAuthor'>Author:
            <Link to={`/?user=${post.username}`} className='Link'>            
              <b>{post.username}</b>
            </Link>
          </span>
          <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className='singlePostDesc'>
          {post.desc}
        </p>
      </div>
    </div>
  )
}
