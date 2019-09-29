const fs = require('fs')

const keyLength = 1024;
const contentChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`~!@#$%^&*()_+-=:<>?',./";
const generatCount = 2048;
var keyArr = [];
for (let i = 0; i < generatCount; i++) {
  var key = "";
  for (let j = 0; j < keyLength; j++) {
    var randNum = Math.floor(Math.random()*contentChar.length)
    key+=contentChar[randNum]
  }
  key+="\n";
  keyArr.push(key)
}
fs.writeFileSync('../genKey',keyArr.join(""))