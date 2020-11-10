/**
 * utf
 * UCS Transformation Format
 * js的string采用utf-16
 * 在utf-8中，英文字母占用1个字节，中文占用3个字节
 * utf-8和utf-16都是可变长编码
 * 参考 http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html
 *     https://home.unicode.org/
 */

// 工具函数

// 转化为2进制数组
function toBinaryList(...num) {
    const arr = []
    num.forEach(item=>{
        // 将数字转化为2进制
        arr.push(item.toString(2))
    })
    return arr
}


// node仅支持utf-8
const encoder = new TextEncoder()
const utf8Array = encoder.encode('smart')
// 返回的一串字符是utf8中对应unicode的集合
// 对于英文字母，其对应的unicode等价于ASCII码
console.log(utf8Array)
console.log(String.fromCharCode( 115, 109, 97, 114, 116 ))


// ASCII码

const utf8ArrayCN = encoder.encode('中文解析')
console.log(utf8ArrayCN)
// 解析时发生乱码
console.log('Messy Code ------- ',String.fromCharCode( ...utf8ArrayCN))

//////////////////////////////////////////////////
// 以严字示例
//////////////////////////////////////////////////

const yan = encoder.encode('严')
// 中文占3个字节，输出 228 184 165
console.log('Yan utf8集合 ------- ',yan)
// 转化为二进制 '11100100', '10111000', '10100101'
console.log('Yan 二进制数组 ------- ',toBinaryList(...yan))

/**
 * utf-8编码规则
 * 1、对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的
 * 2、对于n字节的符号（n > 1），第一个字节的前n位都设为1，第n + 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码
 */

/**
 *
 * Unicode符号范围     |        UTF-8编码方式
 * (十六进制)          |       （二进制）
 * ----------------------+---------------------------------------------
 * 0000 0000-0000 007F | 0xxxxxxx
 * 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
 * 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
 * 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 *
 */

// 3个字节，符合上述第三种,去除前缀，为下列形式
// 0100 111000 100101

let yanBinary = 100111000100101
// parseInt(string, radix)   解析一个字符串并返回指定基数的十进制整数， radix 是2-36之间的整数，表示被解析字符串的基数
let yanBCD = parseInt(yanBinary, 2)
// 得到了严的unicode十进制编码
console.log('Yan 十进制 ------- ',yanBCD)
// 得到了严的unicode十六进制编码
console.log('Yan 十六进制 ------- ',yanBCD.toString(16))

// 使用charCodeAt或codePointAt可以直接获取十进制
console.log('严'.charCodeAt(0),'严'.codePointAt(0).toString(16))

// 使用formCharCode转化为中文
// 0x表示16进制的写法
console.log('Yan 中文 ------- ',String.fromCharCode(20005),String.fromCharCode(0x4e25))

// 获取中文的十进制
function unicodeCN(str) {
    const unicodeList = []
    for(let i =0;i<str.length;i++){
        unicodeList.push(str.charCodeAt(i))
    }
    return unicodeList
}

// 返回中文原文
function decodeCN(arr) {
    let str = ''
    arr.forEach(item=>{
        str+=String.fromCharCode(item)
    })
    return str
}

console.log('转码 ------- ',unicodeCN('今天天气真不错'))
console.log('解码 ------- ',decodeCN(unicodeCN('我不到啊')))


