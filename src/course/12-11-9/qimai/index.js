function cv(t) {
    t = encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, function (n, t) {
        return o("0x" + t)
    });
    try {
        return btoa(t)
    } catch (n) {
        return buffer.from(t).toString("base64")
    }
}

function o(n) {
    return String.fromCharCode(n)
}

function oz(n, t) {
    t = t || u();
    for (var e = (n = n.split("")).length, r = t.length, a = 'charCodeAt', i = 0; i < e; i++)
        n[i] = o(n[i].charCodeAt(0) ^ t[(i + 10) % r].charCodeAt(0));
    return n.join("")
}

function get_an(genre) {
    let a = [0, genre];
    let url = '/indexV2/getIndexRank';
    let baseURL = "https://api.qimai.cn"
    var e, r = +new Date - 0 - 1661224081041
    a = a.sort().join("");
    a = cv(a)

    a = (a += "@#" + url.replace(baseURL, "")) + ("@#" + r) + ("@#" + 3)
    let d = 'xyz517cda96efgh'
    return cv(oz(a, d))
}