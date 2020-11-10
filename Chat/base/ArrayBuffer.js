/**
 * ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区
 * @type {ArrayBuffer}
 * 1byte = 8bit
 * js中，后面跟着的数字代表占用多少bit
 */

// 初始化18byte的二级制数据缓冲区
const buffer = new ArrayBuffer(18)

const view1 = new DataView(buffer)
// int16，存储16-bit数据，根据公式，占2个byte
view1.setInt16(0,16)
// int32，存储32-bit数据，根据公式，占4个byte
view1.setInt32(2,32)
view1.setInt32(6,21)
view1.setBigInt64(10,BigInt(99))

console.log(view1.getInt32(2),view1.getInt32(6),view1.getBigInt64(10))

// 存储浮点数
const view2 = new DataView(buffer)
view2.setFloat32(0, Math.PI)
view2.setFloat64(4, 8.88)

console.log(view2.getFloat32(0),view2.getFloat64(4))

