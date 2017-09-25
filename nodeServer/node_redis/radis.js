/**
 * Created by Administrator on 2017/9/21.
 */

//redis 通讯客户端模块
var redis = require('redis')

//创建一个链接到我们的redis server
var client =  redis.createClient({
    host : '127.0.0.1',
    port : 6379,
    db   : 0,
})

// key -->value
client.set('my_redis_class_key','123456')
client.get('my_redis_class_key',function (err,data) {
    if(err){
        console.log(err)
        return
    }

    console.log(data)
})