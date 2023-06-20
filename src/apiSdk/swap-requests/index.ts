import axios from 'axios';
import queryString from 'query-string';
import { SwapRequestInterface, SwapRequestGetQueryInterface } from 'interfaces/swap-request';
import { GetQueryInterface } from '../../interfaces';

export const getSwapRequests = async (query?: SwapRequestGetQueryInterface) => {
  const response = await axios.get(`/api/swap-requests${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSwapRequest = async (swapRequest: SwapRequestInterface) => {
  const response = await axios.post('/api/swap-requests', swapRequest);
  return response.data;
};

export const updateSwapRequestById = async (id: string, swapRequest: SwapRequestInterface) => {
  const response = await axios.put(`/api/swap-requests/${id}`, swapRequest);
  return response.data;
};

export const getSwapRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/swap-requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSwapRequestById = async (id: string) => {
  const response = await axios.delete(`/api/swap-requests/${id}`);
  return response.data;
};
