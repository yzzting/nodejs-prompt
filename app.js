  var prompt = require('prompt');
  var data = require('./data.json');
  var fs = require('fs');
  var async = require('async');
  prompt.message = '';
  prompt.delimter = '';

  prompt.start();

  function main() {
      console.log("输入你的想要的模式:1.答题模式 2.编辑模式");
      prompt.get(['number'], function(err, value) {
          var num = value.number;
          if (num === '1') {
              data.forEach(function(item, index) {
                  console.log(index + 1, item[0]);
              });
              aw();
          } else if (num === '2') {
              aks();
          }
      })
  }

  function login() {
      prompt.get([{
          name: 'username',
          required: true
      }, {
          name: 'password',
          hidden: true,
          conform: function(value) {
              return true;
          }
      }], function(err, value) {

          var username = value.username;
          var password = value.password;

          if (username === 'yzz' && password === '5982') {
              console.log('login success'.blue);
              message();
          } else {
              console.log('login error!'.red);
              login()
          }

      });
  }

  function writeASK(question, answer) {
      data.push([question, answer]);
      save();
  }

  function message() {
      prompt.get(['aks'], function(err, value) {

          var result = value.aks.split(',');

          if (value.aks === 'stop!') {
              aks();
          } else {
              var question = result[0];
              var answer = result[1];
              writeASK(question, answer);
              message();
          }
      });
  }

  function aks() {
      console.log("输入:login 登陆添加题目,输入:delete 删除题目");
      prompt.get(['num'], function(err, value) {
          if (value.num === 'login') {
              login();
          } else if (value.num === 'delete') {
              rm();
          }else{
            console.log('没有这个命令...'.yellow);
          }
      })
  }

  function rm() {
      prompt.get(['rmNum'], function(err, value) {
          var num = parseInt(value.rmNum);
          data.splice(num - 1, 1);
          save();
          console.log('删除成功!'.red);
      })
  }

  function save() {
      fs.writeFileSync('./data.json', JSON.stringify(data));
  }

  function aw() {
      console.log("请选择题号答题");
      prompt.get(['num'], function(err, value) {
          var num = parseInt(value.num);
          var item = data[num - 1];
          console.log(item[0]);
          prompt.get(['userAnswer'], function(err, value) {
              var userAnswer = value.userAnswer;
              var count = 0;
              if (userAnswer === item[1]) {
                  count++;
                  console.log('答对了！继续答题'.green);
                  aw();
              } else {
                  console.log('答错！程序结束'.red);
              }
          })
      })
  }
  main();
