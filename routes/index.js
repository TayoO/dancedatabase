var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/ Get Hello World page. /
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/ GET Userlist page. /
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/ Get Dancemove page. /
router.get('/dancemoves', function(req, res) {
    var db = req.db;
    var collection = db.get('dancecollection');
    collection.find({},{},function(e,docs){
        res.render('dancemoves', {
            "dancemoves" : docs
        });
    });
});

/ GET New User page. /
router.get('/newuser', function(req,res) {
    res.render('newuser', { title: 'Add New User' });
});

/ Get New Move page. /
router.get('/newmove', function(req,res) {
    res.render('newmove', { title: 'Add New Move' });
});

/ Post to Add User Service /
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding information to the database.");
        }
        else {
            // And forward to sucess page
            res.redirect("userlist");
        }
    });
});
/ Post to Add New Move Service /
router.post('/addmove', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    //Get our form attributes
    var name = req.body.name;
    var link = req.body.link;
    var start = req.body.start;
    var end = req.body.end;
    // Set our collection
    var collection = db.get('dancecollection');

    // Submit to the DB
    collection.insert({
        "name" : name,
        "youtube" : link,
        "start" : start,
        "end" : end
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("dancemoves");
        }
    });
});

module.exports = router;
