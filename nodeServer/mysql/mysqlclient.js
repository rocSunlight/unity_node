/**
 * Created by Administrator on 2017/9/20.
 */

var mysql = require('mysql')

//mysql的链接池   我们每一次要通过发送sql语句给mysql server都要通过这个来链接
var conn_pool = mysql.createPool({
    host : '127.0.0.1',
    port : '3306',
    database : 'my_database',   //database 链接的数据库
    user : 'root',
    password : "123456"
})

// callback 1:err 2.rowdata 3.美观字段的说明
function mysql_exec(sql, callback) {
    //getConnection是从这个链接池里面获取mysql的链接句柄
    //异步获取，如果有结果了就会调用一个回调函数   err 是否错误，如果成功后面的conn就是链接池返回的通讯句柄
    conn_pool.getConnection(function (err, conn) {
        if(err){
            if(callback){
                callback(err,null,null)
                return
            }
        }
        
        //发送数据库的cmd到mysql server
        conn.query(sql, function (sql_err, sql_result, field_desic) {
            if(sql_err){
                if(callback){
                    callback(sql_err,null,null)
                }
                return
            }

            //sql_result mysql返回的结果
            //field_desic mysql每个字段的描述
            if(callback){
                callback(null,sql_result,field_desic)
            }

        })
    })
}

//查询一条语句
var sql_cmd = 'select * from uinfo where ustatus = 0 limit 1'
/*
mysql_exec(sql_cmd, function (err, sql_result, field_desic) {
    if(err){
        console.log(err)
        return
    }

    if(sql_result){
        console.log(sql_result)
    }

})
 */

//更新一条语句
var update  = "update uinfo set upwd = \"77777\""
/*
mysql_exec(update, function (err, sql_result, field_desic) {
    if(err){
        console.log(err)
        return
    }

    if(sql_result){
        console.log(sql_result)
    }

})
 */

var insert = 'insert into uinfo (uname,upwd) values (\"balke\",\"9999\")'
mysql_exec(insert, function (err, sql_result, field_desic) {
    if(err){
        console.log(err)
        return
    }

    if(sql_result){
        console.log(sql_result)
    }

})