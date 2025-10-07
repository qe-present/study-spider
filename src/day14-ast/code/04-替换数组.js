

// 练习语法

const generator = require("@babel/generator").default;
const parse = require('@babel/parser')
const traverse = require('@babel/traverse').default
const types = require('@babel/types')
// JS 转 ast语法树
jscode = `
var arr = '3,4,0,5,1,2'['split'](',')
`
// 转换js代码为ast树结构
let ast = parse.parse(jscode);

traverse(ast, {
    CallExpression(path){
        var {arguments, callee} = path.node
        var data = callee.object.value
        var func = callee.property.value
        var arg = arguments[0].value
        // console.log(data, func, arg)
        var res = data[func](arg)
        // 替换数组数据
        path.replaceWithMultiple(types.valueToNode(res))
    }
})

var {code} = generator(ast)
console.log(code)



