## WebSocket

```http
// 告知服务器发起的是websocket协议
Connection: Upgrade
Upgrade: websocket
// 扩展
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
// Sec-WebSocket-Key 是一个Base64 encode的值，这个是浏览器随机生成的，用于验证是否是WebSocket助理
Sec-WebSocket-Key: mgPgEhNfqOdtzEaQhuSp7Q==
// 版本
Sec-WebSocket-Version: 13
```

传统的ajax轮询和long poll都是在不断地建立HTTP连接，然后等待服务端处理，可以体现HTTP协议的另外一个特点，**被动性**，即服务端不能主动联系客户端，只能由客户端发起。

**主动性**，通过websocket，服务端可以主动推送消息给客户端。

___

相比HTTP长连接，WebSocket有以下特点：

- 是真正的全双工方式，建立连接后客户端与服务器端是完全平等的，可以互相主动请求。而HTTP长连接基于HTTP，是传统的客户端对服务器发起请求的模式。
- HTTP长连接中，每次数据交换除了真正的数据部分外，服务器和客户端还要大量交换HTTP header，信息交换效率很低。Websocket协议通过第一个request建立了TCP连接之后，之后交换的数据都不需要发送 HTTP header就能交换数据，这显然和原有的HTTP协议有区别所以它需要对服务器和客户端都进行升级才能实现（主流浏览器都已支持HTML5）。此外还有 multiplexing、不同的URL可以复用同一个WebSocket连接等功能。这些都是HTTP长连接不能做到的。

___

**BlackJack，21点小游戏**

**Heartbeat，心跳检测**

___

以下为参考链接

https://juejin.im/post/6876301731966713869

https://juejin.im/post/6844903599642787847

http://www.ruanyifeng.com/blog/2017/05/websocket.html

https://www.zhihu.com/question/20215561



