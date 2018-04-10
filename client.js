//net모듈의 소켓 객체를 사용
var net = require('net');
//readline 모듈 사용
var readline = require('readline');

//readline Interface 인스턴스 생성
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'CLIENT> '
});

// 서버 8170번 포트로 접속
// 서버 ip 주소 지정해줌 (localhost여서 생략)
var client = net.connect({port: 8107, host: '192.168.0.3'});

//connect 이벤트 발생 시
client.on('connect',function(){
    console.log('Client connected');
    //prompt 실행
    rl.prompt();
    //line 이벤트 발생 시(줄 단위로 입력값 받을 시)
    rl.on('line', (line) => {
    //데이터 서버로 전송
    client.write((line.trim()));
    //prompt 실행
    rl.prompt();
    });
});

//서버로부터 받은 데이터를 화면에 출력
client.on('data',function(data){//data 이벤트 발생시 callback
    console.log(data.toString());
    client.end();
});
;
//접속이 종료 되었을 때 메시지 출력
client.on('end',function(){
    console.log('Client disconnected');
    rl.close();
});

//에러가 발생할 경우 화면에 에러 메시지 출력
client.on('error',function(err){
    console.log('err'+err);
});

//close 이벤트 발생 시
rl.on('close',() => {
    //process 종료
    process.exit(0);
});

//SIGINT 이벤트 발생 시
rl.on('SIGINT', () => {
    //나갈 것인지 물음
    rl.question('Are you sure you want to exit? ', (answer) => {
        //yes 입력시 나감
        if (answer.match(/^y(es)?$/i)) client.end();
    });
})
