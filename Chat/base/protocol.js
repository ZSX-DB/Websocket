/**
 * 协议是通信双方约定好的一套规则
 * 协议的设计应该能够区分不同的各个数据包;其次,它还需要具备一定的兼容性
 */

// 示例
const eg = {
    // 消息类型，short，1是文本协议，2是图片协议格式，3是文件协议格式
    id: 1,
    // 发送用户唯一id
    sender: '',
    // 接收用户唯一id
    receiver: '',
    // 消息内容,如果是文本协议则为文本内容;如果是图片协议则为图片地址;如果是文件协议则为文件地址
    data: 'string'
}

const useEG = {
    // int16
    id: 1,
    // int32
    sender: 13726545933,
    // int32
    receiver: 13682863198,
    // 先将字符串长度构造成一个int类型,放在前4个Byte中,接下来将string类型编码后放入
    data: '今天天气真不错'
}

const encoder = new TextEncoder()
const utf8Array = encoder.encode('It is very nice weather today')
console.log(utf8Array)

console.log(String.fromCharCode( ...utf8Array ))



