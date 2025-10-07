const parse = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const generate = require('@babel/generator').default;
//jscode
//path.replaceWith(newNode) 就是把 AST 中的某个节点 “挖掉”，然后 “塞进” 一个新的节点。
let jscode =
    `var b = 1 + 2;
    var c = "coo" + "kie";
    var a = 1+1,b = 2+2;
    var c = 3;
    var d = "1" + 1;
    var e = 1 + '2';
`
let ast = parse.parse(jscode);
traverse(ast, {
    BinaryExpression(path) {
        let {operator, left, right} = path.node;
        // 是否是加法
        if (operator === '+') {
            if (types.isNumericLiteral(left) && types.isNumericLiteral(right)) {
                path.replaceWith(types.numericLiteral(left.value + right.value));
            }
            if (types.isStringLiteral(left) && types.isStringLiteral(right)) {
                path.replaceWith(types.stringLiteral(left.value + right.value));
            }
            if ((types.isStringLiteral(left) && types.isNumericLiteral(right)) || (types.isNumericLiteral(left) && types.isStringLiteral(right))) {
                  const sum = Number(left.value) + Number(right.value);
                  path.replaceWith(types.numericLiteral(sum));
            }
        }
    }
})
let {code} = generate(ast);
console.log(code);