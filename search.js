
var Twit = require('twit') // this is how we import the twit package
var config = require('./config') //this is we import the config file which is a js file which contains the keys and tokens
var compromise = require('compromise')

var exports = module.exports = {};

var T = new Twit(config) //this is the object of twit which will help us to call functions inside it
var statusLog = []
var params = {
  q: '',
  geocode: '44.461383,-93.154498,5mi',
  count: 0
}

exports.getTweets = function(count, resolve) {
  statusLog = []
  params.count = count
  return T.get('search/tweets', params).then(function(result){
    for(var i in result.data.statuses) {
      var status = result.data.statuses[i]
      var tweet = {
        username: status.user.screen_name,
        text: status.text
      }
      statusLog.push(tweet)
    }
    console.log("Number of tweets: ", statusLog.length)
    resolve(statusLog)
  }) // get is the function to search the tweet which three paramaters 'search/tweets',params and a callback function.
}

function searchedData(err, data, response) {
  for(var i in data.statuses) {
    var status = data.statuses[i]
    var tweet = {
      username: status.user.screen_name,
      text: status.text
    }
    statusLog.push(tweet)
  }
  //console.log("Number of tweets:", statusLog.length)

  ////console.log(filterTweetRegex(regex, statusLog))
  //console.log(getPeopleCompromise(statusLog))
  return getPeopleCompromise(statusLog)
} // searchedData function is a callback function which returns the data when we make a search

exports.filterTweetRegex = function(regex, statusLog) {
  var filteredLog = []
  for (var i in statusLog) {
    if(regex.exec(statusLog[i].text)) filteredLog.push(statusLog[i])
  }
  return filteredLog || "No Results"
}

exports.getVerbsCompromise = function(statusLog){
  var verbLog = []
  for (var i in statusLog){
    var verbs = compromise(statusLog[i].text).verbs().data()
    for(v in verbs){
      verbLog.push(verbs[v].text)
    }
  }
  return verbLog
}

exports.verbsToAdjectivesCompromise = function(statusLog){
  var verbLog = []
  for (var i in statusLog){
    var verbs = compromise(statusLog[i].text).verbs().conjugate()
    for(v in verbs){
      verbLog.push(compromise(verbs[v].Infinitive).verbs().asAdjective())
    }

  }
  return verbLog
}

exports.getPeopleCompromise = function(statusLog) {
  var peopleLog = []
  for(var i in statusLog) {
    var people = compromise(statusLog[i].text).people().data()
    for(var j in people) {
      peopleLog.push(people[j].text)
    }
  }
  return peopleLog
}

exports.changeTweetTense = function(statusLog) {
  var output = []
  for(var i in statusLog) {
    var obj = {}
    obj.normal = statusLog[i].text
    obj.past = compromise(statusLog[i].text).sentences().toPastTense().out()
    obj.present = compromise(statusLog[i].text).sentences().toPresentTense().out()
    obj.future = compromise(statusLog[i].text).sentences().toFutureTense().out()
    output.push(obj)
  }
  return(output)
}
