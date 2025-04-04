import { ApiMessage } from "../interfaces/ApiMessage";
import { UserProfileData } from "../interfaces/UserProfileData";

const retrieveUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }  
};

const retrieveUser = async (id: number | null): Promise<UserProfileData> => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('Could not fetch user');
  }
};

const createUser = async (body: UserProfileData): Promise<UserProfileData> => {
  try {
    const response = await fetch(
      '/api/users/', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body)
      }

    )
    const data = response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from User Creation: ', err);
    return Promise.reject('Could not create User');
  }
};

const updateUsers = async (id: number, body: UserProfileData): Promise<UserProfileData> => {
  try {
    const response = await fetch(
      `/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteUser = async (id: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting user', err);
    return Promise.reject('Could not delete user');
  }
};

export { retrieveUser, retrieveUsers, createUser, updateUsers, deleteUser };
