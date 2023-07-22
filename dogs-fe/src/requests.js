import { makeRequest } from './utils';

export const getDog = ({ name }) => {
  if (!name) return;
  return makeRequest({ url: `/dogs/${name}` });
};

export const getDogs = () => makeRequest({ url: '/dogs' });

export const createDog = (dog) =>
  makeRequest({ url: '/dogs', method: 'POST', data: dog });

export const updateDog = (dog) => {
  if (!dog.name) return;
  return makeRequest({ url: `/dogs/${dog.name}`, method: 'PUT', data: dog });
};

export const deleteDog = ({ name }) => {
  if (!name) return;
  return makeRequest({ url: `/dogs/${name}`, method: 'DELETE' });
};

export const deleteDogs = () => makeRequest({ url: '/dogs', method: 'DELETE' });
