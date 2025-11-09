function encrypt() {
    function getUuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1)
        }
        s[14] = "4";
        s[19] = hexDigits.substr(s[19] & 3 | 8, 1);
        s[8] = s[13] = s[18] = s[23];
        var uuid = s.join("");
        return uuid
    }
    function sort_ASCII(obj) {
        var arr = new Array;
        var num = 0;
        for (var i in obj) {
            arr[num] = i;
            num++
        }
        var sortArr = arr.sort();
        var sortObj = {};
        for (var i in sortArr) {
            sortObj[sortArr[i]] = obj[sortArr[i]]
        }
        return sortObj
    }
    function url2json(url) {
        var reg_url = /^[^\?]+\?([\w\W]+)$/
          , reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g
          , arr_url = reg_url.exec(url)
          , ret = {};
        if (arr_url && arr_url[1]) {
            var str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2]
            }
        }
        return ret
    }
    function dataTojson(data) {
        var arr = [];
        var res = {};
        arr = data.split("&");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf("=") != -1) {
                var str = arr[i].split("=");
                if (str.length == 2) {
                    res[str[0]] = str[1]
                } else {
                    res[str[0]] = ""
                }
            } else {
                res[arr[i]] = ""
            }
        }
        return res
    }
    const serialize = function(obj) {
        var ary = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p) && obj[p]) {
                ary.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
            }
        return ary.join("&")
    };
    var paramPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvxXa98E1uWXnBzXkS2yHUfnBM6n3PCwLdfIox03T91joBvjtoDqiQ5x3tTOfpHs3LtiqMMEafls6b0YWtgB1dse1W5m+FpeusVkCOkQxB4SZDH6tuerIknnmB/Hsq5wgEkIvO5Pff9biig6AyoAkdWpSek/1/B7zYIepYY0lxKQIDAQAB";
    var encrypt = new JSEncrypt;
    encrypt.setPublicKey(paramPublicKey);
    $.ajaxSetup({
        beforeSend: function(xhr,options) {
            var timestamp = Date.parse(new Date);
            var requestId = getUuid();
            var data = JSON.stringify(sort_ASCII(dataTojson(options.data || "{}")));
            options.data = encrypt.encryptLong(data);
            var sign = MD5(data + requestId + timestamp);
            xhr.setRequestHeader("timestamp", timestamp);
            xhr.setRequestHeader("requestId", requestId);
            xhr.setRequestHeader("sign", sign)
        }
    })
}