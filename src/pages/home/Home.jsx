import { useState, useEffect } from "react"
import { useLocation } from "react-router"
import axios from "axios"

import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sideBar/Sidebar'
import './home.css'


export default function Home() {

  const [posts, setPosts] = useState([])
  const { search } = useLocation();
  // console.log(location)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/BlogApp/api/posts"+search)
        setPosts(res.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    fetchPosts()
  }, [search])
  return (
    <>
      <Header/>
      <div className='home'>
        <Posts 
          posts={posts}  
        />
        <Sidebar />
      </div>
    </>
  )
}
