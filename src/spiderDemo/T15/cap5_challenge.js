const _0x124520 = (function () {
    let _0x4a0ced = !![];
    return function (_0x399468, _0x307f25) {
        const _0x2c3ca1 = _0x4a0ced ? function () {
            if (_0x307f25) {
                const _0x734123 = _0x307f25['apply'](_0x399468, arguments);
                _0x307f25 = null;
                return _0x734123;
            }
        } : function () {
        };
        _0x4a0ced = ![];
        return _0x2c3ca1;
    };
}());
const _0x1a5280 = _0x124520(this, function () {
    return _0x1a5280['toString']()['search']('(((.+)+)+)+$')['toString']()['constructor'](_0x1a5280)['search']('(((.+)+)+)+$');
});
_0x1a5280();
let currentPage = 0x1;
let totalPages = 0x64;
let numbersPerPage = 0xa;
let pageData = {};
let visitedPages = new Set();
let challengeType = 'cap5_challenge';
let pendingPageNum = null;

async function apiInitChallenge(_0x4c69d2 = challengeType) {
    const _0x20ec6e = '/captcha/api/cap5_challenge/init/?challenge_type=' + encodeURIComponent(_0x4c69d2);
    const _0x377817 = await fetch(_0x20ec6e);
    const _0x44c438 = await _0x377817['json']();
    if (!_0x377817['ok']) {
        const _0x1d33de = _0x44c438['error'] || 'HTTP\x20' + _0x377817['status'] + ':\x20' + _0x377817['statusText'];
        throw new Error(_0x1d33de);
    }
    return _0x44c438;
}

async function apiSubmitAnswer(_0x16474c, _0x594941 = challengeType) {
    const _0x45612d = await fetch('/captcha/api/cap5_challenge/submit/', {
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON['stringify']({'challenge_type': _0x594941, 'answer': _0x16474c})
    });
    const _0x53039e = await _0x45612d['json']();
    if (!_0x45612d['ok']) {
        const _0x4deb4e = _0x53039e['error'] || 'HTTP\x20' + _0x45612d['status'] + ':\x20' + _0x45612d['statusText'];
        throw new Error(_0x4deb4e);
    }
    return _0x53039e;
}

function getChallengeTypeFromUrl() {
    const _0x2308d2 = new URLSearchParams(window['location']['search']);
    return _0x2308d2['get']('challenge_type') || _0x2308d2['get']('type') || 'cap5_challenge';
}

function getChallengeDisplayName(_0x469cc2) {
    const _0x10088c = {
        'header_check': '请求头检测挑战',
        'number_challenge': '动态数字求和挑战',
        'js_challenge': 'JS混淆解析挑战',
        'slide_puzzle_challenge': '滑动拼图',
        'slide_scratch_challenge': '滑动刮刮乐',
        'cap5_challenge': '第二代验证码（随机滑块）'
    };
    return _0x10088c[_0x469cc2] || _0x469cc2;
}

function updatePageTitle() {
    const _0x1c8cd3 = document['querySelector']('.challenge-title');
    if (_0x1c8cd3) {
        const _0x37b499 = getChallengeDisplayName(challengeType);
        _0x1c8cd3['innerHTML'] = '🎯\x20任务:\x20采集这100页的全部数字，计算加和并提交结果<br/><small>(' + _0x37b499 + ')</small>';
    }
    const _0x48eeed = document['querySelector']('.page-title');
    if (_0x48eeed) {
        _0x48eeed['innerHTML'] = '🔢\x20' + getChallengeDisplayName(challengeType);
    }
}

