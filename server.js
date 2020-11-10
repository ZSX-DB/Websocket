const express = require('express')
const socketServer = require('ws').Server

// 端口号
const port = 3200

const server = express().listen(port, ()=>{
    console.log(`Now Server listen on ${port}`)
})

// 将express交给SocketServer开启WebSocket的服务
const wss = new socketServer({ server })

wss.on('connection', ws=> {
    console.log('Client connected')

    // 对message设置监听，接收从客户端发送的消息
    ws.on('message',data=>{
        console.log(data)
        //data为客户端发送的消息，将消息原封不动返回回去
        ws.send(` Server Reception ${data} `)
    })

    // 可以设置定时发送最新消息给客户端
    // const sendNewTime = setInterval(()=>{
    //     ws.send(JSON.stringify(Math.random()))
    // },1000)

    // 多人聊天实践
    // ws.on('message',data=>{
    //     console.log(data)
    //     // 取得所有连接中的客户端
    //     let clients = wss.clients
    //     clients.forEach(client=>{
    //         client.send(data)
    //     })
    // })

    // 心跳机制，发送pong
    // ws.on('message',data=>{
    //     if(data === 'Client On Line') ws.send('Server On Line')
    // })


    // 关闭时执行
    ws.on('close',()=>{
        console.log('Close connected')
    })

})