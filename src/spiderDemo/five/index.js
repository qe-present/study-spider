function deb() {

}

let currentPage = 1;
let totalPages = 100;
let numbersPerPage = 10;
let pageData = {};
let visitedPages = new Set;
let challengeType = "ob1_challenge";
"use strict";


function get_signature() {
  /* ------------------ 配置 ------------------ */
  const requestConfig = {
    url: '/authentication/api/ob1_challenge/page',
    method: 'get',
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*'
      }
    },
    params: {
      float: 'down',
      genre: '5000',
      device: 'iphone',
      type: 'one',
      brand: 'paid'
    },
    baseURL: '',
    timeout: 30000
  };

  /* ------------------ 工具函数 ------------------ */
  // 将字符串先 URI-Encode 再转成 Base64（浏览器 / Node 兼容）
  function uriToBase64(str) {
    const step1 = encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
    if (typeof btoa === 'function') return btoa(step1);               // 浏览器
    if (typeof Buffer === 'function') return Buffer.from(step1, 'binary').toString('base64'); // Node
    throw new Error('No Base64 encoder available');
  }

  // 简单的 XOR 加解密
  function xorCipher(text, key) {
    const base = 0;
    return Array.from(text)
      .map((ch, i) => {
        const nCode = ch.charCodeAt(0);
        const kCode = key[(i + 10) % key.length].charCodeAt(0);
        return String.fromCharCode(nCode ^ kCode);
      })
      .join('');
  }

  // 读取 Cookie（若不存在则返回当前时间戳）
  function getCookieValue(key) {
    const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
    const m = document.cookie.match(reg);
    return m ? decodeURIComponent(m[2]) : Date.now().toString();
  }

  /* ------------------ 主流程 ------------------ */
  // 1. 计算“syncd”偏移
  const syncdValue = -getCookieValue('syncd');
  const deltaTime = Date.now() - (syncdValue || 0) - 1661224081041;

  // 2. 拼接 params 值并排序
  const paramValues = Object.keys(requestConfig.params)
    .filter(k => k !== 'analysis')          // 跳过已存在的 analysis 字段
    .map(k => requestConfig.params[k])
    .sort()
    .join('');

  // 3. 多层追加字符串
  const delimiter = '@#';
  let payload = uriToBase64(paramValues);
  payload += delimiter + requestConfig.url.replace(requestConfig.baseURL, '');
  payload += delimiter + deltaTime;
  payload += delimiter + 3;                 // 962613973 - (962613973 - 3)

  // 4. 浏览器指纹 + 随机后缀
  let fingerprintSeed;
  try {
    // 若“document”被劫持则主动退出
    if ((Object.getOwnPropertyDescriptor(window, 'document').get + '').indexOf('native code') === -1) {
      return false;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Browser fingerprint', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Browser fingerprint', 4, 17);
    fingerprintSeed = 'xyz517cda96efgh' + Math.floor(Math.random() * 10);
  } catch (e) {
    fingerprintSeed = 'xyz517cda96efgh' + Math.floor(Math.random() * 9);
  }

  // 5. 再次混淆 + 时间戳
  const obfuscated = uriToBase64(xorCipher(payload, fingerprintSeed));
  const timeSuffix = new Date().getTime();
  const final = obfuscated + timeSuffix;

  // 6. 最终 Base64 一次并返回
  return btoa(final);
}


