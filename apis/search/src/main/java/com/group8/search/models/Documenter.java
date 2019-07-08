package com.group8.search.models;

import java.util.ArrayList;
import java.util.Arrays;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.apache.lucene.document.Document;
import org.apache.lucene.document.TextField;
import org.apache.lucene.document.Field;

class Documenter {
    // Odcument object instance fields
    private ResultSet resultSet;
    ResultSetMetaData metaData;
    
    /**
     * Create a Documenter object that generates Lucene Documents that are
     * added to an Index
     * @param set ResultSet - table representation
     */
    public Documenter(ResultSet set) {
        this.resultSet = set;
        try {
			this.metaData = this.resultSet.getMetaData();
		} catch (SQLException e) {
			e.printStackTrace();
		}
    }

    
    /**
     * Given a list of valuse generate a Lucene Document
     * @param vals String[] - list of values to be added to the Doucemnt
     */
    public Document createDocument(String[] vals) throws IllegalArgumentException, SQLException {
        int numberOfColumns = this.metaData.getColumnCount();

        // Create a new empty Document object to add db row vals to
        Document doc = new Document();

        // Check if given db row is valid
        if (vals.length != this.metaData.getColumnCount()) {
            throw new IllegalArgumentException(
                "Invalid row size for" + Arrays.toString(vals)
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
     */
    public ArrayList<Document> getDocuments() throws SQLException {
        ArrayList<Document> docs = new ArrayList<Document>();

        int numberOfColumns = this.metaData.getColumnCount();

        // Loop through each row in the result set
        while (this.resultSet.next()) {

            String[] vals = new String[numberOfColumns];

            // Loop through each column of the current row
            for (int colIndx = 0; colIndx < numberOfColumns; colIndx++) {
                vals[colIndx] = resultSet.getString(colIndx + 1);
            }

            // Generate Lucene Document
            Document doc = createDocument(vals);
            docs.add(doc);
        }
        
        return docs;
    }

    class DocumentIterator {

    }


}