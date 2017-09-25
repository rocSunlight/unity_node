/**
 * Created by Administrator on 2017/9/18.
 */

var express =require('express')
var app = express()

//nodejs express配置跨域访问
app.all('/test', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//配置网站的根目录 www_root
var path = require('path')
app.use(express.static(path.join(process.cwd(),'www_root')))

app.listen(6080)


//get 处理响应
app.get('/login',function (req,res) {
    console.log('有人响应了',req.query)

    //服务器回信息给客户端
    res.send('success')
})


//post 请求
app.post('/upload', function (req, res) {
    console.log('upload 有人进来了')
    console.log(req.query)
    
    //获得用户给我们发送过来的数据
    req.on('data',function (data) {
        console.log('客户端发送来的'+data)
        res.send('upload ok')
    })
})

