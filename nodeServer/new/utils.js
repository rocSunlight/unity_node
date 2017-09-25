/**
 * Created by Administrator on 2017/9/1.
 */

// 生产一个随机数
var utils = {
    random_int: function (start, end) {
        var num = start + (end - start) * Math.random()
        num = Math.floor(num)

        return num
    }
}

console.log('hello')
module.exports = utils