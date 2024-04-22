import { useEffect, useState } from 'react'
import axios from "axios"
import './sidebar.css'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories/")
      // console.log(res.data)
      setCats(res.data)
    }
    getCats()
  }, [])
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <div className="sidebarTitle">ABOUT ME</div>
        <img 
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor expedita consequatu</p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((cat, index) => (
            <Link key={index} to={`/?cat=${cat.name}`} className='link'>
              <li className='sidebarListItem'>{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>  

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
        </div>
      </div>
    </div>
  )
}
