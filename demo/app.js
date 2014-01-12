
/**
 * Module dependencies.
 */

var express = require('express'), 
    path = require("path"),
    fs=require('fs'),
    http = require('http'),
    url = require('url');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  // app.use(express.bodyParser());
  app.use(express.bodyParser({uploadDir:'./uploads'}));
  app.use(express.multipart());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/',function(req,res){
  var realpath = __dirname + '/views/' + url.parse('index.html').pathname;
  var txt = fs.readFileSync(realpath);
  res.end(txt);
});
app.post('/fileUpload', function(req, res) {
    var file = req.files["file"];
    // 获得文件的临时路径
     var tmp_path = file.path;
    // 指定文件上传后的目录 - 示例为"images"目录。 
    var target_path = './public/images/upload/' + file.name;
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
      if (err) throw err;
      // 删除临时文件夹文件, 
      fs.unlink(tmp_path, function() {
         if (err) throw err;
         res.send('File uploaded to: ' + target_path + ' - ' + file.size + ' bytes');
      });
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});