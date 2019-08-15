package com.group8.search.indexer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

import javax.persistence.Index;

import com.group8.search.models.Article;
import com.group8.search.models.ArticleDAO;
import com.group8.search.models.ArticleDAOImpl;

import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.apache.lucene.document.Document;
import org.apache.lucene.document.DoubleDocValuesField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexableField;
import org.springframework.beans.factory.annotation.Autowired;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StoredField;
import org.springframework.stereotype.Service;


@Service
public class Documenter {
    // Odcument object instance fields
    @Autowired
    private ArticleDAO articleDAO;
    private List<Article> resultSet;
    private ResultSetMetaData metaData;
    private List<Document> docs;
    
    /**
     * Constrcuts a Documenter object that generates Lucene Documents
     */
    public Documenter() {
        this.articleDAO = new ArticleDAOImpl();
        this.resultSet = this.articleDAO.findAll();
        try {
            this.metaData = this.articleDAO.getMetaData();
            this.docs = this.getDocuments();
		} catch (SQLException e) {
			e.printStackTrace();
        }
    }

    /**
     * Given the value and it's name creates the required Lucene IndexableField
     * @param name String - the name to represent the value 
     * @param val Object - the value to be indexed
     * @return List<IndexableField>
     */
    public List<IndexableField> createFields(String name, Object val) {
        List<IndexableField> fields = new ArrayList<IndexableField>();
        
        // Check type of value to generate a valid indexable field
        if (val instanceof Double) {
            double doubelVal = ((Double) val).doubleValue();
            fields.add(new DoubleDocValuesField(name, doubelVal));
            fields.add(new StoredField(name, doubelVal));
            
        } else {
            fields.add(new TextField(name, String.valueOf(val), Field.Store.YES));
        }
        
        return fields; 
    }

    
    /**
     * Given a list of valuse and their keys, generate a Lucene Document
     * @param vals Object[] - list of values to be added to the Doucemnt
     * @param vals String[] - list of keys related to the values 
     * @return Document - Lucene Document with given vals
     */
    public Document createDocument(Object[] vals, String[] keys) throws IllegalArgumentException, SQLException {
        int numberOfColumns = this.metaData.getColumnCount();

        // Create a new empty Document object to add db row vals to
        Document doc = new Document();
        System.out.println("\n--------" + numberOfColumns + "\n\n");

        // Check if given db row is valid
        if (vals.length != numberOfColumns) {
            throw new IllegalArgumentException(
                "Invalid row size for: " + Arrays.toString(vals)
            );
        }

        // Add each cell in the given row to the new Document object
        for (int indx = 0; indx < numberOfColumns; indx++) {
           
            // Create an indexable fields based on current column value
            List<IndexableField> fields = this.createFields(keys[indx], vals[indx]);
            // A new indexable fields to lucene Document
            for (IndexableField field : fields) {
                doc.add(field);
            }
            
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
        System.out.println("RESULT SET: ");
        System.out.print(this.resultSet);

        // Loop through each row in the result set
        for (Article article : this.resultSet) {

            Object[] vals = new Object[numberOfColumns];
            Iterator<Object> itr = article.getIterator();

            // Loop through each column of the current row
            for (int colIndx = 0; colIndx < numberOfColumns; colIndx++) {
                vals[colIndx] = itr.next();
            }

            // Generate Lucene Document
            Document doc = this.createDocument(vals, article.getKeys());
            docs.add(doc);
        }
        
        return docs; 
    }
    
    /**
     * Get an iterator to move though the Lucene Documents
     * @return Iterator - iterate through Documents
     */
    public Iterator<Document> getIterator() {
        return this.docs.iterator();
    }

    
    /*public class DocumentIterator implements Iterator<Document> {

        private Iterator<Document> iterator;
        private Document doc; 

        /**
         * Constrcuts a DocumentIterator object
         *
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
         *
		public Document currentValue() {
            return this.doc;
		}
        
    }*/
}