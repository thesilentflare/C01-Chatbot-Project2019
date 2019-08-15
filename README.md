Before utilizing the application the following things must be configured:

Selenium - `./apis/SeleniumTest/src/test/java/environment/EnvironmentManager.java` - Change initWebDriver to use the correct Operating System webdriver of user's machine:
For Windows Users - initWindows()
For Mac Users - initMac()
For Linux Users - initLinux()

Lucene - ./apis/search/src/main/java/com/group8/search/ApplicationConfig.java - Change username and password to user's local SQL Server credentials

Login - ./apis/login/configs/config/config.json - Change username and password to user's local SQL server credentials

In order to start up the application perform the following commands:

Start the App:
`cd app`
`npm install`
`npm start`

Start Login Server:
`cd apis/login`
`npm install`
`node server.js`

Start Watson Server:
`cd apis/watson`
`npm install`
`node server.js`

Start ChatEngine Server:
`cd apis/chatEngine`
`npm install`
`node server.js`

Start Lucene Server:
`cd app`
`npm install`
`node server.js`

To perform Selenium tests perform the following command:
`cd apis/search`
`mvn spring-boot:run`