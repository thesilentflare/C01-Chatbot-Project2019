package com.group8.search.models;

public class QueryRequest {
    private String query;
    private String keywords;
    
    /**
     * Construct an empty Query Request objecet
     */
    public QueryRequest() {
        this.query = null;
        this.keywords = null;
    }
    
    /**
     * Constrcut a QueryREquest object consisting of a query
     * and the query's related keywords
     * @param query String - the query
     * @param keys String - the keywords related to the query
     */
    public QueryRequest(String query, String keys) {
        this.query = query;
        this.keywords = keys;
    }

    /**
     * Get the query of this QueryRequest
     * @return String - the query
     */
    public String getQuery() {
        return this.query;
    }

    /**
     * Get the keywords of this QueryRequest
     * @return String - the keywords
     */
    public String getKeywords() {
        return this.keywords;
    }

    /**
     * Set a new string of related keywords for this QueryRequest
     * @param keys String - a new string of keywords to be set
     */
    public void setKeywords(String keys) {
        this.keywords = keys;
    }

    /**
     * Set a new query fo rthis QueryRequest
     * @param q String - a new query to be set
     */
    public void setQuery(String q) {
        this.query = q;
    }

}