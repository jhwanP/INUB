//Server
//소켓 서버는 연결을 위한 수신 처리 후 서버 연결을 통한 데이터 송신/수신을 한다.
//net모듈의 소켓 객체를 사용
var net = require('net');

//서버를 생성
//Client가 접속 했을 시 출력
var server = net.createServer(function(client){
    console.log('Client connected');    //콘솔에 'Client connected' 출력

    //Client로 부터 오는 data를 화면에 출력
    client.on('data', function(data){
        console.log('Client sent ' + data.toString());  //콘솔에 'Client sent '와 data 를 출력
    });

    //Client와 접속이 끊기는 메시지 출력
    client.on('end',function(){
        console.log('Client disconnected'); //콘솔에 'Client disconnected' 출력
    });
});

//에러가 발생할 경우 화면에 에러 메시지 출력
server.on('error',function(err){
    console.log('err'+err); //콘솔에 error내용 출력
})

//port 8107으로 접속이 가능하도록 대기
server.listen(8107, function(){
    console.log('Server listening for connections');    //콘솔에 'Server listening for connections' 출력
});
