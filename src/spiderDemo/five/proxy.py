from mitmproxy import http

def request(flow: http.HTTPFlow):
    if flow.request.method=="GET":
        flow.request.headers["Cookie"]="sessionid=ee9chqk26l9emee8runioq14st0yzc83"