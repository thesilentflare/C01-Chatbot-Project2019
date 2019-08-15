// Config
const app = require('firebase/app');
const config = require('./config/firebase.json')['database'];
require ('firebase/database');

// setting up firebase instance
const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
};

app.initializeApp(firebaseConfig);

var db = app.database();

console.log('connection created');

module.exports = {
    firebaseConfig,
    db
};
