/**
 * Created by Administrator on 2017/9/4.
 */

//服务端
var net = require('net')

//创建一个createServer来监听,当链接时调用函数
var sever = net.createServer(function (client_sock) {
    console.log('client comming...链接到的远程地址为：',client_sock.remoteAddress,client_sock.remotePort)

    //转码成utf8
    client_sock.setEncoding('utf8')

    //客户端断开链接的时候处理
    client_sock.on('close',function () {
        console.log('客户端断开链接了 client_sock')
    })

    //有客户接收到客户端的数据
    client_sock.on('data',function (data) {
        console.log('data',data)

        //接收到数据后
        client_sock.write('goodbye!!!')
        client_sock.end()
    })

    //接收到报错的时候
    client_sock.on('error',function (error) {
        console.log('error',error)
    })
})


//编写代码，listen指示到那个端口上
//node就会监听我的server，等待链接接入
sever.listen({
    host: '127.0.0.1',
    port : 6080,
    exclusive: true
})


sever.on('close',function () {
    console.log('node主动close关闭后触发')
})


//sever.unref() 来停止node对server的监听
// sever.unref()

//sever.close()  调用close来关闭监听事件
// sever.close()