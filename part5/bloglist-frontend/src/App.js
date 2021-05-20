import React, {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import Login from "./components/Login"
import UserInfo from "./components/UserInfo"
import {doLogin} from './services/login'
import {getAll, add} from "./services/blogs"
import {SuccessMessage, ErrorMessage} from "./components/public/Notification"
import NewBlog from "./components/NewBlog"
import Togglable from "./components/public/Togglable"
import {getTokenFromStorage, setTokenToStorage} from "./services/token"

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
    setLoginForm({...loginForm, username: evt.target.value.trim()})
  }
  const onPasswordChange = (evt) => {
    setLoginForm({...loginForm, password: evt.target.value})
  }

  const loginHandler = async (evt) => {
    evt.preventDefault()
    let {username, password} = loginForm
    username = username.trim()
    if (!username || !password) {
      showErrorMessage('username and password cannot be empty')
      return
    }
    try {
      const token = await doLogin({username, password})
      setToken(token)
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
          const blogs = await getAll(token)
          setBlogs(blogs)
        } catch (e) {
          console.log(e)
          setTokenToStorage('')
          setToken('')
        }
      }
      getBlogs()
    }
  }, [token])

  const logoutHandler = () => {
    window.localStorage.setItem('token', '')
    setToken('')
  }

  const addBlog = async (newBlogObj) => {
    const {title, url, author} = newBlogObj
    if (!title || !url) {
      showErrorMessage('title and url cannot be empty')
      return
    }
    try {
      const newBlog = await add(newBlogObj, token)
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
      <Login values={{...loginForm, errorMessage, successMessage}}
             events={{onUsernameChange, onPasswordChange, loginHandler}}/>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <ErrorMessage message={errorMessage}/>
        <SuccessMessage message={successMessage}/>
        <UserInfo loginForm={loginForm} logoutHandler={logoutHandler}/>
        {newBlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>,
        )}
      </div>
    )
  }
}

export default App
