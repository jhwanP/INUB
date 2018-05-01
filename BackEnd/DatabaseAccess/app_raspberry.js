var express    =  require("express");                             //Express 모듈 사용
var mariasql   = require('mariasql');                             //mariadb 모듈 사용
var connection = new mariasql();
connection.connect({                                              //mariadb 접근
  host     : 'localhost',                                         //url주소
  user     : 'root',                                              //mariadb 사용자명
  password : 'root',                                              //mariadb 패스워드
  database : 'inub',
  db       : 'inub'                                               //mariadb 데이터베이스명
});

var app = express();                                              //express 모듈

connection.connect(function(err){                                 //mariadb 접근 실행
  if(!err) {                                                      //에러가 없다면
      console.log("Database is connected ... \n\n");              //서버 콘솔에 연결되었다고 출력
  } else {                                                        //아니라면(에러가 있다면)
      console.log("Error connecting database ... \n\n");          //서버 콘솔에 연결되지 않았다고 출력
  }
});

app.get("/",function(request,response){                           //기본 url인 http://url/에 관하여
  connection.query('select * from js', function(err, rows){
    if(err){
      throw err;
    }else{
      var data="<html><head><title>mysql test</title></head>";    //html파일 작성 (Head, Body 부분)
      data+="<h1>INUB</h1>";
      data+="<table border=\"1\">";
      data+="<tr><th>No.</th><th>Info</th></tr>";                 //각 테이블의 이름
      for (var i in rows){                                        //mariadb데이터 값의 갯수만큼
        data += "<tr>";
        data += "<td>"+rows[i].num +"</td>";                      //각 테이블에 따른 값을 출력
        data += "<td>"+rows[i].info +"</td>";
        data += "</tr>";
      }
      data+="</table></html>";                                    //html 문서를 닫음
      response.send(data);                                        //웹에 html 출력
    }
  });
  connection.end();                                               //mariadb 접근 종료
});

app.listen(3000);                                                 //express모듈을 사용하여 3000포트에서 클라이언트 요청받기
