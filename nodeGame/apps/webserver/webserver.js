/**
 * Created by Administrator on 2017/9/21.
 */

var express = require('express')
var path = require('path')
var app = express()
var port = parseInt(process.argv[2])

//配置启动目录www_rout
if(process.argv.length < 3){
    console.log('node webserver.js port')
    return
}
process.chdir('./apps/webserver')

app.use(express.static(path.join(process.cwd(), 'www_root')))

app.listen(port)

console.log('webserver started at port' + port)