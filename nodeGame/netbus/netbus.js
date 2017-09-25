/**
 * Created by Administrator on 2017/9/21.
 */
//服务端
var net = require('net')
var ws = require('ws')      //加载node上面的websocket模块

var log = require('../utils/log.js')

var tcppkg = require('./tcppkg')


var netbus = {
    PROTO_JSON: 1,   //json 数据协议
    PROTO_BUF: 2,     //二进制 数据协议
}

var global_session_list = {}
var global_session_key = 1

//新用户进来以后
function on_session_enter(session, proto_type, is_ws) {
    if(is_ws) {
        log.info('session comming...链接到的远程地址为：', session._socket.remoteAddress, session._socket.remotePort)
    }else {
        log.info('session comming...链接到的远程地址为：', session.remoteAddress, session.remotePort)
    }


    session.last_pkg = null  //表示我们存储上一次没有处理完的tcp包
    session.is_ws = is_ws
    session.proto_type = proto_type

    // 加入serssion列表中 方便查找
    global_session_list[global_session_key] = session
    session.session_key = global_session_key
    global_session_key++
}

//收到一个命名包   json或者buf
function on_session_recv_cmd(session, str_or_buf) {
    log.info(str_or_buf)
}

//发送一个数据包
function session_send(session,cmd) {
    if(!session.is_ws){
        var  data = tcppkg.package_data(cmd)  //打包一个新的数据包
        session.write(data)
    }else {
        session.send(cmd)   //webserver直接发送命令
    }
}

//关闭一个session
function session_close(session) {
    if(!session.is_ws){
        session.end()
        return
    }else {
        session.close()
    }
}


//客户端断开链接的时候处理
function on_session_exit(session) {
    log.info('session exit!!!')
    session.last_pkg = null
    if (global_session_list[session.session_key]) {
        global_session_list[global_session_key] = null
        delete global_session_list[global_session_key]  //把这个key value从{}里面删掉
        global_session_key = null
    }
}


function add_client_session_event(session, proto_type) {


    //客户端断开链接的时候处理
    session.on('close', function () {
        on_session_exit(session)
    })

    //有客户接收到客户端的数据  tcp拆包封包
    session.on('data', function (data) {
        //判断不是buffer包则退出   不合法的数据
        if(!Buffer.isBuffer(data)){
            session_close(session)
            return
        }

        var last_pkg = session.last_pkg;

        if (last_pkg != null) { // 上一次剩余没有处理完的半包;
            var buf = Buffer.concat([last_pkg, data], last_pkg.length + data.length);
            last_pkg = buf;
        }
        else {
            last_pkg = data;
        }

        var offset = 0;
        var pkg_len = tcppkg.read_pkg_size(last_pkg, offset);
        if (pkg_len < 0) {
            return;
        }

        while (offset + pkg_len <= last_pkg.length) { // 判断是否有完整的包;
            // 根据长度信息来读取我们的数据,架设我们穿过来的是文本数据
            var cmd_buf ;

            //收到一个完整的数据包  并判断是那种数据类型
            if(session.proto_type = netbus.PROTO_JSON){
                var json_str = last_pkg.toString('utf8',offset + 2, offset + pkg_len)
                if(!json_str){
                    session_close(session)
                    return
                }
                on_session_recv_cmd(session, json_str)
            }else {
                cmd_buf = Buffer.allocUnsafe(pkg_len - 2); // 2个长度信息
                last_pkg.copy(cmd_buf, 0, offset + 2, offset + pkg_len);

                on_session_recv_cmd(session, cmd_buf)
            }


            offset += pkg_len;
            if (offset >= last_pkg.length) { // 正好我们的包处理完了;
                break;
            }

            pkg_len = tcppkg.read_pkg_size(last_pkg, offset);
            if (pkg_len < 0) {
                break;
            }
        }

        // 能处理的数据包已经处理完成了,保存 0.几个包的数据
        if (offset >= last_pkg.length) {
            last_pkg = null;
        }
        else { // offset, length这段数据拷贝到新的Buffer里面
            var buf = Buffer.allocUnsafe(last_pkg.length - offset);
            last_pkg.copy(buf, 0, offset, last_pkg.length);
            last_pkg = buf;
        }

        session.last_pkg = last_pkg
    })

    //接收到报错的时候
    session.on('error', function (error) {
        console.log('error', error)
    })

    on_session_enter(session, proto_type, false)
}

//创建一个createServer来监听,当链接时调用函数
function start_tcp_server(ip, port, proto_type) {
    log.info('start server ..', ip, port)
    var sever = net.createServer(function (client_sock) {
        add_client_session_event(client_sock, proto_type)
    })

    //node就会监听我的server，等待链接接入

    sever.on('error', function () {
        log.error('server listen error')
    })

    sever.on('close', function () {
        log.error('server listen close')
    })

    sever.listen({
        host: ip,
        port: port,
        exclusive: true
    })


}

//开启一个webserver
function start_ws_server(ip,port,prote_type) {

    //启动基于websocket的服务器
    var server = new ws.Server({
        host : ip,
        port : port
    })

    log.info('start ws server ..', ip, port)

    //判断对象是否是字符串
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]'
    }

    //监听进入进来的客户端事件
    function ws_add_client_session_event(session,prote_type) {
        session.on('close',function () {
            on_session_exit(session)
        })

        session.on('error',function (err) {
            console.log('服务端接收客户端报错',err)
        })

        session.on('message',function (data) {
            if(session.proto_type  == netbus.PROTO_JSON){
                if(!isString(data)){
                    session_close(session)
                    return
                }
                on_session_recv_cmd(session,data)
                
            }else {
                if(!Buffer.isBuffer(data)){
                    session_close(session)
                    return
                }
            }
            on_session_recv_cmd(session,data)
        })

        on_session_enter(session,prote_type,true)
    }

    // connect 事件，有客户端接入进来
    function on_server_client_comming(session) {
        console.log('有新客户访问！！！')
        ws_add_client_session_event(session,prote_type)
    }

    server.on('connection',on_server_client_comming)

    // error 事件，表示的是我们监听错误
    server.on('error',function (err) {
        log.error('webserver listen 报错')
    })


    // error 事件，表示的是我们监听错误
    server.on('close',function (err) {
        log.error('webserver listen 关闭')
    })

}

//把接口开发出去
netbus.start_tcp_server = start_tcp_server
netbus.session_send = session_send
netbus.session_close = session_close
netbus.start_ws_server = start_ws_server

module.exports = netbus