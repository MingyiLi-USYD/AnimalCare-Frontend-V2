import { request } from 'umi';
export const getPosts = async (url) =>
  await request(url, {
    method: 'GET',
  }).catch((error) => console.log(error));
export const love = async (postId) =>
  await request(`/api/love/${postId}`, {
    method: 'GET',
  });

export const cancelLove = async (postId) =>
  await request(`/api/love/${postId}`, {
    method: 'DELETE',
  });

export const newPost = async (params) => {
  const { postTopic, postContent, postTag, images } = params;
  console.log(params);
  let formData = new FormData();

  if (images) {
    images.map((element) => formData.append('images', element.originFileObj));
  }
  return await request('/api/post', {
    method: 'POST',
/*    headers: {
      'Content-Type': 'multipart/form-data',
    },
    requestType: 'form',*/
    data: formData,
    params: {
      postTopic,
      postContent,
      postTag,
    },
  });
};

export const getPostById = (postId)=>{
  return request(`/api/post/${postId}`,{
    method:'GET',
  })
}

export const getMyPosts = async ()=>request("/api/posts",{
  method:'GET',
})

export const deletePostById = async (postId)=>request(`/api/post/${postId}`,{
  method:'DELETE',
})
export const setVisibility = async (postId,visibility)=>request(`/api/post/${postId}`,{
  method:'PUT',
  params:{
    visibility
  }
})
