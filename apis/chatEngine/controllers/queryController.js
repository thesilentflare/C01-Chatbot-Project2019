const fetch = require('node-fetch');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
const ibmConfig = require('../configs/config/ibm.json');
const firebaseSend = require('./messageController');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2019-07-12',
    iam_apikey: ibmConfig.nlp.key,
    url: ibmConfig.nlp.endpoint
});
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');

const toneAnalyzer = new ToneAnalyzerV3({
    version: '2019-08-04',
    iam_apikey: ibmConfig.tone.key,
    url: ibmConfig.tone.endpoint
});


class QueryController {
    constructor(req, res) { 
        this.req = req;
        this.res = res;
        this.query = req.body.text;
    }

    send() {
        console.log(JSON.stringify("CHECK: " + this.query));
        const analyzeParams = {
            'text': JSON.stringify(this.query),
            'features': {
              'entities': {
                'emotion': false,
                'sentiment': false,
                'limit': 2,
              },
              'keywords': {
                'emotion': false,
                'sentiment': false,
                'limit': 5,
              },
            }
        };
          
        naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            var res = {"query": this.query, "keywords": analysisResults.keywords[0].text};
            console.log("RES: "+ JSON.stringify(res));
            this.request(res);
        })
        .catch(err => {
            console.log('error:', err);
        });
    }

    analyzeEmotions() {
        console.log(JSON.stringify("CHECK: " + this.query));
        const toneParams = {
            tone_input: { 'text': this.query },
            content_type: 'application/json',
          };

        toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
            console.log(JSON.stringify(toneAnalysis, null, 2));
            this.res.status(toneAnalysis.status).json(toneAnalysis.emotion);
        })
        .catch(err => {
            console.log('error:', err);
            this.res.status(500).json({"message":"WATSON DOWN"});
        });
    }

    request(query) {
        const url ='http://localhost:8080/query';
        const res = fetch(url, {
            method: "POST",
            body:    JSON.stringify(query),
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
        .then(json => {
            if (!json.empty) {
                firebaseSend.toFirebase(json.text, "Indexer");
                var newJSON =
                {
                    "text": json.text
                };
                this.res.status(200).json(newJSON);
            } else {
                firebaseSend.toFirebase("No Results", "Indexer");
                var newJSON =
                {
                    "text": "No Results"
                };
                this.res.status(200).json(newJSON);
            }
        })
        .catch(function(error) {
            console.log(error);
        })
        /*.then(json => {
            this.res.status(200).json(json);
        })*/;   

        
    }

    
}

module.exports = QueryController;