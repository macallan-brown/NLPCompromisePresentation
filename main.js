
var express = require('express')
var search = require('./search')
var app = express()
var path = require('path')

var port = process.env.PORT || 3000

app.get('/allTweetsJSON', function(req, res) {
  var promise = new Promise((resolve, reject) => {
    var tweets = search.getTweets(100, resolve)
  })

  promise.then((statusLog) => {
    res.send(statusLog)
  })
})

app.get('/filteredTweetsJSON', function(req, res) {
  var promise = new Promise((resolve, reject) => {
    var tweets = search.getTweets(100, resolve)
  })

  promise.then((statusLog) => {
    var regex = new RegExp('(.-.)|([Ss]t.{0,2}[Oo]laf)')
    //console.log(statusLog)
    //var regex = newRegExp('football')
    res.send(search.filterTweetRegex(regex, statusLog))
  })
})

app.get('/peopleInTweetsJSON', function(req, res) {
  var promise = new Promise((resolve, reject) => {
    var tweets = search.getTweets(100, resolve)
  })

  promise.then((statusLog) => {
    res.send(search.getPeopleCompromise(statusLog))
  })
})

app.get('/verbsInTweetsJSON', function(req, res) {
  var promise = new Promise((resolve, reject) => {
    var tweets = search.getTweets(100, resolve)
  })

  promise.then((statusLog) => {
    res.send(search.getVerbsCompromise(statusLog))
  })
})

app.get('/verbsToAdjectivesJSON', function(req, res) {
  var promise = new Promise((resolve, reject) => {
    var tweets = search.getTweets(100, resolve)
  })

  promise.then((statusLog) => {
    res.send(search.verbsToAdjectivesCompromise(statusLog))
  })
})

app.get('/changeTweetTenseJSON', function(req, res) {
  var promise = new Promise((resolve, reject) => {
    var tweets = search.getTweets(10, resolve)
  })

  promise.then((statusLog) => {
    res.send(search.changeTweetTense(statusLog))
  })
})

app.get('/allTweets', function(req, res) {
  res.sendFile(path.join(__dirname + '/allTweets.html'))
})

app.get('/peopleInTweets', function(req, res) {
  res.sendFile(path.join(__dirname + '/peopleInTweets.html'))
})

app.get('/verbsInTweets', function(req, res) {
  res.sendFile(path.join(__dirname + '/verbsInTweets.html'))
})

app.get('/verbsToAdjectives', function(req, res) {
  res.sendFile(path.join(__dirname + '/verbsToAdjectives.html'))
})

app.get('/changeTweetTense', function(req, res) {
  res.sendFile(path.join(__dirname + '/changeTweetTense.html'))
})

app.get('/frontend', function(req, res){
  res.sendFile(path.join(__dirname + '/frontend.js'))
})

app.listen(port)
console.log('Server started on ' + port)
