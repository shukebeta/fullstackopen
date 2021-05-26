import React, { useState } from 'react'
import { getUserIdFromStorage } from '../services/token'

const Blog = ({ blog, addLike, del }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? 'block' : 'none' }
  const toggle = () => {
    setVisible(!visible)
  }
  const hide = () => {
    setVisible(false)
  }
  return (
    <>
      <div className="blogItem">
        <p>{blog.title} {blog.author}
          <button type="button" onClick={toggle}>view</button>
        </p>
      </div>
      <div className="blogDetail" style={showWhenVisible}>
        <p>{blog.title}
          <button type="button" onClick={hide}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>Likes {blog.likes}
          <button type="button" onClick={addLike(blog.id)}>like</button>
        </p>
        {
          getUserIdFromStorage() === blog.user.id &&
          <button type="button" onClick={del(blog)}>remove</button>
        }
      </div>
    </>
  )
}

export default Blog
