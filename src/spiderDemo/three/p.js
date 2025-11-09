const md_sign = {
    // 逻辑函数
    F: function (x, y, z) {
        return (x & y) | (~x & z);
    },

    G: function (x, y, z) {
        return (x & y) | (x & z) | (y & z);
    },

    H: function (x, y, z) {
        return x ^ y ^ z;
    },

    // 循环左移
    rotateLeft: function (x, n) {
        return (x << n) | (x >>> (32 - n));
    },

    // 轮函数 - 使用明确的函数引用
    round1: function (a, b, c, d, k, s) {
        return md_sign.rotateLeft(a + md_sign.F(b, c, d) + k, s);
    },

    round2: function (a, b, c, d, k, s) {
        return md_sign.rotateLeft(a + md_sign.G(b, c, d) + k + 0x5a827999, s);
    },

    round3: function (a, b, c, d, k, s) {
        return md_sign.rotateLeft(a + md_sign.H(b, c, d) + k + 0x6ed9eba1, s);
    },

    // 填充函数
    padMessage: function (bytes) {
        const bits = bytes.length * 8;
        const padded = [];

        for (let i = 0; i < bytes.length; i++) {
            padded.push(bytes[i]);
        }

        padded.push(0x80);

        while ((padded.length * 8 + 64) % 512 !== 0) {
            padded.push(0x0);
        }

        for (let i = 0; i < 8; i++) {
            padded.push((bits >>> (i * 8)) & 0xff);
        }

        return padded;
    },

    // 主哈希函数
    hash: function (inputBytes) {
        const padded = md_sign.padMessage(inputBytes);

        let A = 0x67452301;
        let B = 0xefcdab89;
        let C = 0x98badcfe;
        let D = 0x10325476;

        for (let block = 0; block < padded.length / 64; block++) {
            const M = new Array(16);

            for (let i = 0; i < 16; i++) {
                const offset = block * 64 + i * 4;
                M[i] = (padded[offset] & 0xff) |
                    ((padded[offset + 1] & 0xff) << 8) |
                    ((padded[offset + 2] & 0xff) << 16) |
                    ((padded[offset + 3] & 0xff) << 24);
            }

            let AA = A;
            let BB = B;
            let CC = C;
            let DD = D;

            // 第一轮 - 使用明确的函数引用
            AA = md_sign.round1(AA, BB, CC, DD, M[0], 3);
            DD = md_sign.round1(DD, AA, BB, CC, M[1], 7);
            CC = md_sign.round1(CC, DD, AA, BB, M[2], 11);
            BB = md_sign.round1(BB, CC, DD, AA, M[3], 19);

            AA = md_sign.round1(AA, BB, CC, DD, M[4], 3);
            DD = md_sign.round1(DD, AA, BB, CC, M[5], 7);
            CC = md_sign.round1(CC, DD, AA, BB, M[6], 11);
            BB = md_sign.round1(BB, CC, DD, AA, M[7], 19);

            AA = md_sign.round1(AA, BB, CC, DD, M[8], 3);
            DD = md_sign.round1(DD, AA, BB, CC, M[9], 7);
            CC = md_sign.round1(CC, DD, AA, BB, M[10], 11);
            BB = md_sign.round1(BB, CC, DD, AA, M[11], 19);

            AA = md_sign.round1(AA, BB, CC, DD, M[12], 3);
            DD = md_sign.round1(DD, AA, BB, CC, M[13], 7);
            CC = md_sign.round1(CC, DD, AA, BB, M[14], 11);
            BB = md_sign.round1(BB, CC, DD, AA, M[15], 19);

            // 第二轮
            AA = md_sign.round2(AA, BB, CC, DD, M[0], 3);
            DD = md_sign.round2(DD, AA, BB, CC, M[4], 5);
            CC = md_sign.round2(CC, DD, AA, BB, M[8], 9);
            BB = md_sign.round2(BB, CC, DD, AA, M[12], 13);

            AA = md_sign.round2(AA, BB, CC, DD, M[1], 3);
            DD = md_sign.round2(DD, AA, BB, CC, M[5], 5);
            CC = md_sign.round2(CC, DD, AA, BB, M[9], 9);
            BB = md_sign.round2(BB, CC, DD, AA, M[13], 13);

            AA = md_sign.round2(AA, BB, CC, DD, M[2], 3);
            DD = md_sign.round2(DD, AA, BB, CC, M[6], 5);
            CC = md_sign.round2(CC, DD, AA, BB, M[10], 9);
            BB = md_sign.round2(BB, CC, DD, AA, M[14], 13);

            AA = md_sign.round2(AA, BB, CC, DD, M[3], 3);
            DD = md_sign.round2(DD, AA, BB, CC, M[7], 5);
            CC = md_sign.round2(CC, DD, AA, BB, M[11], 9);
            BB = md_sign.round2(BB, CC, DD, AA, M[15], 13);

            // 第三轮
            AA = md_sign.round3(AA, BB, CC, DD, M[0], 3);
            DD = md_sign.round3(DD, AA, BB, CC, M[8], 9);
            CC = md_sign.round3(CC, DD, AA, BB, M[4], 11);
            BB = md_sign.round3(BB, CC, DD, AA, M[12], 15);

            AA = md_sign.round3(AA, BB, CC, DD, M[2], 3);
            DD = md_sign.round3(DD, AA, BB, CC, M[10], 9);
            CC = md_sign.round3(CC, DD, AA, BB, M[6], 11);
            BB = md_sign.round3(BB, CC, DD, AA, M[14], 15);

            AA = md_sign.round3(AA, BB, CC, DD, M[1], 3);
            DD = md_sign.round3(DD, AA, BB, CC, M[9], 9);
            CC = md_sign.round3(CC, DD, AA, BB, M[5], 11);
            BB = md_sign.round3(BB, CC, DD, AA, M[13], 15);

            AA = md_sign.round3(AA, BB, CC, DD, M[3], 3);
            DD = md_sign.round3(DD, AA, BB, CC, M[11], 9);
            CC = md_sign.round3(CC, DD, AA, BB, M[7], 11);
            BB = md_sign.round3(BB, CC, DD, AA, M[15], 15);

            A = (A + AA) >>> 0;
            B = (B + BB) >>> 0;
            C = (C + CC) >>> 0;
            D = (D + DD) >>> 0;
        }

        const result = [
            A & 0xff, (A >>> 8) & 0xff, (A >>> 16) & 0xff, (A >>> 24) & 0xff,
            B & 0xff, (B >>> 8) & 0xff, (B >>> 16) & 0xff, (B >>> 24) & 0xff,
            C & 0xff, (C >>> 8) & 0xff, (C >>> 16) & 0xff, (C >>> 24) & 0xff,
            D & 0xff, (D >>> 8) & 0xff, (D >>> 16) & 0xff, (D >>> 24) & 0xff
        ];

        return result.map(b => {
            return b.toString(16).padStart(2, "0");
        }).join("");
    },

    // 字符串输入版本
    hashString: function (inputString) {
        const bytes = [];
        for (let i = 0; i < inputString.length; i++) {
            bytes.push(inputString.charCodeAt(i) & 0xff);
        }
        return md_sign.hash(bytes);
    }
};

