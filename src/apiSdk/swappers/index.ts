import axios from 'axios';
import queryString from 'query-string';
import { SwapperInterface, SwapperGetQueryInterface } from 'interfaces/swapper';
import { GetQueryInterface } from '../../interfaces';

export const getSwappers = async (query?: SwapperGetQueryInterface) => {
  const response = await axios.get(`/api/swappers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSwapper = async (swapper: SwapperInterface) => {
  const response = await axios.post('/api/swappers', swapper);
  return response.data;
};

export const updateSwapperById = async (id: string, swapper: SwapperInterface) => {
  const response = await axios.put(`/api/swappers/${id}`, swapper);
  return response.data;
};

export const getSwapperById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/swappers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSwapperById = async (id: string) => {
  const response = await axios.delete(`/api/swappers/${id}`);
  return response.data;
};
