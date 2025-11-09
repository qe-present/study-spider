from mitmproxy import http

ALLOWED_ORIGIN = "http://localhost:63343"
COOKIE = ""


def responseheaders(flow: http.HTTPFlow):
    # 只在反向代理模式下给**响应**加头
    global COOKIE

    # 只拦截登录接口（反向代理后 URL 已经是 spiderdemo 的）
    if (
            flow.request.method == "POST"
            and flow.request.path == "/admin_I/api/auth/login"
            and flow.response
    ):
        cookies = flow.response.headers.get_all("Set-Cookie")
        COOKIE = "; ".join(c.split(";", 1)[0] for c in cookies)

    flow.response.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN
    flow.response.headers["Access-Control-Allow-Credentials"] = "true"
    flow.response.headers["Access-Control-Allow-Headers"] = "X-Aes-Token,X-Des-Token,Content-Type"
    flow.response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"


def request(flow: http.HTTPFlow):
    global COOKIE
    if flow.request.method == "OPTIONS":
        flow.response = http.Response.make(
            204, b"",
            {"Access-Control-Max-Age": "86400"}
        )
    if flow.request.method in ("GET", "POST"):
        flow.request.headers["Cookie"] = COOKIE
