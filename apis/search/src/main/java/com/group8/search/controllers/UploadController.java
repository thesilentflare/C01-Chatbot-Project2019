package com.group8.search.controllers;

import java.io.IOException;
import java.lang.Exception;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.group8.search.indexer.FileSystemStorage;
import com.group8.search.indexer.Indexer;
import com.group8.search.indexer.Storage;
import com.group8.search.indexer.WebCrawler;
import com.group8.search.models.Article;
import com.group8.search.models.FaqRequest;
import com.group8.search.models.QueryRequest;

import java.nio.file.Paths;
import java.sql.SQLException;

import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.Term;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.MatchAllDocsQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.Sort;
import org.apache.lucene.search.SortField;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.WildcardQuery;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.xmlbeans.impl.xb.xsdschema.Wildcard;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/upload")
public class UploadController {
    private Storage storage = new FileSystemStorage();
    private  WebCrawler wc = new WebCrawler();

    /**
    * Spring Boot faq endpoint for getting a certain number of faq  of the indexed Articles
    * @param req FaqRequest - the faq limit count to get
    * @return ResponseEntity<List<Article>> - the list of resulting Articles that rep
    *                                         the wanted FAQs
    */
    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(value = "/files", method = RequestMethod.POST)
    public ResponseEntity<String> uploadFile(@RequestBody MultipartFile file ) {
        // try {
        //     this.storage.store(file);
        // } catch(IOException e) {
        //     e.printStackTrace();
        //     return new ResponseEntity<String>("Failed to crawl file", HttpStatus.CONFLICT);
        // } catch (IllegalArgumentException e) {
        //     e.printStackTrace();
        //     return new ResponseEntity<String>("Bad file given, could not store on server", HttpStatus.BAD_REQUEST);
        // }
        
        if (file != null) {
        try {
            wc.crawlCorpus(file.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Failed to crawl file", HttpStatus.CONFLICT);
        }
        } else {
            return new ResponseEntity<String>("Bad file given", HttpStatus.BAD_REQUEST);
        }
        // Return result
        return new ResponseEntity<String>("Added to database", HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(value = "/url", method = RequestMethod.GET)
    public ResponseEntity<String> uploadUrl(@RequestParam String question, String seed, int limit) {
        boolean res = wc.crawl(question, seed, limit);
        if (res) {
            return new ResponseEntity<String>("Added to database", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Bad url given", HttpStatus.BAD_REQUEST);
        }
    }


}