function encryptType(input) {
    function* zvNJgdp(uuxqBhk, kSpkXw, EJ16wZ3, FLW_kHc = {["\u0063\u0038\u0043\u0070\u0059\u0056"]: {}}, k0V4FxX) {
        while (uuxqBhk + kSpkXw + EJ16wZ3 !== 0xd3) {
            with (FLW_kHc["\u0077\u006e\u0064\u0072\u0032\u0055"] || FLW_kHc) {
                switch (uuxqBhk + kSpkXw + EJ16wZ3) {
                    case-0x91:
                    case 0xb6:
                    case-0x7:
                        [ClP1_eg["\u0049\u0066\u0066\u0062\u004f\u0038\u006e"]] = k0V4FxX;
                        if (typeof __p_uEa2_cache[ClP1_eg["\x49\x66\x66\x62\x4f\x38\x6e"]] === __p_QVKz_SC(0x0)) {
                            FLW_kHc["\u0077\u006e\u0064\u0072\u0032\u0055"] = FLW_kHc["\x43\x6c\x50\x31\x5f\x65\x67"], uuxqBhk += 0xb2, EJ16wZ3 += 0x51;
                            break
                        } else {
                            FLW_kHc["\u0077\u006e\u0064\u0072\u0032\u0055"] = FLW_kHc["\u0043\u006c\u0050\u0031\u005f\u0065\u0067"], uuxqBhk += -0xc5, kSpkXw += 0xe3, EJ16wZ3 += 0x1d;
                            break
                        }
                    case 0x1c:
                    case uuxqBhk - 0x1e2:
                    case-0x6d:
                        [FLW_kHc["\u0063\u0038\u0043\u0070\u0059\u0056"]["\x69\x66\x57\x38\x6e\x50\x66"], FLW_kHc["\u0063\u0038\u0043\u0070\u0059\u0056"]["\x43\x43\x59\x67\x50\x78\x34"], FLW_kHc["\x63\x38\x43\x70\x59\x56"]["\x64\x30\x51\x65\x4e\x33"]] = [0x3e, 0x1, -0xc0];
                        c8CpYV["\x43\x47\x7a\x41\x54\x33"] = function (...__p_e8JO) {
                            return zvNJgdp(-0x4b, -0x2b, -0x1b, {
                                ["\x63\x38\x43\x70\x59\x56"]: FLW_kHc["\u0063\u0038\u0043\u0070\u0059\u0056"],
                                ["\x43\x6c\x50\x31\x5f\x65\x67"]: {}
                            }, __p_e8JO)["\u006e\u0065\u0078\u0074"]()["\x76\x61\x6c\x75\x65"]
                        };
                        c8CpYV["\u0055\u0054\u0053\u0049\u0052\u006e"] = function (...__p_Nl4D) {
                            return zvNJgdp(-0x85, 0x92, -0xe9, {
                                ["\x63\x38\x43\x70\x59\x56"]: FLW_kHc["\x63\x38\x43\x70\x59\x56"],
                                ["\x6e\x57\x56\x47\x42\x56\x44"]: {}
                            }, __p_Nl4D)["\x6e\x65\x78\x74"]()["\u0076\u0061\u006c\u0075\u0065"]
                        };
                        c8CpYV["\u0061\u0058\u007a\u0076\u0035\u004f"] = input[__p_SKMt_STR_57(kSpkXw + 0x33f) + "\x6e\x67"]();
                        FLW_kHc["\u0077\u006e\u0064\u0072\u0032\u0055"] = FLW_kHc["\x63\x38\x43\x70\x59\x56"], uuxqBhk += -0x32, kSpkXw += 0xd8, EJ16wZ3 += 0xc2;
                        break;
                    case FLW_kHc["\u0063\u0038\u0043\u0070\u0059\u0056"]["\x69\x66\x57\x38\x6e\x50\x66"] + 0x16:
                    case-0xf4:
                    case-0xa3:
                        return kNh7xVF = true, f71kRbk;
                        FLW_kHc["\u0077\u006e\u0064\u0072\u0032\u0055"] = FLW_kHc["\x70\x39\x65\x36\x70\x43\x73"], uuxqBhk += 0x7f;
                        break;
                    case-0xb6:
                    case-0xa5:
                        [FLW_kHc["\u0063\u0038\u0043\u0070\u0059\u0056"]["\u0069\u0066\u0057\u0038\u006e\u0050\u0066"], FLW_kHc["\u0063\u0038\u0043\u0070\u0059\u0056"]["\x43\x43\x59\x67\x50\x78\x34"], FLW_kHc["\x63\x38\x43\x70\x59\x56"]["\x64\x30\x51\x65\x4e\x33"]] = [0x32, 0xf5, 0x55];
                        FLW_kHc["\x77\x6e\x64\x72\x32\x55"] = FLW_kHc["\u006e\u0057\u0056\u0047\u0042\u0056\u0044"], uuxqBhk += -0x5d, kSpkXw += 0xdc, EJ16wZ3 += 0xf6;
                        break;
                    case 0x6e:
                        s4QenD.push((W0gGv7 | cl9qMQP << gDO8h6T) & kSpkXw + -0x11b);
                        FLW_kHc["\x77\x6e\x64\x72\x32\x55"] = FLW_kHc["\x6e\x57\x56\x47\x42\x56\x44"], uuxqBhk += 0x252, kSpkXw += -0x245;
                        break;
                    case 0x3a:
                    case-0x4b:
                    case FLW_kHc["\x63\x38\x43\x70\x59\x56"]["\u0064\u0030\u0051\u0065\u004e\u0033"] + 0x131:
                        FLW_kHc["\u0063\u0038\u0043\u0070\u0059\u0056"]["\x66\x37\x31\x6b\x52\x62\x6b"] = "";
                        for (let i = 0x0; i < aXzv5O[(0x1, CGzAT3)(0x21e)]; i++) {
                            function __p_f2ca_STR_59_decode(str) {
                                var table = "\x24\x77\x7e\x3f\x76\x3d\x7d\x39\x35\x2f\x32\x75\x63\x50\x64\x44\x7a\x2e\x4f\x45\x74\x2a\x3e\x66\x59\x70\x6c\x5f\x5e\x65\x28\x7c\x57\x62\x46\x2c\x48\x40\x25\x6a\x49\x36\x3a\x5a\x4a\x61\x73\x21\x6d\x54\x56\x7b\x72\x5d\x22\x3c\x3b\x2b\x33\x34\x26\x47\x4e\x38\x29\x53\x4b\x6b\x42\x4c\x30\x6e\x52\x31\x78\x68\x67\x79\x41\x69\x71\x37\x23\x58\x51\x6f\x5b\x43\x55\x4d\x60";
                                var raw = "" + (str || "");
                                var len = raw.length;
                                var ret = [];
                                var b = 0x0;
                                var n = 0x0;
                                var v = -0x1;
                                for (var i = 0x0; i < len; i++) {
                                    var p = table.indexOf(raw[i]);
                                    if (p === -0x1) continue;
                                    if (v < 0x0) {
                                        v = p
                                    } else {
                                        v += p * 0x5b;
                                        b |= v << n;
                                        n += (v & 0x1fff) > 0x58 ? 0xd : 0xe;
                                        do {
                                            ret.push(b & 0xff);
                                            b >>= 0x8;
                                            n -= 0x8
                                        } while (n > 0x7);
                                        v = -0x1
                                    }
                                }
                                if (v > -0x1) {
                                    ret.push((b | v << n) & 0xff)
                                }
                                return __p_FOXm_bufferToString(ret)
                            }

                            function __p_f2ca_STR_59(index) {
                                if (typeof __p_uEa2_cache[index] === __p_QVKz_SC(0x0)) {
                                    return __p_uEa2_cache[index] = __p_f2ca_STR_59_decode(__p_nukQ_array[index])
                                }
                                return __p_uEa2_cache[index]
                            }

                            const charCode = aXzv5O[(0x1, CGzAT3)(0x21f) + (0x1, CGzAT3)(0x220)](i);
                            f71kRbk += String[__p_f2ca_STR_59(0x221) + __p_f2ca_STR_59(uuxqBhk + 0x169)](charCode + 0x3)
                        }
                        FLW_kHc["\u0077\u006e\u0064\u0072\u0032\u0055"] = FLW_kHc["\u0063\u0038\u0043\u0070\u0059\u0056"], EJ16wZ3 += -0x1d;
                        break;
                    case EJ16wZ3 - -0xd6:
                        FLW_kHc["\x77\x6e\x64\x72\x32\x55"] = FLW_kHc["\x75\x42\x61\x69\x65\x4b"], uuxqBhk += -0x7b, kSpkXw += -0x4e, EJ16wZ3 += 0xb0;
                        break;
                    case 0x72:
                    case-0x3e:
                    case-0x85:
                        return __p_uEa2_cache[IffbO8n] = (0x1, FLW_kHc["\u0063\u0038\u0043\u0070\u0059\u0056"]["\u0055\u0054\u0053\u0049\u0052\u006e"])(__p_nukQ_array[IffbO8n]);
                        FLW_kHc["\u0077\u006e\u0064\u0072\u0032\u0055"] = FLW_kHc["\u0043\u006c\u0050\u0031\u005f\u0065\u0067"], uuxqBhk += -0x177, kSpkXw += 0xe3, EJ16wZ3 += -0x34;
                        break;
                    case 0xe2:
                    case-0xc6:
                    case 0x7b:
                        return __p_FOXm_bufferToString(s4QenD);
                        return undefined;
                    case kSpkXw - 0x10e:
                        return __p_uEa2_cache[IffbO8n];
                        return undefined;
                    case FLW_kHc["\u0063\u0038\u0043\u0070\u0059\u0056"]["\u0043\u0043\u0059\u0067\u0050\u0078\u0034"] + 0xcf:
                    case-0x1e:
                        FLW_kHc["\u006e\u0057\u0056\u0047\u0042\u0056\u0044"]["\u0067\u0044\u004f\u0038\u0068\u0036\u0054"] = 0x0;
                        FLW_kHc["\x6e\x57\x56\x47\x42\x56\x44"]["\u0063\u006c\u0039\u0071\u004d\u0051\u0050"] = -0x1;
                        for (FLW_kHc["\u006e\u0057\u0056\u0047\u0042\u0056\u0044"]["\u004f\u006e\u0042\u0078\u0068\u005f\u0037"] = 0x0; OnBxh_7 < FIe5zK; OnBxh_7++) {
                            FLW_kHc["\x6e\x57\x56\x47\x42\x56\x44"]["\x49\x47\x64\x79\x72\x49\x31"] = oxRTisZ.indexOf(E2zV6E6[OnBxh_7]);
                            if (IGdyrI1 === -0x1) continue;
                            if (cl9qMQP < kSpkXw + -0x92) {
                                cl9qMQP = IGdyrI1
                            } else {
                                cl9qMQP += IGdyrI1 * 0x5b;
                                W0gGv7 |= cl9qMQP << gDO8h6T;
                                gDO8h6T += (cl9qMQP & kSpkXw + 0x1f6d) > uuxqBhk + 0xbf ? 0xd : kSpkXw + -0x84;
                                do {
                                    s4QenD.push(W0gGv7 & 0xff);
                                    W0gGv7 >>= kSpkXw + -0x8a;
                                    gDO8h6T -= 0x8
                                } while (gDO8h6T > kSpkXw + -0x8b);
                                cl9qMQP = -0x1
                            }
                        }
                        if (cl9qMQP > -(kSpkXw + -0x91)) {
                            FLW_kHc["\u0077\u006e\u0064\u0072\u0032\u0055"] = FLW_kHc["\x6e\x57\x56\x47\x42\x56\x44"], uuxqBhk += -0x8b, kSpkXw += 0x188, EJ16wZ3 += -0x15f;
                            break
                        } else {
                            FLW_kHc["\x77\x6e\x64\x72\x32\x55"] = FLW_kHc["\u006e\u0057\u0056\u0047\u0042\u0056\u0044"], uuxqBhk += 0x1c7, kSpkXw += -0xbd, EJ16wZ3 += -0x15f;
                            break
                        }
                    case kSpkXw - 0x16e:
                        [nWVGBVD["\u0077\u0056\u006a\u0077\u0071\u0066\u0059"]] = k0V4FxX;
                        nWVGBVD["\u006f\u0078\u0052\u0054\u0069\u0073\u005a"] = "\u007b\u0048\u0042\u0062\u0070\u0061\u006e\u0051\u0049\u0041\u004d\u0050\u005b\u0052\u0046\u0072\u0024\u0045\u0068\u006a\u0031\u0023\u0044\u0043\u0079\u0040\u0064\u002b\u0069\u0056\u0021\u006b\u0038\u0028\u004c\u0039\u0078\u006d\u0077\u0030\u007c\u0071\u003b\u005e\u002c\u006c\u0063\u005a\u0034\u0057\u002f\u0076\u007a\u0037\u0065\u0055\u006f\u0026\u005d\u002a\u0058\u0073\u0032\u003d\u0075\u0047\u0074\u003e\u0022\u004f\u0067\u0053\u0033\u004b\u007e\u0035\u0060\u0029\u0066\u002e\u0025\u007d\u0054\u003c\u005f\u004a\u003f\u004e\u0059\u0036\u003a";
                        nWVGBVD["\x45\x32\x7a\x56\x36\x45\x36"] = "" + (nWVGBVD["\u0077\u0056\u006a\u0077\u0071\u0066\u0059"] || "");
                        nWVGBVD["\u0046\u0049\u0065\u0035\u007a\u004b"] = nWVGBVD["\u0045\u0032\u007a\u0056\u0036\u0045\u0036"].length;
                        nWVGBVD["\u0073\u0034\u0051\u0065\u006e\u0044"] = [];
                        nWVGBVD["\x57\x30\x67\x47\x76\x37"] = kSpkXw + -0x92;
                        FLW_kHc["\u0077\u006e\u0064\u0072\u0032\u0055"] = FLW_kHc["\x6e\x57\x56\x47\x42\x56\x44"], uuxqBhk += 0x1e, EJ16wZ3 += 0x18e;
                        break;
                        if (kSpkXw > kSpkXw + 0x0) {
                            uuxqBhk += 0x170, kSpkXw += -0x1b4, EJ16wZ3 += 0x29;
                            break
                        }
                    default:
                        FLW_kHc["\u0077\u006e\u0064\u0072\u0032\u0055"] = FLW_kHc["\x6e\x57\x56\x47\x42\x56\x44"], uuxqBhk += -0x93, kSpkXw += 0x264, EJ16wZ3 += -0x9f;
                        break;
                    case kSpkXw - 0x110:
                        [FLW_kHc["\x63\x38\x43\x70\x59\x56"]["\u0069\u0066\u0057\u0038\u006e\u0050\u0066"], FLW_kHc["\x63\x38\x43\x70\x59\x56"]["\u0043\u0043\u0059\u0067\u0050\u0078\u0034"], FLW_kHc["\x63\x38\x43\x70\x59\x56"]["\x64\x30\x51\x65\x4e\x33"]] = [0xde, 0xcc, -0xf8];
                        return __p_uEa2_cache[IffbO8n] = (0x1, FLW_kHc["\x63\x38\x43\x70\x59\x56"]["\u0055\u0054\u0053\u0049\u0052\u006e"])(__p_nukQ_array[IffbO8n]);
                        FLW_kHc["\x77\x6e\x64\x72\x32\x55"] = FLW_kHc["\x43\x6c\x50\x31\x5f\x65\x67"], uuxqBhk += -0x106, kSpkXw += -0x25, EJ16wZ3 += 0x108;
                        break
                }
            }
        }
    }

    var kNh7xVF;
    var X6EHx6B = zvNJgdp(0xeb, -0x122, -0xc0)["\u006e\u0065\u0078\u0074"]()["\u0076\u0061\u006c\u0075\u0065"];
    if (kNh7xVF) {
        return X6EHx6B
    }
}

console.log(encryptType("111"))