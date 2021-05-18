import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Login from "./components/Login"
import UserInfo from "./components/UserInfo"
import {doLogin} from './services/login'
import {getAll, add} from "./services/blogs"
import {SuccessMessage, ErrorMessage} from "./components/Notification"
import NewBlog from "./components/NewBlog"

const App = () => {
  const [token, setToken] = useState('')

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })
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
    const key = 'token'
    const savedToken = window.localStorage.getItem(key)
    if (token && !savedToken) {
      window.localStorage.setItem(key, token)
    }
    if (!token && savedToken) {
      setToken(savedToken)
    }
  }, [token])

  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    if (token) {
      const getBlogs = async () => {
        const blogs = await getAll(token)
        setBlogs(blogs)
      }
      getBlogs()
    }
  }, [token])

  const logoutHandler = () => {
    window.localStorage.setItem('token', '')
    setToken('')
  }

  const emptyBlog = {
    title: '',
    author: '',
    url: '',
  }
  const [blog, setBlog] = useState({
    ...emptyBlog,
  })

  const onFieldChange = (fieldName) => (evt) => {
    const newValue = {...blog}
    newValue[fieldName] = evt.target.value
    setBlog(newValue)
  }

  const [showNewBlogForm, setShowNewBlogForm] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const showSuccessMessage = (message, timeout = 3000) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), timeout)
  }

  const showErrorMessage = (message, timeout = 3000) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(''), timeout)
  }

  const onSubmitBlog = async (evt) => {
    evt.preventDefault()
    const {title, url, author} = blog
    if (!title || !url) {
      showErrorMessage('title and url cannot be empty')
      return
    }
    try {
      const newBlog = await add(blog, token)
      setBlog({...emptyBlog})
      setBlogs([...blogs, newBlog])
      showSuccessMessage(`a new blog "${title} by ${author} added`)
    } catch (e) {
      showErrorMessage(e.message)
    }
  }

  if (!token) {
    return (
      <Login values={{...loginForm, errorMessage, successMessage}} events={{onUsernameChange, onPasswordChange, loginHandler}}/>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <ErrorMessage message={errorMessage}/>
        <SuccessMessage message={successMessage}/>
        <UserInfo loginForm={loginForm} logoutHandler={logoutHandler}/>
        <button onClick={() => setShowNewBlogForm(!showNewBlogForm)}>add blog</button>
        <NewBlog values={{blog, showNewBlogForm}} events={{onFieldChange, onSubmitBlog}}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>,
        )}
      </div>
    )
  }
}

export default App
