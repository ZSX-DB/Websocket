const express = require('express')
const socketServer = require('ws').Server

// 端口号
const port = 3200

const server = express().listen(port, ()=>{
    console.log(`Now Server listen on ${port}`)
})

// 将express交给SocketServer开启WebSocket的服务
const wss = new socketServer({ server })

// 必须放置在ws.on外，否则会一直重新创建对象
// 一开始放置在message内，switch无法接收的值改变，放在connection也只能监听A或B单值的改变
// 因此，ws.on()并不是可复用的
let clients = wss.clients
let playerA = 0, playerAReady = false
let playerB = 0, playerBReady = false

wss.on('connection', ws=> {
    console.log('Client connected')

    // 对message设置监听，接收从客户端发送的消息
    ws.on('message',data=>{

        switch (data) {
            // 发牌
            case 'licensing':
                ws.send(JSON.stringify(Math.ceil(13 * Math.random())))
                break
            // 查看结果
            case 'viewResult':
                console.log(playerA,playerB,playerAReady,playerBReady)
                if( playerAReady && playerBReady ){
                    let winner
                    if(playerA > 21 && playerB <= 21){
                        winner = playerA
                    }else if(playerA <= 21 && playerB > 21){
                        winner = playerB
                    }else if(playerA > 21 && playerB > 21){
                        winner = (playerA - 21) > (playerB - 21) ? playerB : playerA
                    }else {
                        winner = playerA > playerB ? playerA : playerB
                    }
                    clients.forEach(client=>{
                        client.send(`The winner is ${ winner }`)
                    })
                }else {
                    ws.send('Another player is not ready')
                }
                break
            // 开牌
            default:
                let points = data.replace(/[^0-9]/g,'')
                if(data.includes('playerA')){
                    playerA = points
                    playerAReady = true
                    ws.send(`playerA开牌成功, 点数为${playerA} ${playerAReady}`)
                }else if(data.includes('playerB')){
                    playerB = points
                    playerBReady = true
                    ws.send(`playerB开牌成功, 点数为${playerB} ${playerBReady}`)
                }
                break
        }

    })

    // 关闭时执行
    ws.on('close',()=>{
        console.log('Close connected')
    })

})