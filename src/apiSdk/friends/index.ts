import axios from 'axios';
import queryString from 'query-string';
import { FriendInterface, FriendGetQueryInterface } from 'interfaces/friend';
import { GetQueryInterface } from '../../interfaces';

export const getFriends = async (query?: FriendGetQueryInterface) => {
  const response = await axios.get(`/api/friends${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFriend = async (friend: FriendInterface) => {
  const response = await axios.post('/api/friends', friend);
  return response.data;
};

export const updateFriendById = async (id: string, friend: FriendInterface) => {
  const response = await axios.put(`/api/friends/${id}`, friend);
  return response.data;
};

export const getFriendById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/friends/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFriendById = async (id: string) => {
  const response = await axios.delete(`/api/friends/${id}`);
  return response.data;
};