async function generateNumbers(_0x3e74fd) {
    try {
        if (_0x3e74fd === 0x1 && visitedPages['size'] === 0x0) {
            const _0xbc5ff0 = await apiInitChallenge(challengeType);
            if (_0xbc5ff0['success']) {
                if (_0xbc5ff0['has_passed_before']) {
                    showResult('提示:\x20' + _0xbc5ff0['message'], 'info');
                }
                return _0xbc5ff0['page_data'];
            } else {
                throw new Error(_0xbc5ff0['error'] || '初始化失败');
            }
        } else {
            const _0x2fcadb = await apiGetPageData(_0x3e74fd, challengeType);
            if (_0x2fcadb['success']) {
                return _0x2fcadb['page_data'];
            } else {
                throw new Error(_0x2fcadb['error'] || '获取数据失败');
            }
        }
    } catch (_0x5495a4) {
        console['error']('获取数据失败:', _0x5495a4);
        if (_0x5495a4['message']['includes']('请先登录')) {
            showLoginAlert();
        } else if (_0x5495a4['message']['includes']('need_init')) {
            showResult('挑战未初始化，正在重新初始化...', 'info');
            visitedPages['clear']();
            return await generateNumbers(0x1);
        } else {
            showResult('获取数据失败:\x20' + _0x5495a4['message'], 'error');
        }
        return [];
    }
}

function renderNumbers(_0x53f126) {
    const _0x42a8a2 = document['getElementById']('numbersGrid');
    _0x42a8a2['innerHTML'] = _0x53f126['map']((_0xf0249d, _0x967c38) => '<div\x20class=\x22number-box\x22\x20style=\x22animation-delay:\x20' + _0x967c38 * 0.1 + 's\x22>' + _0xf0249d + '</div>')['join']('');
}

async function loadPageData(_0x15302e) {
    showLoading();
    try {
        const _0x54d7a5 = await generateNumbers(_0x15302e);
        if (_0x54d7a5['length'] > 0x0) {
            pageData[_0x15302e] = _0x54d7a5;
            visitedPages['add'](_0x15302e);
            renderNumbers(_0x54d7a5);
            updateStats();
            updatePagination();
            recordBehavior('page_view', {
                'page': _0x15302e,
                'numbers': _0x54d7a5['length'],
                'challengeType': challengeType
            });
        }
    } catch (_0x4824c9) {
        console['error']('加载页面数据失败:', _0x4824c9);
        showResult('加载页面数据失败', 'error');
    }
    hideLoading();
}

function changePage(_0x1e68aa) {
    if (_0x1e68aa === 'prev') {
        _0x1e68aa = Math['max'](0x1, currentPage - 0x1);
    } else if (_0x1e68aa === 'next') {
        _0x1e68aa = Math['min'](totalPages, currentPage + 0x1);
    }
    if (_0x1e68aa !== currentPage && _0x1e68aa >= 0x1 && _0x1e68aa <= totalPages) {
        if (!validatePageNavigation(challengeType, _0x1e68aa)) {
            return;
        }
        if (_0x1e68aa === 0x1) {
            currentPage = _0x1e68aa;
            loadPageData(_0x1e68aa);
            return;
        }
        pendingPageNum = _0x1e68aa;
        showCaptchaForPage(_0x1e68aa);
    }
}

function updateStats() {
    document['getElementById']('currentPageNum')['textContent'] = currentPage;
    document['getElementById']('totalPages')['textContent'] = totalPages;
    document['getElementById']('collectedPages')['textContent'] = visitedPages['size'];
}

