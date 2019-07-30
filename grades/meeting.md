# Team Meetings

## Week 1: June 3 - 7

| Question | Expected | Actual |
| --- | --- | --- |
| Tell me about your team. More specifically who’s in your team and something about them | 5 | 5 |
| Tell me about DFI | 5 | 5 |
| Show me what you have so far | 5 | 5 |

**Comments**

 - Mentioned full name of DFI, talked about their audience, mentioned what they did
 - Was about to name and mention one thing about everyone in team
 - Missing summary (Which is okay, easy to do)

## Week 2: June 24 - 28

| Question | Expected | Actual |
| --- | --- | --- |
| Give me a summary of your application | 5 | 5 |
| Show me your progress with your screenshots and burndown chart | 5 | 5 |
| What’s the plan for the next sprint? | 5 | 5 |
| Show and walk through code, or talk about research and plans | 5 | 5 |

**Comments**

 - Has an idea of project / application
 - Plan needs to be more planned and tickets need to be smaller
 - Front-end is good


## Week 3: June 24 - 28

| Question | Expected | Actual |
| --- | --- | --- |
| Show me your progress for week 3 | 5 | 5 |
| Show me your progress for week 4 | 5 | 5 |
| Tell me about the flow of your application | 5 | 5 |
| Run your application | 5 | 5 |

**Comments**

 - Found grades (My bad :c)
 - Clear burndown chart and table for week 3 and 4
 - Have clear idea of how IBM connects
 - Front-end is functional but basic
 
## Week 4: July 22 - 26

|Question|Expected|Actual|
|--------|-----|----|
|Show me your progress for previous week|5|5|
|Show me your progress for week before|5|5|
|Run me through your testing (or tell me your plans if not present)|5|5|
|Run the application (technical demo)|5|2|

**Comments**

- sprints 5 and 6
    - the web crawler
        - connecting to the indexer
        - reading the corpus
        - reading from the docs
        - associating the answers with the questions
    - finished the indexer this past week
    - connecting the web crawler to the indexer
    - integrate a ranking system
        - ranking of the articles in the database (top questions; frequently asked questions)
    - training watson to register and return responses; mainly from corpus responses
        - also some utsc stuff
    - frontend part (react)
        - troubleshooting frontend connectivity to the backend
    - firebase database connecting to watson and indexer
        - main module that connects to the frontend

- unit tests:
    - currently no unit tests
        - web crawler
            - make sure its grabbing the questions properly
            - make sure its getting the correct hyperlinks
        - indexer
            - making junit tests
            - mocking the basic document objects (mockito)
                - test the document objects and writers being created
            - testing each of the search methods
                - searching by options
        - frontend
            - using selenium
            - might work with watson and the indexer to get some tests on the edge cases

- demo:
    - none of the components are connected yet
        - most of the stuff is just on postman
    - web crawler
        - reads from the corpus and also the links inside the corpus
        - can read from random links as well
    - indexer
        - endpoints seem to work
    - login
        - kind of buggy but sends back a token
    - watson
        - seems to work okay
    - need to get all the components integrated together
        - you can't show everything on postman for the final demo

- jira:
    - burndown
        - pushing tasks around causes the burndown chart to go up
    - board
        - made the sprint too big
            - added too many tasks
        - things are tricky
