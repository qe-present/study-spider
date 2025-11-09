// 加载并返回 wasm 接口
export async function getWasm(url = 'Wasm.wasm') {
  const importObject = {
    env: {
      memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
      __indirect_function_table: new WebAssembly.Table({
        initial: 2,
          maximum: 2,
          element: 'anyfunc'
      })
    }
  };

  const { instance } = await WebAssembly.instantiateStreaming(fetch(url), importObject);
  instance.exports._initialize?.();

  return {
    encrypt: instance.exports.encrypt,
    memory:  instance.exports.memory,
    stackAlloc:   instance.exports.stackAlloc,
    stackRestore: instance.exports.stackRestore,
    stackSave:    instance.exports.stackSave
  };
}