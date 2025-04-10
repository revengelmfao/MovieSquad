import { useState, useEffect, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserProfileData } from '../interfaces/UserProfileData';
import { getUserById, updateUser } from '../api/userAPI';

const EditProfile: React.FC = () => {
    
    const [profileData, setProfileData] = useState({
        image: null,
        username: "",
        email: "",
        password: "",
        bio: "",    
    })

    const [editUser, setEditUser] = useState<UserProfileData | undefined>();
    const [deleteUser, setDeleteUser] = useState<UserProfileData | undefined>();

const navigate = useNavigate();
const { state } = useLocation();
  
const fetchUser = async (userId: UserProfileData) => {
    try {
    const data = await getUserById(userId.userId);
    setEditUser(data);
    } catch (err) {
    console.error('Failed to retrieve ticket:', err);
    }
}
  
useEffect(() => {
    fetchUser(state);
}, []);

const handleProfileEdit = (event: { target: { name: any; value: any; }; }) => {
    setProfileData({
        ...profileData,
        [event.target.name]: event.target.value,
    });
};
  
const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editUser && editUser.userId !== null){
    updateUser(editUser.userId, editUser);
     navigate('/');
    }
    else{
    console.error('Ticket data is undefined.');
    }
};

const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    if (deleteUser && deleteUser.userId !== null){
    setDeleteUser(deleteUser);
     navigate('/');
    }
    else{
    console.error('Ticket data is undefined.');
    }
};

  
return (
      
    <div className="min-w-screen min-h-screen bg-gray-100 p-6 flex flex-col items-center bg-gradient-to-r from-orange-400 to-red-600">
     <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile Details</h1>
  
     <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 mb-6">
    <h2 style={{marginBottom: 15}}>User Settings</h2>
    <form action="#" method="POST" className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="Username" className="block text-sm font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        required
                                        autoComplete="username"
                                        className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                        onChange={handleProfileEdit}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                        Email
                                    </label>
                                    
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                        onChange={handleProfileEdit}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="password"
                                        className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                        onChange={handleProfileEdit}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="bio" className="block text-sm font-medium text-gray-900">
                                        Short Bio
                                    </label>
                                    
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="bio"
                                        name="bio"
                                        type="bio"
                                        required
                                        autoComplete="short bio"
                                        className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                        onChange={handleProfileEdit}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </button>
                            </div>

                         
                        </form>
                  </div>

                  <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 mb-6">
                <h2 style={{marginBottom: 15}}>Delete Profile</h2>
                <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
                  onClick={handleDelete}
              >
                  Delete
              </button>
          </div>

        </div>
        </div>




    );
  };
  
  export default EditProfile;