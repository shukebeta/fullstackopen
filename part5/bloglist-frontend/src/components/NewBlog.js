import React from 'react'

const NewBlog = ({values, events}) => {
  return (
    <form onSubmit={events.onSubmitBlog}>
      <div>title: <input value={values.blog.title} onChange={events.onFieldChange('title')}/></div>
      <div>author: <input value={values.blog.author} onChange={events.onFieldChange('author')}/></div>
      <div>url: <input value={values.blog.url} onChange={events.onFieldChange('url')}/></div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default NewBlog
