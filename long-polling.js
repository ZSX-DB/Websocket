/**
 * 长轮询方案
 * 在长轮询机制中，客户端像传统轮询一样从服务器请求数据。然而，如果服务器没有可以立即返回给客户端的数据，则不会立刻返回一个空结果
 * 而是保持这个请求等待数据到来（或者恰当的超时：小于ajax的超时时间），之后将数据作为结果返回给客户端
 * 长轮询在更新频繁的情况下并不优于普通的轮询
 */

const express = require('express')
const eventEmitter = require('events').EventEmitter

let app = express()
let event = new eventEmitter()

let dataExist = false

// 模拟数据监听程序
// 假设7s后有了数据
setTimeout(()=>{
    dataExist = true
    event.emit('fn')
},7000)

app.get('/longPolling', (req, resp) => {

    // 前端发送一次请求，可以设置请求时间，比如5s后getData为false，也就是不需要数据了
    if(dataExist){
        resp.json({
            code: 200,
            message: 'success',
            data:{
                label: 'PollingDemo'
            }
        })
    }else{
        event.on('fn',()=>{
            if(dataExist){
                resp.json({
                    code: 200,
                    message: 'success',
                    data:{
                        label: 'PollingDemo'
                    }
                })
            }
        })
    }
})


app.listen(8800, () => console.log('Now server listen in http://localhost:8800'))