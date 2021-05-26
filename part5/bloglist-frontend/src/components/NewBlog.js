import React, { useState } from 'react'

const NewBlog = ({ addBlog }) => {
  const emptyBlog = {
    title: '',
    author: '',
    url: '',
  }
  const [blog, setBlog] = useState({
    ...emptyBlog,
  })

  const onFieldChange = (fieldName) => (evt) => {
    const newValue = { ...blog }
    newValue[fieldName] = evt.target.value
    setBlog(newValue)
  }

  const submitBlog = async (event) => {
    event.preventDefault()
    await addBlog({ ...blog })
    setBlog({ ...emptyBlog })
  }

  return (
    <form onSubmit={submitBlog}>
      <div>title: <input className="new-blog-title" value={blog.title} onChange={onFieldChange('title')}/></div>
      <div>author: <input className="new-blog-author" value={blog.author} onChange={onFieldChange('author')}/></div>
      <div>url: <input className="new-blog-url" value={blog.url} onChange={onFieldChange('url')}/></div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default NewBlog