function updatePagination() {
    document['getElementById']('paginationInfo')['textContent'] = '第\x20' + currentPage + '\x20页，共\x20' + totalPages + '\x20页\x20|\x20当前页面包含\x20' + numbersPerPage + '\x20个数字';
    const _0x23268f = document['getElementById']('paginationControls');
    let _0x3db67b = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22page-btn\x22\x20onclick=\x22changePage(\x27prev\x27)\x22\x20' + (currentPage <= 0x1 ? 'disabled' : '') + '>←\x20上一页</button>\x0a\x20\x20\x20\x20';
    if (totalPages <= 0x7) {
        for (let _0x478f13 = 0x1; _0x478f13 <= totalPages; _0x478f13++) {
            _0x3db67b += '<button\x20class=\x22page-btn\x20' + (_0x478f13 === currentPage ? 'active' : '') + '\x22\x20onclick=\x22changePage(' + _0x478f13 + ')\x22>' + _0x478f13 + '</button>';
        }
    } else {
        if (currentPage <= 0x4) {
            for (let _0x2f8150 = 0x1; _0x2f8150 <= 0x5; _0x2f8150++) {
                _0x3db67b += '<button\x20class=\x22page-btn\x20' + (_0x2f8150 === currentPage ? 'active' : '') + '\x22\x20onclick=\x22changePage(' + _0x2f8150 + ')\x22>' + _0x2f8150 + '</button>';
            }
            _0x3db67b += '<span\x20class=\x22page-dots\x22>...</span>';
            _0x3db67b += '<button\x20class=\x22page-btn\x22\x20onclick=\x22changePage(' + totalPages + ')\x22>' + totalPages + '</button>';
        } else if (currentPage >= totalPages - 0x3) {
            _0x3db67b += '<button\x20class=\x22page-btn\x22\x20onclick=\x22changePage(1)\x22>1</button>';
            _0x3db67b += '<span\x20class=\x22page-dots\x22>...</span>';
            for (let _0xa14f53 = totalPages - 0x4; _0xa14f53 <= totalPages; _0xa14f53++) {
                _0x3db67b += '<button\x20class=\x22page-btn\x20' + (_0xa14f53 === currentPage ? 'active' : '') + '\x22\x20onclick=\x22changePage(' + _0xa14f53 + ')\x22>' + _0xa14f53 + '</button>';
            }
        } else {
            _0x3db67b += '<button\x20class=\x22page-btn\x22\x20onclick=\x22changePage(1)\x22>1</button>';
            _0x3db67b += '<span\x20class=\x22page-dots\x22>...</span>';
            for (let _0x159089 = currentPage - 0x1; _0x159089 <= currentPage + 0x1; _0x159089++) {
                _0x3db67b += '<button\x20class=\x22page-btn\x20' + (_0x159089 === currentPage ? 'active' : '') + '\x22\x20onclick=\x22changePage(' + _0x159089 + ')\x22>' + _0x159089 + '</button>';
            }
            _0x3db67b += '<span\x20class=\x22page-dots\x22>...</span>';
            _0x3db67b += '<button\x20class=\x22page-btn\x22\x20onclick=\x22changePage(' + totalPages + ')\x22>' + totalPages + '</button>';
        }
    }
    _0x3db67b += '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22page-btn\x22\x20onclick=\x22changePage(\x27next\x27)\x22\x20' + (currentPage >= totalPages ? 'disabled' : '') + '>下一页\x20→</button>\x0a\x20\x20\x20\x20';
    _0x23268f['innerHTML'] = _0x3db67b;
}

async function submitAnswer() {
    const _0x3411de = document['getElementById']('answerInput')['value']['trim']();
    if (!_0x3411de) {
        showResult('请输入答案！', 'error');
        return;
    }
    if (!/^\d+$/['test'](_0x3411de)) {
        showResult('答案格式错误，请输入纯数字！', 'error');
        return;
    }
    try {
        const _0x2b9a07 = await apiSubmitAnswer(parseInt(_0x3411de), challengeType);
        if (_0x2b9a07['success']) {
            const _0x4bd534 = _0x2b9a07['is_correct'] ? '🎉' : '❌';
            const _0x3ecc12 = _0x2b9a07['is_correct'] ? '正确' : '错误';
            let _0x69f790 = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>' + _0x4bd534 + '\x20答案' + _0x3ecc12 + '！</strong><br/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20提交答案:\x20' + _0x2b9a07['submitted_answer'] + '<br/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20已访问页面:\x20' + visitedPages['size'] + '/' + totalPages + '<br/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20挑战类型:\x20' + getChallengeDisplayName(_0x2b9a07['challenge_type']) + '<br/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20提交时间:\x20' + new Date(_0x2b9a07['submitted_at'])['toLocaleString']() + '<br/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20';
            if (_0x2b9a07['is_repeat_success']) {
                _0x69f790 += '<br/>💡\x20' + _0x2b9a07['message'];
            } else if (_0x2b9a07['is_correct']) {
                _0x69f790 += '<br/>🎊\x20' + _0x2b9a07['message'];
            } else {
                _0x69f790 += '<br/>📝\x20建议:\x20仔细检查计算过程，可以重新提交答案！';
            }
            showResult(_0x69f790, _0x2b9a07['is_correct'] ? 'success' : 'error');
            document['getElementById']('answerInput')['value'] = '';
            document['getElementById']('answerInput')['focus']();
            recordBehavior('submit_answer', {
                'challengeType': challengeType,
                'answer': _0x2b9a07['submitted_answer'],
                'visitedPages': Array['from'](visitedPages),
                'isCorrect': _0x2b9a07['is_correct'],
                'isRepeatSuccess': _0x2b9a07['is_repeat_success']
            });
        } else {
            showResult(_0x2b9a07['message'] || _0x2b9a07['error'], 'error');
        }
    } catch (_0x9807c2) {
        console['error']('提交答案失败:', _0x9807c2);
        if (_0x9807c2['message']['includes']('请先登录')) {
            showLoginAlert();
        } else {
            showResult('提交答案失败:\x20' + _0x9807c2['message'], 'error');
        }
    }
}

