

const parse = require('@babel/parser')
const traverse = require('@babel/traverse').default
// 判断节点的类型
var types = require('@babel/types')
// 把ast语法树还原成js代码
var generator = require("@babel/generator").default

// JS 转 ast语法树
jscode = `var b = 1 + 2;
var c = "coo" + "kie";
var a = 1+1,b = 2+2;
var c = 3;
var d = "1" + 1;
var e = 1 + '2';
`
// 转换js代码为ast树结构
let ast = parse.parse(jscode);

traverse(ast, {
    BinaryExpression(path){
        var {operator, left, right} = path.node;
        // console.log(operator, left, right)
        // 是否是数字相加
        if(types.isNumericLiteral(left) && types.isNumericLiteral(right) && operator == '+'){
            var va = left.value + right.value
            // 把计算的结果进行替换
            path.replaceWith(types.valueToNode(va))
            // console.log(path.node)
        }

        if (types.isStringLiteral(left) && types.isStringLiteral(right) && operator == '+' ){
            var va = left.value + right.value
            // 把计算的结果进行替换
            path.replaceWith(types.valueToNode(va))
        }
        if (types.isStringLiteral(left) && types.isNumericLiteral(right) && operator == '+'  || types.isNumericLiteral(left) && types.isStringLiteral(right) && operator == '+'){
            var va = left.value + right.value
            // 把计算的结果进行替换
            path.replaceWith(types.valueToNode(va))
        }
    }
})


var {code} = generator(ast);
console.log(code)

