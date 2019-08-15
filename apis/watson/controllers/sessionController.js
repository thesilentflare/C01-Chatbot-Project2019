const Assistant = require('ibm-watson/assistant/v2');
const apiKey = require('../config/config.json')['assistant']['apiKey'];
const assistantId = require('../config/config.json')['assistant']['assistantId'];
const url = require('../config/config.json')['assistant']['url'];

//Method to create an instance of the AssistantService
const createAssistantService = () => {
  return new Assistant({
    iam_apikey: apiKey,
    version: '2019-02-28',
    url: url
  });
}

// Create an instance
const service = createAssistantService();

const createSession = (service) => {
  var sessionId;
  // Create a Session to interact with Watson
  return service.createSession({
    assistant_id: assistantId
  })
    .then(res => {
      // Return the session ID
      sessionId = res;
      console.log(JSON.stringify(res, null, 2));
      return sessionId
    })
    .catch(err => {
      console.log(err);
    });
}

const deleteSession = (service, sessionId) => {
  service.deleteSession({
    assistant_id: assistantId,
    session_id: sessionId,
  })
    .then(res => {
      console.log(JSON.stringify(res, null, 2));
    })
    .catch(err => {
      console.log(err);
    });
}

/*
console.log("start test \n");
var c = createAssistantService();
var x = createSession(c)
console.log(x);
console.log("end test");
console.log(deleteSession(c,x.sessionId));
*/
module.exports = {
  service,
  createSession
};