function showResult(_0x376046, _0x42663d) {
    const _0xe79ac6 = document['getElementById']('resultMessage');
    _0xe79ac6['innerHTML'] = _0x376046;
    _0xe79ac6['style']['display'] = 'block';
    const _0x20ddbd = {'success': '#d4edda', 'error': '#f8d7da', 'info': '#d1ecf1'};
    const _0x290469 = {'success': '#c3e6cb', 'error': '#f5c6cb', 'info': '#bee5eb'};
    _0xe79ac6['style']['backgroundColor'] = _0x20ddbd[_0x42663d] || _0x20ddbd['info'];
    _0xe79ac6['style']['border'] = '1px\x20solid\x20' + (_0x290469[_0x42663d] || _0x290469['info']);
    _0xe79ac6['style']['color'] = _0x42663d === 'error' ? '#721c24' : _0x42663d === 'success' ? '#155724' : '#0c5460';
}

function recordBehavior(_0x14063f, _0x5a3df5) {
    console['log']('行为记录:', {'action': _0x14063f, 'data': _0x5a3df5, 'timestamp': Date['now']()});
}

function showLoading() {
    document['getElementById']('loadingOverlay')['style']['display'] = 'flex';
}

function hideLoading() {
    document['getElementById']('loadingOverlay')['style']['display'] = 'none';
}

function initEventListeners() {
    document['addEventListener']('keypress', function (_0x3c5451) {
        if (_0x3c5451['key'] === 'Enter' && _0x3c5451['target']['id'] === 'answerInput') {
            submitAnswer();
        }
    });
    initSliderEvents();
}

function initSliderEvents() {
    window['sliderDistance'] = 0x0;
    const _0x250120 = document['getElementById']('slider-btn');
    if (!_0x250120) return;
    let _0x3e42e2 = ![];
    let _0x550dce = 0x0;
    let _0x530089 = 0x0;
    _0x250120['addEventListener']('mousedown', function (_0x5879a0) {
        _0x3e42e2 = !![];
        _0x550dce = _0x5879a0['clientX'];
        _0x250120['style']['cursor'] = 'grabbing';
        _0x250120['style']['transition'] = 'none';
        _0x5879a0['preventDefault']();
    });
    document['addEventListener']('mousemove', function (_0x30dc93) {
        if (!_0x3e42e2) return;
        _0x530089 = _0x30dc93['clientX'] - _0x550dce;
        const _0x3c8338 = window['sliderScaleInfo'] ? window['sliderScaleInfo']['maxDragDistance'] : 0x12c;
        _0x530089 = Math['max'](0x0, Math['min'](_0x3c8338, _0x530089));
        updateSliderPosition(_0x530089);
        _0x30dc93['preventDefault']();
    });
    document['addEventListener']('mouseup', function (_0x9e48a7) {
        if (_0x3e42e2) {
            _0x3e42e2 = ![];
            _0x250120['style']['cursor'] = 'grab';
            _0x250120['style']['transition'] = 'all\x200s\x20ease';
            window['sliderDistance'] = _0x530089;
            if (_0x530089 > 0x32) {
                setTimeout(() => {
                    verifyCaptchaAndGetData();
                }, 0x12c);
            }
        }
    });
    _0x250120['addEventListener']('touchstart', function (_0x237311) {
        _0x3e42e2 = !![];
        _0x550dce = _0x237311['touches'][0x0]['clientX'];
        _0x250120['style']['transition'] = 'none';
        _0x237311['preventDefault']();
    });
    document['addEventListener']('touchmove', function (_0x2e6b05) {
        if (!_0x3e42e2) return;
        _0x530089 = _0x2e6b05['touches'][0x0]['clientX'] - _0x550dce;
        const _0xfa7c6 = window['sliderScaleInfo'] ? window['sliderScaleInfo']['maxDragDistance'] : 0x12c;
        _0x530089 = Math['max'](0x0, Math['min'](_0xfa7c6, _0x530089));
        updateSliderPosition(_0x530089);
        _0x2e6b05['preventDefault']();
    });
    document['addEventListener']('touchend', function (_0x57b4ec) {
        if (_0x3e42e2) {
            _0x3e42e2 = ![];
            window['sliderDistance'] = _0x530089;
            if (_0x530089 > 0x32) {
                setTimeout(() => {
                    verifyCaptchaAndGetData();
                }, 0x12c);
            }
        }
    });
}

