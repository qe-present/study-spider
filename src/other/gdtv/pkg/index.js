y = "undefined" != typeof TextEncoder ? new TextEncoder("utf-8") : {
    encode: function () {
        throw Error("TextEncoder not available")
    }
}
var J = null;
var tryEntries=[]
function k() {
    try {
            return null !== J && 0 !== J.byteLength || (J = new Uint8Array(window.w.memory.buffer)),
        J
    }catch (e) {
        console.log(e)
    }

}

function L(A, g, I) {
    try {
        if (void 0 === I) {
            var B = y.encode(A)
                , Q = g(B.length, 1) >>> 0;
            return k().subarray(Q, Q + B.length).set(B),
                h = B.length,
                Q
        }
        for (var C = A.length, E = g(C, 1) >>> 0, D = k(), w = 0; w < C; w++) {
            var M = A.charCodeAt(w);
            if (M > 127)
                break;
            D[E + w] = M
        }
        if (w !== C) {
            0 !== w && (A = A.slice(w)),
                E = I(E, C, C = w + 3 * A.length, 1) >>> 0;
            var i = k().subarray(E + w, E + C);
            E = I(E, C, w += F(A, i).written, 1) >>> 0
        }
        return h = w,
            E
    }catch (e) {
        console.log(e)
    }
}