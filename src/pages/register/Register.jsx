import { Link } from "react-router-dom"
import "./register.css"
import { useState } from "react"
import axios from "axios"


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setsetPassword] = useState("");
  const [error, setError] = useState(false)
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    try {
      const response = await axios.post("api/auth/register", {
        username,
        email,
        password
      });
      console.log(response)
      console.log(window.location)
      if (response.status === 200) {
        window.location.replace("/login");
      }
      // history.push("/BlogApp/login");
    } catch(e) {
      console.log(e)
      setError(true)
    }
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          className="registerInput" 
          type="text" 
          placeholder="Enter your username..."
          onChange={e=>setUsername(e.target.value)}
        />
        <label>Email</label>
        <input 
          className="registerInput" 
          type="text" 
          placeholder="Enter your email..."
          onChange={e=>setEmail(e.target.value)} 
        />
        <label>Password</label>
        <input 
          className="registerInput" 
          type="password" 
          placeholder="Enter your password..." 
          onChange={e=>setsetPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">Register</button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/BlogApp/login">Login</Link>
      </button>
      {error && <span>Something went wrong</span>}
    </div>
  )
}