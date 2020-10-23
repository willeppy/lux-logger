var http = require('http');
var fs = require('fs');
const { Stream } = require('stream');
var postHTML = "Listening for Lux Logger..."

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    if (body) {
      const { headers } = req;
      var id = headers['id'];
      console.log('ID: ' + id);
      console.log('BODY: ' + body);
      var writeStream = fs.createWriteStream('./logs/' + id + '.json', {flags:'a'});
      writeStream.write(body);
    }


    // TODO: Consider security concerns of following lines
    res.writeHead(200, {'Content-Type': 'text/plain', 
                        'Access-Control-Allow-Origin': '*', 
                        'Access-Control-Allow-Headers': '*'});
    res.end(postHTML);
  });
}).listen(8900);
