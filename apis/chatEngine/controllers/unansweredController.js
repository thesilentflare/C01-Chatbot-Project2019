require('firebase/app');
require('firebase/database');
require('body-parser');
const db = require("../configs/firebase")['db'];

function unansweredQuestions() {
    // default values

    var IBMstack = new Array();
    var indexerStack = new Array();
    
    return db.ref('/messages').once('value').then(function(snapshot){
        var data = snapshot.val();
        var prev = null;
        var content = {
            "IBM":[], 
            "Indexer":[]
        };

        for (var i = 0; i < data.length; i++) {
            var curr = data[i];
            if (prev != null) {
                if (prev.user!= "Indexer" && prev.user != "IBM") {
                    if (curr.text == "No Results") {
                        indexerStack.push(prev);
                    } else if(curr.text == "Sorry, I don't know the answer to this question. We will consult our experts ASAP. Please check again another time.") {
                        IBMstack.push(prev);
                    }
                }
            }
            prev = curr;
            
        }
        for (var i = 0; i < IBMstack.legnth || i < 5; i++) {
            var temp = IBMstack.pop();
            var ibmcontent = {
                "user": temp.user,
                "text": temp.text,
                "date": temp.time
            }
            content.IBM[i] = ibmcontent;
        }

        for (var i = 0; i < indexerStack.legnth || i < 5; i++) {
            var temp = indexerStack.pop();
            var indexercontent = {
                "user": temp.user,
                "text": temp.text,
                "date": temp.time
            }
            content.Indexer[i] = indexercontent;
        }

        return content;

    });
}


module.exports = {
    unansweredQuestions
};