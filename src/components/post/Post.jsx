import './post.css'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

export default function Post({post}) {

   return (
    <div className='post'>
      {post.blogImage && (
        <img 
          className='postImg'
          src={`data:${post.blogImage.contentType};base64,${post.blogImage.data}`}
          alt=''
        />
      )}
      <div className="postInfo">
        <div className="postCats">
            {post.categories.map((c, index) => (
              <span key={index} className="postCat">{c.name}</span>
            ))}
        </div>
        <Link to={`/post/${post._id}`} className='link'>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDescription">
        {post.desc}
      </p>
    </div>
  )
}

Post.propTypes = {
    post:PropTypes.object.isRequired
};