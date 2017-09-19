
switch (document.title) {
  case 'allTweets':
    allTweets()
    break;
  case 'peopleInTweets':
    peopleInTweets()
    break;
  case 'verbsInTweets':
    verbsInTweets()
    break;
  case 'verbsToAdjectives':
    verbsToAdjectives()
    break;
  case 'changeTweetTense':
    changeTweetTense()
    break;
  default:
}

function allTweets() {
  $.getJSON('/allTweetsJSON', function(data) {
    for(var i in data) {
      $('#container').append(data[i].username + ' says: ' + data[i].text + '</br></br>')
    }
  });
}

function peopleInTweets() {
  $.getJSON('/peopleInTweetsJSON', function(data) {
    for(var i in data) {
      $('#container').append(data[i] + '</br>')
    }
  })
}

function verbsInTweets() {
  $.getJSON('/verbsInTweetsJSON', function(data) {
    for(var i in data) {
      $('#container').append(data[i] + '</br>')
    }
  })
}

function verbsToAdjectives() {
  $.getJSON('/verbsToAdjectivesJSON', function(data) {
    for(var i in data) {
      $('#container').append(data[i] + '</br>')
    }
  })
}

function changeTweetTense() {
  $.getJSON('/changeTweetTenseJSON', function(data) {
    for(var i in data) {
      $('#container').append(data[i].normal + '</br>' + data[i].past + '</br>' + data[i].present + '</br>' + data[i].future + '</br></br>')
    }
  })
}
