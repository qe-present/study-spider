const parse = require('@babel/parser')
const traverse = require('@babel/traverse').default
// JS 转 ast语法树
jscode = `var a = "\u0068\u0065\u006c\u006c\u006f\u002c\u0041\u0053\u0054";
var aa = 1
`

var ast = parse.parse(jscode)

traverse(ast, {
    VariableDeclarator(path){
        // 查看当前节点  会包含节点本身  父节点  兄弟节点
        // console.log(path)
        // 节点本身node节点
        // console.log(path.node)
        // 查看节点下面的原代码信息
        // console.log(path.toString())
        // 查看父类节点
        // console.log(path.parentPath.node)
        // 获取下方节点
        // console.log(path.get('init').toString())
        // 看当前node的兄弟节点，指的是源代码
        console.log(path.container)


    }
})
