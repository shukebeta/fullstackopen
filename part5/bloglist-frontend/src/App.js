import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import UserInfo from './components/UserInfo'
import { doLogin } from './services/login'
import { getAll, add } from './services/blogs'
import { SuccessMessage, ErrorMessage } from './components/public/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/public/Togglable'
import { getTokenFromStorage, setTokenToStorage, setUserIdToStorage } from './services/token'
import { like } from './services/users'
import { remove } from './services/blogs'

const App = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState('')
  const [blogs, setBlogs] = useState([])
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })
  const newBlogRef = useRef()

  const onUsernameChange = (evt) => {
    setLoginForm({ ...loginForm, username: evt.target.value.trim() })
  }
  const onPasswordChange = (evt) => {
    setLoginForm({ ...loginForm, password: evt.target.value })
  }

  const loginHandler = async (evt) => {
    evt.preventDefault()
    let { username, password } = loginForm
    username = username.trim()
    if (!username || !password) {
      showErrorMessage('username and password cannot be empty')
      return
    }
    try {
      const user = await doLogin({ username, password })
      setToken(user.token)
      setTokenToStorage(token)
      setUserIdToStorage(user.id)
    } catch (e) {
      console.log(e)
      showErrorMessage('wrong username or password')
    }
  }

  useEffect(() => {
    const savedToken = getTokenFromStorage()
    if (token && !savedToken) {
      setTokenToStorage(token)
    }
    if (!token && savedToken) {
      setToken(savedToken)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      const getBlogs = async () => {
        try {
          let blogs = await getAll()
          blogs = blogs.sort((x, y) => y.likes - x.likes)
          setBlogs(blogs)
        } catch (e) {
          console.log(e)
          logoutHandler()
        }
      }
      getBlogs()
    }
  }, [token])

  const logoutHandler = () => {
    setTokenToStorage('')
    setUserIdToStorage('')
    setToken('')
  }

  const addBlog = async (newBlogObj) => {
    const { title, url, author } = newBlogObj
    if (!title || !url) {
      showErrorMessage('title and url cannot be empty')
      return
    }
    try {
      const newBlog = await add(newBlogObj)
      newBlogRef.current.hide()
      setBlogs([...blogs, newBlog])
      showSuccessMessage(`a new blog "${title} by ${author} added`)
    } catch (e) {
      showErrorMessage(e.message)
    }
  }

  const showSuccessMessage = (message, timeout = 3000) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), timeout)
  }

  const showErrorMessage = (message, timeout = 3000) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(''), timeout)
  }

  const addLike = (blogId) => async () => {
    try {
      const updatedBlog = await like(blogId)
      const blog = blogs.find(_ => _.id === blogId)
      blog.likes = updatedBlog.likes
      setBlogs(blogs.map(_ => _.id === blogId ? blog : _))
    } catch (e) {
      showErrorMessage(e.message)
    }
  }

  const del = (blog) => async () => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      try {
        await remove(blog.id)
        setBlogs(blogs.filter(_ => _.id !== blog.id))
      } catch (e) {
        showErrorMessage(e.message)
      }
    }
  }

  const newBlogForm = () => {
    const newBlogButtonTitle = 'new blog'
    return (
      <Togglable buttonLabel={newBlogButtonTitle} ref={newBlogRef}>
        <NewBlog addBlog={addBlog}/>
      </Togglable>
    )
  }

  if (!token) {
    return (
      <Login values={{ ...loginForm, errorMessage, successMessage }}
        events={{ onUsernameChange, onPasswordChange, loginHandler }}/>
    )
  } else {
    return (
      <div className="blogList">
        <h2>blogs</h2>
        <ErrorMessage message={errorMessage}/>
        <SuccessMessage message={successMessage}/>
        <UserInfo loginForm={loginForm} logoutHandler={logoutHandler}/>
        {newBlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} del={del}/>,
        )}
      </div>
    )
  }
}

export default App
