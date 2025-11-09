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