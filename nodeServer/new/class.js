/**
 * Created by Administrator on 2017/9/1.
 */

//class类继承

var Person = function () {}
Person.prototype.set_name = function (name) {
    this.name = name
    console.log('set_name called')
}
Person.prototype.set_age = function (age) {
    this.age = age
}

function Class(param) {
    var new_class = function () {}
    //继承基类的方法
    if(param.extend){
        var Super = function () {}
        Super.prototype = Person.prototype
        new_class.prototype = new Super()

    }

    //扩展
    for(var key in param){
        if(key == 'extend'){
            continue  //结束单次循环
        }
        new_class.prototype[key] = param[key]
    }

    return new_class
}

var Student = Class({
    extend : Person,
    set_class : function (class_num) {
        this.class_num = class_num
    },
    set_grade : function (grade) {
        this.grade = grade
    }
})

var s = new Student()
s.set_name('xiaoming')
s.set_class(10)
s.set_grade(2)
console.log(s)

module.exports = s