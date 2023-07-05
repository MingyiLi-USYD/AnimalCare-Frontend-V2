import { notification } from 'antd';

// 创建响应拦截器
const responseInterceptor = (response) => {
   //console.log(response)
    if(response && response.status ===401){
        // 弹出提醒
        notification.error({
            message: 'Login first',
            description: 'Please login first',
        });
    }
    // 检查响应的 code 值
    if (response && response.data?.code === 0) {
        // 弹出提醒
        notification.error({
            message: 'Error',
            description: response.data.msg,
        });
    }

    // 返回响应
    return response;
};

export default responseInterceptor;
