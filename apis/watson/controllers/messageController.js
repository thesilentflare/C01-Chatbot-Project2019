const service = require('./sessionController.js')['service'];
const createSession = require('./sessionController.js')['createSession'];
const assistantId = require('../config/config.json')['assistant']['assistantId'];

class MessageController {
  constructor(req, res) { 
    this.req = req;
    this.res = res;
    this.input = req.body.input;
    this.session = createSession(service);
  }

  // Sending a message to Watson and receieve a response
  sendMessage() {
    this.session.then(res => {
      service.message({
        // Crab session and assistant ID
        assistant_id: assistantId,
        session_id: res.session_id,
        // Json object that will be grabbed from user query
        input: this.input,
      })
        .then(ret => {
          console.log(JSON.stringify(ret, null, 2));
          this.res.status(200).json({ response: ret});
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

}
module.exports = MessageController;