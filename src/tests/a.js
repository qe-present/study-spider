function b(){
    // 对象
    console.log({a:1,b:2})
    // 数组
    console.log([1,2,3,4,5])
    // set
    console.log(new Set([1,2,3,4,5]))
    // map
    console.log(new Map([['a',1],['b',2]]))
    return 'hello'
}
function a() {
    console.log("123")
    console.log("456")
    console.log(b())
    return "你好";
}