var express = require('express');
var app = express();
var fs = require('fs');
var events = [];
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');


//app.use(express.static('public'));

app.route('/events')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  next();
})
.get(function(req, res, next) {
  // Connect using the connection string
  MongoClient.connect("mongodb://localhost:27017/integration_tests", {native_parser:true}, function(err, db) {
	assert.equal(null, err);

	var tests = db.collection('mongoclient_test').find();
	tests.toArray(function(err, docs) {
	  if (err === null)
	    res.json(docs);
	});

	//db.collection('mongoclient_test').find(function(err, result) {
	//  assert.equal(null, err);
	//  res.json("events",result);

	//  db.close();
	//});
    });
})
.post(function(req, res, next) {
  var stuff = '';
  req.on('data', function (chunk) {
    stuff += chunk;
  });

  req.on('end', function() {
    var self = this;
    self.stuff = JSON.parse(stuff);
    self.stuff._id = 1;
    // Connect using the connection string
    MongoClient.connect("mongodb://localhost:27017/integration_tests", {native_parser:true}, function(err, db) {
        assert.equal(null, err);

console.log('stuff',self.stuff);
	db.collection('mongoclient_test').insert(self.stuff, {upsert:true}, function(err, result) {
	  assert.equal(null, err);
	  console.log(result);
	  //assert.equal(1, result);

	  db.close();
	});
    });
    stuff = '';
    res.send(200, 'Added');
  });
});

app.listen(80);
