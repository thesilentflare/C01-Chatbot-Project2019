package com.group8.search.controllers;

import java.io.IOException;
import java.lang.Exception;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.group8.search.indexer.Indexer;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
//@RequestMapping("/FAQ")
public class RankedResultsController {
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
    * Spring Boot faq endpoint for getting a certain number of faq  of the indexed Articles
    * @param req FaqRequest - the faq limit count to get
    * @return ResponseEntity<List<Article>> - the list of resulting Articles that rep
    *                                         the wanted FAQs
    */
   @CrossOrigin(origins = "http://localhost:8080")
   @RequestMapping(value = "/faq", method = RequestMethod.POST)
   public ResponseEntity<List<Article>> query(@RequestBody FaqRequest req) {
      // Create a place to store the query results
      List<Article> res;
      
      // Try to get a result from the given result
      try {
         // First search the keywords of Article for a result
         TopDocs resDocByKeywords = this.searchByFrequency(req.getLimit().intValue());
         res = this.parseResult(resDocByKeywords);

         // Log result
         System.out.print(res);

      } catch(Exception e) {
         e.printStackTrace();
         res = null;
      }

      // Return result
      return new ResponseEntity<List<Article>>(res, HttpStatus.CREATED);
   }

   /**
    * Given a limit count, search the indexed Articles in order from greatest
    * to least based on frequence value
    * @param limit int - the limit count to search for
    * @return TopDocs - the resulting Lucene documents
    * @throws Exception
    */
   public TopDocs searchByFrequency(int limit) throws Exception {
         IndexSearcher searcher = this.getSearcher();
         Query query = new MatchAllDocsQuery();
         Sort sort = new Sort(new SortField[] {
            new SortField("frequency", SortField.Type.DOUBLE, true)});
         TopDocs results = searcher.search(query, limit, sort);
         return results;
   }

   /**
    * Parse a set of resulting TopDocs to get a list of Articles
    * @param resDocs TopDocs - set of resulting documents to be parsed
    * @return List<Article> - list of pased Articles
    */
   public List<Article> parseResult(TopDocs resDocs) {
       System.out.println("\n\nNumber of Results: " + resDocs.totalHits.value);
       List<Article> res = new ArrayList<Article>();
       IndexSearcher searcher = this.getSearcher();
       for (int i = 0; i < resDocs.scoreDocs.length; i++) {
            
            Article result = new Article();
            try {
                
                ScoreDoc scoreDoc = resDocs.scoreDocs[i];
                Document doc = searcher.doc(scoreDoc.doc);
                result.convertToArticle(doc);

            } catch(Exception e) {
                e.printStackTrace();
                result = null;
            }
            System.out.println(result);

            res.add(result);
            
        }
        return res;
   }
  
}