/**
 * Created by Administrator on 2017/9/1.
 */

//生成类
function Point() {
    this.xpos = 0
    this.ypos = 0
}

//设置对象
Point.prototype.set_pos = function (x,y) {
    this.xpos = x;
    this.ypos = y;
}

//获取对象
Point.prototype.get_pos = function () {
    return this.ypos
}
var p1 = new Point()
p1.set_pos(10,10)
console.log(p1.get_pos())
//end



//类的继承
var Person = function () {}
Person.prototype.set_name = function (name) {
    this.name = name
    console.log('set_name called')
}
Person.prototype.set_age = function (age) {
    this.age = age
}

// 在原来的基类上做一次拷贝
var Man = function () {}
var Super = function () {}
Super.prototype = Person.prototype
Man.prototype = new Super()

Man.prototype.set_sex = function (sex) {
    this.sex = sex
}

var m = new Man()
m.set_name('xiaoming')
m.set_age(10)
m.set_sex('男')
console.log(m)