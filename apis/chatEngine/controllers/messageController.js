require('firebase/app');
require('firebase/database');
require('body-parser');
const db = require("../configs/firebase")['db'];

function send(req) {
    toFirebase(req.body.text, req.body.user);
}

function toFirebase(text, user) {
    // default values
    var sendSesssion = 1;
    var sendText = "Default";
    var sendTime = "2019-07-22 21:56:00";
    var sendUser = "guest";

    Number.prototype.padLeft = function(base,chr){
        var  len = (String(base || 10).length - String(this).length)+1;
        return len > 0? new Array(len).join(chr || '0')+this : this;
    }

    var d = new Date,
    dformat = [ (d.getMonth()+1).padLeft(),
                d.getDate().padLeft(),
                d.getFullYear()].join('/')
                + ' ' +
              [ d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()].join(':');
    
    sendTime = dformat;         

    //sendSesssion = req.body.session;
    sendText = text;
    // sendTime = req.body.time;
    sendUser = user;

    db.ref('/messages').once('value').then(function(snapshot){
        var msgID = snapshot.numChildren() + 1;
        db.ref('/messages/' + msgID).set({
            session: sendSesssion,
            text: sendText,
            time: sendTime,
            user: sendUser
        });
    });
}


function display() {
    return db.ref('/messages').once('value').then(function(snapshot){
       return snapshot.val();
    });
}

module.exports = {
    send,
    toFirebase,
    display
};