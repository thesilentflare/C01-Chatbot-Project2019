const fetch = require('node-fetch');

class FaqController {
    constructor(req, res) { 
        this.req = req;
        this.res = res;
        this.limit = req.body;
    }

    send() {
        const url ='http://localhost:8080/faq';
        const res = fetch(url, {
            method: "POST",
            body:    JSON.stringify(this.limit),
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
        .then(json => {this.res.status(200).json(json)}
        );      
    }
}

module.exports = FaqController;