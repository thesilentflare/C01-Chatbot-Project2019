const fetch = require('node-fetch');

class UploadController {
    constructor(req, res) { 
        this.req = req;
        this.res = res;
    }

    sendForUrl() {
        const url = 'http://localhost:8080/upload/url?question=' + 
                     this.req.body.question + "&seed=" +
                     this.req.body.seed + "&limit=" +
                     this.req.body.limit;
        const res = fetch(url, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        }).then(res => {this.res.status(Number(JSON.stringify(res.status))); return res.json()})
        .then(json => {this.res.json(json)}
        );         
    }

    sendForFile() {
        const url ='http://localhost:8080/upload/file';
        const res = fetch(url, {
            method: "POST",
            body:    JSON.stringify(this.res.body),
            headers: {'Content-Type': 'application/json'},
        }).then(res => {this.res.status(Number(JSON.stringify(res.status))); return res.json()})
        .then(json => {this.res.json(json)}
        );        
    }
}

module.exports = UploadController;