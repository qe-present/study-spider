import {t} from './a.js'

export async function getWasm(url = 'my.wasm') {
    const importObject = t()
    const {instance} = await WebAssembly.instantiateStreaming(fetch(url), importObject);
    const w = {
        memory: instance.exports.memory,   // 必须
    };
    window.w=w
    window.__wbindgen_export_0 = instance.exports.__wbindgen_export_0
    window.__wbindgen_export_1 = instance.exports.__wbindgen_export_1
    window.__wbindgen_export_2 = instance.exports.__wbindgen_export_2
    window.__wbindgen_export_3 = instance.exports.__wbindgen_export_3
    return {
        a: instance.exports.a,

    };
}
