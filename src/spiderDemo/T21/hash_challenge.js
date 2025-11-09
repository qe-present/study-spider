(() => {
    let e = 1, t = 100, n = {}, s = new Set, a = "hash_challenge";
    const o = "spiderdemo_sha_salt_2025";

    function r(e, t, n) {
        const s = `${e}_${t}_${n}`,
            a = (r = s, c = "spiderdemo_hmac_secret_2025", CryptoJS.HmacSHA256(r, c).toString());
        var r, c;
        const i = function (e) {
            return CryptoJS.MD5(e).toString()
        }(s + "spiderdemo_md5_salt_2025"), l = function (e) {
            return CryptoJS.SHA256(e).toString()
        }(s + o), u = function (e) {
            return sha3_256(e)
        }(s + o);
        return {hmac: a, md5: i, sha256: l, sha3_256: u}
    }
    window.r=r;

    const c = axios.create({
        baseURL: "/authentication/api/hash_challenge",
        timeout: 1e4,
        headers: {"Content-Type": "application/json"}
    });

    function i(e) {
        return {
            protobuf_challenge: "Protobuf挑战",
            number_challenge: "动态数字求和挑战",
            js_challenge: "JS混淆解析挑战",
            hash_challenge: "哈希值挑战"
        }[e] || e
    }

    async function l(e) {
        try {
            if (1 === e && 0 === s.size) {
                const e = await async function (e = a) {
                    const t = `/authentication/api/hash_challenge/init/?challenge_type=${encodeURIComponent(e)}`,
                        n = await fetch(t), s = await n.json();
                    if (!n.ok) {
                        const e = s.error || `HTTP ${n.status}: ${n.statusText}`;
                        throw new Error(e)
                    }
                    return s
                }(a);
                if (e.success) return e.has_passed_before && d("提示: " + e.message, "info"), e.page_data;
                throw new Error(e.error || "初始化失败")
            }
            {
                const t = await async function (e, t = a) {
                    try {
                        return (await c.get(`/page/${e}/?challenge_type=${encodeURIComponent(t)}`)).data
                    } catch (e) {
                        const t = e.response?.data?.error || e.message;
                        throw t.includes("请先登录") && showLoginAlert(), new Error(t)
                    }
                }(e, a);
                if (t.success) return t.page_data;
                throw new Error(t.error || "获取数据失败")
            }
        } catch (e) {
            if (console.error("获取数据失败:", e), e.message.includes("请先登录")) showLoginAlert(); else {
                if (e.message.includes("need_init")) return d("挑战未初始化，正在重新初始化...", "info"), s.clear(), await l(1);
                d("获取数据失败: " + e.message, "error")
            }
            return []
        }
    }



    function d(e, t) {
        const n = document.getElementById("resultMessage");
        n.innerHTML = e, n.style.display = "block";
        const s = {success: "#d4edda", error: "#f8d7da", info: "#d1ecf1"},
            a = {success: "#c3e6cb", error: "#f5c6cb", info: "#bee5eb"};
        n.style.backgroundColor = s[t] || s.info, n.style.border = `1px solid ${a[t] || a.info}`, n.style.color = "error" === t ? "#721c24" : "success" === t ? "#155724" : "#0c5460"
    }

    c.interceptors.request.use(e => {
        const t = e.url.match(/\/page\/(\d+)\//);
        if (t) {
            const n = parseInt(t[1]),
                s = new URLSearchParams(e.url.split("?")[1] || "").get("challenge_type") || "hash_challenge",
                a = Date.now(), o = r(n, s, a);

            e.headers["X-Request-Token"] = o.hmac, e.headers["X-Verify-Code"] = o.md5;
            const c = e.url.includes("?") ? "&" : "?";
            e.url += `${c}sign=${o.sha256}&code=${o.sha3_256}&t=${a}`
        }
        return e
    }, e => (console.error("❌ [拦截器] 请求错误:", e), Promise.reject(e))), c.interceptors.response.use(e => e, e => Promise.reject(e)), document.addEventListener("DOMContentLoaded", function () {

    }), window.changePage = function (n) {
        if ("prev" === n ? n = Math.max(1, e - 1) : "next" === n && (n = Math.min(t, e + 1)), n !== e && n >= 1 && n <= t) {
            if (!validatePageNavigation(a, n)) return;
            e = n, u(n)
        }
    }, window.submitAnswer = g
})();