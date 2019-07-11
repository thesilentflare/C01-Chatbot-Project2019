package com.group8.search.indexer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

import com.group8.search.models.Article;
import com.group8.search.models.ArticleDAOImpl;

import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.apache.lucene.document.Document;
import org.apache.lucene.document.TextField;
import org.springframework.beans.factory.annotation.Autowired;
import org.apache.lucene.document.Field;

public class Documenter {
    // Odcument object instance fields
    @Autowired
    private ArticleDAOImpl articleDAO;
    private List<Article> resultSet;
    private ResultSetMetaData metaData;
    private List<Document> docs;
    
    /**
     * Constrcuts a Documenter object that generates Lucene Documents
     */
    public Documenter() {
        this.resultSet = this.articleDAO.findAll();
        try {
            this.metaData = this.articleDAO.getMetaData();
            this.docs = this.getDocuments();
		} catch (SQLException e) {
			e.printStackTrace();
        }
    }

    
    /**
     * Given a list of valuse generate a Lucene Document
     * @param vals String[] - list of values to be added to the Doucemnt
     * @return Document - Lucene Document with given vals
     */
    public Document createDocument(String[] vals) throws IllegalArgumentException, SQLException {
        int numberOfColumns = this.metaData.getColumnCount();

        // Create a new empty Document object to add db row vals to
        Document doc = new Document();

        // Check if given db row is valid
        if (vals.length != this.metaData.getColumnCount()) {
            throw new IllegalArgumentException(
                "Invalid row size for: " + Arrays.toString(vals)
            );
        }

        // Add each cell in the given row to the new Document object
        for (int indx = 0; indx < numberOfColumns; indx++) {
            // Create an indexable field based on current column value
            TextField field = new TextField(this.metaData.getColumnName(indx), vals[indx],
                                             Field.Store.YES);
            // A new indexable field to lucene Document
            doc.add(field);
        }
        
        return doc;
    }

    /**
     * Generate a list of Douments from the database
     * @return List<Document> - list of Lucene Documents 
     *                          representing rows of a table
     */
    public List<Document> getDocuments() throws SQLException {
        List<Document> docs = new ArrayList<Document>();

        int numberOfColumns = this.metaData.getColumnCount();

        // Loop through each row in the result set
        for (Article article : this.resultSet) {

            String[] vals = new String[numberOfColumns];
            Iterator<String> itr = article.getIterator();

            // Loop through each column of the current row
            for (int colIndx = 0; colIndx < numberOfColumns; colIndx++) {
                vals[colIndx] = itr.next();
            }

            // Generate Lucene Document
            Document doc = createDocument(vals);
            docs.add(doc);
        }
        
        return docs; 
    }
    
    /**
     * Get an iterator to move though the Lucene Documents
     * @return Iterator - iterate through Documents
     */
    public Iterator<Document> getIterator() {
        return new DocumentIterator(this);
    }

    
    public class DocumentIterator implements Iterator<Document> {

        private Iterator<Document> iterator;
        private Document doc; 

        /**
         * Constrcuts a DocumentIterator object
         */
        public DocumentIterator(Documenter docer) {
            this.iterator = docer.docs.iterator();
            this.doc = (Document) this.iterator.next();
        }

		public boolean hasNext() {
            return this.doc != null;
		}

		public Document next() {
			try {
                this.doc = (Document) this.iterator.next();
            } catch (NoSuchElementException ex) {
                this.doc = null;
            }
            
            return this.doc;
		}

        /**
         * Get the current Document being pointed too
         * @return Document - current Document being pointed too
         */
		public Document currentValue() {
            return this.doc;
		}
        
    }
}