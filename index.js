// 使用webSocket的地址向服务端开启连接
// ws是WebSocket类型的对象
let ws = new WebSocket('ws://localhost:3200')

function setEvents() {
    // 指定连接后执行事件
    ws.onopen = ()=>{
        console.log('open connection')
    }

    // 接收服务端发送的消息
    ws.onmessage = event =>{
        console.log(event)
    }

    // 关闭后执行事件
    ws.onclose = () =>{
        console.log('close connection')
    }
}

// 设置事件并初始化执行
setEvents()

// 重新连接
function openConn() {
    ws = new WebSocket('ws://localhost:3200')
    setEvents()
}

// 展示连接状态
function showReadyState() {
    console.log(ws.readyState)
}

// 排队发送
function lineUpSend() {
    ws.send('first')
    ws.send('second')
}

// 关闭连接
function closeConn() {
    ws.close()
}

// 攻击程序
function attack() {
    console.log('attack')
    ws = new WebSocket('ws://localhost:3200')
    ws.onopen = () => {
        for(let i = 0;i<10000;i++){
            ws.send('attack')
        }
    }
    ws.onmessage = eva => {
        // alert(eva.data)
        // ws.close()
    }
}
