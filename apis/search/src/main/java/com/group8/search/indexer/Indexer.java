package com.group8.search.indexer;

import java.io.IOException;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.List;

import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.FSDirectory;


public class Indexer {

    private static Indexer instance = new Indexer();
    private Documenter docer;
    private IndexWriter writer;
    private List<Document> docs;
    private final String INDEX_DIR = "/Volumes/Macintosh HD/Users/cd/Desktop/c01summer2019groupproject8/apis/search/src/main/java/com/group8/search";

          private Indexer() {
		try { 
            //Directory dir = new RAMDirectory();
            FSDirectory dir = FSDirectory.open(Paths.get(this.INDEX_DIR));
            StandardAnalyzer analyzer = new StandardAnalyzer();
            IndexWriterConfig writerConfig = new IndexWriterConfig(analyzer);
                  this.writer = new IndexWriter(dir, writerConfig);
		} catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        this.docer = new Documenter();
    }

    public boolean clean() throws IOException {
        this.writer.deleteAll();
        return this.writer.commit() != -1;
    }

    public boolean refresh() throws SQLException, IOException {
        this.docs = this.docer.getDocuments();
        boolean res = this.writer.addDocuments(this.docs) != -1;
        this.writer.flush();
        return res && (this.writer.commit() != -1);
    }

    public String getLocation() {
        return this.INDEX_DIR;
    }
    
    public static Indexer getInstance() {
        return Indexer.instance;
    }

}