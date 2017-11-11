var express = require('express');
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});
var app = express();
// call public folder to show client
app.use(express.static('public'));
// use ejs to show UI
app.set('view engine', 'ejs');
// set directory to ejs folder
app.set('views', './view');
// set port to connect
app.listen(3000);

//Variables
var mang = ["Android", "iOS", "PHP", "React"];

//Routes
app.get('/', function (req, res) {
    res.render('home');
});

app.post('/getNotes', function (req, res) {
    res.send(mang);
});

app.post('/addNote', parser, function (req, res) {
    var newNote = req.body.note;
    mang.push(newNote);
    res.send(mang);
});

app.post('/deleteNote', parser, function (req, res) {
    var note_id = req.body.note_id;
    mang.splice(note_id, 1); // 1 => number of elem to delete
    res.send(mang);
});

app.post('/editNote', parser, function (req, res) {
    var note_id = req.body.note_id;
    var value = req.body.value;
    mang[note_id] = value;
    res.send(mang);
});