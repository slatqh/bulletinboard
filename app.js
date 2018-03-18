var express = require('express');
var app = express();
var query = require('./query');



function get_all_messages(){
  return new Promise(function(resolve, reject){
    query('select * from messages order by id desc', function(err, results){
     //handle the error and results as appropriate.
     if(err){
      reject(err);
     }
     resolve(results.rows);
    });
  });
}

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  get_all_messages().then(function(all_messages){
    res.render('index',{
       messages: all_messages,
       title: 'Here are all the messages:'
    });
  });
});

app.get('/form', function(req, res){
  res.render('form',{
     title: 'Add a message:'
  });
});


app.get('/add-message', function(req, res){
  query('insert into messages (title, message_text) values ($1, $2)', [req.query.title, req.query['message-text']], function(err, results){

   if(err){
    console.log(err);
    return done(client);
   }
   console.log('Message inserted.')
  });
  return res.redirect('/');
});

app.get('*', function(req, res) {
  res.status(404).send('<h1>uh oh! page not found!</h1>');
});

var server = app.listen(3333, function(){
  console.log('Open http://localhost:3333 in the browser');
});