function updateSliderPosition(_0x14de2d) {
    const _0x18b323 = document['getElementById']('slider-btn');
    const _0x4f8209 = document['getElementById']('slider-piece');
    if (_0x18b323) {
        _0x18b323['style']['left'] = _0x14de2d + 'px';
    }
    if (_0x4f8209) {
        _0x4f8209['style']['left'] = _0x14de2d + 'px';
    }
}

function initializePage() {
    challengeType = getChallengeTypeFromUrl();
    console['log']('当前挑战类型:', challengeType);
    updatePageTitle();
    loadPageData(0x1);
    initEventListeners();
}

document['addEventListener']('DOMContentLoaded', function () {
    initializePage();
});

function showCaptchaForPage(_0x595f84) {
    const _0x15be65 = document['getElementById']('captchaSection');
    const _0xe622c4 = document['getElementById']('numbersGrid');
    _0xe622c4['style']['display'] = 'none';
    _0x15be65['style']['display'] = 'block';
    const _0x58af25 = document['querySelector']('.captcha-title');
    _0x58af25['textContent'] = '🧩\x20请拖动滑块完成验证以获取第' + _0x595f84 + '页数据';
    refreshCaptcha();
    hideCaptchaMessage();
}

function hideCaptchaSection() {
    const _0x73cee4 = document['getElementById']('captchaSection');
    const _0x29c03b = document['getElementById']('numbersGrid');
    _0x29c03b['style']['display'] = 'grid';
    _0x73cee4['style']['display'] = 'none';
    pendingPageNum = null;
}

async function refreshCaptcha() {
    disableSliderDrag();
    showCaptchaMessage('正在加载验证码...', 'loading');
    resetSlider();
    try {
        await loadSliderCaptcha();
        enableSliderDrag();
        hideCaptchaMessage();
    } catch (_0x28d072) {
        enableSliderDrag();
        showCaptchaMessage('验证码加载失败，请重试', 'error');
        console['error']('刷新验证码失败:', _0x28d072);
    }
}

async function loadSliderCaptcha() {
    try {
        const _0x5a1c10 = await fetch('/captcha/api/cap5_challenge/captcha_image/?t=' + Date['now']());
        const _0x4ac19d = await _0x5a1c10['json']();
        if (_0x4ac19d['masked'] && _0x4ac19d['overlay'] && _0x4ac19d['image_info'] && typeof _0x4ac19d['slider_y'] !== 'undefined') {
            window['captchaImageInfo'] = _0x4ac19d['image_info'];
            window['captchaSliderY'] = _0x4ac19d['slider_y'];
            const _0x4b014a = document['getElementById']('slider-bg');
            if (_0x4b014a) {
                _0x4b014a['src'] = 'data:image/webp;base64,' + _0x4ac19d['overlay'];
            }
            const _0xb7e207 = document['getElementById']('slider-piece');
            if (_0xb7e207) {
                _0xb7e207['src'] = 'data:image/png;base64,' + _0x4ac19d['masked'];
                setupSliderDynamic(_0xb7e207, _0x4ac19d['image_info'], _0x4ac19d['slider_y']);
            }
        }
    } catch (_0x1e36be) {
        console['error']('加载滑块验证码失败:', _0x1e36be);
        showCaptchaMessage('加载验证码失败，请重试', 'error');
    }
}

