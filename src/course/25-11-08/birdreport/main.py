from mitmproxy import http


def responseheaders(flow: http.HTTPFlow):
    flow.response.headers["Access-Control-Allow-Origin"] = "*"
    flow.response.headers["Access-Control-Allow-Credentials"] = "true"
    flow.response.headers[
        "Access-Control-Allow-Headers"] = "access-control-allow-origin, sign, content-type, timestamp, requestId"
    flow.response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"


def request(flow: http.HTTPFlow):
    flow.request.headers["Referer"] = "https://www.birdreport.cn/"
    if flow.request.method == "OPTIONS":
        flow.response = http.Response.make(
            204, b"",
            {"Access-Control-Max-Age": "86400"}
        )
