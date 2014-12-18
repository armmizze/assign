var cloudinary = require('cloudinary');
var fs = require('fs');
var multer = require('multer');
var format = require('util').format;
var express = require('express');
var app = express();

cloudinary.config({
  cloud_name: 'fitm',
  api_key: '418999862618864',
  api_secret: 'jf8C-q43_U0IovGmjg0su29kRqs'
});
app.use(express.static( './www/'));

app.set('port',(process.env.PORT || 5000));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var collection = null;
var boxDB = null;
var boxUS = null;

var ObjectID = require('mongodb').ObjectID;

// GET /style.css etc
//app.use(express.static( './www/'));
app.use(multer({
  dest: './uploads/'
}));

app.get('/items', function(request, res) {
  boxDB.find().toArray(function(err, results) {
    if (err) res.send({
      error: 1
    });
    else res.send(results);
  });
});

app.post('/upload', function(request, response) {
  console.log(request.body);
  stream = cloudinary.uploader.upload_stream(function(result) {

    var insertData = {
      box_name: request.body.box_name,
      box_item_image: result
    };
    boxDB.insert(insertData, function(err, docs) {
      if (err) response.send({
        error: 1
      });
      else {
        fs.unlink('./'+request.files.image.path, function(err) {
          if (err) throw err;
          console.log('successfully deleted /tmp/hello');
        });
        // response.redirect('../client/myApp/www/templates/tab-boxs.html');
      }
    });
  }, {
    public_id: request.body.title
  });

  fs.createReadStream(request.files.image.path, {
    encoding: 'binary'
  }).on('data', stream.write).on('end', stream.end);
});





// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://1234:1234@linus.mongohq.com:10057/arm", function(err, db) {
  if (!err) {

    boxDB = db.collection('box_items');
    boxUS = db.collection('box_user');


    app.listen(app.get('port'),function(){
      console.log("nod.asd"+app.get('port'));
    });

  }

  else
    throw err;

});



app.get('/add',function(req,res){
    var newData = {
      user: req.query.user,
      pass: req.query.pass
    };
    boxUS.insert(newData,function(err,result){
      if(err) throw err;
      console.log(result);
    })
  });

  app.get('/check/', function(req, res) {
    var find = {};
    if (req.query.user!=""&&req.query.user!=null)
        {
            find.user = req.query.user;
            if (req.query.pass!=""&&req.query.pass!=null)
            {
                find.pass = req.query.pass;
                boxUS.find(find).toArray(function(err, result) {
                res.send(JSON.stringify(result));
                });
            }
        }

});