function setupSliderDynamic(_0xfff78d, _0x19025b, _0x4af8e7) {
    const _0x487e70 = document['querySelector']('.slider-container');
    if (!_0x487e70) {
        console['error']('找不到slider-container元素');
        return;
    }
    const _0x478bdd = _0x487e70['getBoundingClientRect']();
    const _0x4e2636 = Math['floor'](_0x478bdd['width']);
    const _0x242fa8 = Math['floor'](_0x478bdd['height']);
    const _0x5ae7b5 = _0x19025b['bg_width'];
    const _0x30f853 = _0x19025b['bg_height'];
    const _0x400885 = _0x19025b['mask_width'];
    const _0x2d62b1 = _0x19025b['mask_height'];
    const _0x8bfe7b = _0x4e2636 / _0x5ae7b5;
    const _0x200b9c = _0x242fa8 / _0x30f853;
    const _0x53c83c = Math['max'](_0x8bfe7b, _0x200b9c);
    const _0x569014 = _0x5ae7b5 * _0x53c83c;
    const _0x1b30c8 = _0x30f853 * _0x53c83c;
    const _0x5f1407 = (_0x4e2636 - _0x569014) / 0x2;
    const _0x5e38d9 = (_0x242fa8 - _0x1b30c8) / 0x2;
    const _0x5a750f = _0x400885 * _0x53c83c;
    const _0x4c5a0b = _0x2d62b1 * _0x53c83c;
    _0xfff78d['style']['width'] = _0x5a750f + 'px';
    _0xfff78d['style']['height'] = _0x4c5a0b + 'px';
    const _0x4c27bc = _0x5e38d9 + _0x4af8e7 * _0x53c83c;
    _0xfff78d['style']['top'] = _0x4c27bc + 'px';
    _0xfff78d['style']['left'] = '0px';
    _0xfff78d['style']['marginLeft'] = _0x5f1407 + 'px';
    window['sliderScaleInfo'] = {
        'scale': _0x53c83c,
        'displayWidth': _0x569014,
        'displayHeight': _0x1b30c8,
        'offsetX': _0x5f1407,
        'offsetY': _0x5e38d9,
        'sliderWidth': _0x5a750f,
        'sliderHeight': _0x4c5a0b,
        'maxDragDistance': _0x569014 - _0x5a750f
    };
}

function resetSlider() {
    const _0x3f71f6 = document['getElementById']('slider-btn');
    const _0x3dd184 = document['getElementById']('slider-piece');
    if (_0x3f71f6) {
        _0x3f71f6['style']['left'] = '0px';
    }
    if (_0x3dd184) {
        _0x3dd184['style']['left'] = '0px';
        if (window['sliderScaleInfo']) {
            _0x3dd184['style']['marginLeft'] = window['sliderScaleInfo']['offsetX'] + 'px';
        }
    }
    window['sliderDistance'] = 0x0;
}

async function verifyCaptchaAndGetData() {
    const _0x3474c4 = window['sliderDistance'] || 0x0;
    if (_0x3474c4 <= 0x0) {
        showCaptchaMessage('请拖动滑块完成验证！', 'error');
        return;
    }
    if (!pendingPageNum) {
        showCaptchaMessage('无效的页面请求！', 'error');
        return;
    }
    showLoading();
    try {
        if (window['sliderScaleInfo']) {
        }
        const _0x59798d = await apiGetPageData(pendingPageNum, challengeType, _0x3474c4);
        if (_0x59798d['success']) {
            showCaptchaMessage('滑块验证成功！正在获取数据...', 'success');
            if (_0x59798d['page_data'] && _0x59798d['page_data']['length'] > 0x0) {
                pageData[pendingPageNum] = _0x59798d['page_data'];
                visitedPages['add'](pendingPageNum);
                currentPage = pendingPageNum;
                renderNumbers(_0x59798d['page_data']);
                updateStats();
                updatePagination();
                setTimeout(() => {
                    hideCaptchaSection();
                }, 0x64);
                recordBehavior('page_view_with_captcha', {
                    'page': currentPage,
                    'numbers': _0x59798d['page_data']['length'],
                    'challengeType': challengeType
                });
            }
        } else {
            showCaptchaMessage(_0x59798d['error'] || '验证失败', 'error');
            setTimeout(() => {
                refreshCaptcha();
            }, 0x5dc);
        }
    } catch (_0x583a49) {
        console['error']('验证滑块失败:', _0x583a49);
        showCaptchaMessage('验证失败，请重试', 'error');
        setTimeout(() => {
            refreshCaptcha();
        }, 0x5dc);
    }
    hideLoading();
}

