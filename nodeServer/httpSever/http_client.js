/**
 * Created by Administrator on 2017/9/18.
 */

var http = require('http')

/*
*  callabck(is_success,data/error)
*/
function http_get(ip,port,url,parmas,callback) {
    //step1 创建一个http.ClientRequest
    var options = {
        host : '127.0.0.1',
        port : port,
        path : url + '?' + parmas,
        method : 'GET'

    }

    //当有请求返回的时候  参数就会被传递为http.IncomingMessage
    var req = http.request(options,function (incoming_msg) {
        console.log('get respones')
        console.log(incoming_msg.statusCode)  //IncomingMessage里面的参数返回状态

        //监听服务器传来的incoming_msg的data
        incoming_msg.on('data', function (data) {
            if (incoming_msg.statusCode === 200) {
                callback(true, data)
            }
        })


    })

    // 把请求发送出去
    req.end()
}

/*
http_get('127.0.0.1','6080','/login','uname=blake',function (is_ok,data) {
    if(is_ok){
        console.log('我是从服务器返回的数据'+ data)
    }
})
 */

//post可以带body数据传到服务器
function http_post(ip,port,url,parmas,body,callback) {
    //step1 创建一个http.ClientRequest
    var options = {
        host: '127.0.0.1',
        port: port,
        path: url + '?' + parmas,
        method: 'POST',
        headers: {
            "Content-type" : 'application/x-www-form-urlencoded',
            'Content-Length' : body.length
        }
    }

    //当有请求返回的时候  参数就会被传递为http.IncomingMessage
    var req = http.request(options,function (incoming_msg) {
        console.log('post respones')
        console.log(incoming_msg.statusCode)  //IncomingMessage里面的参数返回状态

        //监听服务器传来的incoming_msg的data
        incoming_msg.on('data', function (data) {
            if (incoming_msg.statusCode === 200) {
                callback(true, data)
            }
        })


    })

    //step2 写入body数据
    req.write(body)

    // 把请求发送出去
    req.end()
}

http_post('127.0.0.1', '6080', '/upload', 'fliename=my_flie.txt', 'hello http post', function (is_ok, data) {
    if(is_ok){
        console.log('post 服务端'+data)
    }
})