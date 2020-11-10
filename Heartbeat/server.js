const express = require('express')
const socketServer = require('ws').Server

// 端口号
const port = 3200

const server = express().listen(port, ()=>{
    console.log(`Now Server listen on ${port}`)
})

// 将express交给SocketServer开启WebSocket的服务
const wss = new socketServer({ server })

let count = 0

wss.on('connection', ws=> {
    console.log('Client connected')

    // 心跳机制，发送pong
    ws.on('message',data=>{
        console.log(data)
        count++
        if(data === 'Client On Line') {
            // 用count来模拟异常情况
            switch (count) {
                case 1:
                    setTimeout(()=>{
                        ws.send('Server On Line')
                    },2000)
                    break
                case 2:
                    setTimeout(()=>{
                        ws.send('Server On Line')
                    },4000)
                    break
                default:
                    ws.send('Server On Line')
            }
        }
    })

    // 关闭时执行
    ws.on('close',()=>{
        console.log('Close connected')
    })

})