/**
 * Created by Administrator on 2017/9/5.
 */

//加载node上面的websocket模块
var ws = require('ws')

//启动基于websocket的服务器
var server = new ws.Server({
    host : '127.0.0.1',
    port : 6080
})
    
//监听进入进来的客户端事件
function websoket_add_listener(client) {
    client.on('close',function () {
        console.log('服务端接收客户端关闭close')
    })

    client.on('error',function (err) {
        console.log('服务端接收客户端报错',err)
    })

    client.on('message',function (data) {
        console.log('服务端接收到客户端的数据 message',data)
        client.send('服务端发送给客户端数据')
    })

}

// connect 事件，有客户端接入进来
function on_server_client_comming(client_sock) {
    console.log('有新客户访问！！！')
    websoket_add_listener(client_sock)
}

server.on('connection',on_server_client_comming)

// error 事件，表示的是我们监听错误
server.on('error',function (err) {
    console.log('服务端报错',err)
})

// headers 事件，拿到我们会给客户端的字符
server.on('headers',function (data) {
    console.log('服务端获取客户端数据：',data)
})



