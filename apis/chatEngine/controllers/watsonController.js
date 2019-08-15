require('firebase/app');
require('firebase/database');
require('body-parser');
const fetch = require('node-fetch');
const firebaseSend = require('./messageController');

function send(req) {
    const query = 
    {
        "input": {
            "message_type": "text",
            "text": req.body.text,
            "options": {
            "return_context": true
            }
        }
    };

    const resp = fetch('http://localhost:5000/message', {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {'Content-Type': 'application/json'},
    });

    var result = resp.then(res => res.json())
    .then(json => 
        json.response.output.generic.map(result => 
            result.text)
         ).catch(function(error) {
             console.log(error);
        });

    result.then(function (value) {
        firebaseSend.toFirebase(value[0], "IBM");
    }).catch(function(error) {
        console.log(error);
    });

    return result;

}

module.exports = {
    send
};