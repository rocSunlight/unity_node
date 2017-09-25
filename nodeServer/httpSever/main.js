
/**
 * Created by Administrator on 2017/9/18.
 */

var express = require('express')

//工作目录/www_root
var path  = require('path')
var app = express()
app.use(express.static(path.join(process.cwd(),"www_root")))


app.listen(6080)


//web url的响应函数
app.get('/login', function (req, res) {
    //底层会打包成http协议的回应，发送给客户端
    res.send('SUCCESS')

    console.log(req.query)
})