# 使用 Nginx 作为基础镜像
FROM nginx:latest

# 移除默认的 Nginx 配置文件
RUN rm -f /etc/nginx/conf.d/default.conf

RUN mkdir -p /usr/share/nginx/html/dist

# 复制当前目录下的 dist 文件夹到 Nginx 的默认站点目录的dist下面
COPY ./dist /usr/share/nginx/html/dist


# 暴露 Nginx 的默认端口 80
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
