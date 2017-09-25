
/**
 * Created by Administrator on 2017/9/19.
 */

var fs = require('fs')
var Crypto = require('crypto')    //crypto 模块加密

//将一段二进制的数据转换成base64
function base64_encode(content) {
   var buf = new Buffer(content)
   var base64 =  buf.toString('base64')

   return  base64

}

var base64_str = base64_encode([0xff,0xf1,0x11,0x13,0xf7])

// console.log(base64_str)


//将一段base64转换成字符串
function base64_decode(base64_str) {
    var buf = new Buffer(base64_str,'base64')
    return buf
}

var decode_buf = base64_decode(base64_str)
// console.log(decode_buf)


//创建新图片
/*
fs.readFile('asd.jpg', function (err, data) {
    if (err) {
        console.log(err)
        return
    }
    var img_base64 = base64_encode(data)   // 把图片转成base64
    var img_data   = base64_decode(img_base64)  // 解读base64


    if(fs.existsSync('./base64_img.jpg')){
        fs.rename('base64_img.jpg','old.jpg',function (err) {
            console.log('修改成功')
        })
    }else {
        fs.writeFile('base64_img.jpg',img_data,function (err) {
            console.log('图片创建成功')
        })
    }

})
 */


//md5  算法

/*
function md5_file(data) {
    var md5 = Crypto.createHash('md5')
    md5.update(data)
    return md5.digest('hex')

}

var str1 = md5_file('qidian')
console.log(str1)

var str2 = md5_file('123456')
console.log(str2)

var data = fs.readFileSync('asd.jpg')
str1 = md5_file(data)
console.log(str1)
 */


//sha1算法
function sha1(data) {
    var sha1 = Crypto.createHash('sha1')
    sha1.update(data)
    return sha1.digest('hex')
}

var sha = sha1('helloworld')
console.log(sha)