function showCaptchaMessage(_0x9014d3, _0x5be583) {
    const _0x21f537 = document['getElementById']('captchaMessage');
    _0x21f537['textContent'] = _0x9014d3;
    _0x21f537['className'] = 'captcha-message\x20' + _0x5be583;
    _0x21f537['style']['display'] = 'block';
    if (_0x5be583 === 'error') {
        setTimeout(() => {
            hideCaptchaMessage();
        }, 0xbb8);
    }
    if (_0x5be583 === 'success') {
        setTimeout(() => {
            hideCaptchaMessage();
        }, 0x7d0);
    }
}

function hideCaptchaMessage() {
    const _0x503354 = document['getElementById']('captchaMessage');
    _0x503354['style']['display'] = 'none';
}

function disableSliderDrag() {
    const _0x3f0b5a = document['getElementById']('slider-btn');
    const _0x2483a1 = document['querySelector']('.slider-container');
    if (_0x3f0b5a) {
        _0x3f0b5a['style']['pointerEvents'] = 'none';
        _0x3f0b5a['style']['opacity'] = '0.5';
        _0x3f0b5a['style']['cursor'] = 'not-allowed';
        _0x3f0b5a['innerHTML'] = '<span>⏳</span>';
    }
    if (_0x2483a1) {
        _0x2483a1['style']['opacity'] = '0.7';
    }
}

function enableSliderDrag() {
    const _0x430d51 = document['getElementById']('slider-btn');
    const _0xbf3047 = document['querySelector']('.slider-container');
    if (_0x430d51) {
        _0x430d51['style']['pointerEvents'] = 'auto';
        _0x430d51['style']['opacity'] = '1';
        _0x430d51['style']['cursor'] = 'grab';
        _0x430d51['innerHTML'] = '<span>→</span>';
    }
    if (_0xbf3047) {
        _0xbf3047['style']['opacity'] = '1';
    }
    applyMobileOptimizations();
}

function applyMobileOptimizations() {
    const _0x1cee9a = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i['test'](navigator['userAgent']) || window['innerWidth'] < 0x300;
    if (!_0x1cee9a) return;
    console['log']('应用移动端优化...');
    const _0x23d44f = document['getElementById']('slider-btn');
    if (_0x23d44f) {
        const _0x417bd6 = parseInt(getComputedStyle(_0x23d44f)['width']);
        if (_0x417bd6 < 0x2c) {
            _0x23d44f['style']['width'] = '44px';
            _0x23d44f['style']['height'] = '44px';
        }
        if ('vibrate' in navigator) {
            _0x23d44f['addEventListener']('touchstart', () => {
                navigator['vibrate'](0xa);
            });
        }
    }
    const _0x3294ea = document['querySelector']('.slider-container');
    if (_0x3294ea) {
        _0x3294ea['addEventListener']('touchmove', _0x1b0708 => {
            if (window['sliderDistance'] !== undefined) {
                _0x1b0708['preventDefault']();
            }
        }, {'passive': ![]});
    }
    const _0xc4ebe1 = document['querySelector']('.slider-text');
    if (_0xc4ebe1 && window['innerWidth'] < 0x1e0) {
        _0xc4ebe1['textContent'] = '滑动拼图完成验证';
    }
    const _0x4bda86 = window['showCaptchaMessage'];
    if (_0x4bda86) {
        window['showCaptchaMessage'] = function (_0x6c7d0e, _0xccfa6a) {
            _0x4bda86(_0x6c7d0e, _0xccfa6a);
            if (_0xccfa6a === 'error' && _0x1cee9a) {
                setTimeout(() => {
                    hideCaptchaMessage();
                }, 0xfa0);
            }
        };
    }
}