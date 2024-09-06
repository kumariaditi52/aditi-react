import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  })
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error("Error parsing JWT", e);
      return null;
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
        const payload = parseJwt(token);
        if (!payload || !payload.userId) {
          console.error("Invalid token payload");
          return;
        }
        const userId = payload.userId;
        try {
          // const token = localStorage.getItem('authToken');
          const response = await axios.get(`/api/userProfile?userId=${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUserInfo(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchUserData();
  }, [])

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  }



  return (
    <>
      <div className="container">
        <div className="navbar">
        </div>
        <div className="profile-header">
          <h1>Profile Settings</h1><hr />
        </div>
        <button onClick={toggleEditMode}>Edit</button>
        {isAuthenticated ? (
          <>
            <table>
              <tbody>
                <tr><td><b>UserName :</b></td>
                  <td>{isEditMode ? (
                    <input type="text" value={userInfo.username} onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} />
                  ) : (
                    userInfo.username
                  )}</td>
                </tr>
                <tr><td><b>Email :</b></td>
                  <td>{isEditMode ? (
                    <input type="email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                  ) : (
                    userInfo.email
                  )}</td>
                </tr>
                <tr><td><b>Phone No :</b></td>
                  <td>{isEditMode ? (
                    <input type="number" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
                  ) : (
                    userInfo.phone
                  )}</td>
                </tr>
                <tr><td><b>Address :</b></td>
                  <td>{isEditMode ? (
                    <input type="text" value={userInfo.address} onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} />
                  ) : (
                    userInfo.address
                  )}</td>
                </tr>
                <tr><td><b> City :</b></td>
                  <td>{isEditMode ? (
                    <input type="text" value={userInfo.city} onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })} />
                  ) : (
                    userInfo.city
                  )}</td>
                </tr>
                <tr><td><b> State :</b></td>
                  <td>{isEditMode ? (
                    <input type="text" value={userInfo.state} onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })} />
                  ) : (
                    userInfo.state
                  )}</td>
                </tr>
                <tr><td><b> PIN Code :</b></td>
                  <td>{isEditMode ? (
                    <input type="Number" value={userInfo.pin} onChange={(e) => setUserInfo({ ...userInfo, pin: e.target.value })} />
                  ) : (
                    userInfo.pin
                  )}</td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div><h1>Please Login First</h1></div>
          </>
        )}
      </div>
    </>
  )
}

export default Profile;