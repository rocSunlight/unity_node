/**
 * Created by Administrator on 2017/8/31.
 */

//  代码模块require   module.exports
var utils = require("./utils")

var ClassS = require('./class')


/*
*   cell  函数对象（实例，参数）
*/
function test_func(name,sex) {
    this.name = name
    this.sex  = sex
}

//给xiaomi对象写入
var xiaomi = {}
test_func.call(xiaomi,'xiaomi',10)
console.log(xiaomi)

//隐式传递this
var xiaohong = {
    name : 'xiaohong',
    test_func : function () {
        console.log('我是xiaohong：----', this)
    }
}
xiaohong.test_func()

//强制传递this
var func = function () {
    console.log('我是强制复制xiaomi的 ——', this)
}.bind(xiaomi)

func()

console.log('获取外部引入的Class文件：————', ClassS)