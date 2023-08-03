import { request } from 'umi';

export const getPetDetail = (id) =>
  request(`/api/pet/${id}`, {
    method: 'GET',
  });
