import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { ApiMessage } from "../interfaces/ApiMessage";
import { UserProfileData } from "../interfaces/UserProfileData";
import { retrieveUsers, deleteUser } from "../api/userAPI";

const ProfilePage = () => {
    
  const [user, setUsers] = useState<UserProfileData[]>([]);
  
  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to retrieve user', err);
    }
  };

  const deleteIndvUser = async (userId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteUser(userId);
      fetchUsers();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='user-profile'>
      <div className='new-user'>
        <h1>PROFILE PAGE</h1>
        <Link to='/profilepage'>Click to add a new user!</Link>
      </div>
      <div className='user-list'>
        {user ? user.map((user) => (
            <ProfileCard 
              key={user.id}
              id={user.id}
              name={user.userName}
              deleteIndvUser={deleteIndvUser}
            />
          )
        ) : (
            <div>
              Could not retrieve User profile to display! Please check again later. 
            </div>
          )
        }
      </div>
    </div>
  );
};

  // COMPONETS INSIDE PROFILE PAGE: 
  // USER CREDENTIALS: USERNAME, AGE, LOCATION
  // SAVED WATCHLIST CONTENTS + REMOVE FROM WATCHLIST BUTTON/CHOICE
  // USER POSTED REVIEWS 
  // EDIT PROFILE/LOGOFF 
  
  export default ProfilePage;

  

  
