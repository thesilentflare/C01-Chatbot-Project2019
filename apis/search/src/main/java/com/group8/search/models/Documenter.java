package com.group8.search.models;

import java.util.ArrayList;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.apache.lucene.document.Document;

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
			this.metadata = this.resultSet.getMetaData();
		} catch (SQLException e) {
			e.printStackTrace();
		}
    }

    
    /**
     * Given a list of valuse generate a Lucene Document
     * @param vals String[] - list of values to be added to the Doucemnt
     */
    public Document createDocument(String[] vals) {
       Document doc = new Document();
        // TODO
       return doc;
    }

    /**
     * Generate a list of Douments from the database
     */
    public ArrayList<Document> getDocuments() {
        ArrayList<Document> docs = new ArrayList<Document>();

        try {
            int numberOfColumns = this.metaData.getColumnCount();

            // Loop through each row in the result set
			while (this.resultSet.next()) {

                String[] vals = new String[numberOfColumns];

			    // Loop through each column of the current row
			    for (int col = 1; col < numberOfColumns; col++) {
			        vals[col] = resultSet.getString(col);
                }

                // Generate Lucene Document
                Document doc = createDocument(vals);
                docs.add(doc);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
        return docs;
    }


}