async function apiInitChallenge(type = challengeType) {
    const url = `/authentication/api/ob1_challenge/init/?challenge_type=${encodeURIComponent(type)}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        deb();
        const errorMessage = data.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage)
    }
    return data
}

async function apiSubmitAnswer(answer, type = challengeType) {
    const response = await fetch("/authentication/api/ob1_challenge/submit/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            challenge_type: type,
            answer: answer
        })
    });
    const data = await response.json();
    if (!response.ok) {
        deb();
        const errorMessage = data.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage)
    }
    return data
}

function getChallengeTypeFromUrl() {
    deb();
    const _fnStr_check = getChallengeTypeFromUrl["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("challenge_type") || urlParams.get("type") || "header_check"
}

function getChallengeDisplayName(type) {
    deb();
    const _fnStr_check = getChallengeDisplayName["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    const names = {
        "header_check": "\u8BF7\u6C42\u5934\u68C0\u6D4B\u6311\u6218",
        "number_challenge": "\u52A8\u6001\u6570\u5B57\u6C42\u548C\u6311\u6218",
        "js_challenge": "JS\u6DF7\u6DC6\u89E3\u6790\u6311\u6218",
        "slide_puzzle_challenge": "\u6ED1\u52A8\u62FC\u56FE",
        "slide_scratch_challenge": "\u6ED1\u52A8\u522E\u522E\u4E50"
    };
    return names[type] || type
}

function updatePageTitle() {
    deb();
    const _fnStr_check = updatePageTitle["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    const titleElement = document.querySelector(".challenge-title");
    if (titleElement) {
        deb();
        const displayName = getChallengeDisplayName(challengeType);
        titleElement.innerHTML = `🎯 任务: 采集这100页的全部数字，计算加和并提交结果<br/><small>(${displayName})</small>`
    }
    const pageTitle = document.querySelector(".page-title");
    if (pageTitle) {
        deb();
        pageTitle.innerHTML = `🔢 ${getChallengeDisplayName(challengeType)}`
    }
}

async function generateNumbers(page) {
    deb();
    const _fnStr_check = generateNumbers["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    try {
        deb();
        if (page === 1 && visitedPages.size === 0) {
            deb();
            const initData = await apiInitChallenge(challengeType);
            if (initData.success) {
                deb();
                console.log("\u6311\u6218\u521D\u59CB\u5316\u6210\u529F:", challengeType);
                console.log("\u521D\u59CB\u5316\u4FE1\u606F:", initData.message);
                if (initData.has_passed_before) {
                    deb();
                    showResult("\u63D0\u793A: " + initData.message, "info")
                }
                return initData.page_data
            } else {
                deb();
                throw new Error(initData.error || "\u521D\u59CB\u5316\u5931\u8D25")
            }
        } else {
            deb();
            const pageData = await apiGetPageData(page, challengeType);
            if (pageData.success) {
                deb();
                return pageData.page_data
            } else {
                deb();
                throw new Error(pageData.error || "\u83B7\u53D6\u6570\u636E\u5931\u8D25")
            }
        }
    } catch (error) {
        deb();
        console.error("\u83B7\u53D6\u6570\u636E\u5931\u8D25:", error);
        if (error.message.includes("\u8BF7\u5148\u767B\u5F55")) {
            deb();
            showLoginAlert()
        } else if (error.message.includes("need_init")) {
            deb();
            showResult("\u6311\u6218\u672A\u521D\u59CB\u5316\uFF0C\u6B63\u5728\u91CD\u65B0\u521D\u59CB\u5316...", "info");
            visitedPages.clear();
            return await generateNumbers(1)
        } else {
            deb();
            showResult("\u83B7\u53D6\u6570\u636E\u5931\u8D25: " + error.message, "error")
        }
        return []
    }
}

function renderNumbers(numbers) {
    deb();
    const _fnStr_check = renderNumbers["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    const grid = document.getElementById("numbersGrid");
    grid.innerHTML = numbers.map((num, index) => `<div class="number-box" style="animation-delay: ${index * 0.1}s">${num}</div>`).join("")
}

async function loadPageData(page) {
    deb();
    const _fnStr_check = loadPageData["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    showLoading();
    try {
        deb();
        const numbers = await generateNumbers(page);
        if (numbers.length > 0) {
            deb();
            pageData[page] = numbers;
            visitedPages.add(page);
            renderNumbers(numbers);
            updateStats();
            updatePagination();
            recordBehavior("page_view", {
                page,
                numbers: numbers.length,
                challengeType
            })
        }
    } catch (error) {
        deb();
        console.error("\u52A0\u8F7D\u9875\u9762\u6570\u636E\u5931\u8D25:", error);
        showResult("\u52A0\u8F7D\u9875\u9762\u6570\u636E\u5931\u8D25", "error")
    }
    hideLoading()
}

function changePage(page) {
    deb();
    const _fnStr_check = changePage["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    if (page === "prev") {
        deb();
        page = Math.max(1, currentPage - 1)
    } else if (page === "next") {
        deb();
        page = Math.min(totalPages, currentPage + 1)
    }
    if (page !== currentPage && page >= 1 && page <= totalPages) {
        deb();
        if (!validatePageNavigation(challengeType, page)) {
            deb();
            return
        }
        currentPage = page;
        loadPageData(page)
    }
}

function updateStats() {
    deb();
    const _fnStr_check = updateStats["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    document.getElementById("currentPageNum").textContent = currentPage;
    document.getElementById("totalPages").textContent = totalPages;
    document.getElementById("collectedPages").textContent = visitedPages.size
}

function updatePagination() {
    deb();
    const _fnStr_check = updatePagination["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    document.getElementById("paginationInfo").textContent = `第 ${currentPage} 页，共 ${totalPages} 页 | 当前页面包含 ${numbersPerPage} 个数字`;
    const paginationControls = document.getElementById("paginationControls");
    let paginationHTML = `
        <button class="page-btn" onclick="changePage('prev')" ${currentPage <= 1 ? "disabled" : ""}>← 上一页</button>
    `;
    if (totalPages <= 7) {
        deb();
        for (let i = 1; i <= totalPages; i++) {
            deb();
            paginationHTML += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">${i}</button>`
        }
    } else {
        deb();
        if (currentPage <= 4) {
            deb();
            for (let i = 1; i <= 5; i++) {
                deb();
                paginationHTML += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">${i}</button>`
            }
            paginationHTML += `<span class="page-dots">...</span>`;
            paginationHTML += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`
        } else if (currentPage >= totalPages - 3) {
            deb();
            paginationHTML += `<button class="page-btn" onclick="changePage(1)">1</button>`;
            paginationHTML += `<span class="page-dots">...</span>`;
            for (let i = totalPages - 4; i <= totalPages; i++) {
                deb();
                paginationHTML += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">${i}</button>`
            }
        } else {
            deb();
            paginationHTML += `<button class="page-btn" onclick="changePage(1)">1</button>`;
            paginationHTML += `<span class="page-dots">...</span>`;
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                deb();
                paginationHTML += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">${i}</button>`
            }
            paginationHTML += `<span class="page-dots">...</span>`;
            paginationHTML += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`
        }
    }
    paginationHTML += `
        <button class="page-btn" onclick="changePage('next')" ${currentPage >= totalPages ? "disabled" : ""}>下一页 →</button>
    `;
    paginationControls.innerHTML = paginationHTML
}

async function submitAnswer() {
    deb();
    const _fnStr_check = submitAnswer["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    const answer = document.getElementById("answerInput").value.trim();
    if (!answer) {
        deb();
        showResult("\u8BF7\u8F93\u5165\u7B54\u6848\uFF01", "error");
        return
    }
    if (!/^\d+$/.test(answer)) {
        deb();
        showResult("\u7B54\u6848\u683C\u5F0F\u9519\u8BEF\uFF0C\u8BF7\u8F93\u5165\u7EAF\u6570\u5B57\uFF01", "error");
        return
    }
    try {
        deb();
        const result = await apiSubmitAnswer(parseInt(answer), challengeType);
        if (result.success) {
            deb();
            const statusIcon = result.is_correct ? "\uD83C\uDF89" : "\u274C";
            const statusText = result.is_correct ? "\u6B63\u786E" : "\u9519\u8BEF";
            let message = `
                <strong>${statusIcon} 答案${statusText}！</strong><br/>
                提交答案: ${result.submitted_answer}<br/>
                已访问页面: ${visitedPages.size}/${totalPages}<br/>
                挑战类型: ${getChallengeDisplayName(result.challenge_type)}<br/>
                提交时间: ${new Date(result.submitted_at).toLocaleString()}<br/>
            `;
            if (result.is_repeat_success) {
                deb();
                message += "<br/>\uD83D\uDCA1 " + result.message
            } else if (result.is_correct) {
                deb();
                message += "<br/>\uD83C\uDF8A " + result.message
            } else {
                deb();
                message += `<br/>📝 建议: 仔细检查计算过程，可以重新提交答案！`
            }
            showResult(message, result.is_correct ? "success" : "error");
            document.getElementById("answerInput").value = "";
            document.getElementById("answerInput").focus();
            recordBehavior("submit_answer", {
                challengeType,
                answer: result.submitted_answer,
                visitedPages: Array.from(visitedPages),
                isCorrect: result.is_correct,
                isRepeatSuccess: result.is_repeat_success
            })
        } else {
            deb();
            showResult(result.message || result.error, "error")
        }
    } catch (error) {
        deb();
        console.error("\u63D0\u4EA4\u7B54\u6848\u5931\u8D25:", error);
        if (error.message.includes("\u8BF7\u5148\u767B\u5F55")) {
            deb();
            showLoginAlert()
        } else {
            deb();
            showResult("\u63D0\u4EA4\u7B54\u6848\u5931\u8D25: " + error.message, "error")
        }
    }
}

function showResult(message, type) {
    deb();
    const _fnStr_check = showResult["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    const resultDiv = document.getElementById("resultMessage");
    resultDiv.innerHTML = message;
    resultDiv.style.display = "block";
    const colors = {
        "success": "#d4edda",
        "error": "#f8d7da",
        "info": "#d1ecf1"
    };
    const borderColors = {
        "success": "#c3e6cb",
        "error": "#f5c6cb",
        "info": "#bee5eb"
    };
    resultDiv.style.backgroundColor = colors[type] || colors.info;
    resultDiv.style.border = `1px solid ${borderColors[type] || borderColors.info}`;
    resultDiv.style.color = type === "error" ? "#721c24" : type === "success" ? "#155724" : "#0c5460"
}

function recordBehavior(action, data) {
    deb();
    const _fnStr_check = recordBehavior["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    console.log("\u884C\u4E3A\u8BB0\u5F55:", {
        action,
        data,
        timestamp: Date.now()
    })
}

function showLoading() {
    deb();
    const _fnStr_check = showLoading["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    document.getElementById("loadingOverlay").style.display = "flex"
}

function hideLoading() {
    deb();
    const _fnStr_check = hideLoading["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    document.getElementById("loadingOverlay").style.display = "none"
}

function initEventListeners() {
    deb();
    const _fnStr_check = initEventListeners["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    document.addEventListener("keypress", function (e) {
        deb();
        if (e.key === "Enter" && e.target.id === "answerInput") {
            deb();
            submitAnswer()
        }
    })
}

function initializePage() {
    deb();
    const _fnStr_check = initializePage["toString"]();
    const _first50_check = _fnStr_check["substring"](0, 50);
    if (!_first50_check["includes"]("deb")) {
        throw new Error("\u68C0\u6D4B\u5230\u53CD\u8C03\u8BD5\u4EE3\u7801\u88AB\u4FEE\u6539")
    }
    challengeType = getChallengeTypeFromUrl();
    console.log("\u5F53\u524D\u6311\u6218\u7C7B\u578B:", challengeType);
    updatePageTitle();
    loadPageData(1);
    initEventListeners()
}

async function apiGetPageData(page, type = challengeType) {
    try {
        deb();
        const signature = O0o0O0O0();
        const url = `/authentication/api/ob1_challenge/page/${page}/?challenge_type=${encodeURIComponent(type)}&signature=${encodeURIComponent(signature)}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        const data = await response.json();
        if (!response.ok) {
            deb();
            const errorMessage = data.error || `HTTP ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage)
        }
        return data
    } catch (error) {
        deb();
        console.error("\u83B7\u53D6\u9875\u9762\u6570\u636E\u5931\u8D25:", error);
        throw error
    }
}

document.addEventListener("DOMContentLoaded", function () {
    deb();
    initializePage()
});
