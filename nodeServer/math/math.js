/**
 * Created by Administrator on 2017/8/31.
 */
/*
*  node math函数工具
* */

// 数学的正弦  余弦  正切
// 单位都是数学的弧度 而不是度   方向是数学的正方向，逆时针方向
console.log(Math.sin(Math.PI / 4)) //sin 45
console.log(Math.cos(Math.PI / 6)) // cos 30
console.log(Math.tan(Math.PI / 6)) // 1 / 1.73
console.log(Math.tan(Math.PI * 2 / 6)) // 1.73/1

/*
   三角函数   sin  cos  tan
   sin  =  y /  r
   cos  =  x /  r
   tan  =  y /  x
*/

// 度 [0,360]
function degree_to_r(degree) {
    // PI --> 180
    return (degree / 180) * Math.PI
}

// 弧度 [0, 2*PI]
function r_to_degree(r) {
    return (r / Math.PI) * 180
}

var r = degree_to_r(90)
console.log(r)
console.log(r_to_degree(r))

//反向获取弧度
r = Math.asin(0.5)
console.log(r_to_degree(r))  //30

r = Math.acos(0.5)
console.log(r_to_degree(r))  // 60

r = Math.atan(1)
console.log(r_to_degree(r))  // 45

// tag (y,x)  正的方向是(x,y)
r = Math.atan2(1,1)
console.log(r_to_degree(r))   // 45

// sert  是求给定一个数的平方根
console.log(Math.sqrt(4))   // 2

//计算出两点之间的距离
function vector_distance(lhs_x,lhs_y,rhs_x,rhs_y) {
    var len = (lhs_x - rhs_x) * (lhs_x - rhs_x) + (lhs_y - rhs_y )* (lhs_y - rhs_y )
    return Math.sqrt(len)
}

console.log(vector_distance(0,0,1,1))