import { request } from 'umi';

export async function getFriends() {
  return request('/api/friends', {
    method: 'GET',
  });
}

export const getPetDetail = (id) =>
  request(`/api/pet/${id}`, {
    method: 'GET',
  });
