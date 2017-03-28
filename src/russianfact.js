var Alexa = require('alexa-app');
var app = new Alexa.app('fact');

var languageStrings = {
    "en": {
        "translation": {
            "FACTS": [
              "The Trans-Siberian Railway spans almost all the way across the country, making it the single longest railway in the world. The railway is 9200 kilometers (or 5700 miles)",
              'The name Red Square has nothing to do with communism, but derives from the word "krasnyi", which once meant "beautiful".',
              "They are the world's fourth biggest drinkers, according to WHO statistics, behind Belarus, Moldova and Lithuania. Britain comes 25th.",
              'The word "vodka" derives for the word "voda", which means "water".',
              "The male life expectancy is just 63, lower than it is in North Korea or Iraq. Russian women, on the other hand, can expect to live to 75.",
              "Padlock trees can be found in Moscow - couples place them here to prove their love.",
              "70% of Russia is Siberia",
              "Russia is a country in Eurasia"
            ],
            "SKILL_NAME" : "Space Facts",
            "GET_FACT_MESSAGE" : "Here's your fact: ",
            "HELP_MESSAGE" : "You can say tell me a space fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    }
};

app.pre = function(request, response, type) {
  if (request.data.session.application.applicationId != "amzn1.ask.skill.d5e9c3c0-248f-409a-858c-3b45585b353d") {
    // fail ungracefully 
    throw "Invalid applicationId";
    // `return response.fail("Invalid applicationId")` will also work 
  }
};

app.launch(function(req, res) {
 
  var prompt = 'For russian facts. Ask Russian Facts to give you a fact.';
  GetFact(req, res)
});

var GetFact = function (req, res) {
   var factArr = languageStrings.en.translation.FACTS;
     var factIndex = Math.floor(Math.random() * factArr.length);
     var randomFact = factArr[factIndex];

     var speechOutput = languageStrings.en.translation.GET_FACT_MESSAGE + randomFact;
     res.say(speechOutput)
}

app.intent("GetNewFactIntent", {
  
}, function (req, res) {
      GetFact(req,res)
});

app.intent('AMAZON.HelpIntent', {
  
}, function (req, res) {
  res.say("Simply say give me a fact to russian facts")
});

app.intent('AMAZON.StopIntent', {
  
}, function (req, res) {
  res.say ("I'll stop now")
})



//hack to support custom utterances in utterance expansion string
console.log(app.utterances().replace(/\{\-\|/g, '{'));
module.exports = app;