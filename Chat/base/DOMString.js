/**
 * js如何将string类型转换为字符串
 * DOMString是一个UTF-16字符串
 * 由于JavaScript已经使用了这样的字符串，所以DOMString直接映射到一个String
 * 在WebSocket中进行string类型数据传输时，使用的其实也是DOMString
 */


// TextEncoder 接受代码点流作为输入，并提供 UTF-8 字节流作为输出
const encoder = new TextEncoder()
// TextEncoder.prototype.encode() 方法接受一个 USVString 作为参数
// 返回一个以给定的文本（字符串）参数，通过 TextEncoder 中指定的方法（默认UTF-8）编码后的 Uint8Array 类型的值
const utf8Array = encoder.encode('smart')
console.log(utf8Array)

console.log(String.fromCharCode( ...utf8Array ))