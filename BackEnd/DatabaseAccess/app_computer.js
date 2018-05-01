var express    =  require("express");                           //Express 모듈 사용
var mysql      = require('mysql');                              //Mysql 모듈 사용
var connection = mysql.createConnection({                       //Mysql 접근
  host     : 'localhost',                                       //url주소
  user     : 'root',                                            //mysql 사용자명
  password : 'apmsetup',                                        //mysql 패스워드
  database : 'inub'                                             //mysql 데이터베이스명
});
var app = express();                                            //express 모듈 실행
var sqlquery = 'select * from inub';                           //mysql 쿼리문

connection.connect(function(err){                               //mysql 접근 실행
  if(!err) {                                                    //에러가 없다면
      console.log("Database is connected ... \n\n");           //서버 콘솔에 연결되었다고 출력
  } else {                                                      //아니라면(에러가 있다면)
      console.log("Error connecting database ... \n\n");        //서버 콘솔에 연결되지 않았다고 출력
  }
});

app.get("/",function(request,response){                         //기본 url인 http://url/에 관하여
  connection.query(sqlquery, function(err, rows, fields) {      //mysql에 접근하여 쿼리문 입력 후 데이터 반환
    if (err){
      console.log(err);
    }else{                                                      //mysql접근에 에러가생기면
      var data="<html><head><title>mysql test</title></head>";  //html파일 작성 (Head, Body 부분)
      data+="<h1>INUB</h1>";
      data+="<table border=\"1\">";
      data+="<tr><th>No.</th><th>Name</th></tr>";               //각 테이블의 이름
      for (var i in rows){                                      //mysql데이터 값의 갯수만큼
        data += "<tr>";
        data += "<td>"+rows[i].num +"</td>";                     //각 테이블에 따른 값을 출력
        data += "<td>"+rows[i].id +"</td>";
        data += "</tr>";
      }
      data+="</table></html>";                                  //html 문서를 닫음
      response.send(data);                                         //서버콘솔에 쿼리문 에러 출력
    }
  });
  connection.end();                                             //mysql 접근 종료
});

app.listen(80);
