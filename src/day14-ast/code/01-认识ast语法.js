
var prase = require('@babel/parser')
// 使用ast语法
traverse = require('@babel/traverse').default

var jscode = 'var a = "\u0068\u0065\u006c\u006c\u006f\u002c\u0041\u0053\u0054"'
// 转换源代码成 ast树结构
var ast = prase.parse(jscode)
// console.log(ast)


traverse(ast, {
    // VariableDeclarator定位的类别, path定位之后的地址是什么
    VariableDeclarator(path){
        console.log(path.node.id.name)
        console.log(path.node.init.value)
    }
})







