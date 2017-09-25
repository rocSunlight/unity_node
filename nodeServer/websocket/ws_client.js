/**
 * Created by Administrator on 2017/9/5.
 */

var ws = require('ws')

//创建了一个客户端的socket
var sock = new ws("ws://127.0.0.1:6080")

sock.on("open",function () {
    console.log('connect success !!!')

    //客户端向服务端发送数据
    sock.send('helloWorld!!!')
    sock.send('hell!!!')
    sock.send('World!!!')
    sock.send('Worldhello!!!')
})

sock.on("error",function (err) {
    console.log('报错信息：',err)
})

sock.on("close",function () {
    console.log('关闭了close')
})

sock.on("message",function (data) {
    console.log('message:  ',data)
})