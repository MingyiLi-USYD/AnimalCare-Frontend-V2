// import io from 'socket.io-client';
//
// class SocketIO {
//     static instance = null;
//
//     static getInstance() {
//         if (!SocketIO.instance) {
//             SocketIO.instance = new SocketIO();
//         }
//         return SocketIO.instance;
//     }
//
//     constructor() {
//         this.socket = null;
//     }
//
//     connect(url,options) {
//         console.log("开始连接")
//         this.socket = io(url,options);
//         // 监听事件
//         this.socket.on('connect', () => {
//             console.log('已连接到服务器');
//         });
//
//         this.socket.on('message', (data) => {
//             console.log('收到消息：', data);
//         });
//
//     }
//
//     disconnect() {
//         if (this.socket) {
//             this.socket.disconnect();
//         }
//     }
//
//     emit(event, data) {
//         if (this.socket) {
//             this.socket.emit(event, data);
//         }
//     }
//
// /*    on(event, callback) {
//         if (this.socket) {
//             this.socket.on(event, callback);
//         }
//     }
//
//     off(event, callback) {
//         if (this.socket) {
//             this.socket.off(event, callback);
//         }
//     }*/
// }
//
// export default SocketIO;