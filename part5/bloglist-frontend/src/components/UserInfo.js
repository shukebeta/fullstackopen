const UserInfo = ({loginForm, logoutHandler}) => (
  <p>{loginForm.username} logged in <button type="button" onClick={logoutHandler}>logout</button></p>
)
export default UserInfo
