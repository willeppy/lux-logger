var https = require('https');
var fs = require('fs');
const { Stream } = require('stream');
var postHTML = "Listening for Lux Logger..."
var crypto = require('crypto');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    if (body) {
      const { headers } = req;
      var id = crypto.createHash('md5').update(req.connection.remoteAddress).digest('hex');
      id = id + headers['id']
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
}).listen(8901);
