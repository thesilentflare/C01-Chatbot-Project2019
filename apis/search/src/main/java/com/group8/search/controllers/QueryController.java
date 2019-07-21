package com.group8.search.controllers;

import java.io.IOException;
import java.lang.Exception;

import java.util.HashMap;
import java.util.Map;

import com.group8.search.indexer.Indexer;
import com.group8.search.models.Article;
import com.group8.search.models.QueryRequest;

import java.io.IOException;
import java.nio.file.Paths;
import java.sql.SQLException;

import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.RAMDirectory;
import org.apache.lucene.search.TopDocs;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@RestController
//@RequestMapping("/query")
public class QueryController {
   // Instance fields
   private Directory dir;
   
   /**
    * Get a Lucene IndexSearcher for the current existing indexed data
    * @return IndexSearcher
    */
   public IndexSearcher getSearcher() {
      Indexer indexer = new Indexer();
        
      try {
         Directory loc = indexer.refresh();
         this.dir = loc;
         indexer.close();
         System.out.println("\nLocation of Index: " + loc);
      } catch (SQLException e) {
         e.printStackTrace();
      } catch (IOException e) {
         e.printStackTrace();
      }

      IndexSearcher searcher;
      try {
         IndexReader reader = DirectoryReader.open(this.dir);
         searcher = new IndexSearcher(reader);
      } catch (IOException e) {
         e.printStackTrace();
         searcher = null;
      }
      return searcher;
   }
   
   /**
    * Spring Boot query endpoint for querying the indexed data given a valid query
    * @param req QueryRequest - the query to be searched for among the indexed data
    * @return ResponseEntity<Article> - an Article entry 
    */
   
   @RequestMapping(value = "/query", method = RequestMethod.POST)
   public ResponseEntity<Article> query(@RequestBody QueryRequest req) {
      // Create a place to store the query results
      Article textRes;
      Article keywordsRes;
      Article res;
      
      // Try to get a result from the given result
      try {
         // First search the keywords of Article for a result
         TopDocs resDocByKeywords = this.searchByKeywords(req.getKeywords());
         keywordsRes = this.parseResult(resDocByKeywords);

         // Check if the search via keywords got a result
         if (keywordsRes.isEmpty()) {
            // Then search the text of all Article to get a result
            TopDocs resDocByText = this.searchByText(req.getKeywords());
            textRes = this.parseResult(resDocByText);
            res = textRes;
         } else {
            res = keywordsRes;
         }
         // Log result
         System.out.print(res);

         /*if (textRes.equals(keywordsRes)) {
            res = textRes;
         } else if (keywordsRes.name == null && textRes.name != null) {
            StringBuilder newKeywords = new StringBuilder();
            newKeywords.append(textRes.getKeywords());
            String[] givenKeywords = req.getKeywords();
            for (Strign keyword : givenKeywords) {
               if (textRes.getKeywords().contains(keyword)) {
                  newKeywords.append(", " + keyword);
               }
            }
         } else {
            res = null;
         }*/

      } catch(Exception e) {
         e.printStackTrace();
         res = null;
      }

      // Return result
      return new ResponseEntity<Article>(res, HttpStatus.CREATED);
   }

   /**
    * Given a string of keywords search the indexed keywords of Articles for matches
    * @param keywords String - the keywords to search for
    * @return Article - the search reuslt
    * @throws Exception
    */
   public TopDocs searchByKeywords(String keywords) throws Exception {
         IndexSearcher searcher = this.getSearcher();
         String NAME = "keywords";
         QueryParser queryParser = new QueryParser(NAME, new StandardAnalyzer());
         Query query = queryParser.parse(keywords);
         TopDocs results = searcher.search(query, 100);
         return results;
   }

   /**
    * Given a string of keywords search the indexed text of Articles for matches
    * @param keywords String - the keywords to search for
    * @return Article - the search reuslt
    * @throws Exception
    */
   public TopDocs searchByText(String keywords) throws Exception {
         IndexSearcher searcher = this.getSearcher();
         String NAME = "text";
         QueryParser queryParser = new QueryParser(NAME, new StandardAnalyzer());
         Query query = queryParser.parse(keywords);
         TopDocs results = searcher.search(query, 100);
         return results;
   }

   /**
    * Parse a set of resulting TopDocs to get one Article result
    * @param resDocs TopDocs - set of results
    * @return Article - single top result
    */
   public Article parseResult(TopDocs resDocs) {
      IndexSearcher searcher = this.getSearcher();
         Article result = new Article();
         try {
            System.out.println("\n\nNumber of Results: " + resDocs.totalHits.value);
            if (resDocs.totalHits.value >= 1) {
               ScoreDoc scoreDoc = resDocs.scoreDocs[0];
               Document doc = searcher.doc(scoreDoc.doc);
               result.convertToArticle(doc);
            }
         } catch(Exception e) {
            result = null;
         }
         System.out.println(result);

         return result;
   }
  
}