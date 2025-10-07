import parser from "@babel/parser"
import pkg from "@babel/traverse";
const {default:traverse}=pkg;
const js_code="var a=1";
let ast=parser.parse(js_code);
/*
console.log(ast);
Node {
  type: 'File',
  start: 0,
  end: 7,
  loc: SourceLocation {
    start: Position { line: 1, column: 0, index: 0 },
    end: Position { line: 1, column: 7, index: 7 },
    filename: undefined,
    identifierName: undefined
  },
  errors: [],
  program: Node {
    type: 'Program',
    start: 0,
    end: 7,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    sourceType: 'script',
    interpreter: null,
    body: [ [Node] ],
    directives: []
  },
  comments: []
}

 */
// 访问变量名
console.log(ast.program.body[0].declarations[0].id.name);
// 访问变量值
console.log(ast.program.body[0].declarations[0].init.value);
traverse(ast,{
    // VariableDeclarator 定位的类型
    VariableDeclarator(path){
        console.log(path.node)
        console.log(path.node.id.name)
        console.log(path.node.init.value)
        // 修改变量名
        path.node.id.name="b"
    }
})

