module.exports = bufferSplit;

function bufferSplit(buffer,devide){
  var result = []
  var index = buffer.indexOf(devide)
  while(index != -1){
    result.push(buffer.slice(0,index))
    buffer = buffer.slice(index + devide.length)
    index = buffer.indexOf(devide)
  }
  result.push(buffer)
  return result
}