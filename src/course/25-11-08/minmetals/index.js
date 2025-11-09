export function encrypt(e,pub) {
    let t = new JSEncrypt()
    t.setPublicKey(pub)
    e.sign=md5(JSON.stringify(e))
    e.timeStamp= new Date().getTime()
    let s = t.encryptLong(JSON.stringify(e))
    return s
}
