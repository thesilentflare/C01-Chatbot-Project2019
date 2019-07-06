const express = require('express');
const router = express.Router();
var userTable, indexTable = require('../configs/database.js');
var Crawler = require("js-crawler");
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'debug'
});

router.get('/:query', function (req, res) {
  makeQuery(req.params.query).then(function(response) {
    var urls = []
    for(doc of response.hits.hits){
      urls.push(doc["_source"]["url"]);
    }
    res.status(200).send(urls);
  });
});


async function makeQuery(query) {
  try {
    const response = await client.search({
      index: 'indexes',
      type: 'mytype',
      body: {
        query: {
          match: {
            content: query
          }
        }
      }
    });
    return response
  } catch (err) {
    console.error(err)
  }
}

router.post('/',(req,res) => { //make sure this can only be done by admins
  //add to elastic search index for searching
  new Crawler().configure({depth: req.body.depth})
    .crawl(req.body.url, function onSuccess(page) {
      client.index({
        index: 'indexes',
        type: "mytype",
        body: { url: page.url, content: page.content}
      }, function (err, resp, status) {
        if (err) {
          console.log(err);
        }
      });
    },null, (function (allUrls) {
        console.log('done crawling');
        res.status(200).send({
          message: "finished crawling",
          urlsCrawled: allUrls
        });
    }));
});

module.exports = router
