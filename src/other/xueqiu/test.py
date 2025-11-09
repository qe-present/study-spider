from DrissionPage import ChromiumPage
page=ChromiumPage()
cookies = {
    "acw_tc": "3ccdc14717620911132651349e2dc3b58cb07b412e747f4bca8e9ce0d0301d",
    "cookiesu": "491762091114387",
    "device_id": "48bb179c2b5198a51c8ce1064492f93f",
    "Hm_lvt_1db88642e346389874251b5a1eded6e3": "1762091114",
    "HMACCOUNT": "10434D6FE5C4DBCD",
    "s": "at1259cyhz",
    "remember": "1",
    "xq_a_token": "ea8a4b95f2e9b5d50d8174ba4e750a00cb2f7031",
    "xqat": "ea8a4b95f2e9b5d50d8174ba4e750a00cb2f7031",
    "xq_id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjk1ODYzMjU1MDIsImlzcyI6InVjIiwiZXhwIjoxNzY0NjgzMTc3LCJjdG0iOjE3NjIwOTExNzczOTksImNpZCI6ImQ5ZDBuNEFadXAifQ.PSckB8lAZUs9o73buixTjLjCScfwDRPpyjF3BpTI8gz_mFPcVCeRVz5fhy4I4peN6gfP6LfmwLY13lyre6KvUG0hVl-IZ2b-PW_RuYxVEXypi3ng962LvkzHzzGVDUrZHej1OYXtAcGkdS2F5QPnSiiZixd19yFa697rAhE0OySMSWF7NOFzM8qzLKOpkNz5FezzrMg8SfprfIGjCyiAGHtupugb5EcabuRE-szfCXws6ILR-f5HRrOFjxMOQDGFezlzS9qrFjDqjER2_DTsY6R37i1mHbSySQgQMgPX_KfblVfTXhkoyqcZC65p518ntlT743CWle4IO0vXJzSnnQ",
    "xq_r_token": "77c8e7b66ef697669f4bfc01676b12a6a95e7b59",
    "xq_is_login": "1",
    "u": "9586325502",
    "Hm_lpvt_1db88642e346389874251b5a1eded6e3": "1762091423",
    ".thumbcache_f24b8bbe5a5934237bbc0eda20c1b6e7": "RAih6OcPtrgacpa8byUtb5150tJTtDF26byyQeb56AmfboBYdeSOEBYe8CyEpWptCSWy3TkiG+Y+UV2gBI0bRg^%^3D^%^3D",
    "ssxmod_itna": "1-YqRxnDBD0im49DUxeKYKRn7Dm2_eGODl4BtGRDeq7U=GcD8OD0Pig30=2fAvxI3eDfEDAxSnxGX3xPxiNDAZ40iDCbnLe3norr0paWtBTP1xxZDo_5KWIDxRYfrf7UbuXa5n/gnLLLcYDU4GnD06_n2YD4_3Dt4DIDAYDDxDWDYE4xGtTDG=D7ORQgju3xi3DbObDf4DmDGAokeDgIDDBz8iDKTPdaDDlWi7KWlxeWZcxvce1cemHLA_ox0taDBLGjFho6ZSjaYnHst8WrfrDzMCDtLTTe6i1p2RrZearKG=lPxieerXkDRxW0OQGYDreK0bD24owiQqxmiiz0rn4On4DG8s8WdKA4Te1LL1Xdz_AsXDQnopur5MYhrG5bBYMA5ViYPY4QoY=7=YCY8eeaiDD",
    "ssxmod_itna2": "1-YqRxnDBD0im49DUxeKYKRn7Dm2_eGODl4BtGRDeq7U=GcD8OD0Pig30=2fAvxI3eDfEDAxSexD3r3e6jETIQLAwvN4D5bYbiA1aYD^"
}
page.set.cookies(cookies)
page.get('https://xueqiu.com/statuses/hot/listV2.json?since_id=20&max_id=841365&size=15&md5__1038=287ec7c416-w1w1eu7WbuAWoCvWzSWPR3PC3ZWTf2CpMhvSRNmvnJYWRuWvwFWMRMMQvrWDHvaWK4pS3J13JW3wWjWw4WgWW4WbWSmsW9uniiTzIWWLSWnv3_WJvWQMunhhWG13mWlU23bWprWWJLy7fWbZ3q%3D63RW2DxWJ4LY753vzWGGuuHJfvw3O50FMq1qW9arWu4wW')
print(page.json)