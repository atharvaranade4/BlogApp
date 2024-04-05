import Post from "../post/Post"
import "./posts.css"
import PropTypes from 'prop-types';

export default function Posts({posts}) {
  return (
    <div className="posts">
      {posts.map((p, index)=> (
        <Post
          key={index}
          post={p}
        />
      ))}
    </div>
  )
}

Posts.propTypes = {
  posts:PropTypes.array.isRequired
};
