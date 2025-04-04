import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUsers, retrieveUser } from '../api/userAPI';
import { UserProfileData } from '../interfaces/UserProfileData';

const EditProfile= () => {
  const [user, setUser] = useState<UserProfileData | undefined>();

  const navigate = useNavigate();
  const { state } = useLocation();

  const fetchUser = async (userId: UserProfileData) => {
    try {
      const data = await retrieveUser(userId.id);
      setUser(data);
    } catch (err) {
      console.error('Failed to retrieve ticket:', err);
    }
  }

  useEffect(() => {
    fetchUser(state);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user && user.id !== null){
      updateUsers(user.id, user);
      navigate('/');
    }
    else{
      console.error('Ticket data is undefined.');
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  return (
    <>
      <div className='form-container'>
        {
          user ? (
            <form className='form' onSubmit={handleSubmit}>
              <h1>Edit User</h1>
              <label htmlFor='tName'>User Name</label>
              <input
                id='tName'
                name='userName'
                value={user.userName || ''}
                onChange={handleChange}
                />
              <button type='submit'>Update</button>
            </form>
          ) : (
            <div>Issues fetching ticket</div>
          )
        }
      </div>  
    </>
  );
};

export default EditProfile;
