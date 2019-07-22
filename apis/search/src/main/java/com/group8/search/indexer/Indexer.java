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
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.RAMDirectory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Indexer {

    //private static Indexer instance = new Indexer();
    // Instance fields
    @Autowired
    private Documenter docer;
    private IndexWriter writer;
    private List<Document> docs;

    /**
     * Construct an Indexer object
     */
    public Indexer() {
        // Try to instantiate an IndexWriter
		try { 
            // Create a directory location to store the indexed data
            Directory dir = new RAMDirectory();
            // Create an analyer which will be used for indexing the data
            StandardAnalyzer analyzer = new StandardAnalyzer();
            // Initalize the indexWriter
            IndexWriterConfig writerConfig = new IndexWriterConfig(analyzer);
            this.writer = new IndexWriter(dir, writerConfig);

		} catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        this.docer = new Documenter();
    }

    /**
     * Clean index data
     * @return boolean - true if the indexed data was cleaned, otherwise false
     * @throws IOException
     */
    public boolean clean() throws IOException {
        this.writer.deleteAll();
        return this.writer.commit() != -1;
    }

    /**
     * Get a new set of indexed data
     * @return Directory - the location that the new indexed data is stored at
     * @throws SQLException
     * @throws IOException
     */
    public Directory refresh() throws SQLException, IOException {
        this.docs = this.docer.getDocuments();
        System.out.println("\nBegin Refresh\n");
        System.out.println(this.docs);
        boolean res = this.writer.addDocuments(this.docs) != -1;
        this.writer.flush();
        Long val = this.writer.commit();
        System.out.print("\nRefresh Completed\n");
        //this.writer.close();
        return this.writer.getDirectory();

    }

    /**
     * Close all open files being used by this IndexWriter
     * @return boolean - true if all files being used were successfully cloased,
     *                   otherwise false
     */
    public boolean close() { 
        try {
            this.writer.close();
        } catch(IOException e){
            e.printStackTrace();
        }
        return !this.writer.isOpen();
    }

    /*public static Indexer getInstance() {
        return Indexer.instance;
    }*/

}