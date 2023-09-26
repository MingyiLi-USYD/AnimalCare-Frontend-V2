import { request } from 'umi';
import axios from 'axios';

export const newPost = async (value,callback) => {
    const { postContent, postTag, postTitle, visible, isDelay, images, referFriends } = value;

    const formData = new FormData();

    images.forEach((file) => {
        formData.append('images', file.originFileObj);
    });

    referFriends.forEach((friend) => {
        formData.append('mentions', friend);
    });

    formData.append('postContent', postContent);
    formData.append('postTag', postTag);
    formData.append('visible', visible);
    formData.append('postTitle', postTitle);
    formData.append('isDelay', isDelay);

    try {
        const response = await axios.post('/api/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('access_token'),
            },
            onUploadProgress:callback,

        });

        return response.data; // 返回响应数据
    } catch (error) {
        console.error('上传失败', error);
        throw error; // 处理上传失败的情况
    }
};



export const getPosts = async (current,pageSize,order,keywords) =>
    await request('/api/posts', {
      method: 'GET',
        params:{
           current,
            pageSize,
            order,
            keywords,
        }
    })

export const getLoves = async () =>
    await request('/api/loves', {
        method: 'GET',
    });
export const love = async (postId) =>
    await request(`/api/lovePost/${postId}`, {
      method: 'GET',
    });

export const cancelLove = async (postId) =>
    await request(`/api/lovePost/${postId}`, {
      method: 'DELETE',
    });

/*export const newPost = async (value) => {
    const {postContent,postTag,postTitle,visible,isDelay,images,referFriends} =value
    const post = {postTitle,postTag,postContent,visible,isDelay}
    const formData = new FormData();
    images.forEach((file) => {
        formData.append('images', file.originFileObj);
    })
    referFriends.forEach((friend) => {
        formData.append('mentions', friend);
    })
    formData.append("postContent",postContent)
    formData.append("postTag",postTag)
    formData.append("visible",visible)
    formData.append("postTitle",postTitle)
    formData.append("isDelay",isDelay)
  return  request('/api/post', {
    method: 'POST',
    data:formData,
    requestType: 'form',
  });
};*/

export const getPostById = (postId)=>{
  return request(`/api/post/${postId}`,{
    method:'GET',
  })
}

export const getMyPosts = async ()=>request("/api/posts/my",{
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

