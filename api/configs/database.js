const Sequelize = require('sequelize');
const config = require('./config/config.json')['database'];
const defaultConfig = config.development;

const database = new Sequelize(defaultConfig);

var User = database.define("user",{
  email: {
    type: Sequelize.STRING(150),
    allowNull: false,
    unique: true
  },
  firstname: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  gender: {
    type: Sequelize.ENUM('M','F'),
    allowNull: false
  },
  reason: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(32),
    allowNull: false
  }  //just for now, can do salted hashes later for security
  //salt:
  //saltedHash:
});

var Admin = database.define("admins",{
  email: {
    type: Sequelize.STRING(150),
    allowNull: false,
    unique: true
  },
  adminToken: {
    type: Sequelize.STRING(10),
    allowNull: false,
  }
});


var Index = database.define("index",{
  indexName: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
  },
  urls: {
    type: Sequelize.ARRAY(Sequelize.STRING(200)),
    allowNull: false
  }
});

/*database.sync().then(function() {
  User.create({
    username:"admin",
    password:"admin"
  });
})*/
