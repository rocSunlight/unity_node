/**
 * Created by Administrator on 2017/9/19.
 */


var fs = require('fs')

//fs模块同步创建一个目录,再执行下一条
// fs.mkdirSync('./output')
// console.log('hello')



//异步创建一个目录,不用等待直接执行下一条
//existsSync 判断文件是否存在
/*
if(fs.existsSync('./out')){
    console.log('已经拥有文件夹')

    fs.rename('./out','./oldout',function (err) {
        if(err){
            console.log(err)
            return
        }
        console.log('rename 修改 成功')
    })
}else {
    fs.mkdir('./out',function (err) {
        if(err){
            console.log(err)
            return
        }
        console.log('异步创建成功')
    })

    console.log('hello')
}
 */


//获取文件信息
/*
fs.stat('./hello.txt',function (err,stat) {
    if(err){
        console.log(err)
        return
    }
    console.log('文件字节为:'+stat.size)
    console.log(stat.ctime)
})

 var stat = fs.statSync('./hello.txt')
 console.log(stat.size)
 */

//异步读取一个文件
/*
fs.readFile('./hello.txt', (err, data) => {
    if (err) throw err
    console.log('文件的内容为' + data)
})
 */

//拿到文件的钥匙，文档里面的fd，文件句柄
/*
fs.open('./hello.txt','r',(err,file_handle)=>{
    if (err){
        throw err
        return
    }
    console.log('正在打开文件')

    fs.fstat(file_handle,(err,stat)=>{
        var buf = Buffer.allocUnsafe(stat.size)

        //异步读写
        fs.read(file_handle, buf, 0, stat.size, null, function (err) {
            fs.close(file_handle)
            console.log(buf.toString())
        })

    })

})
 */

//写文件
/*
fs.writeFile('./writeFile.txt', 'this a writeFlie',  function (err) {
    if (err) {
        throw err
        return
    }
    console.log('写入成功')
})
 */

//在文件里追加文字
fs.open('./writeFile.txt', 'a', function (err, fd) {
    if (err) {
        throw err
        return
    }

    fs.write(fd,'hello this a open write ', function (err) {
        fs.close(fd)
    })
})