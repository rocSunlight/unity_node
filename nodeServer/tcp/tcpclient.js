/**
 * Created by Administrator on 2017/9/4.
 */
//客户端

var net = require('net')

//建立链接connect
var sock = net.connect({
    host : '127.0.0.1',
    port : '6080'
},function () {
    console.log('建立链接connect成功!')
    //在这里发送数据
    sock.write('helloworld','utf8')
})

//socket事件

sock.on('error',function (e) {
    console.log(e)
})

sock.on('close',function () {
    console.log('node 关闭了close')
})

sock.on('end',function () {
    console.log('node 关闭了end')
})

sock.on('data',function (data) {
    console.log('data 当有数据发送的时候调用')
})